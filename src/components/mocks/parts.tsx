import Image from "next/image";

import { Icon, type IconName } from "./Icon";

/**
 * `relative` by default, so the card's own layers have an anchor. A caller that positions it
 * (`absolute`, `fixed`) keeps that position: with both classes, Tailwind's order would pick `relative`.
 */
function positioned(className: string) {
  return /(^|\s)(absolute|fixed|sticky)(\s|$)/.test(className) ? "" : "relative";
}

/** The check-off circle from the app: a ring, filled with a light tick once picked up. */
export function CheckCircle({ checked = false, size = 24 }: { checked?: boolean; size?: number }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full border-forest ${checked ? "bg-forest" : ""}`}
      style={{ width: size, height: size, borderWidth: size * 0.09 }}
    >
      {checked ? (
        <svg viewBox="0 0 14 11" aria-hidden style={{ width: size * 0.48 }}>
          <path d="M1 6.2 4.5 9.6 13 1" fill="none" stroke="#FFFCF5" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}
    </span>
  );
}

/** The yellow promo-style "BUY N" stamp that sits on a sticker's corner. */
export function BuyStamp({ count, size = 44, className = "" }: { count: number; size?: number; className?: string }) {
  const points = Array.from({ length: 32 }, (_, i) => {
    const r = i % 2 === 0 ? 50 : 42;
    const a = (i * Math.PI) / 16 - Math.PI / 2;
    return `${50 + r * Math.cos(a)},${50 + r * Math.sin(a)}`;
  }).join(" ");
  return (
    <span className={`relative grid place-items-center text-forest ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 drop-shadow-[0_3px_4px_rgba(0,0,0,0.18)]" aria-hidden>
        <polygon points={points} fill="#FFB902" />
      </svg>
      <span className="relative flex flex-col items-center leading-none" style={{ transform: "rotate(-12deg)" }}>
        <span className="font-display tracking-wide" style={{ fontSize: size * 0.19 }}>BUY</span>
        <span className="font-display" style={{ fontSize: size * 0.42 }}>{count}</span>
      </span>
    </span>
  );
}

export type CardBrand = {
  name: string;
  from: string;
  to: string;
  accent: string;
  digits: string;
  glyph: IconName;
};

/** Made-up programmes: the site never shows real retailer marks. */
export const BRANDS = {
  basket: { name: "Basket Club", from: "#FF7A59", to: "#D8402F", accent: "#FFD7A8", digits: "4412", glyph: "basket" },
  leaf: { name: "Leaf Rewards", from: "#2F8F6B", to: "#15473C", accent: "#A5E063", digits: "0931", glyph: "sparkles" },
  corner: { name: "Corner Points", from: "#6C7BFF", to: "#3A2FB8", accent: "#C9CFFF", digits: "7941", glyph: "star" },
  sunny: { name: "Sunny Pantry", from: "#FFC93C", to: "#F08A12", accent: "#FFF1C2", digits: "2208", glyph: "sun" },
} satisfies Record<string, CardBrand>;

/** A loyalty card face, drawn like the app's card art: gradient, a disc and a ring. */
export function LoyaltyCard({
  brand,
  width = 320,
  favourite = false,
  className = "",
}: {
  brand: CardBrand;
  width?: number;
  favourite?: boolean;
  className?: string;
}) {
  const height = width * 0.63;
  return (
    <div
      className={`${positioned(className)} overflow-hidden text-white shadow-[0_18px_30px_-16px_rgba(10,30,25,0.55)] ${className}`}
      style={{
        width,
        height,
        borderRadius: width * 0.075,
        background: `linear-gradient(140deg, ${brand.from}, ${brand.to})`,
      }}
    >
      <span
        className="absolute rounded-full opacity-70"
        style={{ width: width * 0.46, height: width * 0.46, left: width * 0.4, top: height * 0.34, background: brand.accent, mixBlendMode: "soft-light" }}
      />
      <span
        className="absolute rounded-full border-white/25"
        style={{ width: width * 0.3, height: width * 0.3, left: width * 0.5, top: -height * 0.22, borderWidth: width * 0.035 }}
      />
      <div className="absolute inset-0 flex flex-col justify-between" style={{ padding: width * 0.065 }}>
        <div className="flex items-start justify-between">
          <span
            className="flex items-center rounded-full bg-white font-display text-forest"
            style={{ gap: width * 0.02, padding: `${width * 0.018}px ${width * 0.04}px`, fontSize: width * 0.05 }}
          >
            <Icon name={brand.glyph} className="size-[1.1em]" />
            {brand.name}
          </span>
          {favourite ? <Icon name="star" className="size-[1.1em] text-amber" /> : null}
        </div>
        <span className="font-mono tracking-[0.18em] text-white/90" style={{ fontSize: width * 0.048 }}>
          •••• {brand.digits}
        </span>
      </div>
    </div>
  );
}

/** A Boyfriend Mode sticker: the white-outlined photo, its paper label and the BUY stamp. */
export function StickerCard({
  src,
  alt,
  name,
  size,
  note,
  buy,
  checked = false,
  width = 170,
  aspect,
  tilt = 0,
  className = "",
}: {
  src: string;
  alt: string;
  name: string;
  size?: string;
  note?: string;
  buy: number;
  checked?: boolean;
  width?: number;
  aspect: number;
  tilt?: number;
  className?: string;
}) {
  const photoH = width * aspect;
  return (
    <figure className={`${positioned(className)} ${className}`} style={{ width, transform: `rotate(${tilt}deg)` }}>
      <div className="relative" style={{ height: photoH }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${Math.round(width * 2)}px`}
          loading="eager"
          className={`object-contain drop-shadow-[0_8px_10px_rgba(0,0,0,0.22)] ${checked ? "opacity-65" : ""}`}
        />
        <BuyStamp count={buy} size={width * 0.3} className="absolute -right-[6%] -bottom-[6%] z-10" />
      </div>
      <figcaption
        className="mt-[5px] flex items-start gap-[8px] rounded-[10px] bg-label shadow-[0_3px_6px_-2px_rgba(0,0,0,0.14)]"
        style={{ padding: width * 0.06 }}
      >
        <CheckCircle checked={checked} size={width * 0.135} />
        <span className={`min-w-0 leading-tight ${checked ? "opacity-45" : ""}`}>
          <span className="block font-semibold" style={{ fontSize: width * 0.09 }}>
            {name}
            {size ? <span className="ml-[0.35em] font-normal text-forest/55">{size}</span> : null}
          </span>
          {note ? (
            <span className="block font-hand text-forest" style={{ fontSize: width * 0.1 }}>
              {note}
            </span>
          ) : null}
        </span>
      </figcaption>
    </figure>
  );
}

/** The app's Liquid Glass tab bar with the detached green + button. */
export function TabBar({ active }: { active: "home" | "lists" | "cards" | "account" }) {
  const tabs: [typeof active, IconName, string][] = [
    ["home", "home", "Home"],
    ["lists", "list", "Lists"],
    ["cards", "card", "Cards"],
    ["account", "user", "Account"],
  ];
  return (
    <div className="absolute inset-x-[18px] bottom-[26px] z-20 flex items-center gap-[10px]">
      <nav className="flex flex-1 items-center justify-between rounded-full border border-white/70 bg-white/80 p-[5px] shadow-[0_10px_24px_-12px_rgba(10,40,33,0.45)] backdrop-blur-md">
        {tabs.map(([key, icon, label]) => (
          <span
            key={key}
            className={`flex flex-1 flex-col items-center gap-[2px] rounded-full py-[6px] text-[11px] font-semibold ${
              key === active ? "bg-forest/8 text-forest" : "text-forest/70"
            }`}
          >
            <Icon name={icon} className="size-[22px]" />
            {label}
          </span>
        ))}
      </nav>
      <span className="grid size-[62px] shrink-0 place-items-center rounded-full border-[3px] border-white bg-lime text-white shadow-[0_10px_20px_-10px_rgba(60,120,30,0.8)]">
        <Icon name="plus" className="size-[28px]" />
      </span>
    </div>
  );
}

export function GlassCircle({ icon, className = "" }: { icon: IconName; className?: string }) {
  return (
    <span className={`grid size-[44px] place-items-center rounded-full border border-white/80 bg-white/85 text-forest shadow-[0_6px_16px_-10px_rgba(10,40,33,0.5)] ${className}`}>
      <Icon name={icon} className="size-[20px]" />
    </span>
  );
}

export type Person = { name: string; initials: string; color: string; isOwner?: boolean };

/** The household in the shared-list mocks. Mirrors the app's Collaborator (name, initials, isOwner). */
export const PEOPLE = {
  thandi: { name: "Thandi", initials: "TM", color: "#7EC340", isOwner: true },
  sipho: { name: "Sipho", initials: "SK", color: "#FFB902" },
  lerato: { name: "Lerato", initials: "LN", color: "#FF8FA3" },
} satisfies Record<string, Person>;

export function Avatar({ person, size = 32, className = "" }: { person: Person; size?: number; className?: string }) {
  return (
    <span
      title={person.name}
      className={`grid shrink-0 place-items-center rounded-full font-display text-forest ${className}`}
      style={{ width: size, height: size, background: person.color, fontSize: size * 0.36, boxShadow: `0 0 0 ${Math.max(2, size * 0.07)}px #fff` }}
    >
      {person.initials}
    </span>
  );
}

export function AvatarStack({ people, size = 32 }: { people: Person[]; size?: number }) {
  return (
    <span className="flex items-center">
      {people.map((p, i) => (
        <span key={p.initials} className="relative" style={{ marginLeft: i ? -size * 0.22 : 0, zIndex: people.length - i }}>
          <Avatar person={p} size={size} />
        </span>
      ))}
    </span>
  );
}

/** A pulsing green dot: someone is shopping right now. */
export function LiveDot({ size = 8 }: { size?: number }) {
  return (
    <span className="relative inline-flex shrink-0" style={{ width: size, height: size }}>
      <span className="absolute inset-0 animate-ping rounded-full bg-lime opacity-60" />
      <span className="relative inline-flex size-full rounded-full bg-lime" />
    </span>
  );
}

/** A floating notification for shared lists, e.g. "Thandi ticked off Rolls · just now". */
export function LiveToast({
  person,
  action,
  item,
  when = "just now",
  className = "",
}: {
  person: Person;
  action: string;
  item: string;
  when?: string;
  className?: string;
}) {
  return (
    <div
      className={`${positioned(className)} flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-forest shadow-[0_18px_34px_-18px_rgba(24,54,49,0.6)] ${className}`}
    >
      <Avatar person={person} size={34} />
      <span className="text-sm leading-tight">
        <span className="font-semibold">{person.name}</span> {action} <span className="font-semibold">{item}</span>
        <span className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-forest/50">
          <LiveDot size={6} /> {when}
        </span>
      </span>
    </div>
  );
}
