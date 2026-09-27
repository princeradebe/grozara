import type { CSSProperties, ReactNode } from "react";

import { Icon, type IconName } from "@/components/mocks/Icon";
import { CheckCircle } from "@/components/mocks/parts";
import type { Feature } from "@/content/site";

import styles from "./d2.module.css";

/** Inline styles that also set custom properties. */
export type Vars = CSSProperties & Record<`--${string}`, string | number>;

/** Dark glass: the panel style for chips, extras and FAQ. */
export const GLASS = "bg-white/5 ring-1 ring-white/10 backdrop-blur-md";

/**
 * Fireflies, placed deterministically like the hero's original swarm (`i * 37 % 100`), offset by
 * `seed` so each stage gets its own. No randomness, so the server output is stable.
 */
export function Fireflies({ count = 18, seed = 0, className = "" }: { count?: number; seed?: number; className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      {Array.from({ length: count }, (_, i) => {
        const k = i + seed * 13;
        const size = 2 + (k % 4);
        const style: Vars = {
          left: `${(k * 37 + seed * 7) % 100}%`,
          top: `${(k * 53 + seed * 11) % 100}%`,
          width: size,
          height: size,
          "--lo": (0.08 + (k % 3) * 0.07).toFixed(2),
          "--hi": (0.5 + (k % 5) * 0.1).toFixed(2),
          animationDuration: `${8 + (k % 6)}s, ${(2 + (k % 5) * 0.7).toFixed(1)}s`,
          animationDelay: `-${((k * 1.7) % 9).toFixed(1)}s, -${((k * 0.9) % 4).toFixed(1)}s`,
        };
        return <span key={i} className={`${styles.firefly} absolute rounded-full bg-lime-bright`} style={style} />;
      })}
    </div>
  );
}

const LIGHT = {
  lime: { halo: "rgba(126,195,64,0.24)", beam: "rgba(214,255,170,0.2)", pool: "rgba(165,224,99,0.34)" },
  paper: { halo: "rgba(241,237,223,0.14)", beam: "rgba(255,244,214,0.22)", pool: "rgba(255,230,180,0.3)" },
  white: { halo: "rgba(236,255,220,0.26)", beam: "rgba(255,255,240,0.26)", pool: "rgba(220,255,190,0.38)" },
};

/** A stage light: a beam swinging from above, a halo behind the mock and a pool on the floor. */
export function Spotlight({
  className = "",
  tone = "lime",
  beam = true,
}: {
  className?: string;
  tone?: keyof typeof LIGHT;
  beam?: boolean;
}) {
  const c = LIGHT[tone];
  return (
    <div aria-hidden className={`pointer-events-none absolute ${className}`}>
      <div
        className="dir-glow absolute top-1/2 left-1/2 aspect-square w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: `radial-gradient(closest-side, ${c.halo}, transparent)` }}
      />
      {beam ? (
        <div className="absolute -top-[6%] left-1/2 h-full w-[80%] -translate-x-1/2 blur-2xl">
          <div
            className={`${styles.sway} size-full [clip-path:polygon(44%_0,56%_0,100%_100%,0_100%)]`}
            style={{ background: `linear-gradient(to bottom, ${c.beam}, transparent 90%)` }}
          />
        </div>
      ) : null}
      <div
        className="absolute bottom-0 left-1/2 h-[18%] w-full -translate-x-1/2 rounded-[50%]"
        style={{ background: `radial-gradient(closest-side, ${c.pool}, transparent)` }}
      />
    </div>
  );
}

/** Shrinks its contents on phones. CSS `zoom` shrinks the layout box too, where `scale` only paints smaller. */
export function Zoom({ z, children, className = "" }: { z: number; children: ReactNode; className?: string }) {
  return (
    <div className={`max-sm:[zoom:var(--z)] ${className}`} style={{ "--z": z } as Vars}>
      {children}
    </div>
  );
}

/** The stage number in outline, a hairline and the eyebrow. */
export function Kicker({ n, label, center = false }: { n: string; label: string; center?: boolean }) {
  return (
    <p className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
      <span className="font-display text-4xl leading-none text-transparent [-webkit-text-stroke:1.5px_var(--color-lime-bright)]">{n}</span>
      <span className="h-px w-10 bg-gradient-to-r from-lime-bright/70 to-transparent" />
      <span className="text-xs font-bold tracking-[0.22em] text-lime-bright uppercase">{label}</span>
    </p>
  );
}

/** Splits "Tick it off. Undo if you slipped." after its first comma or full stop; the rest glows. */
function splitTitle(title: string): [string, string] {
  const m = /^(.+?[.,])\s+(.+)$/.exec(title);
  return m ? [m[1], m[2]] : [title, ""];
}

export function StageTitle({ text, className = "" }: { text: string; className?: string }) {
  const [head, tail] = splitTitle(text);
  return (
    <h2 className={`font-display text-[2.6rem] leading-[1.02] tracking-tight text-balance text-label sm:text-5xl lg:text-6xl ${className}`}>
      {head}
      {tail ? (
        <>
          {" "}
          <span className="text-lime-bright [text-shadow:0_0_42px_rgba(165,224,99,0.4)]">{tail}</span>
        </>
      ) : null}
    </h2>
  );
}

export function IconBadge({ icon, className = "size-9" }: { icon: IconName; className?: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full bg-lime-bright/15 text-lime-bright shadow-[0_0_22px_-2px_rgba(165,224,99,0.5)] ring-1 ring-lime-bright/25 ${className}`}
    >
      <Icon name={icon} className="size-[55%]" />
    </span>
  );
}

/** A feature's copy: kicker, glowing title, body and its three points as glass chips. */
export function StageCopy({ n, feature, center = false }: { n: string; feature: Feature; center?: boolean }) {
  return (
    <div className={`dir-reveal ${center ? "mx-auto max-w-4xl text-center" : "max-w-xl"}`}>
      <Kicker n={n} label={feature.eyebrow} center={center} />
      <StageTitle text={feature.title} className="mt-6" />
      <p className={`mt-5 text-lg leading-relaxed text-mist/70 ${center ? "mx-auto max-w-2xl" : ""}`}>{feature.body}</p>
      <ul className={`mt-8 grid gap-3 ${center ? "text-left sm:grid-cols-3" : ""}`}>
        {feature.points.map(([icon, label]) => (
          <li key={label} className={`${GLASS} flex items-center gap-3 rounded-2xl px-4 py-3`}>
            <IconBadge icon={icon} />
            <span className="text-[15px] leading-snug font-semibold text-mist/90">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The app's check circle, set in a lit disc so it reads on the night background. */
export function GlowCheck({ size = 30 }: { size?: number }) {
  return (
    <span
      className="grid rounded-full bg-label shadow-[0_0_0_3px_rgba(165,224,99,0.35),0_0_30px_6px_rgba(165,224,99,0.55)]"
      style={{ padding: Math.round(size * 0.12) }}
    >
      <CheckCircle checked size={size} />
    </span>
  );
}
