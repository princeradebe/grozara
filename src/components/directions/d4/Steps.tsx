import type { ReactNode } from "react";

import { STEPS } from "@/content/site";

import { MiniInvite, MiniTill, MiniTyping } from "./minis";
import { Chip, SectionHead, tile, type Tone, WRAP } from "./ui";

const LOOKS: { tone: Tone; chip: "forest" | "glass" | "white"; numeral: string; visual: ReactNode }[] = [
  { tone: "white", chip: "forest", numeral: "text-lime", visual: <MiniTyping /> },
  { tone: "lime", chip: "white", numeral: "text-forest", visual: <MiniInvite /> },
  { tone: "forest", chip: "glass", numeral: "text-lime-bright", visual: <MiniTill /> },
];

/** Three tall tiles, each led by a giant step number. */
export function Steps() {
  return (
    <section aria-labelledby="d4-steps" className="pt-24 sm:pt-32">
      <div className={WRAP}>
        <SectionHead kicker="How it works" id="d4-steps" title="List it. Share it. Shop it." />
        <ol className="grid gap-3 lg:grid-cols-3 lg:gap-4">
          {STEPS.map((step, i) => {
            const look = LOOKS[i];
            const dark = look.tone === "forest";
            return (
              <li key={step.title} className={tile(look.tone, "dir-reveal flex min-h-[440px] flex-col p-7 sm:min-h-[500px] sm:p-8")}>
                <div className="flex items-start justify-between">
                  <span aria-hidden className={`font-display text-[150px] leading-[0.8] tracking-tighter sm:text-[180px] ${look.numeral}`}>
                    {i + 1}
                  </span>
                  <Chip icon={step.icon} tone={look.chip} />
                </div>
                <div aria-hidden className="flex flex-1 items-center py-8">
                  {look.visual}
                </div>
                <h3 className="font-display text-3xl leading-tight tracking-tight">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className={`mt-2 text-base leading-relaxed ${dark ? "text-mist/70" : "text-forest/70"}`}>{step.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
