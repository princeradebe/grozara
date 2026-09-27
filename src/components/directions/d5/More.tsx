import Image from "next/image";
import type { ReactNode } from "react";

import { Icon } from "@/components/mocks/Icon";
import { AvatarStack, BRANDS, CheckCircle, LoyaltyCard, PEOPLE, StickerCard } from "@/components/mocks/parts";
import { EXTRAS, STEPS } from "@/content/site";

import { BigTick, Kicker } from "./ui";

/** Tile colour, resting tilt and a little mock for each extra, in EXTRAS order. */
const TILES: { tone: string; tilt: string; art: ReactNode }[] = [
  {
    tone: "bg-lime text-forest",
    tilt: "lg:-rotate-[2.5deg]",
    art: (
      <div className="relative h-full">
        <span className="absolute top-3 left-2 grid size-[74px] -rotate-[8deg] place-items-center rounded-[20px] bg-white shadow-[0_14px_24px_-14px_rgba(0,0,0,0.6)]">
          <Image src="/brand/grozara-icon.svg" alt="" width={64} height={64} className="size-[52px] rounded-[12px]" />
        </span>
        <span className="absolute top-[68px] left-[64px] grid size-[44px] place-items-center rounded-full bg-forest text-lime-bright ring-4 ring-lime">
          <Icon name="share" className="size-[22px]" />
        </span>
        <StickerCard src="/stickers/tuna.png" alt="" name="Tuna" buy={1} width={124} aspect={0.9} tilt={9} className="absolute top-0 right-1" />
      </div>
    ),
  },
  {
    tone: "bg-coral text-forest",
    tilt: "lg:rotate-[2deg]",
    art: (
      <div className="grid h-full place-items-center">
        <span className="relative grid size-[150px] place-items-center rounded-[40px] bg-forest text-lime-bright shadow-[0_20px_30px_-16px_rgba(0,0,0,0.6)]">
          <Icon name="faceId" className="size-[88px]" />
          <span className="absolute -right-4 -bottom-4 grid size-[60px] place-items-center rounded-full bg-label text-forest ring-[6px] ring-coral">
            <Icon name="lock" className="size-[28px]" />
          </span>
        </span>
      </div>
    ),
  },
  {
    tone: "bg-amber text-forest",
    tilt: "lg:-rotate-[1.5deg]",
    art: (
      <div className="relative h-full">
        <LoyaltyCard brand={BRANDS.corner} width={190} className="absolute top-2 left-0 -rotate-[9deg]" />
        <LoyaltyCard brand={BRANDS.leaf} width={200} favourite className="absolute top-[52px] right-0 rotate-[6deg]" />
        <span className="absolute -top-2 right-2 grid size-[52px] place-items-center rounded-full bg-forest text-amber">
          <Icon name="star" className="size-[26px]" />
        </span>
      </div>
    ),
  },
  {
    tone: "bg-forest text-mist",
    tilt: "lg:rotate-[2.5deg]",
    art: (
      <div className="grid h-full content-center">
        <div className="rotate-[-3deg] rounded-[22px] bg-white p-3 text-forest shadow-[0_18px_30px_-16px_rgba(0,0,0,0.8)]">
          {["Milk", "Brown bread", "Eggs"].map((item) => (
            <div key={item} className="flex items-center gap-3 border-b border-forest/8 px-1 py-2 last:border-0">
              <CheckCircle checked size={22} />
              <span className="font-medium text-forest/40 line-through decoration-forest/30">{item}</span>
            </div>
          ))}
          <span className="mt-2 flex items-center justify-center gap-2 rounded-full bg-lime py-2.5 font-display text-lg text-white">
            <BigTick className="size-5" /> Clear
          </span>
        </div>
      </div>
    ),
  },
];

export function Extras() {
  return (
    <section className="dir-paper relative overflow-clip text-forest">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-20 lg:px-12 lg:pt-20 lg:pb-28">
        <div className="dir-reveal flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div>
            <Kicker className="bg-forest text-lime-bright">Extras</Kicker>
            <h2 className="mt-5 font-display text-[clamp(3.2rem,9vw,8rem)] leading-[0.86] tracking-[-0.04em]">
              And there&rsquo;s more.
            </h2>
          </div>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {EXTRAS.map((extra, i) => {
            const tile = TILES[i % TILES.length];
            return (
              <li key={extra.title} className="dir-reveal-zoom">
                <div
                  className={`flex h-full flex-col rounded-[2.25rem] p-6 shadow-[0_30px_50px_-30px_rgba(24,54,49,0.7)] ${tile.tone} ${tile.tilt}`}
                >
                  <div aria-hidden className="h-[190px]">
                    {tile.art}
                  </div>
                  <h3 className="mt-6 flex items-center gap-2.5 font-display text-[1.75rem] leading-[1.02] tracking-[-0.02em]">
                    <Icon name={extra.icon} className="size-7 shrink-0" />
                    {extra.title}
                  </h3>
                  <p className="mt-3 leading-relaxed font-medium opacity-85">{extra.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** A small mock under each step's numeral: a sticker, the household, a card. */
const STEP_ART: ReactNode[] = [
  <StickerCard key="rice" src="/stickers/rice.png" alt="" name="Rice" size="1 kg" buy={2} width={132} aspect={1.25} tilt={8} />,
  <span key="people" className="block rotate-[-6deg]">
    <AvatarStack people={[PEOPLE.thandi, PEOPLE.sipho, PEOPLE.lerato]} size={78} />
  </span>,
  <LoyaltyCard key="card" brand={BRANDS.basket} width={210} className="rotate-[7deg]" />,
];

const NUMERAL_INK = ["text-forest", "text-coral", "text-lime"];

export function HowItWorks() {
  return (
    <section className="relative overflow-clip bg-blush text-forest">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-20 lg:px-12 lg:pt-20 lg:pb-28">
        <div className="dir-reveal">
          <Kicker className="bg-forest text-blush">How it works</Kicker>
          <h2 className="mt-5 font-display text-[clamp(3.2rem,9vw,8rem)] leading-[0.86] tracking-[-0.04em]">
            One, two, <span className="text-label [text-shadow:0.05em_0.05em_0_var(--color-forest)]">shop.</span>
          </h2>
        </div>
        <ol className="mt-10 grid gap-12 md:grid-cols-3 md:gap-8 lg:mt-14">
          {STEPS.map((step, i) => (
            <li key={step.title} className="dir-reveal relative">
              <div className="relative flex h-[clamp(11rem,22vw,17rem)] items-end">
                <span
                  aria-hidden
                  className={`font-display text-[clamp(13rem,26vw,21rem)] leading-[0.72] tracking-[-0.06em] [text-shadow:0.035em_0.035em_0_var(--color-label)] ${NUMERAL_INK[i]}`}
                >
                  {i + 1}
                </span>
                <div aria-hidden className="absolute right-0 bottom-2 md:-right-2 lg:right-2">
                  {STEP_ART[i]}
                </div>
              </div>
              <h3 className="mt-6 flex items-center gap-3 font-display text-[2rem] leading-none tracking-[-0.02em]">
                <span className="grid size-11 place-items-center rounded-2xl bg-forest text-blush">
                  <Icon name={step.icon} className="size-6" />
                </span>
                {step.title}
              </h3>
              <p className="mt-3 max-w-xs text-lg leading-relaxed font-medium text-forest/85">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
