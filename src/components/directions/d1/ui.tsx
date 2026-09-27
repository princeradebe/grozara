import type { CSSProperties, ReactNode } from "react";

import { Icon, type IconName } from "@/components/mocks/Icon";
import { PhoneFrame } from "@/components/mocks/PhoneFrame";
import type { Feature } from "@/content/site";

/**
 * A PhoneFrame that changes size per breakpoint (base, sm ≥640px, lg ≥1024px) without rendering the
 * screen twice: the frame is laid out at full size and the wrapper scales it with the `scale`
 * property, while its own box is sized to match so the layout around it stays true.
 */
export function Phone({
  children,
  base,
  sm = base,
  lg = sm,
  className = "",
}: {
  children: ReactNode;
  base: number;
  sm?: number;
  lg?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative h-[calc(866px*var(--ps))] w-[calc(412px*var(--ps))] [--ps:var(--p0)] sm:[--ps:var(--p1)] lg:[--ps:var(--p2)] ${className}`}
      style={{ "--p0": base, "--p1": sm, "--p2": lg } as CSSProperties}
    >
      <div className="absolute top-0 left-0 origin-top-left" style={{ scale: "var(--ps)" }}>
        <PhoneFrame scale={1}>{children}</PhoneFrame>
      </div>
    </div>
  );
}

const DOTS = { lime: "bg-lime", amber: "bg-amber", coral: "bg-coral", blush: "bg-blush", forest: "bg-forest" } as const;

/** The small white pill that opens each section, same as the hero's. */
export function Kicker({ children, dot = "lime", tone = "light" }: { children: ReactNode; dot?: keyof typeof DOTS; tone?: "light" | "dark" }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
        tone === "dark" ? "bg-white/8 text-mist/85 ring-1 ring-white/12" : "bg-white text-forest/80 shadow-sm ring-1 ring-forest/8"
      }`}
    >
      <span className={`size-2 rounded-full ${DOTS[dot]}`} /> {children}
    </p>
  );
}

export function SectionTitle({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <h2 id={id} className={`font-display text-4xl leading-[1.02] tracking-tight text-balance sm:text-5xl lg:text-6xl ${className}`}>
      {children}
    </h2>
  );
}

/** Copy on one side, a phone composition on the other. `visual` sets which side the mock takes on desktop. */
export function FeatureSection({
  feature,
  visual,
  side,
  dot = "lime",
  className = "",
  panelClassName = "",
  backdrop,
}: {
  feature: Feature;
  visual: ReactNode;
  side: "left" | "right";
  dot?: keyof typeof DOTS;
  className?: string;
  panelClassName?: string;
  backdrop?: ReactNode;
}) {
  const titleId = `${feature.id}-title`;
  return (
    <section id={feature.id} aria-labelledby={titleId} className={`relative scroll-mt-6 overflow-hidden ${className}`}>
      {backdrop}
      <div
        className={`relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 sm:py-28 lg:grid-cols-2 lg:gap-12 lg:px-12 lg:py-36 ${panelClassName}`}
      >
        <div className={`dir-reveal max-w-xl ${side === "left" ? "lg:justify-self-end lg:pl-6" : "lg:pr-6"}`}>
          <Kicker dot={dot}>{feature.eyebrow}</Kicker>
          <SectionTitle id={titleId} className="mt-6">
            {feature.title}
          </SectionTitle>
          <p className="mt-6 text-lg leading-relaxed text-forest/70">{feature.body}</p>
          <ul className="mt-10 grid gap-4">
            {feature.points.map(([icon, label]) => (
              <Point key={label} icon={icon}>
                {label}
              </Point>
            ))}
          </ul>
        </div>
        <div aria-hidden className={`${side === "left" ? "dir-reveal-left lg:order-first" : "dir-reveal-right"}`}>
          {visual}
        </div>
      </div>
    </section>
  );
}

function Point({ icon, children }: { icon: IconName; children: ReactNode }) {
  return (
    <li className="flex items-center gap-4 text-base font-semibold">
      <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-lime shadow-[0_8px_18px_-12px_rgba(24,54,49,0.5)] ring-1 ring-forest/8">
        <Icon name={icon} className="size-[22px]" />
      </span>
      {children}
    </li>
  );
}

/** A white floating chip: an icon in a tinted disc, a title and a quiet second line. */
export function Chip({
  icon,
  title,
  sub,
  tint = "bg-lime/15 text-forest",
  className = "",
}: {
  icon: IconName;
  title: ReactNode;
  sub?: ReactNode;
  tint?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex w-max items-center gap-3 rounded-2xl bg-white py-3 pr-5 pl-3 text-forest shadow-[0_18px_34px_-18px_rgba(24,54,49,0.6)] ring-1 ring-forest/5 ${className}`}
    >
      <span className={`grid size-10 shrink-0 place-items-center rounded-full ${tint}`}>
        <Icon name={icon} className="size-5" />
      </span>
      <span className="text-sm leading-tight font-semibold">
        {title}
        {sub ? <span className="mt-0.5 block text-xs font-medium text-forest/50">{sub}</span> : null}
      </span>
    </div>
  );
}

/** A soft radial glow for backdrops. */
export function Glow({ className, color }: { className: string; color: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{ background: `radial-gradient(circle, ${color}, transparent 65%)` }}
    />
  );
}
