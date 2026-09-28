import type { ComponentType } from "react";
import { AbsoluteFill, Sequence } from "remotion";

import { FONT_VARS } from "./fonts";
import { Hello, List, Outro, Scan, Share, Snap } from "./scenes";
import { Sound } from "./Sound";
import { PUSH, SCENES, type Scene, type SceneId } from "./timeline";

const VIEWS: Record<SceneId, ComponentType<{ s: Scene }>> = { hello: Hello, list: List, snap: Snap, share: Share, scan: Scan, outro: Outro };

/** The 30-second spot: six bands in the Lime pop style, voiced over, with captions for sound-off viewing. */
export function Promo() {
  return (
    <AbsoluteFill className="bg-forest-deep" style={FONT_VARS}>
      {SCENES.map((s, i) => {
        const View = VIEWS[s.id];
        // Each band stays up while the next one pushes over it.
        const hold = i < SCENES.length - 1 ? PUSH : 0;
        return (
          <Sequence key={s.id} from={s.from} durationInFrames={s.duration + hold} name={s.id}>
            <View s={s} />
          </Sequence>
        );
      })}
      <Sound />
    </AbsoluteFill>
  );
}
