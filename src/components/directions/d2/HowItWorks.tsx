import Image from "next/image";
import type { ReactNode } from "react";

import type { IconName } from "@/components/mocks/Icon";
import { AvatarStack, BRANDS, CheckCircle, LiveDot, LoyaltyCard, PEOPLE } from "@/components/mocks/parts";
import { STEPS } from "@/content/site";

import styles from "./d2.module.css";
import { Fireflies, GLASS, IconBadge, Kicker, type Vars } from "./ui";

function ListScene() {
  return (
    <div className="relative">
      <div className="w-44 rounded-2xl bg-label p-3 text-forest shadow-[0_14px_24px_-12px_rgba(0,0,0,0.7)]">
        <p className="text-[13px] font-bold">Weekend shop</p>
        {[
          ["Eggs", false],
          ["Boerewors", false],
          ["Milk", true],
        ].map(([item, done]) => (
          <p key={String(item)} className={`mt-1.5 flex items-center gap-2 text-[12px] font-medium ${done ? "text-forest/40" : ""}`}>
            <CheckCircle checked={Boolean(done)} size={14} /> {item}
          </p>
        ))}
      </div>
      <div className="absolute -top-5 -right-10 rotate-12 rounded-xl bg-white p-1 shadow-[0_10px_18px_-8px_rgba(0,0,0,0.6)]">
        <Image src="/stickers/rice.png" alt="" width={717} height={900} className="h-14 w-auto" />
      </div>
    </div>
  );
}

function ShareScene() {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="rounded-full p-1 shadow-[0_0_40px_6px_rgba(165,224,99,0.35)]">
        <AvatarStack people={[PEOPLE.thandi, PEOPLE.sipho, PEOPLE.lerato]} size={46} />
      </span>
      <span className="flex items-center gap-2 rounded-full bg-label px-3 py-1.5 text-[12px] font-semibold text-forest shadow-[0_10px_18px_-8px_rgba(0,0,0,0.6)]">
        <LiveDot size={7} /> Shared with 3
      </span>
    </div>
  );
}

function ScanScene() {
  return (
    <div className="relative -rotate-3">
      <div className="absolute -inset-6 rounded-full bg-[radial-gradient(closest-side,rgba(165,224,99,0.4),transparent)]" />
      <div className="relative brightness-110">
        <LoyaltyCard brand={BRANDS.sunny} width={168} />
      </div>
      <div className="relative mt-2 flex h-9 items-stretch justify-center gap-[2px] overflow-hidden rounded-lg bg-white px-3 py-1.5">
        {Array.from({ length: 30 }, (_, i) => (
          <span key={i} className="bg-forest" style={{ width: [1, 3, 1, 2, 2, 4][i % 6] }} />
        ))}
        <div className="absolute inset-x-0 top-1">
          <div className={`${styles.scan} h-0.5 bg-lime shadow-[0_0_8px_2px_rgba(126,195,64,0.8)]`} style={{ "--scan": "26px" } as Vars} />
        </div>
      </div>
    </div>
  );
}

const SCENES: Partial<Record<IconName, ReactNode>> = { list: <ListScene />, userGroup: <ShareScene />, cart: <ScanScene /> };

/** Run of show: the three steps as cues on a glowing timeline, a pulse of light running along it. */
export function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <Fireflies count={16} seed={6} />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="dir-reveal mx-auto max-w-2xl text-center">
          <Kicker n="1·2·3" label="Run of show" center />
          <h2 className="mt-6 font-display text-[2.6rem] leading-[1.02] tracking-tight text-label sm:text-5xl lg:text-6xl">
            From list to till, <span className="text-lime-bright [text-shadow:0_0_42px_rgba(165,224,99,0.4)]">in three cues.</span>
          </h2>
        </div>

        <div className="relative mt-16 pl-16 md:pt-24 md:pl-0">
          {/* the timeline: down the left on phones, across the top from md */}
          <div aria-hidden className="absolute top-2 bottom-2 left-[27px] w-[2px] overflow-hidden rounded-full bg-lime-bright/15 md:top-[27px] md:right-[16%] md:bottom-auto md:left-[16%] md:h-[2px] md:w-auto">
            <div className="absolute inset-0 bg-gradient-to-b from-lime-bright/10 via-lime-bright/60 to-lime-bright/10 md:bg-gradient-to-r" />
            <div className={`${styles.travelY} absolute inset-0 bg-[linear-gradient(to_bottom,transparent,#d6ffaa_10%,transparent_20%)] md:hidden`} />
            <div className={`${styles.travelX} absolute inset-0 hidden bg-[linear-gradient(to_right,transparent,#d6ffaa_10%,transparent_20%)] md:block`} />
          </div>

          <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, i) => (
            <li key={step.title} className="dir-reveal relative">
              <span
                aria-hidden
                className="absolute top-0 -left-16 grid size-14 place-items-center rounded-full bg-forest-deep font-display text-2xl text-lime-bright shadow-[0_0_0_2px_rgba(165,224,99,0.6),0_0_36px_4px_rgba(165,224,99,0.45)] md:-top-24 md:left-1/2 md:-translate-x-1/2"
              >
                {i + 1}
              </span>
              <div className={`${GLASS} overflow-hidden rounded-[28px]`}>
                <div aria-hidden className="relative grid h-48 place-items-center overflow-hidden">
                  <div className="absolute inset-x-0 -top-12 h-full bg-[radial-gradient(closest-side,rgba(165,224,99,0.18),transparent)]" />
                  <div className="relative">{SCENES[step.icon] ?? <IconBadge icon={step.icon} className="size-20" />}</div>
                </div>
                <div className="border-t border-white/10 p-6">
                  <p className="flex items-center gap-3">
                    <IconBadge icon={step.icon} />
                    <span className="font-display text-xl text-label">{step.title}</span>
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-mist/65">{step.body}</p>
                </div>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
