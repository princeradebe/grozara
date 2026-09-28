"use client";

import Image from "next/image";
import { type CSSProperties, type MouseEvent, useEffect, useRef, useState } from "react";

import { Icon } from "@/components/mocks/Icon";

import { ZaraMark } from "./ZaraMark";

// The footer's easter egg: tap the footer logo or the giant wordmark four times in quick succession
// and the wordmark throws a party. Both count towards the same streak, and the party is announced
// with a window event so the two halves of the footer stay separate islands.

const PARTY = "grozara:party";
const CLICKS = 4;
/** Taps further apart than this start the count again. */
const WINDOW_MS = 1200;
const PARTY_MS = 3800;

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let streak = { taps: 0, last: 0 };

function countTap() {
  const now = performance.now();
  streak = { taps: now - streak.last < WINDOW_MS ? streak.taps + 1 : 1, last: now };
  if (streak.taps < CLICKS) return;
  streak = { taps: 0, last: 0 };
  window.dispatchEvent(new Event(PARTY));
}

const BOING: Keyframe[] = [
  { transform: "none" },
  { transform: "scale(1.12, 0.82)", offset: 0.3 },
  { transform: "scale(0.94, 1.08)", offset: 0.62 },
  { transform: "none" },
];

/** A squash-and-stretch per tap. A Web Animation restarts on every call without remounting anything. */
function boing(el: Element | null) {
  if (!el || reducedMotion()) return;
  el.animate(BOING, { duration: 420, easing: "cubic-bezier(0.3, 1.4, 0.5, 1)" });
}

/**
 * Quick taps are the whole point, so switch off what browsers do with them: a double or triple
 * click selects the nearest text, and on iPhone a double tap zooms (hence touch-manipulation on
 * both buttons).
 */
function keepMultiClickFromSelecting(event: MouseEvent) {
  if (event.detail > 1) event.preventDefault();
}

/** The footer logo. Each tap gives a little boing, and it shows the "found it" bubble when the party starts. */
export function EggLogo() {
  const [found, setFound] = useState(0);
  const logo = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let timer: number | undefined;
    const celebrate = () => {
      setFound((f) => f + 1);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setFound(0), PARTY_MS);
    };
    window.addEventListener(PARTY, celebrate);
    return () => {
      window.removeEventListener(PARTY, celebrate);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => {
          boing(logo.current);
          countTap();
        }}
        onMouseDown={keepMultiClickFromSelecting}
        aria-label="Grozara"
        className="block cursor-pointer touch-manipulation select-none [-webkit-tap-highlight-color:transparent]"
      >
        {/* Not draggable: a slight drag between quick clicks would pick the image up and cancel the click. */}
        <Image
          ref={logo}
          src="/brand/grozara-logo-white.svg"
          alt=""
          draggable={false}
          width={286}
          height={64}
          className="h-10 w-auto origin-bottom-left"
        />
      </button>
      {found ? (
        <span
          key={found}
          role="status"
          className="dir-pop absolute top-full left-0 mt-3 flex items-center gap-2 rounded-2xl rounded-tl-sm bg-lime-bright px-4 py-2 font-display text-lg whitespace-nowrap text-forest shadow-[0_18px_30px_-14px_rgba(0,0,0,0.7)]"
        >
          <Icon name="sparkles" className="size-5" /> Lekker! You found the secret
        </span>
      ) : null}
    </div>
  );
}

const LETTER_COLOURS = ["#FF6B5B", "#FFB902", "#FF8FA3", "#A5E063", "#FFFCF5", "#FF6B5B", "#FFB902"];

type Item = { kind: "rice" | "tuna" | "card" | "spark" | "zara"; x: number; size: number; delay: number; spin: number; drift: number; hue: string };

const CARD_HUES = ["linear-gradient(140deg,#FF7A59,#D8402F)", "linear-gradient(140deg,#2F8F6B,#15473C)", "linear-gradient(140deg,#6C7BFF,#3A2FB8)", "linear-gradient(140deg,#FFC93C,#F08A12)"];
const SPARK_HUES = ["#FFB902", "#FF6B5B", "#FF8FA3", "#FFFCF5", "#A5E063"];

/** A fresh, random shower for each party (only ever built after a click, so no hydration to match). */
function shower(): Item[] {
  const kinds: Item["kind"][] = ["zara", "rice", "card", "spark", "tuna", "card", "spark", "zara", "rice", "spark", "card", "tuna", "spark", "card", "spark", "rice"];
  return kinds.map((kind, i) => ({
    kind,
    x: 4 + ((i * 61) % 92) + Math.random() * 4,
    size: kind === "spark" ? 22 + Math.random() * 18 : kind === "zara" ? 86 + Math.random() * 24 : 64 + Math.random() * 34,
    delay: i * 0.09 + Math.random() * 0.25,
    spin: (Math.random() - 0.5) * 70,
    drift: (Math.random() - 0.5) * 90,
    hue: kind === "card" ? CARD_HUES[i % CARD_HUES.length] : SPARK_HUES[i % SPARK_HUES.length],
  }));
}

function Faller({ item }: { item: Item }) {
  const style = {
    left: `${item.x}%`,
    width: item.size,
    height: item.kind === "card" ? item.size * 0.63 : item.size,
    animationDelay: `${item.delay}s`,
    "--spin": `${item.spin}deg`,
    "--drift": `${item.drift}px`,
  } as CSSProperties;
  return (
    <span className="dir-drop-bounce absolute bottom-0" style={style}>
      {item.kind === "zara" ? (
        <ZaraMark phase="launch" />
      ) : item.kind === "rice" || item.kind === "tuna" ? (
        <Image src={`/stickers/${item.kind}.png`} alt="" width={200} height={200} className="size-full object-contain drop-shadow-[0_8px_8px_rgba(0,0,0,0.35)]" />
      ) : item.kind === "card" ? (
        <span className="block size-full rounded-[10%] shadow-[0_10px_16px_-8px_rgba(0,0,0,0.6)]" style={{ background: item.hue }} />
      ) : (
        <svg viewBox="0 0 24 24" className="size-full" style={{ color: item.hue }}>
          <path d="M12 1.5c.9 5.6 4.9 9.6 10.5 10.5-5.6.9-9.6 4.9-10.5 10.5C11.1 16.9 7.1 12.9 1.5 12 7.1 11.1 11.1 7.1 12 1.5Z" fill="currentColor" />
        </svg>
      )}
    </span>
  );
}

/**
 * The giant footer wordmark. It counts taps too, since it's the logo most people try, and each tap
 * squashes the letter under it. On a party its letters jelly-bounce and a shower of the site lands
 * on them.
 */
export function PartyWordmark() {
  const [party, setParty] = useState<{ id: number; items: Item[] } | null>(null);

  useEffect(() => {
    let timer: number | undefined;
    const start = () => {
      setParty((p) => ({ id: (p?.id ?? 0) + 1, items: reducedMotion() ? [] : shower() }));
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setParty(null), PARTY_MS + 1200);
    };
    window.addEventListener(PARTY, start);
    return () => {
      window.removeEventListener(PARTY, start);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div aria-hidden className="dir-wordmark relative">
      {party ? (
        // Anchored to the letters' tops, so everything lands on them.
        <div key={party.id} className="pointer-events-none absolute inset-x-0 bottom-[62%] h-[110vh]">
          {party.items.map((item, i) => (
            <Faller key={i} item={item} />
          ))}
        </div>
      ) : null}
      {/* Out of the tab order: the footer logo is the keyboard way in. */}
      <button
        type="button"
        tabIndex={-1}
        onClick={(event) => {
          boing((event.target as Element).closest("[data-letter]") ?? event.currentTarget);
          countTap();
        }}
        onMouseDown={keepMultiClickFromSelecting}
        className="-mb-[0.2em] block w-full origin-bottom cursor-pointer touch-manipulation text-center font-display text-[25vw] leading-[0.9] tracking-[-0.055em] whitespace-nowrap text-lime select-none [-webkit-tap-highlight-color:transparent]"
      >
        {"Grozara".split("").map((letter, i) => (
          <span
            key={`${party?.id ?? 0}-${i}`}
            data-letter
            className={`inline-block origin-bottom ${party ? "dir-letter-bounce" : ""}`}
            style={{ animationDelay: `${i * 0.075}s`, "--party": LETTER_COLOURS[i] } as CSSProperties}
          >
            {letter}
          </span>
        ))}
      </button>
    </div>
  );
}
