import { Icon } from "@/components/mocks/Icon";
import { PhoneFrame } from "@/components/mocks/PhoneFrame";
import { LiveToast, PEOPLE } from "@/components/mocks/parts";
import { SharedListScreen } from "@/components/mocks/screens";
import { FEATURES } from "@/content/site";

import { MiniHousehold, MiniLive } from "./minis";
import { Chip, Kicker, tile, WRAP } from "./ui";

/** The shared list in the middle, and the household, the live count and the toasts around it. */
export function Shared() {
  const f = FEATURES.shared;
  const [household, live, fromHome] = f.points;
  return (
    <section id={f.id} aria-labelledby="d4-shared" className="scroll-mt-4 pt-3 lg:pt-4">
      <div className={`${WRAP} grid grid-cols-2 gap-3 lg:grid-cols-12 lg:grid-rows-[repeat(2,minmax(344px,auto))] lg:gap-4`}>
        <div className={tile("forest", "dir-reveal col-span-2 flex flex-col items-center p-7 text-center sm:p-10 lg:col-span-6 lg:col-start-4 lg:row-span-2 lg:row-start-1")}>
          <div aria-hidden className="dir-glow absolute top-[62%] left-1/2 size-[620px] -translate-1/2 rounded-full bg-[radial-gradient(circle,rgb(126_195_64/0.5),transparent_60%)]" />
          <Kicker n="03" label={f.eyebrow} dark className="relative" />
          <h2 id="d4-shared" className="relative mt-5 font-display text-[42px] leading-[1.02] tracking-tight text-label sm:text-5xl lg:text-[54px]">
            {f.title}
          </h2>
          <p className="relative mt-5 max-w-md text-base leading-relaxed text-mist/75 sm:text-lg">{f.body}</p>
          <div aria-hidden className="relative mt-10 -mb-56 sm:-mb-48 lg:-mb-44">
            <div className="dir-float">
              <PhoneFrame scale={0.62}>
                <SharedListScreen />
              </PhoneFrame>
            </div>
          </div>
        </div>

        <div className={tile("lime", "dir-reveal col-span-2 flex flex-col gap-6 p-6 sm:col-span-1 sm:p-7 lg:col-span-3 lg:col-start-1 lg:row-start-1")}>
          <div aria-hidden className="flex flex-1 items-center">
            <MiniHousehold />
          </div>
          <div>
            <Chip icon={household[0]} />
            <h3 className="mt-4 font-display text-[22px] leading-[1.1] tracking-tight sm:text-2xl">{household[1]}</h3>
          </div>
        </div>

        <div className={tile("paper", "dir-reveal col-span-2 flex flex-col gap-6 p-6 sm:col-span-1 sm:p-7 lg:col-span-3 lg:col-start-1 lg:row-start-2")}>
          <div aria-hidden className="relative flex min-h-[120px] flex-1 flex-col justify-center gap-2">
            <LiveToast person={PEOPLE.thandi} action="ticked off" item="Rolls" className="-mr-16 w-max -rotate-2" />
            <LiveToast person={PEOPLE.thandi} action="ticked off" item="Chakalaka" when="1 min ago" className="-mr-16 ml-6 w-max rotate-1 opacity-60" />
          </div>
          <div>
            <Chip icon={live[0]} />
            <h3 className="mt-4 font-display text-[22px] leading-[1.1] tracking-tight sm:text-2xl">{live[1]}</h3>
          </div>
        </div>

        <div aria-hidden className={tile("white", "dir-reveal col-span-2 min-h-[260px] p-6 sm:col-span-1 sm:p-7 lg:col-span-3 lg:col-start-10 lg:row-start-1")}>
          <MiniLive />
        </div>

        <div className={tile("amber", "dir-reveal col-span-2 flex flex-col gap-6 p-6 sm:col-span-1 sm:p-7 lg:col-span-3 lg:col-start-10 lg:row-start-2")}>
          <div aria-hidden className="relative flex min-h-[120px] flex-1 flex-col justify-center gap-3">
            <LiveToast person={PEOPLE.sipho} action="added" item="Charcoal" when="from home" className="-mr-16 w-max rotate-2" />
            <span className="flex items-center gap-2 pl-2 text-forest">
              <Icon name="home" className="size-5" />
              <span className="h-0.5 w-16 bg-[repeating-linear-gradient(90deg,currentColor_0_6px,transparent_6px_11px)]" />
              <Icon name="cart" className="size-5" />
            </span>
          </div>
          <div>
            <Chip icon={fromHome[0]} />
            <h3 className="mt-4 font-display text-[22px] leading-[1.1] tracking-tight sm:text-2xl">{fromHome[1]}</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
