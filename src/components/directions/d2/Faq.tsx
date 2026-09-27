import { Icon } from "@/components/mocks/Icon";
import { FAQS } from "@/content/site";

import styles from "./d2.module.css";
import { Fireflies, GLASS, Kicker, Spotlight } from "./ui";

/** Questions from the front row: a neon question mark in its own spotlight, answers in dark glass. */
export function Faq() {
  return (
    <section id="faq" className="relative overflow-hidden py-24 lg:py-32">
      <Fireflies count={16} seed={7} />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-12">
        <div className="dir-reveal">
          <Kicker n="?" label="FAQ" />
          <h2 className="mt-6 font-display text-[2.6rem] leading-[1.02] tracking-tight text-label sm:text-5xl lg:text-6xl">
            Questions from <span className="text-lime-bright [text-shadow:0_0_42px_rgba(165,224,99,0.4)]">the front row.</span>
          </h2>
          <div aria-hidden className="relative mx-auto mt-6 grid h-72 max-w-sm place-items-center lg:mx-0 lg:mt-10 lg:h-96">
            <Spotlight className="-inset-x-6 -top-10 bottom-0" />
            <span
              className={`${styles.neon} relative font-display text-[13rem] leading-none text-transparent [-webkit-text-stroke:3px_var(--color-lime-bright)] [filter:drop-shadow(0_0_14px_rgba(165,224,99,0.75))_drop-shadow(0_0_50px_rgba(126,195,64,0.45))] lg:text-[17rem]`}
            >
              ?
            </span>
            <p className="absolute right-4 bottom-6 -rotate-6 font-hand text-2xl text-mist/70 lg:right-0">ask away!</p>
          </div>
        </div>

        <div className="space-y-3 lg:pt-4">
          {FAQS.map((faq, i) => (
            <details
              key={faq.q}
              open={i === 0}
              className={`dir-reveal group ${GLASS} rounded-2xl transition-colors open:bg-white/[0.08] open:ring-lime-bright/30`}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 font-display text-lg text-label sm:px-6 [&::-webkit-details-marker]:hidden">
                {faq.q}
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-lime-bright/10 text-lime-bright ring-1 ring-lime-bright/25 transition-transform duration-300 group-open:rotate-45 group-open:bg-lime-bright group-open:text-forest group-open:shadow-[0_0_24px_rgba(165,224,99,0.6)]">
                  <Icon name="plus" className="size-5" />
                </span>
              </summary>
              <p className="-mt-1 px-5 pb-6 text-[15px] leading-relaxed text-mist/70 sm:px-6">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
