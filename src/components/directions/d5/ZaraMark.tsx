import { useId } from "react";

export type Phase = "idle" | "crouch" | "launch";

/** A small Zara (the mascot) as one SVG: the same sticker bag as the video, eyes up. `phase` sets her face. */
export function ZaraMark({ phase }: { phase: Phase }) {
  const id = useId().replace(/:/g, "");
  const excited = phase !== "idle";
  return (
    <svg viewBox="30 20 340 420" className="h-full w-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id={`${id}-b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A9E26A" />
          <stop offset="0.45" stopColor="#8BCB4B" />
          <stop offset="1" stopColor="#5FA532" />
        </linearGradient>
      </defs>
      <g className="dir-zara-handle" style={{ transformOrigin: "200px 132px" }}>
        <path d="M138 138 C 136 44, 264 44, 262 138" fill="none" stroke="#fff" strokeWidth={40} strokeLinecap="round" />
        <path d="M138 138 C 136 44, 264 44, 262 138" fill="none" stroke="#183631" strokeWidth={22} strokeLinecap="round" />
      </g>
      <rect x={46} y={118} width={308} height={300} rx={104} fill="#fff" />
      <rect x={60} y={132} width={280} height={272} rx={92} fill={`url(#${id}-b)`} />
      <ellipse cx={158} cy={178} rx={86} ry={30} transform="rotate(-10 158 178)" fill="#fff" opacity={0.26} />
      <circle cx={104} cy={180} r={17} fill="#FFB902" stroke="#fff" strokeWidth={6} />
      {phase === "crouch" ? (
        // Scrunched up, ready to jump: happy closed eyes.
        [148, 252].map((cx) => (
          <path key={cx} d={`M${cx - 34} 266 Q ${cx} 238 ${cx + 34} 266`} fill="none" stroke="#183631" strokeWidth={13} strokeLinecap="round" />
        ))
      ) : (
        [148, 252].map((cx) => (
          <g key={cx}>
            <ellipse cx={cx} cy={262} rx={43} ry={52} fill="#fff" />
            <circle cx={cx} cy={244} r={24} fill="#183631" />
            <circle cx={cx - 8} cy={235} r={7.5} fill="#fff" />
          </g>
        ))
      )}
      <ellipse cx={112} cy={336} rx={31} ry={15} fill="#C9A27A" opacity={0.75} />
      <ellipse cx={288} cy={336} rx={31} ry={15} fill="#C9A27A" opacity={0.75} />
      {excited ? (
        <g>
          <ellipse cx={200} cy={352} rx={34} ry={40} fill="#183631" />
          <ellipse cx={200} cy={378} rx={26} ry={20} fill="#FF6B5B" />
        </g>
      ) : (
        <path d="M168 344 Q 200 372 232 344" fill="none" stroke="#183631" strokeWidth={11} strokeLinecap="round" />
      )}
    </svg>
  );
}
