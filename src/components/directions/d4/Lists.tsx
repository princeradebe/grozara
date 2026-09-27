import { PhoneFrame } from "@/components/mocks/PhoneFrame";
import { ListScreen } from "@/components/mocks/screens";
import { FEATURES } from "@/content/site";

import { MiniNextShop, MiniSwipe, MiniTextCopy } from "./minis";
import { Kicker, PointTile, tile, WRAP } from "./ui";

/** Big lime tile with the list on the right, three point tiles stacked beside it. */
export function Lists() {
  const f = FEATURES.lists;
  const [pin, tick, share] = f.points;
  return (
    <section id={f.id} aria-labelledby="d4-lists" className="scroll-mt-4 pt-20 sm:pt-28">
      <div className={`${WRAP} grid gap-3 lg:grid-cols-12 lg:grid-rows-[repeat(3,minmax(214px,auto))] lg:gap-4`}>
        <div className={tile("lime", "dir-reveal flex flex-col p-7 sm:p-10 lg:col-span-7 lg:row-span-3 lg:justify-between")}>
          <Kicker n="01" label={f.eyebrow} />
          <div className="mt-6 lg:mt-0">
            <h2 id="d4-lists" className="max-w-[21rem] font-display text-[42px] leading-[1.02] tracking-tight sm:text-5xl lg:text-[54px]">
              {f.title}
            </h2>
            <p className="mt-5 max-w-[20rem] text-base leading-relaxed text-forest/75 sm:text-lg">{f.body}</p>
          </div>
          <div aria-hidden className="relative mx-auto mt-10 -mb-48 sm:-mb-40 lg:absolute lg:right-12 lg:-bottom-20 lg:m-0">
            <div className="dir-float">
              <PhoneFrame scale={0.66}>
                <ListScreen />
              </PhoneFrame>
            </div>
            <span className="absolute top-6 -left-24 hidden rotate-[-10deg] font-hand text-3xl text-forest lg:block">
              pinned!
            </span>
          </div>
        </div>

        <PointTile tone="white" icon={pin[0]} text={pin[1]} layout="row" visual={<MiniNextShop />} className="lg:col-span-5" />
        <PointTile tone="forest" chip="glass" icon={tick[0]} text={tick[1]} layout="row" visual={<MiniSwipe />} className="lg:col-span-5" />
        <PointTile tone="paper" icon={share[0]} text={share[1]} layout="row" visual={<MiniTextCopy />} className="lg:col-span-5" />
      </div>
    </section>
  );
}
