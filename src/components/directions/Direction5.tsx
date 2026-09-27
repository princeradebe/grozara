import { Icon, type IconName } from "@/components/mocks/Icon";
import { BoardScreen, CardDetailScreen } from "@/components/mocks/screens";
import { PhoneFrame } from "@/components/mocks/PhoneFrame";
import { StoreBadges } from "@/components/site/StoreBadges";
import { FEATURES, HIGHLIGHTS, TICKER } from "@/content/site";

import { BoyfriendBand, CardsBand, ListsBand, SharedBand } from "./d5/Bands";
import { Faq, Footer, GetIt } from "./d5/End";
import { Extras, HowItWorks } from "./d5/More";
import { Ticker } from "./d5/ui";
import { Nav } from "./shared";

const VERBS: [string, IconName, string][] = [
  ["List it.", "list", "bg-forest text-lime-bright"],
  ["Snap it.", "camera", "bg-coral text-white"],
  ["Share it.", "userGroup", "bg-blush text-forest"],
  ["Scan it.", "barcode", "bg-amber text-forest"],
];

/** The hero strip: the ticker words plus each feature's first point, all from site.ts. */
const HERO_TICKER = [
  ...TICKER,
  ...Object.values(FEATURES).map((f) => f.points[0][1]),
  ...HIGHLIGHTS.map(([, label]) => label),
].filter((word, i, all) => all.indexOf(word) === i);

/** Rotations of the ticker so neighbouring strips don't start on the same word. */
const from = (n: number) => [...TICKER.slice(n), ...TICKER.slice(0, n)];

/** 5 · Lime pop: loud colour bands, huge verbs, tilted phones and marquees between every band. */
export function Direction5() {
  return (
    <div className="overflow-x-clip">
      <Hero />
      <Ticker
        words={HERO_TICKER}
        seam="bg-[linear-gradient(to_bottom,var(--color-lime)_50%,var(--color-forest)_50%)]"
        bar="bg-forest-deep"
        ink="text-lime-bright"
        spark="text-amber"
      />
      <ListsBand />
      <Ticker
        words={from(2)}
        seam="bg-[linear-gradient(to_bottom,var(--color-forest)_50%,var(--color-coral)_50%)]"
        bar="bg-amber"
        ink="text-forest"
        spark="text-coral"
        rotate="rotate-2"
        reverse
      />
      <BoyfriendBand />
      <Ticker
        words={from(4)}
        seam="bg-[linear-gradient(to_bottom,var(--color-coral)_50%,var(--color-amber)_50%)]"
        bar="bg-forest"
        ink="text-label"
        spark="text-lime-bright"
      />
      <SharedBand />
      <Ticker
        words={from(1)}
        seam="bg-[linear-gradient(to_bottom,var(--color-amber)_50%,var(--color-forest-deep)_50%)]"
        bar="bg-coral"
        ink="text-forest"
        spark="text-label"
        rotate="rotate-2"
        reverse
      />
      <CardsBand />
      <Ticker
        words={from(3)}
        seam="bg-[linear-gradient(to_bottom,var(--color-forest-deep)_50%,var(--color-paper)_50%)]"
        bar="bg-lime"
        ink="text-forest"
        spark="text-forest-deep/70"
      />
      <Extras />
      <HowItWorks />
      <Ticker
        words={from(5)}
        seam="bg-[linear-gradient(to_bottom,var(--color-blush)_50%,var(--color-forest)_50%)]"
        bar="bg-amber"
        ink="text-forest"
        spark="text-coral"
        rotate="rotate-2"
        reverse
      />
      <Faq />
      <GetIt />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-clip bg-lime text-forest lg:min-h-[calc(100svh-4rem)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_40%,rgba(165,224,99,0.9),transparent_70%)]" />
      <Nav tone="lime" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-4 px-6 pt-10 pb-6 lg:grid-cols-[1.1fr_1fr] lg:px-12 lg:pt-8 lg:pb-10">
        <div className="relative z-10">
          <h1 className="font-display text-[clamp(3.5rem,8.6vw,7.4rem)] leading-[0.86] tracking-[-0.035em]">
            {VERBS.map(([word, icon, chip], i) => (
              <span key={word} className={`dir-rise flex items-center gap-[0.22em] dir-delay-${i + 1}`}>
                {word}
                <span aria-hidden className={`grid size-[0.62em] shrink-0 place-items-center rounded-[0.18em] ${chip}`}>
                  <Icon name={icon} className="size-[0.36em]" />
                </span>
              </span>
            ))}
          </h1>
          <p className="dir-rise dir-delay-5 mt-8 max-w-md text-lg leading-relaxed font-medium text-forest/80">
            Grozara is your shopping list, your Boyfriend Mode photo list and your loyalty card wallet. Share a list with the
            household and watch it get ticked off, live. One app, made for South African shops.
          </p>
          <div className="dir-rise dir-delay-6 mt-8">
            <StoreBadges height={52} />
          </div>
        </div>

        <div aria-hidden className="relative mx-auto h-[680px] w-[540px] [zoom:0.64] sm:[zoom:1]">
          <div className="dir-rise dir-delay-3 absolute top-12 right-0 rotate-[9deg]">
            <div className="dir-float-side">
              <PhoneFrame scale={0.62}>
                <CardDetailScreen />
              </PhoneFrame>
            </div>
          </div>
          <div className="dir-rise dir-delay-2 absolute top-0 left-0 -rotate-[7deg]">
            <div className="dir-float">
              <PhoneFrame scale={0.72}>
                <BoardScreen />
              </PhoneFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
