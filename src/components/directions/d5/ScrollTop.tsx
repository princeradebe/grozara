"use client";

import { useEffect, useId, useRef, useState } from "react";

type Phase = "idle" | "crouch" | "launch";

/** A small, static Zara (the mascot) for the button: the same bag, eyes up at the top of the page. */
function ZaraMark({ phase }: { phase: Phase }) {
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

const TRAIL = [
  { x: -14, delay: 0.05, size: 10, color: "#FFB902" },
  { x: 12, delay: 0.12, size: 8, color: "#FF6B5B" },
  { x: -4, delay: 0.2, size: 12, color: "#A5E063" },
  { x: 16, delay: 0.28, size: 7, color: "#FF8FA3" },
];

/**
 * Back to top: Zara in a cream badge, ringed by how far down the page you are. Tap it and she
 * crouches, then launches off the top of the screen while the page glides up after her. The ring is a
 * CSS scroll timeline, and visibility flips only when the hero enters or leaves, so scrolling never
 * re-renders React.
 */
export function ScrollTop() {
  const [shown, setShown] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setShown(!entry.isIntersecting), { rootMargin: "0px 0px -35% 0px" });
    observer.observe(hero);
    const pending = timers.current;
    return () => {
      observer.disconnect();
      pending.forEach(window.clearTimeout);
    };
  }, []);

  const go = () => {
    if (phase !== "idle") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo({ top: 0 });
      return;
    }
    setPhase("crouch");
    timers.current.push(
      window.setTimeout(() => {
        setPhase("launch");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 170),
      window.setTimeout(() => setPhase("idle"), 1500),
    );
  };

  // Stay up while she's flying, even once the hero is back in view.
  const visible = shown || phase !== "idle";

  return (
    <div
      className={`fixed right-4 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 transition-[opacity,scale,translate] duration-500 ease-[cubic-bezier(0.34,1.4,0.5,1)] sm:right-6 sm:bottom-6 ${
        visible ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-6 scale-75 opacity-0"
      }`}
    >
      <button
        type="button"
        onClick={go}
        aria-label="Back to top"
        tabIndex={visible ? 0 : -1}
        className="group relative grid size-[68px] cursor-pointer place-items-center rounded-full bg-label shadow-[0_18px_34px_-14px_rgba(13,33,29,0.6)] ring-1 ring-forest/10 transition-transform duration-300 ease-[cubic-bezier(0.34,1.5,0.5,1)] hover:-translate-y-1 active:scale-95"
      >
        {/* How far down the page you are, filled by the scroll itself. */}
        <svg viewBox="0 0 68 68" className="absolute inset-0 -rotate-90" aria-hidden>
          <circle cx="34" cy="34" r="31" fill="none" stroke="rgba(24,54,49,0.1)" strokeWidth="4" />
          <circle cx="34" cy="34" r="31" fill="none" stroke="#7EC340" strokeWidth="4" strokeLinecap="round" pathLength={1} className="dir-progress" />
        </svg>

        <span
          className={`relative block size-[44px] ${phase === "crouch" ? "dir-zara-crouch" : phase === "launch" ? "dir-zara-launch" : "dir-zara-idle"}`}
        >
          <ZaraMark phase={phase} />
        </span>

        {phase === "launch"
          ? TRAIL.map((spark, i) => (
              <span
                key={i}
                aria-hidden
                className="dir-zara-trail absolute top-3 left-1/2 rounded-full"
                style={{ width: spark.size, height: spark.size, marginLeft: spark.x, background: spark.color, animationDelay: `${spark.delay}s` }}
              />
            ))
          : null}

        <span
          aria-hidden
          className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 origin-right scale-75 rounded-2xl rounded-br-sm bg-forest px-3.5 py-2 font-display text-sm whitespace-nowrap text-lime-bright opacity-0 shadow-[0_12px_24px_-12px_rgba(0,0,0,0.6)] transition-[opacity,scale] duration-300 ease-[cubic-bezier(0.34,1.5,0.5,1)] group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
        >
          {phase === "idle" ? "Back to top!" : "Wheee!"}
        </span>
      </button>
    </div>
  );
}
