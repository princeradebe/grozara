import type { ReactNode } from "react";

import { Icon } from "@/components/mocks/Icon";
import { BRANDS, LoyaltyCard } from "@/components/mocks/parts";
import { FEATURES, HIGHLIGHTS } from "@/content/site";

import { BoyfriendStage, CardsPhone, ListsStage, SharedStage, TryIt } from "./Interactive";
import { BigTick, FeatureCopy, Stage, tilt, Verb } from "./ui";

/**
 * One full-bleed colour band: the giant verb on its own row, then copy beside a mock stage. On
 * desktop the stage climbs up into the verb so the phone overlaps it.
 */
function Band({
  id,
  className,
  verb,
  flip = false,
  copy,
  stage,
}: {
  id: string;
  className: string;
  verb: ReactNode;
  flip?: boolean;
  copy: ReactNode;
  stage: ReactNode;
}) {
  return (
    <section id={id} className={`relative scroll-mt-20 overflow-clip ${className}`}>
      <div className="mx-auto max-w-7xl px-6 pt-14 pb-16 lg:px-12 lg:pt-20 lg:pb-24">
        {verb}
        <div
          className={`mt-8 grid items-center gap-10 lg:mt-0 lg:gap-12 ${
            flip ? "lg:grid-cols-[560px_minmax(0,1fr)]" : "lg:grid-cols-[minmax(0,1fr)_560px]"
          }`}
        >
          <div className={`lg:pt-24 ${flip ? "lg:order-2" : ""}`}>{copy}</div>
          <div className={`relative z-10 lg:-mt-44 ${flip ? "dir-reveal-left lg:order-1" : "dir-reveal-right"}`}>{stage}</div>
        </div>
      </div>
    </section>
  );
}

export function ListsBand() {
  return (
    <Band
      id={FEATURES.lists.id}
      className="bg-forest text-mist"
      verb={<Verb className="dir-reveal-left text-lime-bright">Tick it.</Verb>}
      copy={<FeatureCopy feature={FEATURES.lists} kicker="bg-lime-bright text-forest" chip="bg-lime-bright text-forest" />}
      stage={
        <Stage w={560} h={680} label="Try it: tap items to tick them off, swipe left to delete, then undo">
          <ListsStage />
          <div aria-hidden className="absolute top-[4px] right-[0px] z-20">
            <span
              style={tilt(7)}
              className="dir-pop dir-delay-2 flex items-center gap-2 rounded-full bg-amber px-5 py-3 font-display text-xl text-forest shadow-[0_16px_30px_-14px_rgba(0,0,0,0.6)]"
            >
              <Icon name="pin" className="size-6" /> Pinned for your next shop
            </span>
          </div>
          <div aria-hidden className="pointer-events-none absolute top-[200px] left-[6px] z-20">
            <div className="dir-float-side">
              <span className="grid size-[150px] -rotate-[10deg] place-items-center rounded-full bg-lime-bright text-forest shadow-[0_24px_40px_-18px_rgba(0,0,0,0.7)] ring-[10px] ring-forest">
                <BigTick className="size-[92px]" />
              </span>
            </div>
          </div>
          <div className="absolute right-[30px] bottom-[6px] z-30">
            <TryIt>Tap to tick · swipe left to delete</TryIt>
          </div>
        </Stage>
      }
    />
  );
}

export function BoyfriendBand() {
  return (
    <Band
      id={FEATURES.boyfriendMode.id}
      className="bg-coral text-forest"
      flip
      verb={<Verb className="dir-reveal-right text-label lg:text-right [text-shadow:0.045em_0.045em_0_var(--color-forest)]">Snap it.</Verb>}
      copy={
        <FeatureCopy feature={FEATURES.boyfriendMode} kicker="bg-forest text-label" chip="bg-label text-forest" body="text-forest/85" />
      }
      stage={
        <Stage w={560} h={700} label="Try it: tick the stickers off and edit the note">
          <BoyfriendStage />
        </Stage>
      }
    />
  );
}

export function SharedBand() {
  return (
    <Band
      id={FEATURES.shared.id}
      className="bg-amber text-forest"
      verb={<Verb className="dir-reveal-left text-forest">Share it.</Verb>}
      copy={<FeatureCopy feature={FEATURES.shared} kicker="bg-forest text-amber" chip="bg-forest text-amber" body="text-forest/85" />}
      stage={
        <Stage w={560} h={700} label="A live shop: Thandi ticks items off and Sipho adds from home. Tap items to tick them too">
          <SharedStage />
        </Stage>
      }
    />
  );
}

export function CardsBand() {
  const templates = HIGHLIGHTS.find(([icon]) => icon === "card")?.[1] ?? "";
  const [count, ...rest] = templates.split(" ");
  return (
    <Band
      id={FEATURES.cards.id}
      className="bg-forest-deep text-mist"
      flip
      verb={<Verb className="dir-reveal-right text-lime-bright lg:text-right">Scan it.</Verb>}
      copy={<FeatureCopy feature={FEATURES.cards} kicker="bg-lime-bright text-forest" chip="bg-lime-bright text-forest" body="text-mist/80" />}
      stage={
        <Stage w={560} h={700} label="Try it: swap the card and barcode">
          <div className="dir-glow absolute top-[120px] left-[90px] size-[400px] rounded-full bg-lime-bright/35 blur-3xl" />
          <LoyaltyCard brand={BRANDS.basket} width={270} className="absolute top-[70px] left-[0px] -rotate-[16deg]" />
          <LoyaltyCard brand={BRANDS.corner} width={270} className="absolute top-[20px] right-[0px] rotate-[13deg]" />
          <div className="absolute top-[40px] left-[140px] -rotate-[4deg]">
            <div className="dir-float">
              <CardsPhone />
            </div>
          </div>
          <LoyaltyCard brand={BRANDS.sunny} width={250} favourite className="absolute right-[0px] bottom-[70px] z-20 rotate-[8deg]" />
          <div className="absolute bottom-[36px] left-[0px] z-20 -rotate-[7deg]">
            <div className="grid size-[180px] content-center rounded-[36px] bg-amber px-6 text-forest shadow-[0_24px_40px_-18px_rgba(0,0,0,0.7)]">
              {/* A full-size "80+" is wider than the badge, so the plus rides small at the top. */}
              <span className="font-display text-[92px] leading-[0.8] tracking-[-0.04em]">
                {count.replace(/\+$/, "")}
                {count.endsWith("+") ? <span className="ml-0.5 align-top text-[0.5em] leading-none">+</span> : null}
              </span>
              <span className="mt-2 font-display text-lg leading-tight">{rest.join(" ")}</span>
            </div>
          </div>
          <div aria-hidden className="absolute top-[330px] right-[26px] z-20 rotate-[10deg]">
            <span className="grid size-[92px] place-items-center rounded-full bg-lime-bright text-forest shadow-[0_18px_30px_-14px_rgba(0,0,0,0.7)] ring-[8px] ring-forest-deep">
              <Icon name="sun" className="size-[46px]" />
            </span>
          </div>
          <div className="absolute right-[10px] bottom-[-8px] z-30">
            <TryIt>Tap ⇅ to swap card and barcode</TryIt>
          </div>
        </Stage>
      }
    />
  );
}
