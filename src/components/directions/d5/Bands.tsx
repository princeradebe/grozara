import type { ReactNode } from "react";

import { Icon } from "@/components/mocks/Icon";
import { AvatarStack, BRANDS, BuyStamp, LiveDot, LiveToast, LoyaltyCard, PEOPLE, StickerCard } from "@/components/mocks/parts";
import { PhoneFrame } from "@/components/mocks/PhoneFrame";
import { BoardScreen, CardDetailScreen, ListScreen, SharedListScreen } from "@/components/mocks/screens";
import { FEATURES, HIGHLIGHTS } from "@/content/site";

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
    <section id={id} className={`relative overflow-clip ${className}`}>
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
        <Stage w={560} h={680}>
          <div className="absolute top-[44px] left-[150px] rotate-[6deg]">
            <div className="dir-float">
              <PhoneFrame scale={0.72}>
                <ListScreen />
              </PhoneFrame>
            </div>
          </div>
          <div className="absolute top-[4px] right-[0px] z-20">
            <span
              style={tilt(7)}
              className="dir-pop dir-delay-2 flex items-center gap-2 rounded-full bg-amber px-5 py-3 font-display text-xl text-forest shadow-[0_16px_30px_-14px_rgba(0,0,0,0.6)]"
            >
              <Icon name="pin" className="size-6" /> Pinned for your next shop
            </span>
          </div>
          <div className="absolute top-[200px] left-[6px] z-20">
            <div className="dir-float-side">
              <span className="grid size-[150px] -rotate-[10deg] place-items-center rounded-full bg-lime-bright text-forest shadow-[0_24px_40px_-18px_rgba(0,0,0,0.7)] ring-[10px] ring-forest">
                <BigTick className="size-[92px]" />
              </span>
            </div>
          </div>
          <div className="absolute bottom-[64px] left-[0px] z-20 -rotate-[4deg]">
            <div className="flex items-center gap-6 rounded-[22px] bg-forest-deep py-4 pr-5 pl-6 text-mist shadow-[0_22px_40px_-18px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
              <span className="text-lg">
                <span className="font-semibold">Tomatoes</span> deleted
              </span>
              <span className="rounded-full bg-lime-bright px-4 py-2 font-display text-lg text-forest">Undo</span>
            </div>
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
        <Stage w={560} h={700}>
          <div className="absolute top-[40px] left-[130px] -rotate-[5deg]">
            <div className="dir-float">
              <PhoneFrame scale={0.72}>
                <BoardScreen />
              </PhoneFrame>
            </div>
          </div>
          <div className="absolute top-[40px] left-[10px] z-20 -rotate-[10deg]">
            <span className="grid size-[112px] place-items-center rounded-full border-[6px] border-label bg-forest text-label shadow-[0_18px_30px_-14px_rgba(0,0,0,0.6)]">
              <Icon name="camera" className="size-[52px]" />
            </span>
          </div>
          <div className="absolute top-[0px] right-[4px] z-30">
            <BuyStamp count={2} size={150} className="dir-pop dir-delay-3" />
          </div>
          <div className="absolute top-[300px] left-[0px] z-20">
            <div className="dir-float-side">
              <StickerCard src="/stickers/rice.png" alt="" name="Rice" size="1 kg" buy={2} width={210} aspect={1.25} tilt={-10} />
            </div>
          </div>
          <div className="absolute top-[392px] right-[0px] z-20">
            <StickerCard
              src="/stickers/tuna.png"
              alt=""
              name="Tuna"
              size="170 g"
              note="in brine, not oil!"
              buy={3}
              width={236}
              aspect={0.9}
              tilt={8}
            />
          </div>
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
        <Stage w={560} h={700}>
          <div className="absolute top-[40px] left-[140px] rotate-[5deg]">
            <div className="dir-float">
              <PhoneFrame scale={0.72}>
                <SharedListScreen />
              </PhoneFrame>
            </div>
          </div>
          <div className="absolute top-[150px] left-[0px] z-20">
            <div className="dir-float-side">
              <LiveToast person={PEOPLE.thandi} action="ticked off" item="Rolls" className="-rotate-[4deg] scale-[1.12]" />
            </div>
          </div>
          <div className="absolute top-[400px] right-[0px] z-20">
            <LiveToast person={PEOPLE.sipho} action="added" item="Charcoal" when="1 min ago" className="rotate-[3deg] scale-[1.12]" />
          </div>
          <div className="absolute bottom-[34px] left-[0px] z-20 -rotate-[5deg]">
            <div className="flex items-center gap-4 rounded-full bg-white py-3 pr-7 pl-3 shadow-[0_24px_40px_-20px_rgba(24,54,49,0.7)]">
              <AvatarStack people={[PEOPLE.thandi, PEOPLE.sipho, PEOPLE.lerato]} size={84} />
              <span className="flex items-center gap-2.5 font-display text-2xl">
                <LiveDot size={12} /> Live
              </span>
            </div>
          </div>
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
        <Stage w={560} h={700}>
          <div className="dir-glow absolute top-[120px] left-[90px] size-[400px] rounded-full bg-lime-bright/35 blur-3xl" />
          <LoyaltyCard brand={BRANDS.basket} width={270} className="absolute top-[70px] left-[0px] -rotate-[16deg]" />
          <LoyaltyCard brand={BRANDS.corner} width={270} className="absolute top-[20px] right-[0px] rotate-[13deg]" />
          <div className="absolute top-[40px] left-[140px] -rotate-[4deg]">
            <div className="dir-float">
              <PhoneFrame scale={0.72}>
                <CardDetailScreen />
              </PhoneFrame>
            </div>
          </div>
          <LoyaltyCard brand={BRANDS.sunny} width={250} favourite className="absolute right-[0px] bottom-[70px] z-20 rotate-[8deg]" />
          <div className="absolute bottom-[36px] left-[0px] z-20 -rotate-[7deg]">
            <div className="grid size-[180px] content-center rounded-[36px] bg-amber px-6 text-forest shadow-[0_24px_40px_-18px_rgba(0,0,0,0.7)]">
              <span className="font-display text-[92px] leading-[0.8] tracking-[-0.04em]">{count}</span>
              <span className="mt-2 font-display text-lg leading-tight">{rest.join(" ")}</span>
            </div>
          </div>
          <div className="absolute top-[330px] right-[26px] z-20 rotate-[10deg]">
            <span className="grid size-[92px] place-items-center rounded-full bg-lime-bright text-forest shadow-[0_18px_30px_-14px_rgba(0,0,0,0.7)] ring-[8px] ring-forest-deep">
              <Icon name="sun" className="size-[46px]" />
            </span>
          </div>
        </Stage>
      }
    />
  );
}
