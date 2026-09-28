import type { ReactNode } from "react";

import { Icon } from "@/components/mocks/Icon";
import { EXTRAS, STEPS } from "@/content/site";

import { ClearTileArt, FavouritesTileArt, HouseholdArt, ScanCardArt, ShareTileArt, TickableSticker, TryIt } from "./Interactive";
import { Kicker } from "./ui";

/**
 * Tile colour, resting tilt and a little mock for each extra, in EXTRAS order. `play` names what
 * visitors can do with the interactive ones.
 */
const TILES: { tone: string; tilt: string; art: ReactNode; play?: string }[] = [
  { tone: "bg-lime text-forest", tilt: "lg:-rotate-[2.5deg]", art: <ShareTileArt />, play: "Try it: share the photo to Grozara" },
  {
    tone: "bg-coral text-forest",
    tilt: "lg:rotate-[2deg]",
    art: (
      <div className="grid h-full place-items-center">
        <span className="relative grid size-[150px] place-items-center rounded-[40px] bg-forest text-lime-bright shadow-[0_20px_30px_-16px_rgba(0,0,0,0.6)]">
          <Icon name="faceId" className="size-[88px]" />
          <span className="absolute -right-4 -bottom-4 grid size-[60px] place-items-center rounded-full bg-label text-forest ring-[6px] ring-coral">
            <Icon name="lock" className="size-[28px]" />
          </span>
        </span>
      </div>
    ),
  },
  { tone: "bg-amber text-forest", tilt: "lg:-rotate-[1.5deg]", art: <FavouritesTileArt />, play: "Try it: tap a star to favourite a card, tap a card to bring it forward" },
  { tone: "bg-forest text-mist", tilt: "lg:rotate-[2.5deg]", art: <ClearTileArt />, play: "Try it: tick items, then clear them" },
];

export function Extras() {
  return (
    <section className="dir-paper relative overflow-clip text-forest">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-20 lg:px-12 lg:pt-20 lg:pb-28">
        <div className="dir-reveal flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div>
            <Kicker className="bg-forest text-lime-bright">Extras</Kicker>
            <h2 className="mt-5 font-display text-[clamp(3.2rem,9vw,8rem)] leading-[0.86] tracking-[-0.04em]">
              And there&rsquo;s more.
            </h2>
          </div>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {EXTRAS.map((extra, i) => {
            const tile = TILES[i % TILES.length];
            return (
              <li key={extra.title} className="dir-reveal-zoom">
                <div
                  className={`flex h-full flex-col rounded-[2.25rem] p-6 shadow-[0_30px_50px_-30px_rgba(24,54,49,0.7)] ${tile.tone} ${tile.tilt}`}
                >
                  <div {...(tile.play ? { role: "group", "aria-label": tile.play } : { "aria-hidden": true })} className="h-[190px]">
                    {tile.art}
                  </div>
                  <h3 className="mt-6 flex items-center gap-2.5 font-display text-[1.75rem] leading-[1.02] tracking-[-0.02em]">
                    <Icon name={extra.icon} className="size-7 shrink-0" />
                    {extra.title}
                  </h3>
                  <p className="mt-3 leading-relaxed font-medium opacity-85">{extra.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** A small mock under each step's numeral, each one playable: tick the rice, add the household, scan the card. */
const STEP_ART: ReactNode[] = [
  <TickableSticker key="rice" src="/stickers/rice.png" alt="" name="Rice" size="1 kg" buy={2} width={132} aspect={1.25} tilt={8} />,
  <HouseholdArt key="people" />,
  <ScanCardArt key="card" />,
];

const NUMERAL_INK = ["text-forest", "text-coral", "text-lime"];

export function HowItWorks() {
  return (
    <section className="relative overflow-clip bg-blush text-forest">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-20 lg:px-12 lg:pt-20 lg:pb-28">
        <div className="dir-reveal">
          <Kicker className="bg-forest text-blush">How it works</Kicker>
          <h2 className="mt-5 font-display text-[clamp(3.2rem,9vw,8rem)] leading-[0.86] tracking-[-0.04em]">
            One, two, <span className="text-label [text-shadow:0.05em_0.05em_0_var(--color-forest)]">shop.</span>
          </h2>
          <TryIt className="mt-6">Tap the rice, the household and the card</TryIt>
        </div>
        <ol className="mt-10 grid gap-12 md:grid-cols-3 md:gap-8 lg:mt-14">
          {STEPS.map((step, i) => (
            <li key={step.title} className="dir-reveal relative">
              <div className="relative flex h-[clamp(11rem,22vw,17rem)] items-end">
                <span
                  aria-hidden
                  className={`font-display text-[clamp(13rem,26vw,21rem)] leading-[0.72] tracking-[-0.06em] [text-shadow:0.035em_0.035em_0_var(--color-label)] ${NUMERAL_INK[i]}`}
                >
                  {i + 1}
                </span>
                <div className="absolute right-0 bottom-2 md:-right-2 lg:right-2">
                  {STEP_ART[i]}
                </div>
              </div>
              <h3 className="mt-6 flex items-center gap-3 font-display text-[2rem] leading-none tracking-[-0.02em]">
                <span className="grid size-11 place-items-center rounded-2xl bg-forest text-blush">
                  <Icon name={step.icon} className="size-6" />
                </span>
                {step.title}
              </h3>
              <p className="mt-3 max-w-xs text-lg leading-relaxed font-medium text-forest/85">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
