import type { CSSProperties } from "react";
import { loadFont as loadCaveat } from "@remotion/google-fonts/Caveat";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadNunito } from "@remotion/google-fonts/Nunito";

// The same three families the site loads through next/font, under the same CSS variables.
const nunito = loadNunito("normal", { weights: ["900"], subsets: ["latin"] });
const inter = loadInter("normal", { weights: ["400", "500", "600", "700"], subsets: ["latin"] });
const caveat = loadCaveat("normal", { weights: ["700"], subsets: ["latin"] });

export const FONT_VARS = {
  "--font-nunito": nunito.fontFamily,
  "--font-inter": inter.fontFamily,
  "--font-caveat": caveat.fontFamily,
} as CSSProperties;
