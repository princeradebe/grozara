// Turns the rendered share card into the site's link-preview images. JPEG keeps it well under the
// ~300 KB WhatsApp will show; Next picks the files up by name (app/opengraph-image.jpg etc.).
import { execFileSync } from "node:child_process";
import { copyFileSync, statSync } from "node:fs";

const out = "../src/app/opengraph-image.jpg";
execFileSync("ffmpeg", ["-v", "error", "-y", "-i", "out/share.png", "-q:v", "3", out]);
copyFileSync(out, "../src/app/twitter-image.jpg");
console.log(`${out}: ${Math.round(statSync(out).size / 1024)} KB`);
