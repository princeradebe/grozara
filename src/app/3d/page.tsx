import type { Metadata } from "next";
import Image from "next/image";
import { ExperienceLoader } from "@/components/experience/ExperienceLoader";

export const metadata: Metadata = {
  title: "Night garden with Zara · Grozara",
  robots: { index: false },
};

export default function NightGarden() {
  return (
    <>
      <ExperienceLoader />
      {/* The copy floats over the canvas but lets pointers through, so Zara can be grabbed anywhere. */}
      <main className="pointer-events-none relative z-10">
        <section
          aria-labelledby="hero-title"
          className="flex min-h-svh flex-col px-6 pt-6 pb-10 sm:px-10 lg:px-16 lg:pt-10"
        >
          <header>
            <Image
              src="/brand/grozara-logo-white.svg"
              alt="Grozara"
              width={286}
              height={64}
              priority
              className="h-7 w-auto sm:h-8"
            />
          </header>

          <div className="mt-8 max-w-xl sm:mt-12 [@media(min-aspect-ratio:17/20)]:my-auto [@media(min-aspect-ratio:17/20)]:max-w-[min(36rem,52vw)]">
            <p className="font-hand text-2xl font-bold text-lime-bright sm:text-3xl">
              Hi, I&apos;m Zara! This is Grozara.
            </p>
            <h1
              id="hero-title"
              className="mt-1 font-display text-[2.55rem] leading-[1.02] font-black tracking-tight text-label sm:text-6xl lg:text-7xl"
            >
              Your lists and loyalty cards, <span className="text-lime-bright">together.</span>
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-mist/80 sm:text-lg">
              The iPhone app for South African shoppers: simple checklists, Boyfriend Mode photo lists
              and every loyalty card, in one lekker place.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-lime/35 bg-forest/70 px-4 py-2 text-sm font-semibold text-lime-bright backdrop-blur-sm">
              <span aria-hidden className="size-2 rounded-full bg-amber" />
              Coming soon to the App Store
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
