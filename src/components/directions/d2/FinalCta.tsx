import Image from "next/image";

import { BRANDS, LiveToast, LoyaltyCard, PEOPLE, StickerCard } from "@/components/mocks/parts";
import { StoreBadges } from "@/components/site/StoreBadges";
import { SIGN_OFF } from "@/content/site";

import styles from "./d2.module.css";
import { Fireflies } from "./ui";

/** The finale: one huge spotlight on the app, the cast floating at the edges of the light. */
export function FinalCta() {
  return (
    <section id="get" className="relative overflow-hidden pt-28 pb-32 text-center lg:pt-36 lg:pb-44">
      {/* the big light */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-full w-[min(1500px,260%)] -translate-x-1/2 blur-3xl">
          <div
            className={`${styles.sway} size-full bg-[linear-gradient(to_bottom,rgba(225,255,190,0.24),rgba(165,224,99,0.08)_60%,transparent)] [clip-path:polygon(40%_0,60%_0,100%_100%,0_100%)]`}
          />
        </div>
        <div className="dir-glow absolute top-[38%] left-1/2 size-[64rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(126,195,64,0.3),transparent)]" />
        <div className="absolute bottom-[6%] left-1/2 h-40 w-[min(1100px,200%)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(165,224,99,0.28),transparent)]" />
      </div>
      <Fireflies count={30} seed={8} />

      {/* the cast, at the edge of the light */}
      <div aria-hidden className="pointer-events-none absolute inset-0 mx-auto hidden max-w-7xl md:block">
        <div className="absolute top-[16%] left-[3%] lg:left-[6%]">
          <div className="dir-float-side">
            <div className="-rotate-12">
              <LoyaltyCard brand={BRANDS.sunny} width={220} />
            </div>
          </div>
        </div>
        <div className="absolute bottom-[14%] left-[1%] lg:left-[9%]">
          <div className="dir-float" style={{ animationDelay: "-2s" }}>
            <LiveToast person={PEOPLE.lerato} action="added" item="Rooibos tea" />
          </div>
        </div>
        <div className="absolute top-[12%] right-[3%] lg:right-[8%]">
          <div className="dir-float" style={{ animationDelay: "-4s" }}>
            <StickerCard src="/stickers/rice.png" alt="" name="Rice" size="1 kg" buy={2} width={140} aspect={1.25} tilt={10} />
          </div>
        </div>
        <div className="absolute right-[2%] bottom-[16%] lg:right-[7%]">
          <div className="dir-float-side" style={{ animationDelay: "-3s" }}>
            <div className="rotate-[14deg]">
              <LoyaltyCard brand={BRANDS.basket} width={190} />
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-4xl px-6">
        <div aria-hidden className="relative mx-auto w-fit">
          <div className="absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,rgba(165,224,99,0.55),transparent)]" />
          <div className="dir-float relative">
            <Image
              src="/brand/grozara-icon.svg"
              alt=""
              width={64}
              height={64}
              className="size-24 rounded-[26px] shadow-[0_24px_50px_-18px_rgba(0,0,0,0.9)] ring-1 ring-white/20 sm:size-28 sm:rounded-[30px]"
            />
          </div>
          <div className="mx-auto mt-5 h-3 w-24 rounded-[50%] bg-black/40 blur-sm" />
        </div>

        <h2 className="dir-reveal mt-10 font-display text-5xl leading-[0.98] tracking-tight text-balance text-label sm:text-7xl lg:text-8xl">
          Take Grozara <span className="text-lime-bright [text-shadow:0_0_60px_rgba(165,224,99,0.45)]">to the shops.</span>
        </h2>
        <p className="dir-reveal mt-4 font-hand text-4xl text-lime-bright sm:text-5xl">{SIGN_OFF}</p>
        <p className="dir-reveal mx-auto mt-6 max-w-xl text-lg leading-relaxed text-mist/75">
          Grozara is in beta right now and coming soon to the App Store and Google Play. Free to use, with optional extras.
        </p>
        <div className="dir-reveal mt-10 flex justify-center">
          <StoreBadges apple="white" height={60} className="text-mist" />
        </div>
      </div>
    </section>
  );
}
