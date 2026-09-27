import Image from "next/image";

import { BuyStamp } from "@/components/mocks/parts";
import { BoardScreen } from "@/components/mocks/screens";
import { PhoneFrame } from "@/components/mocks/PhoneFrame";
import { StoreBadges } from "@/components/site/StoreBadges";

import { Nav, Proof } from "../shared";
import { Kicker, Tape } from "./scrap";

/** Leads with Boyfriend Mode, on the paper board, with real stickers slapped on the page. */
export function Hero() {
  return (
    <section id="top" className="relative min-h-svh overflow-hidden">
      <Nav tone="light" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 pt-12 pb-28 lg:grid-cols-[1fr_1.05fr] lg:px-12">
        <div className="relative z-10">
          <div className="dir-rise">
            <Kicker tone="coral" mark="♥">
              Boyfriend Mode
            </Kicker>
          </div>
          <h1 className="dir-rise dir-delay-1 mt-6 font-display text-5xl leading-[0.96] tracking-tight sm:text-6xl lg:text-7xl">
            Send photos,
            <br />
            not guesswork.
          </h1>
          <p className="dir-rise dir-delay-2 mt-6 max-w-lg text-lg leading-relaxed text-forest/75">
            Snap what you need and Grozara turns it into a sticker. Add how many, a little note and where to buy it.
            Whoever does the shop gets exactly what you meant, then ticks it off.
          </p>
          <div className="dir-rise dir-delay-3 mt-9 flex flex-wrap items-center gap-6">
            <StoreBadges />
            <span className="font-hand text-2xl text-forest/70">plus lists &amp; loyalty cards</span>
          </div>
          <div className="dir-rise dir-delay-4 mt-10">
            <Proof items={[["camera", "Photo becomes a sticker"], ["share", "Share from WhatsApp"], ["userGroup", "Shop together, live"]]} />
          </div>
        </div>

        <div className="relative mx-auto h-[640px] w-full max-w-[560px] lg:h-[700px]">
          <div className="dir-rise dir-delay-5 absolute -top-2 left-0 z-20 hidden w-56 sm:block lg:-left-16">
            <p className="font-hand text-[28px] leading-tight text-forest">the blue cap one, not the red!</p>
            <svg viewBox="0 0 160 90" className="mt-1 ml-16 w-36 text-coral" aria-hidden>
              <path d="M6 8 C 60 10, 110 30, 132 74" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              <path d="M116 66 L 133 77 L 138 57" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="dir-float absolute top-6 left-1/2 z-10 -translate-x-1/2 rotate-[3deg]">
            <PhoneFrame scale={0.7}>
              <BoardScreen />
            </PhoneFrame>
          </div>

          <div className="dir-pop dir-delay-4 absolute bottom-10 -left-4 z-20 w-40 sm:w-48 lg:-left-20" style={{ ["--tilt" as string]: "-10deg" }}>
            <Tape className="-top-3 left-10 rotate-[-6deg]" />
            <Image src="/stickers/rice.png" alt="Rice sticker" width={420} height={525} loading="eager" className="drop-shadow-[0_14px_14px_rgba(0,0,0,0.25)]" />
            <BuyStamp count={2} size={70} className="absolute -right-3 bottom-2" />
          </div>
          <div
            className="dir-pop dir-delay-6 absolute top-24 -right-6 z-20 w-40 rounded-sm bg-[#FFF6B8] p-4 shadow-[0_12px_20px_-10px_rgba(0,0,0,0.35)] lg:-right-14"
            style={{ ["--tilt" as string]: "8deg" }}
          >
            <Tape className="-top-3 left-8 rotate-[4deg]" color="rgba(255,143,163,0.6)" />
            <p className="font-hand text-2xl leading-tight text-forest">Get 2 please ♥ and the braai wood!</p>
          </div>
        </div>
      </div>
    </section>
  );
}
