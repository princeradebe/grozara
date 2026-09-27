import type { ReactNode } from "react";

import { EXTRAS } from "@/content/site";

import { MiniClear, MiniFaceId, MiniFavourite, MiniShareIn } from "./minis";
import { Chip, SectionHead, tile, type Tone, WRAP } from "./ui";

const LOOKS: { tone: Tone; chip: "forest" | "glass" | "white"; visual: ReactNode }[] = [
  { tone: "paper", chip: "forest", visual: <MiniShareIn /> },
  { tone: "forest", chip: "glass", visual: <MiniFaceId /> },
  { tone: "white", chip: "forest", visual: <MiniFavourite /> },
  { tone: "lime", chip: "white", visual: <MiniClear /> },
];

export function Extras() {
  return (
    <section aria-labelledby="d4-extras" className="pt-24 sm:pt-32">
      <div className={WRAP}>
        <SectionHead kicker="And there's more" id="d4-extras" title="The little things." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {EXTRAS.map((extra, i) => {
            const look = LOOKS[i % LOOKS.length];
            const dark = look.tone === "forest";
            return (
              <div key={extra.title} className={tile(look.tone, "dir-reveal flex min-h-[380px] flex-col p-6 sm:p-7")}>
                <div aria-hidden className="flex min-h-[180px] flex-1 items-center justify-center">
                  {look.visual}
                </div>
                <Chip icon={extra.icon} tone={look.chip} />
                <h3 className="mt-4 font-display text-2xl leading-tight tracking-tight">{extra.title}</h3>
                <p className={`mt-2 text-[15px] leading-relaxed ${dark ? "text-mist/70" : "text-forest/70"}`}>{extra.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
