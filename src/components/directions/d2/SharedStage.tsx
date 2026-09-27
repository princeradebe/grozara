import { Avatar, LiveToast, PEOPLE, type Person } from "@/components/mocks/parts";
import { PhoneFrame } from "@/components/mocks/PhoneFrame";
import { SharedListScreen } from "@/components/mocks/screens";
import { FEATURES } from "@/content/site";

import styles from "./d2.module.css";
import { Fireflies, StageCopy, type Vars, Zoom } from "./ui";

/** The household as the stage lights on the rig, each throwing its colour down onto the list. */
const LIGHTS: { person: Person; x: string; aim: string }[] = [
  { person: PEOPLE.thandi, x: "left-[16%]", aim: "-rotate-[7deg] md:-rotate-[16deg]" },
  { person: PEOPLE.sipho, x: "left-1/2", aim: "" },
  { person: PEOPLE.lerato, x: "left-[84%]", aim: "rotate-[7deg] md:rotate-[16deg]" },
];

/** Live updates circling the list. */
const TOASTS = [
  { person: PEOPLE.thandi, action: "ticked off", item: "Rolls", when: "just now" },
  { person: PEOPLE.sipho, action: "added", item: "Charcoal", when: "from home" },
  { person: PEOPLE.thandi, action: "ticked off", item: "Chakalaka", when: "1 min ago" },
  { person: PEOPLE.lerato, action: "added", item: "Ice", when: "just now" },
];

const HALF_LAP = 13;

function hex(color: string, alpha: number) {
  return `${color}${Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0")}`;
}

/** Stage 03, the showpiece: the shared list at the centre of a live radar, updates in orbit. */
export function SharedStage() {
  const f = FEATURES.shared;
  return (
    <section id={f.id} className="relative overflow-hidden pt-10 pb-20 lg:pb-28">
      {/* the lighting rig */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-full">
        <div className="absolute inset-x-[6%] top-10 h-[3px] rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        {LIGHTS.map(({ person, x, aim }) => (
          <div key={person.name} className={`absolute top-10 ${x}`}>
            <div className={`absolute top-8 left-0 h-[1500px] w-[420px] -translate-x-1/2 origin-top mix-blend-screen blur-2xl ${aim}`}>
              <div
                className={`${styles.sway} size-full [clip-path:polygon(46%_0,54%_0,100%_100%,0_100%)]`}
                style={{ background: `linear-gradient(to bottom, ${hex(person.color, 0.34)}, transparent 70%)`, animationDelay: `-${person.name.length}s` }}
              />
            </div>
            <div className="relative -translate-x-1/2 -translate-y-1/2">
              <span className="mx-auto block h-3 w-8 rounded-t-md bg-[#2b3330]" />
              <span
                className="block rounded-full"
                style={{ boxShadow: `0 0 26px 8px ${hex(person.color, 0.6)}, 0 0 90px 30px ${hex(person.color, 0.3)}` }}
              >
                <Avatar person={person} size={52} />
              </span>
            </div>
          </div>
        ))}
      </div>
      <Fireflies count={24} seed={3} />

      <div className="relative mx-auto max-w-7xl px-6 pt-32 lg:px-12 lg:pt-36">
        <StageCopy n="03" feature={f} center />
      </div>

      <div aria-hidden className="dir-reveal-zoom relative mx-auto mt-10 h-[640px] max-w-7xl sm:h-[720px] lg:mt-6 lg:h-[860px]">
        {/* the live radar */}
        <div className="absolute top-1/2 left-1/2 size-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(126,195,64,0.26),rgba(126,195,64,0.06)_60%,transparent)]" />
        {[300, 460, 620, 780, 940].map((d) => (
          <span
            key={d}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]"
            style={{ width: d, height: d }}
          />
        ))}
        {[0, -2, -4].map((delay) => (
          <span
            key={delay}
            className="absolute top-1/2 left-1/2 size-[64rem] -translate-x-1/2 -translate-y-1/2"
          >
            <span
              className={`${styles.ring} block size-full rounded-full border-2 border-lime-bright/60 bg-[radial-gradient(closest-side,transparent_70%,rgba(165,224,99,0.12))] shadow-[0_0_40px_rgba(165,224,99,0.25)]`}
              style={{ animationDelay: `${delay}s` }}
            />
          </span>
        ))}

        <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <div className="dir-float">
            <Zoom z={0.84}>
              <PhoneFrame scale={0.74}>
                <SharedListScreen />
              </PhoneFrame>
            </Zoom>
          </div>
        </div>

        {/* desktop: the updates orbit the phone */}
        <div
          className="absolute top-1/2 left-1/2 z-20 hidden lg:block"
          style={{ "--rx": "min(480px, 35vw)", "--ry": "372px", "--half": `${HALF_LAP}s` } as Vars}
        >
          {TOASTS.map((t, k) => {
            const phase = -k * (HALF_LAP / 2);
            return (
              <div key={t.item} className={`${styles.orbitX} absolute`} style={{ animationDelay: `${phase}s` }}>
                <div className={styles.orbitY} style={{ animationDelay: `${phase - HALF_LAP / 2}s` }}>
                  <LiveToast person={t.person} action={t.action} item={t.item} when={t.when} className="w-max -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            );
          })}
        </div>

        {/* smaller screens: two updates pinned to the phone's corners */}
        <div className="absolute top-[8%] left-0 z-20 sm:left-[10%] lg:hidden">
          <div className="dir-float-side">
            <LiveToast person={PEOPLE.thandi} action="ticked off" item="Rolls" />
          </div>
        </div>
        <div className="absolute right-0 bottom-[8%] z-20 sm:right-[10%] lg:hidden">
          <div className="dir-float-side" style={{ animationDelay: "-4s" }}>
            <LiveToast person={PEOPLE.sipho} action="added" item="Charcoal" when="from home" />
          </div>
        </div>
      </div>
    </section>
  );
}
