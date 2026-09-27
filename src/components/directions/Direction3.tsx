import { BoyfriendSpread } from "./d3/BoyfriendSpread";
import { Cards } from "./d3/Cards";
import { Extras } from "./d3/Extras";
import { Faq } from "./d3/Faq";
import { Footer } from "./d3/Footer";
import { GetApp } from "./d3/GetApp";
import { Hero } from "./d3/Hero";
import { ListsPage } from "./d3/ListsPage";
import { SharedFridge } from "./d3/SharedFridge";
import { Steps } from "./d3/Steps";

/** 3 · Scrapbook: leads with Boyfriend Mode, on the paper board, with real stickers on the page. */
export function Direction3() {
  return (
    <div className="dir-paper overflow-x-clip text-forest">
      <Hero />
      <ListsPage />
      <BoyfriendSpread />
      <SharedFridge />
      <Cards />
      <Extras />
      <Steps />
      <Faq />
      <GetApp />
      <Footer />
    </div>
  );
}
