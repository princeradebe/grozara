"use client";

import dynamic from "next/dynamic";
import type { ExperienceMode } from "./Experience";

// `ssr: false` has to live in a client component; this wrapper exists for that. three, R3F and
// Rapier's WASM all land in this one lazy chunk, so the HTML copy paints without them.
const Experience = dynamic(() => import("./Experience"), { ssr: false });

// A data attribute rather than state: the poster and hint fade in CSS, nothing re-renders.
function markReady(mode: ExperienceMode) {
  document.documentElement.dataset.experience = mode;
}

// Zara's centre, matching computeStage(): centred low on phones, right of the copy when wide.
const STAGE_POSITION =
  "left-1/2 top-[66.5%] [@media(min-aspect-ratio:17/20)]:left-[70%] [@media(min-aspect-ratio:17/20)]:top-[61%]";

export function ExperienceLoader() {
  return (
    <div aria-hidden className="fixed inset-0">
      <div className="night-sky absolute inset-0" />
      <ZaraPoster />
      <Experience onReady={markReady} />
      <p
        className={`zara-hint font-hand pointer-events-none absolute translate-x-[9vh] -translate-y-[17vh] -rotate-6 [@media(min-aspect-ratio:17/20)]:translate-x-[12vh] text-2xl leading-none font-bold text-lime-bright ${STAGE_POSITION}`}
      >
        grab me!
        <svg viewBox="0 0 40 30" className="mt-1 -ml-3 h-7 w-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M34 3 C 30 16, 20 22, 6 22" />
          <path d="M12 16 L 5 22 L 13 27" />
        </svg>
      </p>
    </div>
  );
}

// The 2D sticker Zara from the reel: shown while the 3D chunk loads, and for good if WebGL can't start.
function ZaraPoster() {
  return (
    <svg
      viewBox="0 0 120 150"
      className={`zara-poster absolute h-[25vh] -translate-x-1/2 -translate-y-[58%] drop-shadow-[0_10px_18px_rgba(0,0,0,0.35)] ${STAGE_POSITION}`}
    >
      <defs>
        <linearGradient id="zara-lime" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A5E063" />
          <stop offset="0.5" stopColor="#7EC340" />
          <stop offset="1" stopColor="#5FA52C" />
        </linearGradient>
      </defs>
      <path d="M43 46 V30 a17 17 0 0 1 34 0 V46" fill="none" stroke="#fff" strokeWidth="13" strokeLinecap="round" />
      <path d="M43 46 V30 a17 17 0 0 1 34 0 V46" fill="none" stroke="#183631" strokeWidth="7" strokeLinecap="round" />
      <rect x="10" y="42" width="100" height="100" rx="30" fill="url(#zara-lime)" stroke="#fff" strokeWidth="8" />
      <circle cx="27" cy="58" r="4.5" fill="#FFB902" stroke="#fff" strokeWidth="2.5" />
      <ellipse cx="42.5" cy="80" rx="10" ry="12" fill="#fff" />
      <ellipse cx="77.5" cy="80" rx="10" ry="12" fill="#fff" />
      <circle cx="43" cy="82" r="5.8" fill="#183631" />
      <circle cx="78" cy="82" r="5.8" fill="#183631" />
      <circle cx="41.2" cy="79.8" r="1.8" fill="#fff" />
      <circle cx="76.2" cy="79.8" r="1.8" fill="#fff" />
      <ellipse cx="30" cy="100" rx="7" ry="3.8" fill="#FF8FA3" opacity="0.55" />
      <ellipse cx="90" cy="100" rx="7" ry="3.8" fill="#FF8FA3" opacity="0.55" />
      <ellipse cx="60" cy="106" rx="8" ry="5.5" fill="#183631" />
      <path d="M53.4 108.2 Q60 104.6 66.6 108.2 A8 5.5 0 0 1 53.4 108.2 Z" fill="#FF6B5B" />
    </svg>
  );
}
