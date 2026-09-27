import { Avatar, LiveToast, PEOPLE } from "@/components/mocks/parts";
import { PhoneFrame } from "@/components/mocks/PhoneFrame";
import { SharedListScreen } from "@/components/mocks/screens";
import { FEATURES } from "@/content/site";

import { Arrow, Kicker, Magnet, SectionHeading, withSquiggle } from "./scrap";

const F = FEATURES.shared;

const LETTERS: [string, string, number][] = [
  ["B", "#FF6B5B", -8],
  ["R", "#FFB902", 6],
  ["A", "#7EC340", -4],
  ["A", "#6C7BFF", 9],
  ["I", "#FF8FA3", -6],
];

/** Shared lists as a fridge door: the list held up with magnets, the household stuck around it. */
export function SharedFridge() {
  return (
    <section id={F.id} className="relative scroll-mt-6 overflow-x-clip py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-12 lg:gap-12 lg:px-12">
        <SectionHeading
          className="dir-reveal-right lg:order-2 lg:col-span-5"
          kicker={<Kicker tone="amber">{F.eyebrow}</Kicker>}
          title={withSquiggle(F.title, "live", "text-amber")}
          body={F.body}
          points={F.points}
        />

        <div aria-hidden className="dir-reveal lg:order-1 lg:col-span-7">
          <div className="relative mx-auto h-[680px] w-full max-w-[640px] rounded-[36px] bg-gradient-to-br from-[#FFFEFA] via-[#F7F5EF] to-[#E6E2D6] shadow-[inset_0_2px_0_rgba(255,255,255,0.95),inset_0_-4px_0_rgba(0,0,0,0.05),0_40px_70px_-36px_rgba(24,54,49,0.6),0_2px_6px_rgba(24,54,49,0.08)] ring-1 ring-forest/10 sm:h-[720px] sm:rounded-[44px]">
            <span className="absolute top-28 right-3 h-52 w-3.5 rounded-full bg-gradient-to-r from-[#D2CEC2] via-white to-[#BDB8AA] shadow-[0_6px_10px_-4px_rgba(0,0,0,0.3)] sm:right-5 sm:w-4" />
            <span className="absolute inset-x-8 top-5 h-px bg-forest/8" />

            <div className="absolute top-16 left-3 sm:top-16 sm:left-12" style={{ rotate: "-2.5deg" }}>
              <PhoneFrame scale={0.6}>
                <SharedListScreen />
              </PhoneFrame>
              <Magnet color="#FF6B5B" size={26} className="-top-2 left-8" />
              <Magnet color="#7EC340" size={26} className="-top-3 right-9" />
            </div>

            <div className="absolute top-5 right-4 w-[150px] text-right sm:top-10 sm:right-12 sm:w-[230px]">
              <p className="font-hand text-[28px] leading-[0.95] text-coral rotate-[-4deg] sm:text-[38px]">Thandi&rsquo;s at the shop!</p>
              <Arrow variant="curve" className="ml-auto mr-10 mt-1 w-20 -scale-x-100 text-coral sm:mr-24 sm:w-28" />
            </div>

            <div className="absolute top-[178px] right-4 flex flex-col items-center sm:top-[196px] sm:right-[150px]" style={{ rotate: "-6deg" }}>
              <Avatar person={PEOPLE.thandi} size={70} className="shadow-[0_10px_16px_-8px_rgba(0,0,0,0.4)]" />
              <span className="mt-1.5 hidden font-hand text-xl text-forest/70 sm:block">in the aisle</span>
            </div>
            <div className="absolute top-[258px] right-7 flex flex-col items-center sm:top-[240px] sm:right-9" style={{ rotate: "8deg" }}>
              <Avatar person={PEOPLE.sipho} size={58} className="shadow-[0_10px_16px_-8px_rgba(0,0,0,0.4)]" />
              <span className="mt-1.5 hidden font-hand text-xl text-forest/70 sm:block">adding from home</span>
            </div>
            <div className="absolute top-[330px] right-3 flex flex-col items-center sm:top-[340px] sm:right-[190px]" style={{ rotate: "-3deg" }}>
              <Avatar person={PEOPLE.lerato} size={50} className="shadow-[0_10px_16px_-8px_rgba(0,0,0,0.4)]" />
            </div>

            <div className="absolute right-2 bottom-[118px] z-20 sm:top-[440px] sm:right-8 sm:bottom-auto" style={{ rotate: "3deg" }}>
              <LiveToast person={PEOPLE.thandi} action="ticked off" item="Rolls" />
              <Magnet color="#FFB902" size={20} className="-top-2 left-1/2 -translate-x-1/2" />
            </div>
            <div className="absolute right-8 bottom-9 z-20 sm:top-[540px] sm:right-24 sm:bottom-auto" style={{ rotate: "-2.5deg" }}>
              <LiveToast person={PEOPLE.sipho} action="added" item="Charcoal" />
              <Magnet color="#6C7BFF" size={20} className="-top-2 left-1/2 -translate-x-1/2" />
            </div>

            <div className="absolute right-10 bottom-8 hidden items-end gap-1 sm:flex">
              {LETTERS.map(([letter, color, tilt], i) => (
                <span
                  key={i}
                  className="font-display text-5xl leading-none drop-shadow-[0_5px_4px_rgba(0,0,0,0.25)]"
                  style={{ color, rotate: `${tilt}deg` }}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
