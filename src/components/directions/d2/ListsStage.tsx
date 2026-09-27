import { Icon } from "@/components/mocks/Icon";
import { PhoneFrame } from "@/components/mocks/PhoneFrame";
import { ListScreen } from "@/components/mocks/screens";
import { FEATURES } from "@/content/site";

import styles from "./d2.module.css";
import { Fireflies, GlowCheck, Spotlight, StageCopy, Zoom } from "./ui";

/** Ticks drifting up off the list. `front` ones pass in front of the phone. */
const CHECKS = [
  { x: "3%", y: "58%", size: 34, delay: 0, dur: 7, front: false },
  { x: "13%", y: "26%", size: 22, delay: -2.4, dur: 8, front: false },
  { x: "84%", y: "46%", size: 40, delay: -1.2, dur: 7.5, front: false },
  { x: "91%", y: "20%", size: 24, delay: -4.6, dur: 6.5, front: false },
  { x: "24%", y: "74%", size: 26, delay: -3.5, dur: 7, front: true },
  { x: "70%", y: "70%", size: 30, delay: -5.8, dur: 8, front: true },
  { x: "56%", y: "34%", size: 18, delay: -0.6, dur: 6, front: true },
];

function Check({ c }: { c: (typeof CHECKS)[number] }) {
  return (
    <div className={`absolute ${c.front ? "" : "opacity-70"}`} style={{ left: c.x, top: c.y }}>
      <div className={styles.checkUp} style={{ animationDelay: `${c.delay}s`, animationDuration: `${c.dur}s` }}>
        <GlowCheck size={c.size} />
      </div>
    </div>
  );
}

/** Stage 01: the list under a spotlight, ticks floating up like sparks. */
export function ListsStage() {
  const f = FEATURES.lists;
  return (
    <section id={f.id} className="relative overflow-hidden py-24 lg:py-36">
      <Fireflies count={18} seed={1} />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-10 lg:px-12">
        <StageCopy n="01" feature={f} />

        <div aria-hidden className="dir-reveal-zoom relative mx-auto h-[600px] w-full max-w-[540px] sm:h-[700px]">
          <Spotlight className="-inset-x-8 -top-24 bottom-0" />
          {/* Below lg the copy sits right above this box, so the rising ticks are clipped to it. */}
          <div className="absolute inset-0 z-0 max-lg:overflow-hidden">
            {CHECKS.filter((c) => !c.front).map((c) => (
              <Check key={c.x} c={c} />
            ))}
          </div>

          <div className="absolute top-6 left-1/2 z-10 -translate-x-1/2">
            <div className="dir-float">
              <Zoom z={0.84}>
                <PhoneFrame scale={0.72}>
                  <ListScreen />
                </PhoneFrame>
              </Zoom>
            </div>
          </div>

          <div className="absolute inset-0 z-20 max-lg:overflow-hidden">
            {CHECKS.filter((c) => c.front).map((c) => (
              <Check key={c.x} c={c} />
            ))}
          </div>

          <div className="absolute top-0 right-0 z-20 sm:top-[13%]">
            <div className="dir-float-side">
              <span className="flex items-center gap-2 rounded-full bg-forest-deep/85 py-2 pr-4 pl-2 text-sm font-semibold text-label shadow-[0_18px_34px_-18px_rgba(0,0,0,0.8)] ring-1 ring-white/15 backdrop-blur-md">
                <span className="grid size-7 place-items-center rounded-full bg-amber text-forest">
                  <Icon name="pin" className="size-4" />
                </span>
                Pinned to Home
              </span>
            </div>
          </div>

          <div className="absolute top-[52%] left-0 z-20">
            <div className="dir-float-side" style={{ animationDelay: "-3s" }}>
              <span className="flex items-center gap-3 rounded-full bg-label py-1.5 pr-1.5 pl-4 text-sm font-medium text-forest shadow-[0_18px_34px_-16px_rgba(0,0,0,0.8)]">
                Cheese deleted
                <span className="rounded-full bg-forest px-3 py-1.5 font-semibold text-lime-bright">Undo</span>
              </span>
            </div>
          </div>

          <div className="absolute right-0 bottom-[3%] z-20 w-[176px] sm:right-[2%]">
            <div className="dir-float" style={{ animationDelay: "-2s" }}>
              <p className="mb-1.5 flex items-center justify-end gap-1.5 text-[11px] font-semibold tracking-[0.14em] text-mist/60 uppercase">
                <Icon name="share" className="size-3.5" /> Sent as text
              </p>
              <div className="rounded-2xl rounded-br-md bg-lime px-4 py-3 text-[13px] leading-snug text-forest shadow-[0_18px_34px_-14px_rgba(126,195,64,0.7)]">
                <p className="font-bold">Weekend shop</p>
                <p>– Eggs × 6</p>
                <p>– Boerewors 1 kg</p>
                <p>– Rooibos tea</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
