import Image from "next/image";

import { BuyStamp } from "@/components/mocks/parts";
import { StoreBadges } from "@/components/site/StoreBadges";
import { SIGN_OFF, TAGLINE } from "@/content/site";

import { Heart, Kicker, Tape, tornEdge, withSquiggle } from "./scrap";

/** The last page: a big torn sheet with the sign-off, the store badges and stickers slapped on the corners. */
export function GetApp() {
  return (
    <section id="get" aria-labelledby="d3-get" className="relative scroll-mt-6 overflow-x-clip py-24 lg:py-32">
      <div className="relative mx-auto max-w-5xl px-6 lg:px-12">
        <div className="dir-reveal relative" style={{ rotate: "-1deg" }}>
          <div className="drop-shadow-[0_30px_36px_rgba(24,54,49,0.3)]">
            <div
              className="bg-label px-6 pt-20 pb-24 text-center sm:px-14 lg:pt-24 lg:pb-28"
              style={{ clipPath: tornEdge({ top: true, bottom: true, depth: 12, teeth: 44, seed: 21 }) }}
            >
              <Kicker tone="lime">Free, with optional extras</Kicker>
              <h2 id="d3-get" className="mt-7 font-display text-5xl leading-[0.96] tracking-tight sm:text-7xl lg:text-8xl">
                {withSquiggle(SIGN_OFF, "sorted.", "text-coral")}
              </h2>
              <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-forest/75">{TAGLINE}</p>
              <StoreBadges height={56} center className="mt-10" />
            </div>
          </div>
          <Tape className="-top-3 left-[18%] rotate-[-4deg]" pattern="dots" color="rgba(255,143,163,0.75)" />
          <Tape className="-top-3 right-[20%] rotate-[5deg]" />
        </div>

        <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-3 z-10 w-24 sm:-bottom-10 sm:-left-2 sm:w-40 lg:-left-16 lg:w-48" style={{ rotate: "-12deg" }}>
          <Image src="/stickers/rice.png" alt="" width={420} height={527} className="drop-shadow-[0_14px_14px_rgba(0,0,0,0.25)]" />
          <BuyStamp count={2} size={58} className="absolute -right-2 bottom-3" />
        </div>
        <div aria-hidden className="pointer-events-none absolute -top-8 -right-2 z-10 w-32 sm:w-44 lg:-right-20 lg:w-56" style={{ rotate: "9deg" }}>
          <Tape className="-top-1 left-1/2 z-10 -translate-x-1/2 rotate-[8deg]" size="h-6 w-20" color="rgba(255,185,2,0.6)" />
          <Image src="/stickers/tuna.png" alt="" width={450} height={403} className="drop-shadow-[0_14px_14px_rgba(0,0,0,0.25)]" />
        </div>
        <Heart filled className="absolute right-[12%] -bottom-6 z-10 hidden w-12 rotate-12 text-coral sm:block" />
      </div>
    </section>
  );
}
