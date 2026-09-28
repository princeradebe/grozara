// Generates the voiceover, one file per line, and writes src/voice.json with each line's length and
// word timings. The video's timeline is built from those, so re-running this re-times the whole cut.
//
// With ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID set (put them in video/.env) it uses ElevenLabs;
// otherwise the macOS "Tessa" voice (English, South Africa) stands in as a scratch track.
//
// Every take reads a little differently. Pass line ids to re-roll just those (`pnpm voice hello`);
// with ElevenLabs each new take is transcribed back (Scribe v2), so a misread shows up without
// listening, and the transcript's word timings let the pictures land on the words.
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import { LINES } from "../src/script.ts";

const KEY = process.env.ELEVENLABS_API_KEY;
const VOICE = process.env.ELEVENLABS_VOICE_ID;
const MODEL = process.env.ELEVENLABS_MODEL || "eleven_v4";
/** Words the transcriber should expect, so it doesn't "correct" them. */
const KEYTERMS = ["Grozara", "Thandi", "Sipho"];
const eleven = Boolean(KEY && VOICE);

const only = new Set(process.argv.slice(2));
const tmp = mkdtempSync(path.join(tmpdir(), "zara-vo-"));
if (only.size === 0) rmSync("public/vo", { recursive: true, force: true });
mkdirSync("public/vo", { recursive: true });

// Trims leading and trailing silence so the timeline controls every pause, and evens every line
// out at -16 LUFS so the voice sits consistently above the music.
const TRIM = "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse";
const TARGET_LUFS = -16;
// Eleven v4's acted reads run long, and the spot has to fit 30 seconds. A 3.5% speed-up (pitch kept)
// is too small to hear and keeps each line's rhythm, unlike trimming the pauses inside it.
const TEMPO = 1.035;

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

/** What ElevenLabs' transcriber hears in a take, with when each word starts and ends. */
async function heard(file) {
  const form = new FormData();
  form.append("model_id", "scribe_v2");
  form.append("language_code", "en");
  form.append("timestamps_granularity", "word");
  for (const term of KEYTERMS) form.append("keyterms", term);
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
  const fresh = only.size === 0 || only.has(line.id) || !existsSync(`public/${file}`);
  if (fresh) {
    const raw = eleven ? await elevenLabs(line, i) : tessa(line);
    execFileSync("ffmpeg", ["-v", "error", "-y", "-i", raw, "-af", `${TRIM},atempo=${TEMPO}`, "-ar", "48000", "-ac", "1", `public/${file}`]);
    level(`public/${file}`);
  }
  const seconds = Number(
    execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", `public/${file}`]).toString(),
  );
  // A kept take keeps its word timings from the last run.
  let words = previous.lines.find((l) => l.id === line.id)?.words ?? [];
  console.log(`${line.id.padEnd(6)} ${seconds.toFixed(2)}s  ${fresh ? "new " : "kept"}  ${line.text}`);
  if (fresh && eleven) {
    const take = await heard(`public/${file}`);
    words = take.words;
    console.log(`       heard: ${take.text}`);
  }
  out.push({ id: line.id, file, seconds: Math.round(seconds * 1000) / 1000, words });
}

rmSync(tmp, { recursive: true, force: true });
writeFileSync("src/voice.json", JSON.stringify({ source: eleven ? `elevenlabs:${MODEL}` : "tessa", lines: out }, null, 2) + "\n");
console.log(`total ${out.reduce((t, l) => t + l.seconds, 0).toFixed(2)}s of speech (${eleven ? "ElevenLabs" : "Tessa scratch"})`);
