// Generates the music bed and sound effects with ElevenLabs and records what exists in
// src/sound.json. The video plays whatever the manifest lists, so it still renders without them.
// Needs ELEVENLABS_API_KEY in video/.env. Pass effect ids to regenerate only those: `pnpm sound pop tick`.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) {
  console.error("ELEVENLABS_API_KEY is not set. Add it to video/.env first.");
  process.exit(1);
}
const API = "https://api.elevenlabs.io/v1";
const only = new Set(process.argv.slice(2));

const MUSIC = {
  prompt:
    "A 30-second instrumental amapiano pop track for a playful, premium mobile app advert. Warm log-drum bass, " +
    "bright piano chords, shakers, claps and a light whistle hook. Sunny and confident at about 112 BPM. Keep the " +
    "mid-range open for a voiceover. A short riser at 26 seconds into one big final hit at 28 seconds, then let it ring out.",
  seconds: 30,
};

/** id, prompt, seconds. Each is fired on a cue in src/Sound.tsx. */
const SFX = [
  ["whoosh", "Fast, airy whoosh swipe for a bold graphic transition, clean and modern", 0.7],
  ["slam", "Punchy deep thump impact as huge bold text slams onto the screen, short and tight", 0.6],
  ["drop", "Cute cartoon character landing with a soft squishy bounce plop", 0.6],
  ["pop", "Bubbly cartoon pop for a sticker appearing, bright and cute", 0.5],
  ["tick", "Satisfying soft UI checkbox tick click with a tiny sparkle", 0.5],
  ["shutter", "Phone camera shutter click with a bright flash", 0.6],
  ["stamp", "Rubber stamp thud slapped hard onto paper", 0.5],
  ["ding", "Friendly phone notification ding chime, warm and short", 0.7],
  ["cards", "Playing cards quickly fanned out in a hand, crisp riffle", 0.8],
  ["beep", "Supermarket till barcode scanner beep, single clean beep", 0.5],
  ["boing", "Playful cartoon boing jump spring", 0.7],
  ["sparkle", "Magical celebratory sparkle shimmer with light confetti", 1.5],
];

async function save(url, body, file) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "xi-api-key": KEY, "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  writeFileSync(`public/${file}`, Buffer.from(await res.arrayBuffer()));
  return file;
}

mkdirSync("public/music", { recursive: true });
mkdirSync("public/sfx", { recursive: true });
const manifest = existsSync("src/sound.json") ? JSON.parse(readFileSync("src/sound.json", "utf8")) : { music: null, sfx: {} };

if (only.size === 0 || only.has("music")) {
  // Newest model first; plans without access to it fall back.
  for (const model of ["music_v2_5", "music_v1"]) {
    try {
      manifest.music = await save(
        `${API}/music?output_format=mp3_44100_192`,
        { prompt: MUSIC.prompt, music_length_ms: MUSIC.seconds * 1000, model_id: model, force_instrumental: true },
        "music/bed.mp3",
      );
      console.log(`music  ${model}`);
      break;
    } catch (error) {
      console.warn(`music  ${model} failed: ${error.message}`);
    }
  }
}

for (const [id, text, seconds] of SFX) {
  if (only.size > 0 && !only.has(id)) continue;
  try {
    const mp3 = await save(
      `${API}/sound-generation?output_format=mp3_44100_128`,
      { text, duration_seconds: seconds, prompt_influence: 0.6 },
      `sfx/${id}.mp3`,
    );
    // Leading silence would land the hit late, so the effect starts on its first sound.
    const wav = `sfx/${id}.wav`;
    execFileSync("ffmpeg", ["-v", "error", "-y", "-i", `public/${mp3}`, "-af", "silenceremove=start_periods=1:start_threshold=-50dB", "-ar", "48000", `public/${wav}`]);
    rmSync(`public/${mp3}`);
    manifest.sfx[id] = wav;
    console.log(`sfx    ${id}`);
  } catch (error) {
    console.warn(`sfx    ${id} failed: ${error.message}`);
  }
}

writeFileSync("src/sound.json", JSON.stringify(manifest, null, 2) + "\n");
