// Generates the voiceover, one file per line, and writes src/voice.json with each line's length and
// word timings. The video's timeline is built from those, so re-running this re-times the whole cut.
//
// With ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID set (put them in video/.env) it uses ElevenLabs;
// otherwise the macOS "Tessa" voice (English, South Africa) stands in as a scratch track.
//
// Every take reads a little differently. Pass line ids to re-roll just those (`pnpm voice hello`);
// with ElevenLabs each new take is transcribed back (Scribe v2), so a misread shows up without
// listening, and the transcript's word timings let the pictures land on the words.
// `pnpm voice --keep` makes no new takes: it re-processes the ones on disk (pause cap), and
// re-transcribes any line ids given with it (`pnpm voice --keep list`).
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import { LINES } from "../src/script.ts";

const KEY = process.env.ELEVENLABS_API_KEY;
const VOICE = process.env.ELEVENLABS_VOICE_ID;
const MODEL = process.env.ELEVENLABS_MODEL || "eleven_v4";
/** Words the transcriber should expect, so it doesn't "correct" them. */
const KEYTERMS = ["Grozara", "Thandi", "Sipho", "boerewors", "Boyfriend Mode"];
const eleven = Boolean(KEY && VOICE);

const args = process.argv.slice(2);
const keep = args.includes("--keep");
const only = new Set(args.filter((arg) => arg !== "--keep"));
const tmp = mkdtempSync(path.join(tmpdir(), "zara-vo-"));
if (only.size === 0 && !keep) rmSync("public/vo", { recursive: true, force: true });
mkdirSync("public/vo", { recursive: true });

// Trims leading and trailing silence so the timeline controls every pause, and evens every line
// out at -16 LUFS so the voice sits consistently above the music.
const TRIM = "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse";
const TARGET_LUFS = -16;
// Eleven v4's acted reads run long, and the spot has to fit 30 seconds. Two things buy the time
// without touching the performance: a 3.5% speed-up (pitch kept), too small to hear, and a cap on
// the silences between phrases, so the rhythm stays and only dead air goes.
const TEMPO = 1.035;
const PAUSE = 0.2;

/** Shortens every silence longer than PAUSE to PAUSE, cutting from its middle. Returns whether anything was cut. */
function tighten(file) {
  const log = spawnSync("ffmpeg", ["-hide_banner", "-i", file, "-af", `silencedetect=noise=-38dB:d=${PAUSE + 0.04}`, "-f", "null", "-"], { encoding: "utf8" }).stderr;
  const cuts = [...log.matchAll(/silence_start: ([\d.]+)[\s\S]*?silence_end: ([\d.]+)/g)].map((m) => {
    const [from, to] = [Number(m[1]), Number(m[2])];
    const drop = (to - from - PAUSE) / 2;
    return [(from + to) / 2 - drop, (from + to) / 2 + drop];
  });
  if (cuts.length === 0) return false;
  // Keep the audio between the cuts, sample-accurately, and join it back up.
  const edges = [0, ...cuts.flat(), null];
  const parts = [];
  for (let i = 0; i < edges.length; i += 2) {
    const end = edges[i + 1] === null ? "" : `:end=${edges[i + 1].toFixed(4)}`;
    parts.push(`[0]atrim=start=${edges[i].toFixed(4)}${end},asetpts=PTS-STARTPTS[p${i / 2}]`);
  }
  const joined = parts.map((_, i) => `[p${i}]`).join("");
  const tmpFile = file.replace(/\.wav$/, ".tight.wav");
  execFileSync("ffmpeg", ["-v", "error", "-y", "-i", file, "-filter_complex", `${parts.join(";")};${joined}concat=n=${parts.length}:v=0:a=1`, "-ar", "48000", "-ac", "1", tmpFile]);
  renameSync(tmpFile, file);
  return true;
}

/** Measures a line's loudness and gains it to the target; loudnorm alone undershoots on short clips. */
function level(file) {
  const log = spawnSync("ffmpeg", ["-hide_banner", "-i", file, "-af", "ebur128", "-f", "null", "-"], { encoding: "utf8" }).stderr;
  const lufs = Number(log.match(/I:\s+(-?[\d.]+) LUFS/g)?.pop()?.match(/-?[\d.]+/)?.[0]);
  const gain = (TARGET_LUFS - lufs).toFixed(2);
  const tmpFile = file.replace(/\.wav$/, ".level.wav");
  execFileSync("ffmpeg", ["-v", "error", "-y", "-i", file, "-af", `volume=${gain}dB,alimiter=limit=0.84:level=false`, "-ar", "48000", tmpFile]);
  renameSync(tmpFile, file);
}

/** The request that made the previous line in this run; v4 chains takes by request id. */
let previousRequestId;

async function elevenLabs(line, i) {
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE}?output_format=mp3_44100_128`, {
    method: "POST",
    headers: { "xi-api-key": KEY, "content-type": "application/json" },
    body: JSON.stringify({
      text: line.say ?? line.text,
      model_id: MODEL,
      // Neighbouring lines keep the delivery continuous across separate files.
      previous_text: LINES[i - 1]?.text,
      next_text: LINES[i + 1]?.text,
      ...(previousRequestId ? { previous_request_ids: [previousRequestId] } : {}),
      // v4 has only these two; style, speed and speaker boost belong to the older models.
      voice_settings: { stability: 0.5, similarity_boost: 0.8 },
    }),
  });
  if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${await res.text()}`);
  previousRequestId = res.headers.get("request-id") ?? undefined;
  const raw = path.join(tmp, `${line.id}.mp3`);
  writeFileSync(raw, Buffer.from(await res.arrayBuffer()));
  return raw;
}

/**
 * What ElevenLabs' transcriber hears in a take, with when each word starts and ends. `hints` are
 * the words it's told to expect; pass none for a cold listen.
 */
async function heard(file, hints = KEYTERMS) {
  const form = new FormData();
  form.append("model_id", "scribe_v2");
  form.append("language_code", "en");
  form.append("timestamps_granularity", "word");
  // The cues look words up by their spelling, so the same audio must always read the same.
  form.append("temperature", "0");
  for (const term of hints) form.append("keyterms", term);
  form.append("file", new Blob([readFileSync(file)], { type: "audio/wav" }), path.basename(file));
  const res = await fetch("https://api.elevenlabs.io/v1/speech-to-text", { method: "POST", headers: { "xi-api-key": KEY }, body: form });
  if (!res.ok) return { text: `(transcription failed: ${res.status})`, words: [] };
  const { text, words } = await res.json();
  const round = (t) => Math.round(t * 1000) / 1000;
  return { text, words: words.filter((w) => w.type === "word").map((w) => ({ text: w.text, start: round(w.start), end: round(w.end) })) };
}

function tessa(line) {
  const raw = path.join(tmp, `${line.id}.aiff`);
  // The captions, not `say`: macOS would read the delivery tags out loud.
  execFileSync("say", ["-v", "Tessa", "-r", "200", "-o", raw, line.text]);
  return raw;
}

const previous = existsSync("src/voice.json") ? JSON.parse(readFileSync("src/voice.json", "utf8")) : { lines: [] };
const out = [];
for (const [i, line] of LINES.entries()) {
  const file = `vo/${line.id}.wav`;
  const fresh = (!keep && (only.size === 0 || only.has(line.id))) || !existsSync(`public/${file}`);
  if (fresh) {
    const raw = eleven ? await elevenLabs(line, i) : tessa(line);
    execFileSync("ffmpeg", ["-v", "error", "-y", "-i", raw, "-af", `${TRIM},atempo=${TEMPO}`, "-ar", "48000", "-ac", "1", `public/${file}`]);
  }
  // Idempotent, so kept takes are checked too: an already tight one is left alone.
  const tightened = tighten(`public/${file}`);
  if (fresh) level(`public/${file}`);
  const seconds = Number(
    execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", `public/${file}`]).toString(),
  );
  // A kept take that wasn't cut keeps its word timings from the last run.
  let words = previous.lines.find((l) => l.id === line.id)?.words ?? [];
  console.log(`${line.id.padEnd(6)} ${seconds.toFixed(2)}s  ${fresh ? "new " : tightened ? "cut " : "kept"}  ${line.text}`);
  if ((fresh || tightened || (keep && only.has(line.id))) && eleven) {
    const take = await heard(`public/${file}`);
    words = take.words;
    console.log(`       heard: ${take.text}`);
    // The hints spell the cue words right, but they can also paper over a misread ("melk, brood"
    // for a mangled "milk, bread"), so listen again with none and show it when it differs.
    const cold = await heard(`public/${file}`, []);
    if (cold.text !== take.text) console.log(`       cold:  ${cold.text}`);
  }
  out.push({ id: line.id, file, seconds: Math.round(seconds * 1000) / 1000, words });
}

rmSync(tmp, { recursive: true, force: true });
writeFileSync("src/voice.json", JSON.stringify({ source: eleven ? `elevenlabs:${MODEL}` : "tessa", lines: out }, null, 2) + "\n");
console.log(`total ${out.reduce((t, l) => t + l.seconds, 0).toFixed(2)}s of speech (${eleven ? "ElevenLabs" : "Tessa scratch"})`);
