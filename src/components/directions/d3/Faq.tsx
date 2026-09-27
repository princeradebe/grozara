import { Icon } from "@/components/mocks/Icon";
import { FAQS } from "@/content/site";

import { Arrow, Heart, Kicker, Tape, ruled } from "./scrap";

const TILTS = [-0.8, 0.6, -0.4, 0.9, -0.6, 0.4, -0.9];
const TABS = ["bg-lime", "bg-amber", "bg-blush", "bg-coral"];

/** Questions on index cards: the question on the header line, the answer written on the ruled lines. */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="d3-faq" className="relative scroll-mt-6 overflow-x-clip py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:gap-12 lg:px-12">
        <div className="dir-reveal-left lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <Kicker tone="blush" mark="?">
              FAQ
            </Kicker>
            <h2 id="d3-faq" className="mt-6 font-display text-4xl leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
              Good questions.
            </h2>
            <div aria-hidden className="mt-10 hidden items-start gap-3 lg:flex">
              <p className="font-hand text-[28px] leading-tight text-coral -rotate-3">tap a card to flip it open</p>
              <Arrow variant="loop" className="mt-6 w-28 rotate-[8deg] text-coral" />
            </div>
            <Heart filled className="mt-8 hidden w-14 -rotate-12 text-blush lg:block" />
          </div>
        </div>

        <div className="grid gap-5 lg:col-span-8">
          {FAQS.map((faq, i) => (
            <details
              key={faq.q}
              className="group dir-reveal relative bg-[#FFFDF6] shadow-[0_14px_22px_-16px_rgba(24,54,49,0.6),0_1px_3px_rgba(24,54,49,0.1)]"
              style={{ rotate: `${TILTS[i % TILTS.length]}deg` }}
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-5 sm:px-7 [&::-webkit-details-marker]:hidden">
                {i === 0 ? <Tape className="-top-3 right-10 rotate-[5deg]" size="h-6 w-20" /> : null}
                <span aria-hidden className={`h-7 w-2 shrink-0 rounded-full ${TABS[i % TABS.length]}`} />
                <span className="flex-1 font-display text-lg leading-snug sm:text-xl">{faq.q}</span>
                <span
                  aria-hidden
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-forest/6 text-forest transition-[rotate,background-color] duration-300 group-open:rotate-45 group-open:bg-coral group-open:text-white"
                >
                  <Icon name="plus" className="size-4" />
                </span>
              </summary>
              <div className="border-t-2 border-coral/45 px-5 pt-1 pb-5 sm:px-7 sm:pl-[52px]" style={ruled(null)}>
                <p className="text-base leading-8 text-forest/80">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
