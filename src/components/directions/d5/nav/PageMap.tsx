"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";


/** The page as the map draws it: every band in its own colour, top to bottom. */
const BANDS = [
  { id: "top", label: "Home", bg: "var(--color-lime)", ink: "var(--color-forest)" },
  { id: "lists", label: "Lists", bg: "var(--color-forest)", ink: "var(--color-lime-bright)" },
  { id: "boyfriend-mode", label: "Boyfriend Mode", bg: "var(--color-coral)", ink: "#ffffff" },
  { id: "shared", label: "Shared lists", bg: "var(--color-amber)", ink: "var(--color-forest)" },
  { id: "cards", label: "Loyalty cards", bg: "var(--color-forest-deep)", ink: "var(--color-lime-bright)" },
  { id: "extras", label: "Extras", bg: "var(--color-paper)", ink: "var(--color-forest)", paper: true },
  { id: "how-it-works", label: "How it works", bg: "var(--color-blush)", ink: "var(--color-forest)" },
  { id: "faq", label: "FAQ", bg: "var(--color-forest)", ink: "var(--color-lime-bright)" },
  { id: "get", label: "Get the app", bg: "var(--color-lime)", ink: "var(--color-forest)" },
];

/** Where you were when it opened, and where the button sits relative to the panel (the reveal grows from it). */
type Opened = { here: string | null; origin: { x: string; y: string } };

/** How long the panel takes to fold back into the button; it stays mounted until then. */
const CLOSE_MS = 260;

/**
 * The map button beside "Get the app" and the miniature of the whole page it opens: every band in
 * its real colour, labelled, with "You are here". Extras and How it works are simply part of the
 * page. Where you are is read once, when it opens, and the panel hangs from the capsule's right
 * edge so it fits on a phone.
 *
 * Opening, the button's bars fold into a close X, the panel unfolds out of the button as a
 * growing circle, the bands deal in one after another and "You are here" pops on last. Closing
 * folds the panel back into the button.
 */
export function PageMap() {
  const [map, setMap] = useState<Opened | null>(null);
  const [closing, setClosing] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const close = () => {
    if (!map || closing) return;
    setClosing(true);
    closeTimer.current = window.setTimeout(() => {
      setMap(null);
      setClosing(false);
    }, CLOSE_MS);
  };

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  useEffect(() => {
    if (!map) return;
    const dismiss = (event: Event) => {
      if (event instanceof KeyboardEvent ? event.key === "Escape" : !root.current?.contains(event.target as Node)) close();
    };
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", dismiss);
    return () => {
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", dismiss);
    };
  });

  const toggle = () => {
    if (map) return close();
    const middle = window.innerHeight / 2;
    let here: string | null = null;
    for (const band of BANDS) {
      const el = document.getElementById(band.id);
      if (!el) continue;
      const box = el.getBoundingClientRect();
      if (box.top <= middle && box.bottom >= middle) here = band.id;
    }
    // The panel's top-right corner sits at the capsule's bottom-right, 10px down.
    const capsule = root.current?.offsetParent?.getBoundingClientRect();
    const dot = button.current?.getBoundingClientRect();
    const origin =
      capsule && dot
        ? { x: `calc(100% - ${capsule.right - (dot.left + dot.width / 2)}px)`, y: `${dot.top + dot.height / 2 - capsule.bottom - 10}px` }
        : { x: "88%", y: "-36px" };
    setMap({ here, origin });
  };

  const open = map !== null && !closing;
  return (
    <div ref={root}>
      <button
        ref={button}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="page-map"
        aria-label={open ? "Close page map" : "Page map"}
        className={`grid size-9 cursor-pointer place-items-center rounded-full transition-[background-color,scale] duration-300 active:scale-90 ${
          open ? "bg-forest" : "bg-forest/8 hover:bg-forest/14"
        }`}
      >
        {/* Three bands of the page; open, the outer two cross into an X and the middle one bows out. */}
        <svg viewBox="0 0 20 20" className="size-5 overflow-visible" aria-hidden>
          {[
            { y: 3, fill: "var(--color-lime)", to: "translateY(5px) rotate(45deg)" },
            { y: 8, fill: "var(--color-coral)", to: "scaleX(0)" },
            { y: 13, fill: "var(--color-amber)", to: "translateY(-5px) rotate(-45deg)" },
          ].map((bar) => (
            <rect
              key={bar.y}
              x="4"
              y={bar.y}
              width="12"
              height="4"
              rx="1.5"
              fill={bar.fill}
              className="origin-center transition-[transform,opacity] duration-400 ease-[cubic-bezier(0.34,1.4,0.5,1)] [transform-box:fill-box]"
              style={{ transform: open ? bar.to : "none", opacity: open && bar.y === 8 ? 0 : 1 }}
            />
          ))}
        </svg>
      </button>
      {map ? (
        <div
          id="page-map"
          className={`${closing ? "nav-map-close" : "nav-map-open"} absolute top-[calc(100%+10px)] right-0 w-[min(280px,calc(100vw-24px))] max-h-[calc(100svh-84px)] overflow-y-auto rounded-[28px] bg-label p-3 shadow-[0_30px_60px_-24px_rgba(13,33,29,0.65)] ring-1 ring-forest/10`}
          style={{ "--ox": map.origin.x, "--oy": map.origin.y } as CSSProperties}
        >
          <p className="nav-map-title px-2 pb-2 text-xs font-bold tracking-[0.14em] text-forest/60 uppercase">Page map</p>
          <div className="flex flex-col gap-1">
            {BANDS.map((band, i) => (
              <a
                key={band.id}
                href={`#${band.id}`}
                onClick={close}
                className={`nav-map-band flex h-10 items-center justify-between rounded-[16px] px-3.5 text-sm font-semibold transition-transform hover:scale-[1.025] ${band.paper ? "dir-paper ring-1 ring-forest/15 ring-inset" : ""}`}
                style={{ "--i": i, backgroundColor: band.bg, color: band.ink } as CSSProperties}
              >
                {band.label}
                {map.here === band.id ? (
                  <span className="nav-map-here rounded-full bg-label px-2 py-0.5 text-[11px] text-forest shadow-[0_4px_10px_-4px_rgba(0,0,0,0.5)]">
                    You are here
                  </span>
                ) : null}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
