import type { CSSProperties } from "react";

import { PhoneFrame } from "@/components/mocks/PhoneFrame";
import { BRANDS, LoyaltyCard } from "@/components/mocks/parts";
import { WalletScreen } from "@/components/mocks/screens";
import { FEATURES } from "@/content/site";

import { MiniBrighten, MiniScan, MiniTemplates } from "./minis";
import { Kicker, PointTile, tile, WRAP } from "./ui";

/** The wallet tile on the left; scan, templates and brightness tiles on the right. */
export function Cards() {
  const f = FEATURES.cards;
  const [scan, templates, bright] = f.points;
  return (
    <section id={f.id} aria-labelledby="d4-cards" className="scroll-mt-4 pt-3 lg:pt-4">
      <div className={`${WRAP} grid gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[minmax(320px,auto)_minmax(340px,auto)] lg:gap-4`}>
        <div className={tile("white", "dir-reveal flex flex-col p-7 sm:col-span-2 sm:p-10 lg:col-span-6 lg:row-span-2")}>
          <div aria-hidden className="absolute -right-24 -bottom-24 size-[420px] rounded-full bg-[radial-gradient(circle,rgb(255_185_2/0.35),transparent_65%)]" />
          <Kicker n="04" label={f.eyebrow} className="relative" />
          <h2 id="d4-cards" className="relative mt-6 max-w-md font-display text-[42px] leading-[1.02] tracking-tight sm:text-5xl lg:text-[54px]">
            {f.title}
          </h2>
          <p className="relative mt-5 max-w-md text-base leading-relaxed text-forest/75 sm:text-lg">{f.body}</p>
          <div aria-hidden className="relative mx-auto mt-10 -mb-56 sm:-mb-48 lg:-mb-44">
            <div className="dir-float">
              <PhoneFrame scale={0.62}>
                <WalletScreen />
              </PhoneFrame>
            </div>
            <div className="absolute top-28 -left-12 sm:-left-32">
              <div className="dir-pop dir-delay-2" style={{ "--tilt": "-11deg" } as CSSProperties}>
                <LoyaltyCard brand={BRANDS.basket} width={190} />
              </div>
            </div>
          </div>
        </div>

        <PointTile
          tone="forest"
          chip="glass"
          icon={scan[0]}
          text={scan[1]}
          layout="row"
          visual={<MiniScan />}
          className="sm:col-span-2 lg:col-span-6 lg:col-start-7 lg:row-start-1"
        />
        <PointTile tone="lime" icon={templates[0]} text={templates[1]} visual={<MiniTemplates />} className="lg:col-span-3 lg:col-start-7 lg:row-start-2" />
        <PointTile tone="amber" icon={bright[0]} text={bright[1]} visual={<MiniBrighten />} className="lg:col-span-3 lg:col-start-10 lg:row-start-2" />
      </div>
    </section>
  );
}
