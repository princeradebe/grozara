// Masters the render's audio to -14 LUFS (what Reels, TikTok and YouTube normalise to) without
// re-encoding the picture. Two-pass loudnorm, so the level is measured rather than guessed.
import { spawnSync } from "node:child_process";

const [input = "out/grozara-30s.mp4", output = "out/grozara-30s-master.mp4"] = process.argv.slice(2);
const TARGET = "I=-14:TP=-1.5:LRA=11";

function ffmpeg(args) {
  const run = spawnSync("ffmpeg", ["-hide_banner", "-y", ...args], { encoding: "utf8" });
  if (run.status !== 0) throw new Error(run.stderr);
  return run.stderr;
}

// ffmpeg prints loudnorm's measurement as JSON at the end of stderr.
const log = ffmpeg(["-i", input, "-af", `loudnorm=${TARGET}:print_format=json`, "-f", "null", "-"]);
const m = JSON.parse(log.slice(log.lastIndexOf("{"), log.lastIndexOf("}") + 1));
const measured = `measured_I=${m.input_i}:measured_TP=${m.input_tp}:measured_LRA=${m.input_lra}:measured_thresh=${m.input_thresh}:offset=${m.target_offset}`;

// -shortest ends on the last video frame; AAC padding would otherwise run the audio a hair past 30s.
ffmpeg(["-i", input, "-c:v", "copy", "-af", `loudnorm=${TARGET}:${measured}:linear=true`, "-ar", "48000", "-c:a", "aac", "-b:a", "256k", "-shortest", output]);
console.log(`${input}: ${m.input_i} LUFS → -14 LUFS in ${output}`);
