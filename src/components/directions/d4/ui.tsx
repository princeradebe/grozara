import type { ReactNode } from "react";

import { Icon, type IconName } from "@/components/mocks/Icon";

export type Tone = "forest" | "deep" | "paper" | "lime" | "white" | "amber" | "coral" | "mist";

const TONES: Record<Tone, string> = {
  forest: "bg-forest text-mist",
  deep: "bg-forest-deep text-mist",
  paper: "dir-paper text-forest",
  lime: "bg-lime text-forest",
  white: "bg-white text-forest ring-1 ring-forest/8",
  amber: "bg-amber text-forest",
  coral: "bg-coral text-forest",
  mist: "bg-mist text-forest ring-1 ring-forest/6",
};

/** Every bento cell: a clipped, rounded tile. `isolate` keeps each tile's glows and layers to itself. */
export function tile(tone: Tone, className = "") {
  return `relative isolate overflow-hidden rounded-[28px] sm:rounded-[32px] ${TONES[tone]} ${className}`;
}

export function Tile({ tone, className = "", children }: { tone: Tone; className?: string; children: ReactNode }) {
  return <div className={tile(tone, className)}>{children}</div>;
}

/** Page gutter and max width shared by every section's grid. */
export const WRAP = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-12";

/** Section number + name, e.g. "01 · Lists". */
export function Kicker({ n, label, dark = false, className = "" }: { n?: string; label: string; dark?: boolean; className?: string }) {
  return (
    <p className={`flex items-center gap-2.5 text-sm font-semibold ${dark ? "text-lime-bright" : "text-forest/70"} ${className}`}>
      {n ? (
        <span
          className={`grid h-6 min-w-6 place-items-center rounded-full px-1.5 font-mono text-[11px] ${
            dark ? "bg-lime-bright/15 text-lime-bright" : "bg-forest text-lime-bright"
          }`}
        >
          {n}
        </span>
      ) : null}
      {label}
    </p>
  );
}

const CHIP: Record<"forest" | "lime" | "white" | "glass", string> = {
  forest: "bg-forest text-lime-bright",
  lime: "bg-lime text-forest",
  white: "bg-white text-forest shadow-[0_6px_14px_-8px_rgba(24,54,49,0.5)]",
  glass: "bg-white/12 text-lime-bright ring-1 ring-white/15",
};

export function Chip({ icon, tone = "forest", className = "" }: { icon: IconName; tone?: keyof typeof CHIP; className?: string }) {
  return (
    <span className={`grid size-11 shrink-0 place-items-center rounded-2xl ${CHIP[tone]} ${className}`}>
      <Icon name={icon} className="size-[22px]" />
    </span>
  );
}

/**
 * One feature point: icon chip + the point's words, with a mock drawn above (stack) or beside (row).
 * The mock is decorative and hidden from assistive tech; the words carry the meaning.
 */
export function PointTile({
  tone,
  icon,
  chip = "forest",
  text,
  visual,
  layout = "stack",
  className = "",
  visualClassName = "",
}: {
  tone: Tone;
  icon: IconName;
  chip?: keyof typeof CHIP;
  text: string;
  visual: ReactNode;
  layout?: "stack" | "row";
  className?: string;
  visualClassName?: string;
}) {
  const row = layout === "row";
  return (
    <div className={tile(tone, `dir-reveal flex flex-col gap-5 p-6 sm:p-7 ${row ? "sm:flex-row sm:items-end sm:gap-6" : ""} ${className}`)}>
      <div
        aria-hidden
        className={`relative flex min-h-[170px] flex-1 items-center justify-center ${row ? "sm:order-last sm:self-stretch" : ""} ${visualClassName}`}
      >
        {visual}
      </div>
      <div className={`relative ${row ? "sm:w-[44%] sm:shrink-0" : ""}`}>
        <Chip icon={icon} tone={chip} />
        <h3 className="mt-4 font-display text-[22px] leading-[1.1] tracking-tight sm:text-2xl">{text}</h3>
      </div>
    </div>
  );
}

/** A heading row above a cluster that has no big title tile of its own. */
export function SectionHead({
  kicker,
  title,
  id,
  aside,
}: {
  kicker: string;
  title: ReactNode;
  id: string;
  aside?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-x-10 gap-y-4 sm:mb-7">
      <div>
        <Kicker label={kicker} />
        <h2 id={id} className="mt-3 max-w-2xl font-display text-4xl leading-[1.02] tracking-tight sm:text-5xl">
          {title}
        </h2>
      </div>
      {aside}
    </div>
  );
}
