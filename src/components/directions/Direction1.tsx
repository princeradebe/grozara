import { TICKER } from "@/content/site";

import { ExtrasSection } from "./d1/Extras";
import { FaqSection } from "./d1/Faq";
import { BoyfriendModeSection, CardsSection, ListsSection, SharedSection } from "./d1/Features";
import { Footer } from "./d1/Footer";
import { GetAppSection } from "./d1/GetApp";
import { Hero } from "./d1/Hero";
import { StepsSection } from "./d1/Steps";

/** 1 · Clean split: light and calm. Copy on one side, a phone with a few things floating off it on the other. */
export function Direction1() {
  return (
    <div className="bg-mist text-forest">
      <Hero />
      <Ticker />
      <ListsSection />
      <BoyfriendModeSection />
      <SharedSection />
      <CardsSection />
      <ExtrasSection />
      <StepsSection />
      <FaqSection />
      <GetAppSection />
      <Footer />
    </div>
  );
}

function Ticker() {
  const words = [...TICKER, ...TICKER];
  return (
    <div aria-hidden className="overflow-hidden border-y border-forest/8 bg-white/70 py-5">
      <div className="dir-marquee flex w-max">
        {words.map((word, i) => (
          <span key={i} className="flex items-center gap-10 pr-10 font-display text-2xl whitespace-nowrap text-forest/35 sm:text-3xl">
            {word}
            <span className="size-2.5 rounded-full bg-lime" />
          </span>
        ))}
      </div>
    </div>
  );
}
