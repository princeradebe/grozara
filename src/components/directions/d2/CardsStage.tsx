import { Icon } from "@/components/mocks/Icon";
import { BRANDS, LoyaltyCard } from "@/components/mocks/parts";
import { PhoneFrame } from "@/components/mocks/PhoneFrame";
import { CardDetailScreen } from "@/components/mocks/screens";
import { FEATURES } from "@/content/site";

import styles from "./d2.module.css";
import { Fireflies, Spotlight, StageCopy, type Vars, Zoom } from "./ui";

const PHONE_SCALE = 0.72;
/** Where CardDetailScreen draws its barcode, in PhoneFrame points (bezel included). */
const BARCODE = { x: 55, y: 411, w: 302, h: 120 };

/** The wallet fanned out like a hand of cards, pivoting on a point below the stack. */
const FAN = [
  { brand: BRANDS.basket, turn: "-rotate-[26deg]" },
  { brand: BRANDS.corner, turn: "-rotate-[13deg]" },
  { brand: BRANDS.sunny, turn: "rotate-0" },
];

/** Stage 04: a fanned wallet floating in the dark, one card lit up for the till. */
export function CardsStage() {
  const f = FEATURES.cards;
  const s = PHONE_SCALE;
  return (
    <section id={f.id} className="relative overflow-hidden py-24 lg:py-36">
      <Fireflies count={18} seed={4} />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:px-12">
        <StageCopy n="04" feature={f} />

        <div aria-hidden className="dir-reveal-zoom relative mx-auto h-[620px] w-full max-w-[620px] sm:h-[720px]">
          <Spotlight tone="white" className="-top-24 right-[-10%] bottom-0 left-[20%]" />

          {/* the wallet, fanned out in the dark */}
          <div className="absolute top-[4%] left-0 z-0 sm:top-[8%]">
            <div className="dir-float-side">
              <Zoom z={0.68}>
                <div className="relative h-[190px] w-[270px]">
                  {FAN.map(({ brand, turn }) => (
                    <div key={brand.name} className={`absolute top-0 left-0 origin-[30%_150%] ${turn}`}>
                      <LoyaltyCard brand={brand} width={250} />
                    </div>
                  ))}
                </div>
              </Zoom>
            </div>
          </div>

          {/* the phone at the till, screen turned up */}
          <div className="absolute top-6 right-0 z-10 sm:right-[4%]">
            <div className="dir-float" style={{ animationDelay: "-1.5s" }}>
              <Zoom z={0.84}>
                <div className="relative">
                  <div className={`${styles.glow} absolute -inset-[14%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,236,0.3),transparent)]`} />
                  <PhoneFrame scale={s}>
                    <CardDetailScreen />
                  </PhoneFrame>
                  <div
                    className="absolute overflow-hidden"
                    style={{ left: BARCODE.x * s, top: BARCODE.y * s, width: BARCODE.w * s, height: BARCODE.h * s }}
                  >
                    <div
                      className={`${styles.scan} h-[3px] rounded-full bg-lime shadow-[0_0_12px_3px_rgba(126,195,64,0.8)]`}
                      style={{ "--scan": `${BARCODE.h * s - 3}px` } as Vars}
                    />
                  </div>
                </div>
              </Zoom>
            </div>
          </div>

          {/* the card that's up next: brightened, glowing */}
          <div className="absolute bottom-[12%] left-0 z-20 sm:bottom-[14%] sm:left-[2%]">
            <div className="dir-float" style={{ animationDelay: "-3.5s" }}>
              <Zoom z={0.72}>
                <div className="relative rotate-[7deg]">
                  <div className="absolute -inset-24 overflow-hidden rounded-full [mask-image:radial-gradient(closest-side,black_30%,transparent)]">
                    <div className={`${styles.spin} size-full bg-[repeating-conic-gradient(rgba(255,255,225,0.14)_0deg_5deg,transparent_5deg_16deg)]`} />
                  </div>
                  <div className={`${styles.glow} absolute -inset-8 rounded-[48px] bg-[radial-gradient(closest-side,rgba(165,224,99,0.6),transparent)]`} />
                  <div className="relative brightness-125 saturate-125">
                    <LoyaltyCard brand={BRANDS.leaf} width={272} favourite />
                  </div>
                </div>
              </Zoom>
            </div>
          </div>

          <p className="absolute bottom-[2%] left-[8%] z-20 flex -rotate-3 items-center gap-2 font-hand text-2xl text-lime-bright [text-shadow:0_0_24px_rgba(165,224,99,0.5)] sm:text-3xl">
            <Icon name="sun" className="size-6" /> bright for the scanner
          </p>
        </div>
      </div>
    </section>
  );
}
