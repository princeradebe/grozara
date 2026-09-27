import { BRANDS, LoyaltyCard } from "@/components/mocks/parts";
import { PhoneFrame } from "@/components/mocks/PhoneFrame";
import { CardDetailScreen } from "@/components/mocks/screens";
import { FEATURES } from "@/content/site";

import { Arrow, Burst, KRAFT, Kicker, PhotoCorners, SectionHeading, Tape, withSquiggle } from "./scrap";

const F = FEATURES.cards;

/** The pocket's top edge, with the half-moon thumb cut you pull cards out by. */
const POCKET_EDGE =
  "polygon(0 0, 36% 0, 38% 5%, 41% 9%, 45% 11%, 50% 12%, 55% 11%, 59% 9%, 62% 5%, 64% 0, 100% 0, 100% 100%, 0 100%)";

const IN_POCKET: [keyof typeof BRANDS, string, number][] = [
  ["corner", "left-[4%] -top-[92px]", -9],
  ["basket", "left-[26%] -top-[112px]", 2],
  ["sunny", "left-[46%] -top-[88px]", 11],
];

/** Loyalty cards as an album page: the wallet tucked into a kraft pocket, one card mounted with photo corners. */
export function Cards() {
  return (
    <section id={F.id} className="relative scroll-mt-6 overflow-x-clip py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-12 lg:gap-12 lg:px-12">
        <SectionHeading
          className="dir-reveal-left lg:col-span-5"
          kicker={<Kicker tone="forest">{F.eyebrow}</Kicker>}
          title={withSquiggle(F.title, "till.", "text-lime")}
          body={F.body}
          points={F.points}
        />

        <div aria-hidden className="dir-reveal-right lg:col-span-7">
          <div className="relative mx-auto h-[620px] w-full max-w-[600px] sm:h-[660px]">
            <div className="absolute top-0 right-0 z-10 sm:right-6" style={{ rotate: "4deg" }}>
              <PhoneFrame scale={0.58}>
                <CardDetailScreen />
              </PhoneFrame>
              <Tape className="-top-3 left-1/2 -translate-x-1/2 rotate-[-4deg]" pattern="stripes" color="rgba(126,195,64,0.7)" />
            </div>

            <Burst size={118} color="#FFB902" className="absolute top-2 left-0 z-20 text-forest" style={{ rotate: "-12deg" }}>
              <span className="font-display text-4xl leading-none">80</span>
              <span className="mt-0.5 text-[10px] font-bold tracking-[0.14em] uppercase">SA cards</span>
            </Burst>

            <div className="absolute top-[150px] left-2 z-20 hidden sm:block" style={{ rotate: "-5deg" }}>
              <div className="relative">
                <LoyaltyCard brand={BRANDS.leaf} width={220} favourite />
                <PhotoCorners />
              </div>
              <p className="mt-4 ml-6 font-hand text-2xl text-forest/70">the one I use most ★</p>
            </div>

            <div className="absolute bottom-6 left-0 z-30 w-[300px] sm:w-[340px]" style={{ rotate: "-3deg" }}>
              {IN_POCKET.map(([brand, position, tilt]) => (
                <div key={brand} className={`absolute ${position}`} style={{ rotate: `${tilt}deg` }}>
                  <LoyaltyCard brand={BRANDS[brand]} width={176} />
                </div>
              ))}
              {/* Positioned, and after the cards, so the pocket paints over their bottoms. */}
              <div className="relative drop-shadow-[0_16px_14px_rgba(24,54,49,0.3)]">
                <div className="relative h-[168px] sm:h-[180px]" style={{ ...KRAFT, clipPath: POCKET_EDGE }}>
                  <span className="absolute inset-3 top-7 rounded-[10px] border-2 border-dashed border-[#8A6A3E]/45" />
                  <p className="absolute bottom-7 left-1/2 -translate-x-1/2 font-hand text-[34px] leading-none whitespace-nowrap text-forest/80">
                    my cards ♥
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute right-0 bottom-0 hidden w-48 text-right sm:block">
              <Arrow variant="curve" className="mr-10 mb-1 ml-auto w-20 -scale-y-100 rotate-[-20deg] text-coral" />
              <p className="font-hand text-[28px] leading-tight text-coral rotate-[-3deg]">it brightens at the till!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
