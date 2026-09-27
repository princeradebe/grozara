import type { CSSProperties } from "react";

import { PhoneFrame } from "@/components/mocks/PhoneFrame";
import { StickerCard } from "@/components/mocks/parts";
import { BoardScreen } from "@/components/mocks/screens";
import { FEATURES } from "@/content/site";

import { MiniPhotoToSticker, MiniStampNote, MiniTransform } from "./minis";
import { Kicker, PointTile, tile, WRAP } from "./ui";

/** Mirror of Lists: point tiles on the left, the paper board tile on the right. */
export function BoyfriendMode() {
  const f = FEATURES.boyfriendMode;
  const [photo, stamp, board] = f.points;
  return (
    <section id={f.id} aria-labelledby="d4-bf" className="scroll-mt-4 pt-3 lg:pt-4">
      <div className={`${WRAP} grid gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[minmax(330px,auto)_minmax(360px,auto)] lg:gap-4`}>
        <div className={tile("paper", "dir-reveal flex flex-col p-7 sm:col-span-2 sm:p-10 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1")}>
          <Kicker n="02" label={`♥ ${f.eyebrow}`} className="[&>span]:bg-coral [&>span]:text-white" />
          <h2 id="d4-bf" className="mt-6 max-w-md font-display text-[42px] leading-[1.02] tracking-tight sm:text-5xl lg:text-[54px]">
            {f.title}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-forest/75 sm:text-lg">{f.body}</p>
          <div aria-hidden className="relative mx-auto mt-10 -mb-52 sm:-mb-44 lg:-mb-40">
            <div className="dir-float">
              <PhoneFrame scale={0.64}>
                <BoardScreen />
              </PhoneFrame>
            </div>
            <div className="absolute top-24 -right-10 sm:-right-28">
              <div className="dir-pop dir-delay-3" style={{ "--tilt": "9deg" } as CSSProperties}>
                <StickerCard src="/stickers/tuna.png" alt="" name="Tuna" note="in brine, not oil!" buy={3} width={150} aspect={0.9} />
              </div>
            </div>
            <span className="absolute top-10 -left-28 hidden -rotate-6 font-hand text-3xl text-coral sm:block">this one ♥</span>
          </div>
        </div>

        <PointTile
          tone="forest"
          chip="glass"
          icon={photo[0]}
          text={photo[1]}
          layout="row"
          visual={<MiniPhotoToSticker />}
          className="sm:col-span-2 lg:col-span-6 lg:col-start-1 lg:row-start-1"
        />
        <PointTile tone="coral" chip="white" icon={stamp[0]} text={stamp[1]} visual={<MiniStampNote />} className="lg:col-span-3 lg:row-start-2" />
        <PointTile tone="white" icon={board[0]} text={board[1]} visual={<MiniTransform />} className="lg:col-span-3 lg:row-start-2" />
      </div>
    </section>
  );
}
