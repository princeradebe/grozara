import type { ReactNode } from "react";

import { Icon } from "@/components/mocks/Icon";
import { PhoneFrame } from "@/components/mocks/PhoneFrame";
import { BRANDS, LiveToast, LoyaltyCard, PEOPLE } from "@/components/mocks/parts";
import { HomeScreen } from "@/components/mocks/screens";
import { StoreBadges } from "@/components/site/StoreBadges";
import { FEATURES, TICKER } from "@/content/site";

import { Nav } from "../shared";
import { MiniCardFan, MiniChecklist, MiniLiveCrew, MiniStickers } from "./minis";
import { tile, type Tone, WRAP } from "./ui";

// The overview only names each feature and points down to it: the sections below do the talking.
const OVERVIEW: { n: string; feature: { id: string; eyebrow: string }; tone: Tone; visual: ReactNode; place: string; delay: string }[] = [
  { n: "01", feature: FEATURES.lists, tone: "white", visual: <MiniChecklist />, place: "lg:col-start-1 lg:row-start-1", delay: "dir-delay-3" },
  { n: "02", feature: FEATURES.boyfriendMode, tone: "paper", visual: <MiniStickers />, place: "lg:col-start-1 lg:row-start-2", delay: "dir-delay-4" },
  { n: "03", feature: FEATURES.shared, tone: "lime", visual: <MiniLiveCrew />, place: "lg:col-start-4 lg:row-start-1", delay: "dir-delay-5" },
  { n: "04", feature: FEATURES.cards, tone: "amber", visual: <MiniCardFan />, place: "lg:col-start-4 lg:row-start-2", delay: "dir-delay-6" },
];

export function Hero() {
  return (
    <section aria-labelledby="d4-title" className="relative">
      <Nav tone="light" />

      <div className="mx-auto max-w-3xl px-6 pt-14 text-center lg:pt-16">
        <h1 id="d4-title" className="dir-rise font-display text-5xl leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
          One app for the{" "}
          <span className="relative inline-block text-lime">
            whole
            <svg viewBox="0 0 200 20" aria-hidden className="absolute -bottom-2 left-0 h-3 w-full text-amber" preserveAspectRatio="none">
              <path d="M3 14 C 50 4, 120 4, 197 11" fill="none" stroke="currentColor" strokeWidth={6} strokeLinecap="round" />
            </svg>
          </span>{" "}
          shop.
        </h1>
        <p className="dir-rise dir-delay-1 mx-auto mt-7 max-w-xl text-lg leading-relaxed text-forest/70">
          Lists, photo lists, shared lists and loyalty cards for South African shoppers. Shop together, live, from
          anywhere in the house.
        </p>
        <div className="dir-rise dir-delay-2 mt-8 flex justify-center">
          <StoreBadges center />
        </div>
      </div>

      <div className={`${WRAP} mt-14 grid grid-cols-2 gap-3 lg:mt-16 lg:grid-cols-4 lg:grid-rows-[250px_250px] lg:gap-4`}>
        <div className={tile("forest", "dir-rise dir-delay-2 col-span-2 min-h-[440px] sm:min-h-[520px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:min-h-0")}>
          <div aria-hidden className="absolute inset-0">
            <div className="dir-glow absolute top-[58%] left-1/2 size-[560px] -translate-1/2 rounded-full bg-[radial-gradient(circle,rgb(126_195_64/0.55),transparent_62%)]" />
            <div className="absolute inset-x-0 top-9 flex justify-center">
              <div className="dir-float">
                <PhoneFrame scale={0.62}>
                  <HomeScreen />
                </PhoneFrame>
              </div>
            </div>
            <div className="absolute top-20 right-4 hidden sm:block lg:right-6">
              <div className="dir-float-side">
                <LoyaltyCard brand={BRANDS.sunny} width={168} className="rotate-[9deg]" />
              </div>
            </div>
            <LiveToast person={PEOPLE.sipho} action="added" item="Charcoal" className="absolute bottom-7 left-4 rotate-[-3deg] sm:left-6" />
          </div>
        </div>

        {OVERVIEW.map((o) => (
          <a
            key={o.n}
            href={`#${o.feature.id}`}
            className={tile(o.tone, `group dir-rise ${o.delay} flex min-h-[200px] flex-col p-4 sm:min-h-[230px] sm:p-6 lg:min-h-0 ${o.place}`)}
          >
            <span className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold opacity-55">{o.n}</span>
              <span className="grid size-8 place-items-center rounded-full bg-forest/8 transition-colors group-hover:bg-forest group-hover:text-lime-bright">
                <Icon name="arrowRight" className="size-4 rotate-90" />
              </span>
            </span>
            <span aria-hidden className="flex flex-1 items-center justify-center py-2">
              <span className="max-sm:scale-[0.78]">{o.visual}</span>
            </span>
            <span className="font-display text-xl leading-tight sm:text-2xl">{o.feature.eyebrow}</span>
          </a>
        ))}
      </div>

      <div aria-hidden className={`${WRAP} mt-3 lg:mt-4`}>
        <div className="overflow-hidden rounded-full bg-forest py-4 sm:py-5">
          <div className="dir-marquee flex w-max">
            {[0, 1].map((copy) => (
              <span key={copy} className="flex shrink-0 items-center">
                {TICKER.map((word) => (
                  <span key={word} className="flex items-center gap-6 pr-6 font-display text-2xl whitespace-nowrap text-mist sm:text-3xl">
                    <Icon name="sparkles" className="size-5 text-lime-bright" />
                    {word}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
