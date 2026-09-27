import type { CSSProperties, ReactNode } from "react";

import { Icon, type IconName } from "@/components/mocks/Icon";

// The Scrapbook direction's craft box: tape, labels, doodles and paper, shared by every section.

export function Tape({
  className = "",
  size = "h-7 w-24",
  color = "rgba(126,195,64,0.55)",
  pattern,
}: {
  className?: string;
  size?: string;
  color?: string;
  pattern?: "stripes" | "dots";
}) {
  const background =
    pattern === "stripes"
      ? `repeating-linear-gradient(-45deg, ${color} 0 7px, rgba(255,255,255,0.4) 7px 12px)`
      : pattern === "dots"
        ? `radial-gradient(rgba(255,255,255,0.7) 1.6px, transparent 2px) 0 0 / 10px 10px, ${color}`
        : color;
  return (
    <span
      aria-hidden
      className={`absolute ${size} ${className}`}
      style={{ background, clipPath: "polygon(3% 0, 97% 6%, 100% 50%, 96% 100%, 2% 94%, 0 50%)" }}
    />
  );
}

const KICKER_TONES = {
  coral: "bg-coral text-white",
  lime: "bg-lime text-forest",
  amber: "bg-amber text-forest",
  forest: "bg-forest text-lime-bright",
  blush: "bg-blush text-forest",
} as const;

/** A label-maker strip: the section eyebrow, stuck on slightly crooked. */
export function Kicker({ tone, mark, children }: { tone: keyof typeof KICKER_TONES; mark?: string; children: ReactNode }) {
  return (
    <p
      className={`inline-flex -rotate-2 items-center gap-2 rounded-md px-3 py-1.5 font-display text-sm tracking-wide uppercase shadow-[0_6px_14px_-8px_rgba(24,54,49,0.55)] ${KICKER_TONES[tone]}`}
    >
      {mark ? <span aria-hidden>{mark}</span> : null}
      {children}
    </p>
  );
}

/** Underlines the last `word` in `text` with a marker squiggle, keeping the copy itself untouched. */
export function withSquiggle(text: string, word: string, color = "text-lime"): ReactNode {
  const i = text.lastIndexOf(word);
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <span className="relative inline-block whitespace-nowrap">
        {word}
        <svg
          viewBox="0 0 200 20"
          preserveAspectRatio="none"
          aria-hidden
          className={`pointer-events-none absolute -bottom-[0.16em] left-[-3%] h-[0.3em] w-[106%] ${color}`}
        >
          <path
            d="M4 13 C 26 4, 44 18, 66 10 S 104 3, 126 11 S 168 5, 196 9"
            fill="none"
            stroke="currentColor"
            strokeWidth={5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </span>
      {text.slice(i + word.length)}
    </>
  );
}

const POINT_TILTS = [-8, 6, -4, 5];

/** Feature points as little round stickers with the icon on them. */
export function Points({ points, className = "" }: { points: [IconName, string][]; className?: string }) {
  return (
    <ul className={`space-y-3.5 ${className}`}>
      {points.map(([icon, label], i) => (
        <li key={label} className="flex items-center gap-3.5 font-semibold text-forest">
          <span
            className="grid size-10 shrink-0 place-items-center rounded-full bg-white shadow-[0_6px_12px_-8px_rgba(24,54,49,0.7)] ring-1 ring-forest/5"
            style={{ rotate: `${POINT_TILTS[i % POINT_TILTS.length]}deg` }}
          >
            <Icon name={icon} className="size-5 text-lime" />
          </span>
          {label}
        </li>
      ))}
    </ul>
  );
}

export function SectionHeading({
  kicker,
  title,
  body,
  points,
  className = "",
}: {
  kicker: ReactNode;
  title: ReactNode;
  body?: string;
  points?: [IconName, string][];
  className?: string;
}) {
  return (
    <div className={className}>
      {kicker}
      <h2 className="mt-6 font-display text-4xl leading-[1.02] tracking-tight text-balance sm:text-5xl lg:text-6xl">{title}</h2>
      {body ? <p className="mt-6 max-w-xl text-lg leading-relaxed text-forest/75">{body}</p> : null}
      {points ? <Points points={points} className="mt-8" /> : null}
    </div>
  );
}

const ARROWS = {
  curve: { viewBox: "0 0 160 100", body: "M6 10 C 60 8, 112 28, 136 80", head: "M119 68 L 136 80 L 138 59" },
  loop: {
    viewBox: "0 0 170 90",
    body: "M6 60 C 30 20, 70 14, 82 40 C 92 62, 66 72, 62 52 C 58 30, 108 22, 158 42",
    head: "M147 27 L 158 42 L 139 45",
  },
  right: { viewBox: "0 0 150 50", body: "M6 30 C 40 18, 90 34, 138 22", head: "M120 15 L 138 22 L 125 37" },
  down: { viewBox: "0 0 70 130", body: "M40 6 C 10 40, 60 70, 34 118", head: "M34 100 L 34 118 L 50 108" },
} as const;

/** A hand-drawn marker arrow. Colour comes from `text-*` on the className. */
export function Arrow({
  variant = "curve",
  className = "",
  strokeWidth = 4,
}: {
  variant?: keyof typeof ARROWS;
  className?: string;
  strokeWidth?: number;
}) {
  const a = ARROWS[variant];
  return (
    <svg
      viewBox={a.viewBox}
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={a.body} />
      <path d={a.head} />
    </svg>
  );
}

export function Heart({ className = "", filled = false }: { className?: string; filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 100 92"
      aria-hidden
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 3 : 7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M50 84 C 22 64, 6 46, 11 27 C 16 9, 41 6, 50 29 C 57 8, 83 7, 89 25 C 95 45, 77 63, 53 86" />
    </svg>
  );
}

/** A sticker-sheet burst, the same shape as the BUY stamp, for badges like "80 card templates". */
export function Burst({
  size,
  color,
  children,
  className = "",
  style,
}: {
  size: number;
  color: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const points = Array.from({ length: 36 }, (_, i) => {
    const r = i % 2 === 0 ? 50 : 44;
    const a = (i * Math.PI) / 18 - Math.PI / 2;
    return `${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
  return (
    <span className={`grid place-items-center ${className}`} style={{ width: size, height: size, ...style }}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 drop-shadow-[0_6px_8px_rgba(0,0,0,0.22)]" aria-hidden>
        <polygon points={points} fill={color} />
      </svg>
      <span className="relative flex flex-col items-center text-center leading-none">{children}</span>
    </span>
  );
}

/** A polaroid: white frame, square photo, a thicker band at the bottom for a caption. */
export function Polaroid({
  children,
  caption,
  tilt = 0,
  className = "",
  photoStyle,
}: {
  children: ReactNode;
  caption?: ReactNode;
  tilt?: number;
  className?: string;
  photoStyle?: CSSProperties;
}) {
  return (
    <div
      className={`bg-white p-3 pb-3 shadow-[0_22px_34px_-18px_rgba(24,54,49,0.55),0_2px_4px_rgba(24,54,49,0.08)] ${className}`}
      style={{ rotate: `${tilt}deg` }}
    >
      <div className="relative aspect-square overflow-hidden" style={photoStyle}>
        {children}
        <span aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.12)]" />
      </div>
      <div className="flex min-h-14 items-center justify-center px-1 pt-2 text-center">{caption}</div>
    </div>
  );
}

/** A fridge magnet: a glossy dot with a drop shadow. */
export function Magnet({ color, size = 22, className = "" }: { color: string; size?: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute z-10 rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 34% 30%, rgba(255,255,255,0.9) 0 12%, ${color} 44%)`,
        boxShadow: "0 5px 7px -3px rgba(0,0,0,0.45), inset 0 -2px 3px rgba(0,0,0,0.2)",
      }}
    />
  );
}

/** Black album corners holding a card onto the page. */
export function PhotoCorners({ color = "#183631" }: { color?: string }) {
  const corners = [
    ["-top-1.5 -left-1.5", "polygon(0 0, 100% 0, 0 100%)"],
    ["-top-1.5 -right-1.5", "polygon(0 0, 100% 0, 100% 100%)"],
    ["-bottom-1.5 -left-1.5", "polygon(0 0, 0 100%, 100% 100%)"],
    ["-bottom-1.5 -right-1.5", "polygon(100% 0, 100% 100%, 0 100%)"],
  ] as const;
  return corners.map(([pos, clipPath]) => (
    <span key={pos} aria-hidden className={`absolute z-10 size-7 ${pos}`} style={{ background: color, clipPath }} />
  ));
}

function noise(i: number, seed: number) {
  const x = Math.sin(i * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/** A clip-path with ragged edges, for paper torn off a pad. */
export function tornEdge({
  top = false,
  bottom = false,
  depth = 8,
  teeth = 32,
  seed = 1,
}: {
  top?: boolean;
  bottom?: boolean;
  depth?: number;
  teeth?: number;
  seed?: number;
}) {
  const pts: string[] = [];
  const x = (i: number) => `${((i / teeth) * 100).toFixed(2)}%`;
  if (top) for (let i = 0; i <= teeth; i++) pts.push(`${x(i)} ${(noise(i, seed) * depth).toFixed(1)}px`);
  else pts.push("0 0", "100% 0");
  if (bottom) for (let i = teeth; i >= 0; i--) pts.push(`${x(i)} calc(100% - ${(noise(i, seed + 7) * depth).toFixed(1)}px)`);
  else pts.push("100% 100%", "0 100%");
  return `polygon(${pts.join(", ")})`;
}

export const GRAPH_PAPER: CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(108,160,210,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(108,160,210,0.2) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};

/** Ruled lines 32px apart with a red margin, like a notepad or index card. */
export function ruled(margin: number | null = 34): CSSProperties {
  const lines = "repeating-linear-gradient(to bottom, transparent 0 31px, rgba(108,160,210,0.4) 31px 32px)";
  return {
    backgroundImage:
      margin === null
        ? lines
        : `linear-gradient(90deg, transparent ${margin}px, rgba(255,107,91,0.5) ${margin}px ${margin + 2}px, transparent ${margin + 2}px), ${lines}`,
  };
}

export const KRAFT: CSSProperties = {
  backgroundColor: "#D8BC92",
  backgroundImage:
    "radial-gradient(rgba(110,72,34,0.16) 1px, transparent 1.3px), radial-gradient(rgba(255,255,255,0.22) 1px, transparent 1.3px)",
  backgroundSize: "7px 7px, 11px 11px",
  backgroundPosition: "0 0, 3px 5px",
};
