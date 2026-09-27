import { Icon } from "@/components/mocks/Icon";
import { TICKER } from "@/content/site";

import styles from "./d2.module.css";

/** A row of theatre bulbs, chasing. */
function Bulbs() {
  return (
    <div className="relative h-3 overflow-hidden">
      <div
        className={`${styles.chase} absolute inset-y-0 -right-8 -left-8`}
        style={{
          backgroundImage:
            "radial-gradient(circle at 6px 50%, #fff1c2 0 2.5px, transparent 3.5px), radial-gradient(circle at 18px 50%, rgba(255,241,194,0.22) 0 2px, transparent 3px)",
          backgroundSize: "24px 100%",
          filter: "drop-shadow(0 0 4px rgba(255,210,120,0.85))",
        }}
      />
    </div>
  );
}

/** The theatre marquee between the hero and the stages: every act, in lights. */
export function Marquee() {
  const words = [...TICKER, ...TICKER];
  return (
    <div aria-hidden className="relative overflow-hidden border-y border-white/10 bg-forest/70 py-3 shadow-[0_0_80px_-20px_rgba(165,224,99,0.35)]">
      <Bulbs />
      <div className="dir-marquee flex w-max items-center py-5">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="flex items-center pr-10 sm:pr-14">
            <span
              className={`font-display text-3xl tracking-tight whitespace-nowrap uppercase sm:text-5xl ${
                (i % TICKER.length) % 2 ? "text-transparent [-webkit-text-stroke:1.5px_var(--color-lime-bright)]" : "text-label"
              }`}
            >
              {word}
            </span>
            <Icon name="sparkles" className="ml-10 size-6 text-lime-bright sm:ml-14 sm:size-8" />
          </span>
        ))}
      </div>
      <Bulbs />
    </div>
  );
}
