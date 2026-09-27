import Image from "next/image";
import type { ReactNode } from "react";

import { Icon, type IconName } from "@/components/mocks/Icon";
import { BRANDS, BuyStamp, CheckCircle, LoyaltyCard } from "@/components/mocks/parts";
import { EXTRAS } from "@/content/site";

import styles from "./d2.module.css";
import { Fireflies, GLASS, IconBadge, Kicker, type Vars } from "./ui";

/** A photo from another app landing on a Boyfriend Mode board. */
function ShareVisual() {
  return (
    <div className="flex items-center gap-2">
      <div className="-rotate-6 rounded-2xl bg-label p-2 shadow-[0_14px_24px_-12px_rgba(0,0,0,0.7)]">
        <Image src="/stickers/tuna.png" alt="" width={900} height={805} className="h-14 w-auto" />
      </div>
      <svg viewBox="0 0 60 30" className="w-12 text-lime-bright" aria-hidden>
        <path d="M3 22 C 18 2, 38 2, 52 16" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeDasharray="1 6" />
        <path d="M44 15 L 53 17 L 52 8" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="dir-paper relative rotate-3 rounded-2xl px-3 pt-2.5 pb-3 text-forest shadow-[0_14px_24px_-12px_rgba(0,0,0,0.7)]">
        <p className="text-[11px] font-bold">Braai Saturday</p>
        <div className="mt-1.5 flex gap-1.5">
          <span className="size-8 rounded-md bg-white shadow-sm" />
          <span className="size-8 rounded-md bg-white shadow-sm" />
        </div>
        <BuyStamp count={3} size={30} className="absolute -top-3 -right-3" />
      </div>
    </div>
  );
}

function FaceIdVisual() {
  return (
    <div className="relative grid size-28 place-items-center rounded-[30px] bg-forest-deep/70 shadow-[0_0_50px_-8px_rgba(165,224,99,0.6)] ring-1 ring-lime-bright/30">
      {(["top-3 left-3 border-t-2 border-l-2", "top-3 right-3 border-t-2 border-r-2", "bottom-3 left-3 border-b-2 border-l-2", "bottom-3 right-3 border-r-2 border-b-2"] as const).map((c) => (
        <span key={c} className={`absolute size-5 rounded-[5px] border-lime-bright/80 ${c}`} />
      ))}
      <Icon name="faceId" className="size-12 text-lime-bright" />
      <div className="absolute inset-x-5 top-5 overflow-hidden">
        <div className={`${styles.scan} h-0.5 rounded-full bg-lime-bright shadow-[0_0_10px_2px_rgba(165,224,99,0.8)]`} style={{ "--scan": "68px" } as Vars} />
      </div>
    </div>
  );
}

function FavouritesVisual() {
  return (
    <div className="relative h-32 w-52">
      <div className="absolute top-1 left-0 w-36 -rotate-6 rounded-2xl bg-forest p-3 text-white shadow-[0_14px_24px_-12px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-bold">Weekend shop</span>
          <Icon name="task" className="size-4 text-lime-bright" />
        </div>
        <div className="mt-3 h-1 rounded-full bg-white/15">
          <div className="h-full w-[40%] rounded-full bg-lime" />
        </div>
      </div>
      <div className="absolute right-0 bottom-0 rotate-6">
        <LoyaltyCard brand={BRANDS.corner} width={124} favourite />
      </div>
      <Icon name="star" className="absolute top-0 right-3 size-7 text-amber drop-shadow-[0_0_10px_rgba(255,185,2,0.8)]" />
    </div>
  );
}

function ClearVisual() {
  return (
    <div className="w-48 rounded-2xl bg-label p-3 text-forest shadow-[0_14px_24px_-12px_rgba(0,0,0,0.7)]">
      {["Milk", "Brown bread", "Eggs"].map((item) => (
        <p key={item} className="flex items-center gap-2 border-b border-forest/8 py-1.5 text-[13px] font-medium text-forest/40 last:border-0">
          <CheckCircle checked size={16} /> {item}
        </p>
      ))}
      <span className="mt-2 flex items-center justify-center gap-1.5 rounded-full bg-lime py-1.5 text-[12px] font-bold text-white shadow-[0_0_20px_rgba(126,195,64,0.6)]">
        <Icon name="tick" className="size-3.5" /> Clear checked
      </span>
    </div>
  );
}

/** Each extra's little scene, keyed by its icon in EXTRAS. */
const VISUALS: Partial<Record<IconName, ReactNode>> = {
  share: <ShareVisual />,
  faceId: <FaceIdVisual />,
  star: <FavouritesVisual />,
  tick: <ClearVisual />,
};

/** The encore: the smaller features, each on its own little lit stage of dark glass. */
export function Extras() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <Fireflies count={16} seed={5} />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[40rem] w-[80rem] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(36,82,74,0.55),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="dir-reveal mx-auto max-w-2xl text-center">
          <Kicker n="+" label="The encore" center />
          <h2 className="mt-6 font-display text-[2.6rem] leading-[1.02] tracking-tight text-label sm:text-5xl lg:text-6xl">
            And there&rsquo;s <span className="text-lime-bright [text-shadow:0_0_42px_rgba(165,224,99,0.4)]">more.</span>
          </h2>
        </div>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {EXTRAS.map((extra) => (
            <li key={extra.title} className={`dir-reveal ${GLASS} flex flex-col overflow-hidden rounded-[28px]`}>
              <div aria-hidden className="relative grid h-48 place-items-center overflow-hidden">
                <div className="absolute inset-x-0 -top-10 h-full bg-[radial-gradient(closest-side,rgba(165,224,99,0.2),transparent)]" />
                <div className="absolute top-0 left-1/2 h-full w-40 -translate-x-1/2 bg-[linear-gradient(to_bottom,rgba(214,255,170,0.1),transparent)] [clip-path:polygon(40%_0,60%_0,100%_100%,0_100%)]" />
                <div className="relative">{VISUALS[extra.icon] ?? <IconBadge icon={extra.icon} className="size-20" />}</div>
              </div>
              <div className="flex flex-1 flex-col border-t border-white/10 p-6">
                <div className="flex items-center gap-3">
                  <IconBadge icon={extra.icon} />
                  <h3 className="font-display text-xl text-label">{extra.title}</h3>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-mist/65">{extra.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
