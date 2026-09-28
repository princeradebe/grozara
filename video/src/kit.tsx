import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from "remotion";

import { lerp, ramp, slam, wobble } from "./anim";
import { FPS, PUSH, type Scene } from "./timeline";

/** Four-point sparkle, the marquee separator from the site's Lime pop direction. */
export function Spark({ size, className = "", style }: { size: number; className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={`shrink-0 ${className}`} style={style} aria-hidden>
      <path d="M12 1.5c.9 5.6 4.9 9.6 10.5 10.5-5.6.9-9.6 4.9-10.5 10.5C11.1 16.9 7.1 12.9 1.5 12 7.1 11.1 11.1 7.1 12 1.5Z" fill="currentColor" />
    </svg>
  );
}

/** A tilted marquee strip, moved by the frame rather than a CSS animation. */
export function TickerBar({
  words,
  y,
  angle,
  bar,
  ink,
  spark,
  speed = 9,
}: {
  words: readonly string[];
  y: number;
  angle: number;
  bar: string;
  ink: string;
  spark: string;
  speed?: number;
}) {
  const frame = useCurrentFrame();
  const run = [...words, ...words, ...words];
  return (
    <div
      className={`absolute left-1/2 flex h-[128px] w-[1700px] items-center overflow-hidden shadow-[0_24px_40px_-18px_rgba(0,0,0,0.55)] ${bar}`}
      style={{ top: y, transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
    >
      <div className="flex items-center gap-10 whitespace-nowrap" style={{ transform: `translateX(${-((frame * speed) % 900)}px)` }}>
        {run.map((word, i) => (
          <span key={i} className={`flex items-center gap-10 font-display text-[64px] leading-none tracking-[-0.02em] ${ink}`}>
            {word}
            <Spark size={46} className={spark} />
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * A full-bleed colour band. Unless it's the first, it pushes up over the previous band behind a
 * tilted edge with a ticker riding the seam, the way the site's bands meet.
 */
export function Band({
  className,
  entrance = true,
  ticker,
  hits = [],
  children,
}: {
  className: string;
  entrance?: boolean;
  ticker?: { words: readonly string[]; bar: string; ink: string; spark: string };
  /** Frames where something lands hard enough to shake the camera. */
  hits?: number[];
  children: ReactNode;
}) {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const p = entrance ? ramp(frame, 0, PUSH, Easing.bezier(0.7, 0, 0.2, 1)) : 1;
  const slope = 70;
  const edge = lerp(height + 220, -220, p);
  const angle = (Math.atan2(-2 * slope, width) * 180) / Math.PI;
  const moving = entrance && p < 1;
  const shake = hits.reduce((t, at) => t + wobble(frame, at, 2.3, 0.45), 0);
  // A slow push-in, so no band ever sits dead still.
  const zoom = 1 + frame * 0.00011;
  return (
    <>
      <AbsoluteFill
        className={className}
        style={moving ? { clipPath: `polygon(0 ${edge + slope}px, 100% ${edge - slope}px, 100% 100%, 0 100%)` } : undefined}
      >
        <AbsoluteFill
          style={{ transform: `translate(${shake * 5}px, ${(1 - p) * 260 + shake * 7}px) scale(${zoom})`, transformOrigin: "50% 45%" }}
        >
          {children}
        </AbsoluteFill>
      </AbsoluteFill>
      {moving && ticker ? <TickerBar {...ticker} y={edge} angle={angle} /> : null}
    </>
  );
}

/** The giant verb, each word slamming down a beat after the last. */
export function Verb({ text, at, className = "", style }: { text: string; at: number; className?: string; style?: CSSProperties }) {
  const frame = useCurrentFrame();
  return (
    <p className={`flex gap-[0.22em] font-display leading-[0.86] tracking-[-0.045em] whitespace-nowrap ${className}`} style={style}>
      {text.split(" ").map((word, i) => {
        const s = slam(frame, at + i * 4);
        return (
          <span
            key={i}
            className="inline-block"
            style={{ opacity: Math.min(1, s * 2), transform: `translateY(${(1 - s) * -140}px) scale(${lerp(1.5, 1, s)}) rotate(${(1 - s) * -8}deg)` }}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
}

/**
 * Captions for sound-off viewing: the line in a card near the bottom of the frame, each word
 * lighting up as it's spoken. Caption words and transcript words don't pair one to one ("80+" is
 * heard as "80 plus"), so each caption word takes the time of the transcript word at the same
 * point through the line. The first `lead` words (the verb) are picked out in colour.
 */
export function Caption({ s, lead = 0 }: { s: Scene; lead?: number }) {
  const frame = useCurrentFrame();
  const words = s.text.split(" ");
  const heard = s.words;
  const startOf = (i: number) =>
    heard.length > 0
      ? s.voiceAt + Math.round(heard[Math.floor((i * heard.length) / words.length)].start * FPS)
      : s.voiceAt + Math.round((i / words.length) * s.voiceFrames * 0.92);
  const enter = slam(frame, s.voiceAt - 4);
  if (frame < s.voiceAt - 4) return null;
  return (
    <div
      className="absolute inset-x-0 top-[1540px] flex justify-center px-[48px]"
      style={{ opacity: Math.min(1, enter * 2), transform: `translateY(${(1 - enter) * 70}px)` }}
    >
      <p className="rounded-[40px] bg-label px-11 py-7 text-center font-display text-[50px] leading-[1.1] tracking-[-0.015em] text-forest shadow-[0_30px_50px_-24px_rgba(13,33,29,0.7)]">
        {words.map((word, i) => (
          <span key={i} className={i < lead ? "text-coral" : ""} style={{ opacity: frame >= startOf(i) - 2 ? 1 : 0.14 }}>
            {word}{" "}
          </span>
        ))}
      </p>
    </div>
  );
}
