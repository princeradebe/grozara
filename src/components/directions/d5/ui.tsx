import type { CSSProperties, ReactNode } from "react";

import { Icon, type IconName } from "@/components/mocks/Icon";
import type { Feature } from "@/content/site";

/** The giant verb every band hangs off. Decorative: the section's h2 carries the real title. */
export function Verb({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      aria-hidden
      className={`font-display text-[clamp(4.4rem,15.5vw,13.5rem)] leading-[0.84] tracking-[-0.045em] whitespace-nowrap ${className}`}
    >
      {children}
    </p>
  );
}

export function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold tracking-[0.14em] uppercase ${className}`}>
      {children}
    </p>
  );
}

/**
 * A fixed-size mock composition. Everything inside is absolutely placed at its desktop size, and
 * `zoom` (which, unlike `scale`, shrinks the layout box too) fits it on a phone.
 */
export function Stage({
  w,
  h,
  children,
  label,
  className = "[zoom:0.6] sm:[zoom:1]",
}: {
  w: number;
  h: number;
  children: ReactNode;
  /** Set for a stage people can play with: it becomes a labelled group instead of decoration. */
  label?: string;
  className?: string;
}) {
  const a11y = label ? { role: "group", "aria-label": label } : { "aria-hidden": true };
  return (
    <div {...a11y} className={`relative mx-auto shrink-0 ${className}`} style={{ width: w, height: h }}>
      {children}
    </div>
  );
}

/** The resting tilt for `.dir-pop`, which reads it from `--tilt`. */
export function tilt(deg: number) {
  return { "--tilt": `${deg}deg` } as CSSProperties;
}

/** A chunky tick drawn thick enough to hold up at 100px+ (the icon set's strokes are hairlines there). */
export function BigTick({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path d="M4.5 12.8 9.4 17.6 19.5 6.6" fill="none" stroke="currentColor" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A band's copy: kicker, the FEATURES title as the h2, body and the points as chunky rows. */
export function FeatureCopy({
  feature,
  kicker,
  chip,
  body = "opacity-80",
}: {
  feature: Feature;
  kicker: string;
  chip: string;
  body?: string;
}) {
  return (
    <div className="dir-reveal">
      <Kicker className={kicker}>{feature.eyebrow}</Kicker>
      <h2 className="mt-5 max-w-xl font-display text-[clamp(2.3rem,4.6vw,4rem)] leading-[0.98] tracking-[-0.025em] text-balance">
        {feature.title}
      </h2>
      <p className={`mt-5 max-w-lg text-lg leading-relaxed font-medium ${body}`}>{feature.body}</p>
      <Points points={feature.points} chip={chip} />
    </div>
  );
}

export function Points({ points, chip }: { points: [IconName, string][]; chip: string }) {
  return (
    <ul className="mt-8 flex flex-col gap-3.5">
      {points.map(([icon, label]) => (
        <li key={label} className="flex items-center gap-4 font-display text-xl leading-tight lg:text-[1.4rem]">
          <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${chip}`}>
            <Icon name={icon} className="size-6" />
          </span>
          {label}
        </li>
      ))}
    </ul>
  );
}
