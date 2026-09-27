import { useId, type CSSProperties } from "react";

/** Everything that moves on Zara, all driven per frame by the scene. */
export type ZaraPose = {
  /** > 0 squashes (wider, shorter), < 0 stretches. Anchored at her base. */
  squash?: number;
  /** Degrees, rocking on her base. */
  tilt?: number;
  /** Where the pupils look, each axis -1..1. */
  look?: [number, number];
  /** 0 open, 1 shut. */
  blink?: number;
  /** 0 a closed smile, 1 a wide "o". */
  mouth?: number;
  /** Degrees the handle swings. */
  handle?: number;
  /** Arm lift in degrees (left, right): ~20 hangs down, ~150 is overhead. */
  arms?: [number, number];
  /** Cheek blush, 0..1.5. */
  cheeks?: number;
};

const INK = "#183631";
const OUTLINE = "#FFFFFF";
const BASE = { x: 200, y: 418 };

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function Arm({ side, lift }: { side: "left" | "right"; lift: number }) {
  const x = side === "left" ? 78 : 322;
  const angle = side === "left" ? lift : -lift;
  return (
    <g transform={`translate(${x} 292) rotate(${angle})`}>
      <rect x={-27} y={-14} width={54} height={104} rx={27} fill={OUTLINE} />
      <rect x={-18} y={-6} width={36} height={88} rx={18} fill="#62A832" />
    </g>
  );
}

/**
 * Zara as a flat sticker, drawn from the reel's artwork: a lime shopping bag with a white sticker
 * outline, a forest handle, the amber dot from the Grozara "g", and a face that talks.
 */
export function Zara({ pose = {}, size = 400, style }: { pose?: ZaraPose; size?: number; style?: CSSProperties }) {
  const id = useId().replace(/:/g, "");
  const { squash = 0, tilt = 0, look = [0, 0], blink = 0, mouth = 0, handle = 0, arms, cheeks = 1 } = pose;

  const eyeRy = 52 * (1 - clamp01(blink) * 0.93);
  const open = clamp01(mouth);
  const mouthRx = 24 + 16 * open;
  const mouthRy = 8 + 40 * open;
  const mouthY = 350 + 8 * open;
  // A short crossfade band, so the smile and the open mouth never show muddled together.
  const smile = clamp01((0.16 - open) / 0.08);

  const body = `translate(${BASE.x} ${BASE.y}) rotate(${tilt}) scale(${1 + squash} ${1 - squash}) translate(${-BASE.x} ${-BASE.y})`;

  return (
    <svg viewBox="0 0 400 470" width={size} height={size * (470 / 400)} style={{ overflow: "visible", ...style }}>
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A9E26A" />
          <stop offset="0.45" stopColor="#8BCB4B" />
          <stop offset="1" stopColor="#5FA532" />
        </linearGradient>
        <radialGradient id={`${id}-rim`} cx="0.5" cy="0.35" r="0.75">
          <stop offset="0.7" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#1f4d1c" stopOpacity="0.28" />
        </radialGradient>
        <clipPath id={`${id}-mouth`}>
          <ellipse cx={200} cy={mouthY} rx={mouthRx} ry={mouthRy} />
        </clipPath>
        <filter id={`${id}-shadow`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#0d211d" floodOpacity="0.32" />
        </filter>
      </defs>

      {/* Ground shadow stays put while she squashes and rocks. */}
      <ellipse cx={200} cy={452} rx={140 * (1 + squash * 0.8)} ry={14} fill="#0d211d" opacity={0.18} />

      <g transform={body} filter={`url(#${id}-shadow)`}>
        {arms ? (
          <>
            <Arm side="left" lift={arms[0]} />
            <Arm side="right" lift={arms[1]} />
          </>
        ) : null}

        <g transform={`rotate(${handle} 200 132)`}>
          <path d="M138 138 C 136 44, 264 44, 262 138" fill="none" stroke={OUTLINE} strokeWidth={40} strokeLinecap="round" />
          <path d="M138 138 C 136 44, 264 44, 262 138" fill="none" stroke={INK} strokeWidth={22} strokeLinecap="round" />
        </g>

        <rect x={46} y={118} width={308} height={300} rx={104} fill={OUTLINE} />
        <rect x={60} y={132} width={280} height={272} rx={92} fill={`url(#${id}-body)`} />
        <rect x={60} y={132} width={280} height={272} rx={92} fill={`url(#${id}-rim)`} />
        <ellipse cx={158} cy={178} rx={86} ry={30} transform="rotate(-10 158 178)" fill="#FFFFFF" opacity={0.26} />

        <circle cx={104} cy={180} r={17} fill="#FFB902" stroke={OUTLINE} strokeWidth={6} />

        {[148, 252].map((cx) => (
          <g key={cx}>
            {blink >= 0.85 ? (
              <path d={`M${cx - 34} 266 Q ${cx} 238 ${cx + 34} 266`} fill="none" stroke={INK} strokeWidth={11} strokeLinecap="round" />
            ) : (
              <ellipse cx={cx} cy={262} rx={43} ry={eyeRy} fill="#FFFFFF" />
            )}
            {blink < 0.85 ? (
              <g transform={`translate(${cx + look[0] * 13} ${262 + look[1] * 15 * (eyeRy / 52)})`}>
                <circle r={24 * Math.min(1, eyeRy / 30)} fill={INK} />
                <circle cx={-8} cy={-9} r={7.5} fill="#FFFFFF" />
              </g>
            ) : null}
          </g>
        ))}

        <ellipse cx={112} cy={336} rx={31} ry={15} fill="#C9A27A" opacity={0.72 * cheeks} />
        <ellipse cx={288} cy={336} rx={31} ry={15} fill="#C9A27A" opacity={0.72 * cheeks} />

        <path d="M168 344 Q 200 372 232 344" fill="none" stroke={INK} strokeWidth={10} strokeLinecap="round" opacity={smile} />
        <g opacity={1 - smile}>
          <ellipse cx={200} cy={mouthY} rx={mouthRx} ry={mouthRy} fill={INK} />
          <g clipPath={`url(#${id}-mouth)`}>
            <ellipse cx={200} cy={mouthY + mouthRy * 0.78} rx={mouthRx * 0.78} ry={mouthRy * 0.6} fill="#FF6B5B" />
          </g>
        </g>
      </g>
    </svg>
  );
}
