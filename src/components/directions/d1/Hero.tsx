import { CheckCircle, BRANDS, LoyaltyCard, StickerCard } from "@/components/mocks/parts";
import { HomeScreen } from "@/components/mocks/screens";
import { StoreBadges } from "@/components/site/StoreBadges";
import { HIGHLIGHTS } from "@/content/site";

import { Nav, Proof } from "../shared";
import { Phone } from "./ui";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="dir-glow pointer-events-none absolute -top-40 right-[-10%] size-[46rem] rounded-full bg-[radial-gradient(circle,rgba(126,195,64,0.28),transparent_65%)]" />
      <div className="pointer-events-none absolute bottom-[-30%] left-[-15%] size-[40rem] rounded-full bg-[radial-gradient(circle,rgba(255,185,2,0.14),transparent_65%)]" />
      <Nav tone="light" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 pt-12 pb-24 lg:grid-cols-[1.05fr_1fr] lg:px-12 lg:pt-8 lg:pb-28">
        <div>
          <p className="dir-rise inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-forest/80 shadow-sm ring-1 ring-forest/8">
            <span className="size-2 rounded-full bg-amber" /> Made for South African shoppers
          </p>
          <h1 className="dir-rise dir-delay-1 mt-6 font-display text-5xl leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
            Your lists and loyalty cards,{" "}
            <span className="relative inline-block">
              together.
              <svg viewBox="0 0 300 20" className="absolute -bottom-2 left-0 w-full text-lime" aria-hidden>
                <path d="M4 14 C 80 4, 180 4, 296 12" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="dir-rise dir-delay-2 mt-7 max-w-lg text-lg leading-relaxed text-forest/70">
            Simple checklists for every shop, Boyfriend Mode photo lists so nobody guesses, and shared lists the whole
            household watches tick off live. Plus every loyalty card, ready at the till.
          </p>
          <StoreBadges height={52} className="dir-rise dir-delay-3 mt-9" />
          <div className="dir-rise dir-delay-4 mt-12">
            <Proof items={HIGHLIGHTS} />
          </div>
        </div>

        <div aria-hidden className="relative mx-auto w-fit pb-4 lg:pb-0">
          <div className="dir-float">
            <Phone base={0.66} sm={0.74}>
              <HomeScreen />
            </Phone>
          </div>
          <div className="dir-pop dir-delay-4 absolute top-[46%] -left-8 sm:-left-24 lg:-left-32" style={{ ["--tilt" as string]: "-8deg" }}>
            <div className="dir-float-side origin-top-left scale-[0.78] sm:scale-100">
              <StickerCard src="/stickers/tuna.png" alt="" name="Tuna" size="170 g" note="in brine, not oil!" buy={3} width={176} aspect={0.9} />
            </div>
          </div>
          <div className="dir-pop dir-delay-5 absolute top-[5%] -right-10 sm:-right-24 lg:-right-28" style={{ ["--tilt" as string]: "10deg" }}>
            <div className="origin-top-right scale-[0.7] sm:scale-100">
              <LoyaltyCard brand={BRANDS.corner} width={220} />
            </div>
          </div>
          <div className="dir-rise dir-delay-6 absolute -right-4 bottom-[14%] flex w-max items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_18px_34px_-18px_rgba(24,54,49,0.6)] sm:-right-16 lg:-right-20">
            <CheckCircle checked size={26} />
            <span className="text-sm font-semibold">
              Milk picked up
              <span className="block text-xs font-medium text-forest/50">Weekend shop · 3 left</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
