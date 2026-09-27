import { BoyfriendStage } from "./d2/BoyfriendStage";
import { CardsStage } from "./d2/CardsStage";
import { Extras } from "./d2/Extras";
import { Faq } from "./d2/Faq";
import { FinalCta } from "./d2/FinalCta";
import { Footer } from "./d2/Footer";
import { Hero } from "./d2/Hero";
import { HowItWorks } from "./d2/HowItWorks";
import { ListsStage } from "./d2/ListsStage";
import { Marquee } from "./d2/Marquee";
import { SharedStage } from "./d2/SharedStage";

/**
 * 2 · Night stage: the forest at night. The hero lights three phones on a stage, then every feature
 * gets its own act under its own spotlight, fireflies drifting through the whole show.
 */
export function Direction2() {
  return (
    <div className="relative bg-forest-deep text-mist">
      <Hero />
      <Marquee />
      <ListsStage />
      <BoyfriendStage />
      <SharedStage />
      <CardsStage />
      <Extras />
      <HowItWorks />
      <Faq />
      <FinalCta />
      <Footer />
    </div>
  );
}
