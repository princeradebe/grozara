import { Composition } from "remotion";

import { Check } from "./Check";
import { Promo } from "./Promo";
import { FPS, TOTAL } from "./timeline";

import "./styles.css";

export function Root() {
  return (
    <>
      <Composition id="Promo" component={Promo} width={1080} height={1920} fps={FPS} durationInFrames={TOTAL} />
      <Composition id="Check" component={Check} width={1080} height={1920} fps={FPS} durationInFrames={30} />
    </>
  );
}
