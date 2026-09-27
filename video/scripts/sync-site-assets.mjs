// Copies the site's images into public/site so the shared components find them at the same paths.
import { cpSync, mkdirSync, rmSync } from "node:fs";

const DIRS = ["stickers", "brand", "badges"];

rmSync("public/site", { recursive: true, force: true });
mkdirSync("public/site", { recursive: true });
for (const dir of DIRS) cpSync(`../public/${dir}`, `public/site/${dir}`, { recursive: true });
