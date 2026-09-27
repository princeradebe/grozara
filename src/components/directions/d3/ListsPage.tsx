import { PhoneFrame } from "@/components/mocks/PhoneFrame";
import { ListScreen } from "@/components/mocks/screens";
import { FEATURES } from "@/content/site";

import styles from "./d3.module.css";
import { Arrow, Kicker, SectionHeading, Tape, ruled, tornEdge, withSquiggle } from "./scrap";

const F = FEATURES.lists;

/** The same shop as the phone, scribbled on a notepad page and being crossed off. */
const NOTE: { text: string; state: "done" | "live" | "todo" }[] = [
  { text: "milk, 2 L", state: "done" },
  { text: "brown bread", state: "done" },
  { text: "eggs × 6", state: "live" },
  { text: "boerewors 1 kg", state: "todo" },
  { text: "tomatoes", state: "todo" },
  { text: "rooibos tea", state: "todo" },
];

function Strike({ live }: { live: boolean }) {
  return (
    <svg viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden className="absolute top-1/2 -left-1.5 h-3.5 w-[calc(100%+12px)] -translate-y-1/2 text-forest">
      <path
        d="M2 7 C 22 3, 44 10, 66 5 S 90 6, 98 4"
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className={live ? styles.strikeLive : styles.strike}
      />
    </svg>
  );
}

export function ListsPage() {
  return (
    <section id={F.id} className="relative scroll-mt-6 overflow-x-clip py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-10 lg:px-12">
        <SectionHeading
          className="dir-reveal-left"
          kicker={<Kicker tone="lime">{F.eyebrow}</Kicker>}
          title={withSquiggle(F.title, "Undo", "text-coral")}
          body={F.body}
          points={F.points}
        />

        <div aria-hidden className="dir-reveal-right relative mx-auto h-[640px] w-full max-w-[540px] sm:h-[660px]">
          <div className="absolute top-2 right-0 z-10 sm:right-4" style={{ rotate: "3deg" }}>
            <PhoneFrame scale={0.66}>
              <ListScreen />
            </PhoneFrame>
            <Tape className="-top-2 -left-8 rotate-[-38deg]" color="rgba(255,185,2,0.55)" />
            <Tape className="-top-2 -right-8 rotate-[36deg]" color="rgba(255,185,2,0.55)" />
          </div>

          <div className="absolute top-6 left-0 hidden w-44 sm:block">
            <p className="font-hand text-[26px] leading-tight text-coral -rotate-3">pinned for the next shop!</p>
            <Arrow variant="right" className="mt-1 ml-16 w-24 rotate-[-12deg] text-coral" />
          </div>

          <div className="absolute bottom-0 left-0 z-20 w-[210px] sm:w-[250px]" style={{ rotate: "-5deg" }}>
            <div className="drop-shadow-[0_16px_14px_rgba(24,54,49,0.28)]">
              <div className="bg-[#FFFDF6] pt-8 pr-5 pb-7 pl-12" style={{ ...ruled(34), clipPath: tornEdge({ top: true, depth: 9, teeth: 26, seed: 3 }) }}>
                <p className="font-hand text-[30px] leading-8 text-coral">weekend shop</p>
                <ul className="font-hand text-[26px] leading-8 text-forest">
                  {NOTE.map(({ text, state }) => (
                    <li key={text} className="flex items-center gap-2">
                      <span className={`relative ${state === "done" ? "text-forest/55" : ""}`}>
                        {text}
                        {state === "todo" ? null : <Strike live={state === "live"} />}
                      </span>
                      {state === "done" ? <span className="text-xl text-lime">✓</span> : null}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Tape className="-top-1 left-1/2 -translate-x-1/2 rotate-[3deg]" pattern="dots" color="rgba(255,143,163,0.75)" />
          </div>
        </div>
      </div>
    </section>
  );
}
