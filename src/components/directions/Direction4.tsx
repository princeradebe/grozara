import { BoyfriendMode } from "./d4/BoyfriendMode";
import { Cards } from "./d4/Cards";
import { Extras } from "./d4/Extras";
import { Faq } from "./d4/Faq";
import { Footer } from "./d4/Footer";
import { GetApp } from "./d4/GetApp";
import { Hero } from "./d4/Hero";
import { Lists } from "./d4/Lists";
import { Shared } from "./d4/Shared";
import { Steps } from "./d4/Steps";

/** 4 · Bento: one headline over a grid of tiles, and every section after it is a bento of its own. */
export function Direction4() {
  return (
    <div className="overflow-x-clip bg-[#FBFCF9] text-forest">
      <Hero />
      <Lists />
      <BoyfriendMode />
      <Shared />
      <Cards />
      <Extras />
      <Steps />
      <Faq />
      <GetApp />
      <Footer />
    </div>
  );
}
