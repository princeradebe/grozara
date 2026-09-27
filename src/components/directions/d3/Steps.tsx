import { Icon } from "@/components/mocks/Icon";
import { STEPS } from "@/content/site";

import { Arrow, Circled, Kicker, Tape, ruled, tornEdge } from "./scrap";

const SHEETS = [
  { tilt: -2.5, tape: "rgba(126,195,64,0.6)" },
  { tilt: 1.5, tape: "rgba(255,185,2,0.6)" },
  { tilt: -1, tape: "rgba(255,143,163,0.7)" },
];

/** How it works: three pages torn off a notepad and taped up in order. */
export function Steps() {
  return (
    <section className="relative overflow-x-clip py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="dir-reveal mx-auto max-w-2xl text-center">
          <Kicker tone="lime">How it works</Kicker>
          <h2 className="mt-6 font-display text-4xl leading-[1.02] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            List it. Share it. Shop it.
          </h2>
        </div>

        <ol className="mt-16 grid justify-items-center gap-y-12 lg:mt-20 lg:grid-cols-3 lg:items-center lg:gap-x-20">
          {STEPS.map((step, i) => (
            <li key={step.title} className="dir-reveal relative w-full max-w-[340px]">
              {i > 0 ? <Arrow variant="right" className="absolute top-1/2 -left-[4.5rem] hidden w-16 -translate-y-1/2 text-coral lg:block" /> : null}
              <div className="relative" style={{ rotate: `${SHEETS[i].tilt}deg` }}>
                <div className="drop-shadow-[0_18px_16px_rgba(24,54,49,0.24)]">
                  <div
                    className="bg-[#FFFDF6] px-7 pt-10 pb-9"
                    style={{
                      ...ruled(null),
                      // The title starts 116px down; shift the 32px ruling so the text sits on the lines.
                      backgroundPosition: "0 12px",
                      clipPath: tornEdge({ top: true, depth: 8, teeth: 30, seed: 11 + i }),
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <Circled n={i + 1} className="size-14 font-hand text-[34px] text-coral" />
                      <span className="grid size-12 rotate-6 place-items-center rounded-full bg-white shadow-[0_6px_12px_-8px_rgba(24,54,49,0.7)] ring-1 ring-forest/5">
                        <Icon name={step.icon} className="size-6 text-lime" />
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-2xl leading-8 tracking-tight">{step.title}</h3>
                    <p className="text-base leading-8 text-forest/75">{step.body}</p>
                  </div>
                </div>
                <Tape className="-top-3 left-1/2 -translate-x-1/2 rotate-[-3deg]" color={SHEETS[i].tape} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
