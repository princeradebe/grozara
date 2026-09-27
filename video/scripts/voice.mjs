// Generates Zara's voiceover, one file per line, and writes src/voice.json with each line's length.
// The video's timeline is built from those lengths, so re-running this re-times the whole cut.
//
// With ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID set (put them in video/.env) it uses ElevenLabs;
// otherwise the macOS "Tessa" voice (English, South Africa) stands in as a scratch track.
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import { LINES } from "../src/script.ts";

const KEY = process.env.ELEVENLABS_API_KEY;
const VOICE = process.env.ELEVENLABS_VOICE_ID;
const MODEL = process.env.ELEVENLABS_MODEL ?? "eleven_multilingual_v2";
const eleven = Boolean(KEY && VOICE);

const tmp = mkdtempSync(path.join(tmpdir(), "zara-vo-"));
rmSync("public/vo", { recursive: true, force: true });
mkdirSync("public/vo", { recursive: true });

// Trims leading and trailing silence so the timeline controls every pause.
const TRIM = "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse";

async function elevenLabs(line, i) {
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE}?output_format=mp3_44100_128`, {
    method: "POST",
    headers: { "xi-api-key": KEY, "content-type": "application/json" },
    body: JSON.stringify({
      text: line.text,
      model_id: MODEL,
      // Neighbouring lines keep the delivery continuous across separate files.
      previous_text: LINES[i - 1]?.text,
      next_text: LINES[i + 1]?.text,
      voice_settings: { stability: 0.38, similarity_boost: 0.8, style: 0.5, use_speaker_boost: true },
    }),
  });
  if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${await res.text()}`);
  const raw = path.join(tmp, `${line.id}.mp3`);
  writeFileSync(raw, Buffer.from(await res.arrayBuffer()));
  return raw;
}

function tessa(line) {
  const raw = path.join(tmp, `${line.id}.aiff`);
  execFileSync("say", ["-v", "Tessa", "-r", "200", "-o", raw, line.text]);
  return raw;
}

const out = [];
for (const [i, line] of LINES.entries()) {
  const raw = eleven ? await elevenLabs(line, i) : tessa(line);
  const file = `vo/${line.id}.wav`;
  execFileSync("ffmpeg", ["-v", "error", "-y", "-i", raw, "-af", TRIM, "-ar", "48000", "-ac", "1", `public/${file}`]);
  const seconds = Number(
    execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", `public/${file}`]).toString(),
  );
  out.push({ id: line.id, file, seconds: Math.round(seconds * 1000) / 1000 });
  console.log(`${line.id.padEnd(6)} ${seconds.toFixed(2)}s  ${line.text}`);
}

rmSync(tmp, { recursive: true, force: true });
writeFileSync("src/voice.json", JSON.stringify({ source: eleven ? `elevenlabs:${MODEL}` : "tessa", lines: out }, null, 2) + "\n");
console.log(`total ${out.reduce((t, l) => t + l.seconds, 0).toFixed(2)}s of speech (${eleven ? "ElevenLabs" : "Tessa scratch"})`);
