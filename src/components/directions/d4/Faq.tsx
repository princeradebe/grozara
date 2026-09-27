import { Icon, type IconName } from "@/components/mocks/Icon";
import { FAQS } from "@/content/site";

import { Kicker, tile, WRAP } from "./ui";

// One glyph per question, in FAQS order.
const GLYPHS: IconName[] = ["gift", "heart", "userGroup", "card", "share", "faceId", "sparkles"];
const CHIPS = ["bg-lime text-forest", "bg-coral text-white", "bg-forest text-lime-bright", "bg-amber text-forest"];

/** A heading tile beside a two-column grid of question tiles. Native <details>, so no JavaScript. */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="d4-faq" className="scroll-mt-4 pt-24 sm:pt-32">
      <div className={`${WRAP} grid gap-3 lg:grid-cols-12 lg:gap-4`}>
        <div className={tile("amber", "dir-reveal flex min-h-[340px] flex-col p-7 sm:p-10 lg:col-span-4 lg:min-h-[520px]")}>
          <Kicker label="FAQ" />
          <h2 id="d4-faq" className="mt-5 font-display text-[42px] leading-[1.02] tracking-tight sm:text-5xl">
            Good questions.
          </h2>
          <div aria-hidden className="relative mt-auto h-[170px] pt-6">
            <span className="absolute bottom-0 left-0 grid size-[132px] -rotate-6 place-items-center rounded-[36px] bg-forest font-display text-[96px] leading-none text-lime-bright shadow-[0_20px_30px_-18px_rgba(24,54,49,0.9)]">
              ?
            </span>
            <span className="absolute right-2 bottom-16 rotate-3 rounded-[18px] rounded-bl-sm bg-white px-4 py-2.5 text-sm font-semibold shadow-[0_12px_20px_-12px_rgba(24,54,49,0.6)]">
              Quick question…
            </span>
            <span className="absolute right-10 bottom-1 -rotate-2 rounded-[18px] rounded-br-sm bg-forest px-4 py-2.5 text-sm font-semibold text-lime-bright">
              Ask away!
            </span>
          </div>
        </div>

        <div className="grid items-start gap-3 sm:grid-cols-2 lg:col-span-8 lg:gap-4">
          {FAQS.map((faq, i) => (
            <details key={faq.q} className={tile("white", "group dir-reveal open:ring-2 open:ring-lime/70")}>
              <summary className="flex cursor-pointer list-none items-start gap-3.5 p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
                <span aria-hidden className={`grid size-10 shrink-0 place-items-center rounded-2xl ${CHIPS[i % CHIPS.length]}`}>
                  <Icon name={GLYPHS[i % GLYPHS.length]} className="size-5" />
                </span>
                <span className="flex-1 pt-1.5 font-display text-lg leading-snug">{faq.q}</span>
                <span
                  aria-hidden
                  className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-forest/6 text-forest transition-[rotate,background-color] duration-300 group-open:rotate-45 group-open:bg-forest group-open:text-lime-bright"
                >
                  <Icon name="plus" className="size-4" />
                </span>
              </summary>
              <p className="-mt-1 px-5 pb-6 text-[15px] leading-relaxed text-forest/70 sm:px-6 sm:pl-[78px]">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
