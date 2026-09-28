"use client";

import { useEffect, useRef, useState } from "react";

import { type Phase, ZaraMark } from "./ZaraMark";

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
