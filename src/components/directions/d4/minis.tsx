import Image from "next/image";
import type { CSSProperties } from "react";

import { Icon } from "@/components/mocks/Icon";
import { AvatarStack, BRANDS, BuyStamp, type CardBrand, CheckCircle, LiveDot, LoyaltyCard, PEOPLE } from "@/components/mocks/parts";

import s from "./d4.module.css";

// Tiny, tile-sized mocks. All decorative: the tile that holds one marks it aria-hidden.

const BAR_WIDTHS = [2, 4, 1, 3, 2, 5, 1, 2];

export function Bars({ count = 34, className = "h-14", tone = "bg-forest" }: { count?: number; className?: string; tone?: string }) {
  return (
    <div className={`flex items-stretch justify-center gap-[2px] ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className={tone} style={{ width: BAR_WIDTHS[i % BAR_WIDTHS.length] }} />
      ))}
    </div>
  );
}

/* ---------- Hero overview ---------- */

export function MiniChecklist() {
  const rows: [string, boolean][] = [
    ["Milk", true],
    ["Brown bread", true],
    ["Eggs", false],
  ];
  return (
    <ul className="w-full max-w-[210px] divide-y divide-forest/8 rounded-2xl bg-mist px-3 ring-1 ring-forest/6">
      {rows.map(([name, done]) => (
        <li key={name} className="flex items-center gap-2.5 py-2">
          <CheckCircle checked={done} size={18} />
          <span className={`text-[13px] font-medium ${done ? "text-forest/40" : ""}`}>{name}</span>
        </li>
      ))}
    </ul>
  );
}

export function MiniStickers() {
  return (
    <div className="relative h-[120px] w-[170px]">
      <div className="absolute top-2 left-0 h-[100px] w-[82px] -rotate-6">
        <Image src="/stickers/rice.png" alt="" fill sizes="164px" className="object-contain drop-shadow-[0_6px_8px_rgba(0,0,0,0.22)]" />
        <span className="absolute -right-2 -bottom-1">
          <BuyStamp count={2} size={30} />
        </span>
      </div>
      <div className="absolute top-6 right-0 h-[86px] w-[92px] rotate-[7deg]">
        <Image src="/stickers/tuna.png" alt="" fill sizes="184px" className="object-contain drop-shadow-[0_6px_8px_rgba(0,0,0,0.22)]" />
        <span className="absolute -right-1 -bottom-2">
          <BuyStamp count={3} size={30} />
        </span>
      </div>
    </div>
  );
}

export function MiniLiveCrew() {
  return (
    <div className="flex flex-col items-start gap-3">
      <AvatarStack people={[PEOPLE.thandi, PEOPLE.sipho, PEOPLE.lerato]} size={40} />
      <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-forest shadow-sm">
        <LiveDot size={7} /> Shopping now
      </span>
    </div>
  );
}

export function MiniCardFan() {
  return (
    <div className="relative h-[120px] w-[190px]">
      <LoyaltyCard brand={BRANDS.corner} width={138} className="absolute top-0 left-0 -rotate-[10deg]" />
      <LoyaltyCard brand={BRANDS.leaf} width={138} className="absolute top-8 left-12 rotate-[6deg]" favourite />
    </div>
  );
}

/* ---------- Lists ---------- */

export function MiniNextShop() {
  return (
    <div className="relative w-full max-w-[230px] rotate-[3deg] rounded-[22px] bg-forest p-4 text-white shadow-[0_18px_30px_-16px_rgba(10,40,33,0.8)]">
      <span className="absolute -top-3 -right-3 grid size-10 place-items-center rounded-full bg-amber text-forest ring-4 ring-lime">
        <Icon name="pin" className="size-5" />
      </span>
      <p className="text-[11px] font-semibold text-lime-bright">Your next shop</p>
      <div className="mt-1 flex items-start justify-between gap-2">
        <span className="text-lg leading-tight font-bold">Weekend shop</span>
        <Icon name="task" className="size-5 shrink-0 text-lime-bright" />
      </div>
      <div className="mt-3 h-1.5 rounded-full bg-white/15">
        <div className="h-full w-[40%] rounded-full bg-lime" />
      </div>
      <p className="mt-2 flex items-center justify-between text-xs text-white/80">
        3 left to pick up <Icon name="arrowRight" className="size-4" />
      </p>
    </div>
  );
}

export function MiniSwipe() {
  return (
    <div className="flex w-full max-w-[240px] flex-col gap-2">
      <div className="flex items-center gap-3 rounded-2xl bg-mist px-3.5 py-2.5 ring-1 ring-forest/6">
        <CheckCircle checked size={20} />
        <span className="text-sm font-medium text-forest/40">Milk</span>
        <span className="text-xs text-forest/35">2 L</span>
      </div>
      <div className="relative overflow-hidden rounded-2xl bg-coral">
        <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs font-bold text-white">Delete</span>
        <div className={`${s.swipe} relative flex items-center gap-3 rounded-2xl bg-white px-3.5 py-2.5 ring-1 ring-forest/8`}>
          <CheckCircle size={20} />
          <span className="text-sm font-medium">Eggs</span>
          <span className="text-xs text-forest/45">× 6</span>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-full bg-forest py-1.5 pr-1.5 pl-4 text-xs text-mist">
        <span>Eggs deleted</span>
        <span className="rounded-full bg-lime px-3 py-1 font-bold text-forest">Undo</span>
      </div>
    </div>
  );
}

export function MiniTextCopy() {
  return (
    <div className="relative w-full max-w-[220px] -rotate-2">
      <div className="rounded-[20px] rounded-br-md bg-white p-4 shadow-[0_16px_28px_-18px_rgba(24,54,49,0.7)]">
        <p className="font-mono text-[11px] leading-[1.7] text-forest/80">
          Weekend shop
          <br />- Eggs × 6
          <br />- Boerewors 1 kg
          <br />- Tomatoes
          <br />- Rooibos tea 80 bags
        </p>
      </div>
      <span className="absolute -top-3 -left-3 grid size-9 place-items-center rounded-full bg-forest text-lime-bright ring-4 ring-paper">
        <Icon name="share" className="size-4" />
      </span>
      <span className="absolute -right-2 -bottom-7 rotate-[-6deg] font-hand text-2xl text-coral">sent!</span>
    </div>
  );
}

/* ---------- Boyfriend Mode ---------- */

export function MiniPhotoToSticker() {
  return (
    <div className="flex w-full items-center justify-center gap-3 sm:gap-5">
      <div className="relative aspect-[3/4] w-[40%] max-w-[132px] -rotate-3 overflow-hidden rounded-[14px] bg-gradient-to-b from-[#e9dcc3] to-[#c9b48f] shadow-[0_14px_24px_-14px_rgba(0,0,0,0.8)] ring-4 ring-white">
        <div className="absolute inset-x-0 bottom-0 h-[38%] bg-[#a8906a]" />
        <Image src="/stickers/tuna.png" alt="" fill sizes="264px" className="object-contain p-4 saturate-[0.8]" />
        <span className="absolute top-2 left-2 size-3 rounded-tl-sm border-t-2 border-l-2 border-white" />
        <span className="absolute top-2 right-2 size-3 rounded-tr-sm border-t-2 border-r-2 border-white" />
        <span className="absolute bottom-2 left-2 size-3 rounded-bl-sm border-b-2 border-l-2 border-white" />
        <span className="absolute right-2 bottom-2 size-3 rounded-br-sm border-r-2 border-b-2 border-white" />
      </div>
      <div className="flex shrink-0 flex-col items-center gap-1 text-lime-bright">
        <Icon name="sparkles" className="size-5" />
        <Icon name="arrowRight" className="size-7" />
      </div>
      <div className="dir-float-side relative aspect-square w-[42%] max-w-[150px]">
        <Image src="/stickers/tuna.png" alt="" fill sizes="300px" className="object-contain drop-shadow-[0_12px_14px_rgba(0,0,0,0.45)]" />
      </div>
    </div>
  );
}

export function MiniStampNote() {
  return (
    <div className="relative mt-6">
      <div className="flex -rotate-3 items-center gap-2.5 rounded-xl bg-label px-4 py-3 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.4)]">
        <CheckCircle size={22} />
        <span className="leading-tight">
          <span className="block text-sm font-semibold">
            Tuna <span className="font-normal text-forest/55">170 g</span>
          </span>
          <span className="block font-hand text-[22px] leading-none">in brine, not oil!</span>
        </span>
      </div>
      <span className={`${s.bob} absolute -top-14 -right-6 block`}>
        <BuyStamp count={3} size={78} />
      </span>
    </div>
  );
}

export function MiniTransform() {
  return (
    <div className="relative grid size-[170px] place-items-center">
      <div className={s.wiggle}>
        <div className="relative size-[112px]">
          <Image src="/stickers/rice.png" alt="" fill sizes="224px" className="object-contain drop-shadow-[0_8px_10px_rgba(0,0,0,0.25)]" />
          <span className="absolute -inset-2.5 rounded-lg border-2 border-dashed border-lime" />
          {["-top-4 -left-4", "-top-4 -right-4", "-bottom-4 -left-4", "-right-4 -bottom-4"].map((pos) => (
            <span key={pos} className={`absolute ${pos} size-3 rounded-full bg-white ring-2 ring-lime`} />
          ))}
          <span className="absolute -top-10 left-1/2 h-6 w-0.5 -translate-x-1/2 bg-lime" />
          <span className="absolute -top-[52px] left-1/2 grid size-6 -translate-x-1/2 place-items-center rounded-full bg-lime text-white">
            <Icon name="arrowRight" className="size-3.5 -rotate-90" />
          </span>
        </div>
      </div>
      <span className="absolute right-0 bottom-3 size-9 rounded-full bg-forest/12 ring-2 ring-white" />
      <span className="absolute top-8 left-0 size-9 rounded-full bg-forest/12 ring-2 ring-white" />
    </div>
  );
}

/* ---------- Shared lists ---------- */

export function MiniHousehold() {
  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex items-center gap-2">
        <AvatarStack people={[PEOPLE.thandi, PEOPLE.sipho, PEOPLE.lerato]} size={54} />
        <span className="grid size-[54px] place-items-center rounded-full border-2 border-dashed border-forest/40 text-forest/60">
          <Icon name="plus" className="size-5" />
        </span>
      </div>
      <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-forest shadow-sm">
        <Icon name="userGroup" className="size-4 text-lime" /> Family braai · 3 people
      </span>
    </div>
  );
}

export function MiniLive() {
  return (
    <div className="flex h-full flex-col justify-between">
      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-lime/15 px-3 py-1.5 text-sm font-semibold text-forest">
        <LiveDot size={8} /> Live now
      </span>
      <div>
        <p className="font-display text-[64px] leading-[0.9] tracking-tight">
          3 <span className="text-forest/30">of</span> 8
        </p>
        <p className="mt-1 text-sm font-semibold text-forest/60">picked up</p>
        <div className="relative mt-4 h-4 overflow-hidden rounded-full bg-forest/8">
          <div className="relative h-full w-[37.5%] overflow-hidden rounded-full bg-lime">
            <span className={`${s.shimmer} absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent`} />
          </div>
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <span key={i} className="absolute inset-y-0 w-px bg-white/70" style={{ left: `${(i / 8) * 100}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Loyalty cards ---------- */

export function MiniScan() {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="relative w-full max-w-[240px] rounded-2xl bg-white p-4 pb-3">
        {["top-1.5 left-1.5 border-t-2 border-l-2 rounded-tl-md", "top-1.5 right-1.5 border-t-2 border-r-2 rounded-tr-md", "bottom-1.5 left-1.5 border-b-2 border-l-2 rounded-bl-md", "right-1.5 bottom-1.5 border-r-2 border-b-2 rounded-br-md"].map((c) => (
          <span key={c} className={`absolute size-4 border-lime ${c}`} />
        ))}
        <Bars className="h-14" />
        <p className="mt-2 text-center font-mono text-[11px] tracking-[0.2em] text-forest">6009 1204 0931</p>
        <span
          className={`${s.scan} absolute inset-x-3 top-3 h-0.5 rounded-full bg-coral shadow-[0_0_12px_2px_rgba(255,107,91,0.7)]`}
          style={{ "--scan-travel": "60px" } as CSSProperties}
        />
      </div>
      <div className="flex gap-1.5 text-[11px] font-semibold">
        {["Scan", "Import", "Type"].map((t, i) => (
          <span key={t} className={`rounded-full px-3 py-1 ${i === 0 ? "bg-lime-bright text-forest" : "bg-white/10 text-mist ring-1 ring-white/15"}`}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function MiniTemplates() {
  const fan: [CardBrand, string][] = [
    [BRANDS.basket, "-rotate-[26deg]"],
    [BRANDS.sunny, "-rotate-[12deg]"],
    [BRANDS.corner, "rotate-[2deg]"],
    [BRANDS.leaf, "rotate-[16deg]"],
  ];
  return (
    <div className="relative h-full min-h-[150px] w-full">
      <span className="absolute -top-4 left-0 font-display text-[112px] leading-none tracking-tighter text-forest">80</span>
      <div className="absolute right-3 -bottom-8 h-[120px] w-[150px]">
        {fan.map(([brand, turn], i) => (
          <LoyaltyCard
            key={brand.name}
            brand={brand}
            width={124}
            favourite={i === fan.length - 1}
            className={`absolute bottom-0 left-2 origin-[20%_110%] ${turn}`}
          />
        ))}
      </div>
    </div>
  );
}

export function MiniBrighten() {
  return (
    <div className="relative grid place-items-center">
      <span
        className={`${s.spin} absolute size-[230px] rounded-full opacity-60`}
        style={{ background: "repeating-conic-gradient(rgb(255 252 245 / 0.9) 0deg 7deg, transparent 7deg 22deg)", maskImage: "radial-gradient(circle, black 30%, transparent 70%)" }}
      />
      <div className="relative w-[160px] rounded-[22px] bg-white p-3.5 shadow-[0_0_46px_14px_rgba(255,252,245,0.75)]">
        <Bars className="h-11" count={30} />
        <div className="mt-3 flex items-center gap-2 text-forest">
          <Icon name="sun" className="size-3.5 opacity-50" />
          <div className="h-1.5 flex-1 rounded-full bg-forest/10">
            <div className="h-full w-full rounded-full bg-amber" />
          </div>
          <Icon name="sun" className="size-5" />
        </div>
      </div>
    </div>
  );
}

/* ---------- Extras ---------- */

export function MiniShareIn() {
  return (
    <div className="flex items-center gap-3">
      <span className="rounded-2xl rounded-bl-sm bg-[#DCF8C6] p-1.5 shadow-sm">
        <span className="relative block size-[72px] overflow-hidden rounded-xl bg-gradient-to-b from-[#e9dcc3] to-[#c9b48f]">
          <Image src="/stickers/rice.png" alt="" fill sizes="144px" className="object-contain p-2" />
        </span>
      </span>
      <Icon name="arrowRight" className="size-6 text-forest/50" />
      <Image src="/brand/grozara-icon.svg" alt="" width={64} height={64} className="size-16 rounded-[18px] shadow-[0_10px_20px_-10px_rgba(24,54,49,0.7)]" />
    </div>
  );
}

export function MiniFaceId() {
  return (
    <div className="relative grid size-[120px] place-items-center rounded-[30px] bg-white/8 ring-1 ring-white/12">
      {["top-3 left-3 border-t-[3px] border-l-[3px] rounded-tl-xl", "top-3 right-3 border-t-[3px] border-r-[3px] rounded-tr-xl", "bottom-3 left-3 border-b-[3px] border-l-[3px] rounded-bl-xl", "right-3 bottom-3 border-r-[3px] border-b-[3px] rounded-br-xl"].map((c) => (
        <span key={c} className={`absolute size-5 border-lime-bright ${c}`} />
      ))}
      <Icon name="faceId" className="size-14 text-lime-bright" />
      <span
        className={`${s.scan} absolute inset-x-5 top-5 h-0.5 rounded-full bg-lime-bright/80 shadow-[0_0_14px_3px_rgba(165,224,99,0.6)]`}
        style={{ "--scan-travel": "78px" } as CSSProperties}
      />
    </div>
  );
}

export function MiniFavourite() {
  return (
    <div className="relative">
      <LoyaltyCard brand={BRANDS.leaf} width={170} favourite className="-rotate-[5deg]" />
      <span className={`${s.bob} absolute -top-6 -right-5 grid size-12 place-items-center rounded-full bg-amber text-forest shadow-[0_8px_16px_-8px_rgba(0,0,0,0.5)]`}>
        <Icon name="star" className="size-6" />
      </span>
    </div>
  );
}

export function MiniClear() {
  return (
    <div className="flex w-full max-w-[210px] flex-col gap-1.5">
      {["Milk", "Brown bread", "Eggs"].map((name) => (
        <span key={name} className="flex items-center gap-2.5 rounded-xl bg-white/55 px-3 py-2 text-[13px] font-medium text-forest/45">
          <CheckCircle checked size={18} /> {name}
        </span>
      ))}
      <span className="mt-1.5 inline-flex items-center justify-center gap-2 rounded-full bg-forest py-2.5 text-sm font-bold text-lime-bright shadow-[0_10px_20px_-12px_rgba(24,54,49,0.9)]">
        <Icon name="tick" className="size-4" /> Clear 3 checked
      </span>
    </div>
  );
}

/* ---------- How it works ---------- */

export function MiniTyping() {
  return (
    <div className="flex w-full max-w-[260px] items-center gap-2 rounded-full bg-mist p-1.5 pl-4 ring-1 ring-forest/8">
      <span className="flex-1 text-[15px] font-medium">
        Rooibos tea<span className={`${s.blink} ml-0.5 inline-block h-[1.05em] w-0.5 translate-y-[3px] bg-lime`} />
      </span>
      <span className="grid size-9 place-items-center rounded-full bg-lime text-white">
        <Icon name="plus" className="size-5" />
      </span>
    </div>
  );
}

export function MiniInvite() {
  return (
    <div className="flex items-center gap-3">
      <AvatarStack people={[PEOPLE.thandi, PEOPLE.sipho, PEOPLE.lerato]} size={44} />
      <span className="rounded-full bg-forest px-3.5 py-2 text-sm font-semibold text-lime-bright">Shared with 3</span>
    </div>
  );
}

export function MiniTill() {
  return (
    <div className="flex items-center gap-3">
      <span className="flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-2.5 text-sm font-medium text-mist ring-1 ring-white/12">
        <span className="grid size-5 place-items-center rounded-full bg-lime text-forest">
          <Icon name="tick" className="size-3" />
        </span>
        Rolls
      </span>
      <span className="rounded-2xl bg-white px-3 py-2.5">
        <Bars className="h-8" count={18} />
      </span>
    </div>
  );
}
