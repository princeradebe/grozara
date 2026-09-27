import { BuyStamp, StickerCard } from "@/components/mocks/parts";
import { PhoneFrame } from "@/components/mocks/PhoneFrame";
import { BoardScreen } from "@/components/mocks/screens";
import { FEATURES } from "@/content/site";

import styles from "./d2.module.css";
import { Fireflies, Spotlight, StageCopy, Zoom } from "./ui";

/** Stage 02: the board on a paper-lit stage, stickers peeling off it and a BUY stamp spinning in. */
export function BoyfriendStage() {
  const f = FEATURES.boyfriendMode;
  return (
    <section id={f.id} className="relative overflow-hidden py-24 lg:py-36">
      <Fireflies count={16} seed={2} />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-10 lg:px-12">
        <div className="lg:order-2 lg:pl-10">
          <StageCopy n="02" feature={f} />
        </div>

        <div aria-hidden className="dir-reveal-zoom relative mx-auto h-[620px] w-full max-w-[560px] sm:h-[720px] lg:order-1">
          {/* the paper-lit stage: the board's dotted paper, glowing out of the dark */}
          <div className="dir-paper absolute top-[50%] left-1/2 aspect-square w-[128%] -translate-x-1/2 -translate-y-1/2 rounded-full [mask-image:radial-gradient(closest-side,rgba(0,0,0,0.42),rgba(0,0,0,0.16)_55%,transparent)]" />
          <Spotlight tone="paper" className="-inset-x-8 -top-24 bottom-0" />

          <div className="absolute top-8 left-1/2 z-10 -translate-x-1/2">
            <div className="dir-float" style={{ animationDelay: "-2.5s" }}>
              <Zoom z={0.84}>
                <PhoneFrame scale={0.72}>
                  <BoardScreen />
                </PhoneFrame>
              </Zoom>
            </div>
          </div>

          <div className="absolute top-[9%] -left-3 z-20 sm:left-0">
            <div className="dir-float-side">
              <Zoom z={0.72}>
                <StickerCard
                  src="/stickers/rice.png"
                  alt=""
                  name="Rice"
                  size="1 kg"
                  buy={2}
                  width={150}
                  aspect={1.25}
                  tilt={-12}
                />
              </Zoom>
            </div>
          </div>

          <div className="absolute right-0 bottom-[9%] z-20 sm:-right-2">
            <div className="dir-float" style={{ animationDelay: "-4s" }}>
              <Zoom z={0.72}>
                <StickerCard
                  src="/stickers/tuna.png"
                  alt=""
                  name="Tuna"
                  size="170 g"
                  note="in brine, not oil!"
                  buy={3}
                  width={172}
                  aspect={0.9}
                  tilt={9}
                />
              </Zoom>
            </div>
          </div>

          <div className="absolute top-[3%] right-[2%] z-30 sm:right-[6%]">
            <div className={`dir-reveal-zoom ${styles.spinIn}`}>
              <div className={styles.wobble}>
                <Zoom z={0.72}>
                  <BuyStamp count={4} size={104} />
                </Zoom>
              </div>
            </div>
          </div>

          <div className="absolute bottom-[4%] left-0 z-20 hidden -rotate-6 sm:block">
            <p className="font-hand text-3xl leading-none text-lime-bright [text-shadow:0_0_24px_rgba(165,224,99,0.5)]">exactly this one!</p>
            <svg viewBox="0 0 120 50" className="mt-1 ml-24 w-28 text-lime-bright" aria-hidden>
              <path d="M4 8 C 40 44, 80 44, 112 18" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
              <path d="M100 14 L 113 17 L 108 30" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
