import { Composition } from "remotion";

import { Check } from "./Check";
import { Promo } from "./Promo";
import { Share } from "./Share";
import { FPS, TOTAL } from "./timeline";

import "./styles.css";

export function Root() {
  return (
    <>
      <Composition id="Promo" component={Promo} width={1080} height={1920} fps={FPS} durationInFrames={TOTAL} />
      <Composition id="Share" component={Share} width={1200} height={630} fps={FPS} durationInFrames={1} />
      <Composition id="Check" component={Check} width={1080} height={1920} fps={FPS} durationInFrames={30} />
    </>
  );
}
