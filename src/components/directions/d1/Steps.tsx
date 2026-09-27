import Image from "next/image";
import type { ReactNode } from "react";

import { Icon } from "@/components/mocks/Icon";
import { AvatarStack, BRANDS, CheckCircle, LiveDot, LoyaltyCard, PEOPLE } from "@/components/mocks/parts";
import { STEPS } from "@/content/site";

import { Glow, Kicker, SectionTitle } from "./ui";

/** One small scene per step, in STEPS order. */
const SCENES: ReactNode[] = [
  <div key="make" className="relative">
    <div className="w-[170px] divide-y divide-forest/8 rounded-2xl bg-white px-3.5 shadow-[0_12px_24px_-14px_rgba(24,54,49,0.55)]">
      {["Boerewors", "Rolls", "Charcoal"].map((item) => (
        <div key={item} className="flex items-center gap-2.5 py-2 text-xs font-medium">
          <CheckCircle size={16} />
          {item}
        </div>
      ))}
    </div>
    <Image src="/stickers/tuna.png" alt="" width={900} height={805} loading="eager" className="absolute -top-5 -right-14 h-auto w-[78px] rotate-[10deg] drop-shadow-[0_8px_10px_rgba(0,0,0,0.2)]" />
  </div>,
  <div key="share" className="flex flex-col items-center gap-3">
    <AvatarStack people={[PEOPLE.thandi, PEOPLE.sipho, PEOPLE.lerato]} size={46} />
    <span className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold shadow-[0_10px_20px_-14px_rgba(24,54,49,0.55)]">
      <LiveDot size={7} /> Family braai
    </span>
  </div>,
  <div key="scan" className="relative">
    <div className="rotate-[-6deg]">
      <LoyaltyCard brand={BRANDS.sunny} width={160} />
    </div>
    <span className="absolute -right-4 -bottom-3 grid size-10 place-items-center rounded-full bg-forest text-lime-bright ring-4 ring-mist">
      <Icon name="barcode" className="size-5" />
    </span>
  </div>,
];

export function StepsSection() {
  return (
    <section aria-labelledby="how-title" className="relative overflow-hidden bg-white">
      <Glow className="-bottom-60 left-1/2 size-[56rem] -translate-x-1/2" color="rgba(126,195,64,0.14)" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:px-12 lg:py-36">
        <div className="dir-reveal mx-auto max-w-2xl text-center">
          <Kicker>How it works</Kicker>
          <SectionTitle id="how-title" className="mt-6">
            Three steps to a sorted shop.
          </SectionTitle>
        </div>

        <ol className="relative mt-16 grid gap-8 lg:mt-20 lg:grid-cols-3 lg:gap-10">
          <span aria-hidden className="absolute top-7 bottom-7 left-7 border-l-2 border-dashed border-forest/20 lg:hidden" />
          <span aria-hidden className="absolute top-7 right-[16.66%] left-[16.66%] hidden border-t-2 border-dashed border-forest/20 lg:block" />
          {STEPS.map((step, i) => (
            <li key={step.title} className="dir-reveal relative flex gap-5 lg:flex-col lg:items-center lg:gap-8">
              <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full bg-forest font-display text-2xl text-lime-bright ring-[10px] ring-white">
                {i + 1}
              </span>
              <article className="flex-1 rounded-[2rem] bg-mist p-3 ring-1 ring-forest/6 lg:w-full">
                <div aria-hidden className="grid h-40 place-items-center rounded-[1.5rem] bg-white/70">
                  {SCENES[i]}
                </div>
                <div className="px-4 pt-6 pb-5">
                  <h3 className="flex items-center gap-2.5 font-display text-2xl">
                    <Icon name={step.icon} className="size-6 text-lime" />
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-forest/65">{step.body}</p>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
