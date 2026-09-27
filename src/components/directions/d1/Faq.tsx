import Image from "next/image";

import { Icon } from "@/components/mocks/Icon";
import { FAQS } from "@/content/site";

import { Kicker, SectionTitle } from "./ui";

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative scroll-mt-6 overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-12 lg:py-36">
        <div className="dir-reveal lg:sticky lg:top-16 lg:self-start">
          <Kicker dot="amber">FAQ</Kicker>
          <SectionTitle id="faq-title" className="mt-6">
            Questions, answered.
          </SectionTitle>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-forest/70">
            The short answers to what people ask before their first shop with Grozara.
          </p>

          <div aria-hidden className="mt-12 flex max-w-sm flex-col gap-3">
            <div className="flex items-end gap-3">
              <Image src="/brand/app-icon.png" alt="" width={96} height={96} loading="eager" className="size-12 rounded-[14px] shadow-[0_10px_20px_-12px_rgba(24,54,49,0.7)]" />
              <p className="rounded-3xl rounded-bl-md bg-white px-5 py-3 text-[15px] font-semibold shadow-[0_14px_28px_-20px_rgba(24,54,49,0.6)] ring-1 ring-forest/6">
                {FAQS[0].q}
              </p>
            </div>
            <p className="ml-auto max-w-[16rem] rounded-3xl rounded-br-md bg-lime px-5 py-3 text-[15px] font-semibold text-forest shadow-[0_14px_28px_-18px_rgba(60,120,30,0.9)]">
              {FAQS[0].a}
            </p>
          </div>
        </div>

        <div className="dir-reveal grid content-start gap-3">
          {FAQS.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-3xl bg-white px-6 ring-1 ring-forest/8 transition-shadow open:shadow-[0_24px_44px_-30px_rgba(24,54,49,0.55)] sm:px-7"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {faq.q}
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mist text-forest transition-[rotate,background-color] duration-300 group-open:rotate-45 group-open:bg-lime">
                  <Icon name="plus" className="size-5" />
                </span>
              </summary>
              <p className="-mt-1 max-w-2xl pb-6 text-base leading-relaxed text-forest/70">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
