import Image from "next/image";

import { Icon } from "@/components/mocks/Icon";
import { StickerCard } from "@/components/mocks/parts";
import { FEATURES } from "@/content/site";

import styles from "./d3.module.css";
import { Arrow, Circled, GRAPH_PAPER, Kicker, Points, Polaroid, Tape, withSquiggle } from "./scrap";

const F = FEATURES.boyfriendMode;

function StepLabel({ n, children }: { n: number; children: string }) {
  return (
    <p className="mt-5 flex items-center justify-center gap-2.5 font-hand text-[28px] leading-none text-forest">
      <Circled n={n} className="size-10 text-coral" />
      {children}
    </p>
  );
}

function Scissors({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" aria-hidden>
      <circle cx="10" cy="36" r="6.5" />
      <circle cx="10" cy="12" r="6.5" />
      <path d="M15.5 31 L 44 10 M15.5 17 L 44 38" />
    </svg>
  );
}

/** The four focus brackets of a camera viewfinder. */
function Viewfinder() {
  const corners = ["top-3 left-3 border-t-2 border-l-2", "top-3 right-3 border-t-2 border-r-2", "bottom-3 left-3 border-b-2 border-l-2", "bottom-3 right-3 border-r-2 border-b-2"];
  return corners.map((c) => <span key={c} className={`absolute size-6 rounded-[3px] border-white/90 ${c}`} />);
}

function Between({ side }: { side: "left" | "right" }) {
  return (
    <>
      <Arrow variant="loop" className="hidden w-28 self-center text-coral lg:block xl:w-32" />
      <Arrow variant="down" className={`h-20 text-coral lg:hidden ${side === "left" ? "-translate-x-14" : "translate-x-14 -scale-x-100"}`} />
    </>
  );
}

/** Deeper look at Boyfriend Mode: a photo on the counter, cut out, then stamped with how many to buy. */
export function BoyfriendSpread() {
  return (
    <section id={F.id} className="relative scroll-mt-6 overflow-x-clip py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="dir-reveal-left lg:col-span-7">
            <Kicker tone="coral" mark="♥">
              {F.eyebrow}
            </Kicker>
            <h2 className="mt-6 font-display text-4xl leading-[1.02] tracking-tight text-balance sm:text-5xl lg:text-7xl">
              {withSquiggle(`${F.points[0][1]}.`, "sticker", "text-coral")}
            </h2>
          </div>
          <div className="dir-reveal-right lg:col-span-5">
            <p className="text-lg leading-relaxed text-forest/75">{F.body}</p>
            <Points points={F.points.slice(1)} className="mt-7" />
          </div>
        </div>

        <div aria-hidden className="dir-reveal mt-16 lg:mt-20">
          <div
            className="relative rounded-md bg-white px-6 pt-16 pb-14 shadow-[0_30px_50px_-30px_rgba(24,54,49,0.55),0_2px_5px_rgba(24,54,49,0.08)] sm:px-10 lg:px-12 lg:pt-20 lg:pb-16"
            style={{ ...GRAPH_PAPER, rotate: "-0.7deg" }}
          >
            <Tape className="-top-3 left-8 rotate-[-5deg]" pattern="stripes" color="rgba(255,143,163,0.75)" />
            <Tape className="-top-3 right-10 rotate-[6deg]" />
            <p className="absolute top-5 left-1/2 -translate-x-1/2 font-hand text-2xl whitespace-nowrap text-forest/55 lg:left-auto lg:right-40 lg:translate-x-0">
              braai saturday · p. 1
            </p>

            <div className="grid justify-items-center gap-y-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-end lg:gap-x-1">
              <div className="flex flex-col items-center">
                <Polaroid
                  tilt={-4}
                  className="w-[236px] sm:w-[250px]"
                  caption={<span className="font-hand text-2xl text-forest/70">on the counter</span>}
                  photoStyle={{ background: "linear-gradient(#D7E6EC 0 58%, #D3A676 58% 100%)" }}
                >
                  <Image
                    src="/stickers/rice.png"
                    alt=""
                    width={717}
                    height={900}
                    className="absolute bottom-[9%] left-1/2 h-[74%] w-auto -translate-x-1/2 rotate-[-4deg] drop-shadow-[0_12px_8px_rgba(70,40,10,0.35)]"
                  />
                  <Viewfinder />
                  <span className="absolute top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-white">
                    <Icon name="camera" className="size-3" /> PHOTO
                  </span>
                </Polaroid>
                <StepLabel n={1}>snap it</StepLabel>
              </div>

              <Between side="left" />

              <div className="flex flex-col items-center">
                <div className="relative grid h-[290px] w-[240px] place-items-center">
                  <svg viewBox="0 0 240 290" className="absolute inset-0 size-full text-forest/45" fill="none" aria-hidden>
                    <rect x="4" y="4" width="232" height="282" rx="36" stroke="currentColor" strokeWidth="2.5" strokeDasharray="10 8" className={styles.ants} />
                  </svg>
                  <Scissors className="absolute -top-5 left-10 w-11 rotate-[-18deg] bg-white text-forest" />
                  <Image
                    src="/stickers/rice.png"
                    alt=""
                    width={717}
                    height={900}
                    className="relative h-[228px] w-auto rotate-[4deg] drop-shadow-[0_18px_14px_rgba(0,0,0,0.28)]"
                  />
                  <Icon name="sparkles" className="absolute top-7 right-1 size-9 text-amber" />
                  <Icon name="sparkles" className="absolute bottom-10 left-1 size-6 text-lime" />
                </div>
                <StepLabel n={2}>it lifts right out</StepLabel>
              </div>

              <Between side="right" />

              <div className="flex flex-col items-center">
                <div className="relative">
                  <StickerCard
                    src="/stickers/rice.png"
                    alt=""
                    name="Rice"
                    size="1 kg"
                    note="the long grain one ♥"
                    buy={2}
                    width={208}
                    aspect={1.255}
                    tilt={5}
                  />
                </div>
                <StepLabel n={3}>how many + a note</StepLabel>
              </div>
            </div>

            <div className="absolute -right-3 -bottom-12 hidden w-52 rotate-[5deg] bg-[#FFF1A8] p-4 shadow-[0_14px_22px_-12px_rgba(0,0,0,0.35)] lg:block xl:-right-8">
              <Tape className="-top-3 left-12 rotate-[-3deg]" size="h-6 w-20" color="rgba(126,195,64,0.6)" />
              <p className="font-hand text-2xl leading-tight text-forest">…then whoever shops ticks it off ✓</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
