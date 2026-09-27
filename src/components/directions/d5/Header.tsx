"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { NAV_LINKS } from "@/content/site";

/**
 * Each linked section's band colour, so the highlight wears the colour of where you are. Colours
 * (not classes) so one pill can blend from band to band as it slides.
 */
const SECTION_TONES: Record<string, { bg: string; ink: string }> = {
  lists: { bg: "var(--color-forest)", ink: "var(--color-lime-bright)" },
  "boyfriend-mode": { bg: "var(--color-coral)", ink: "#ffffff" },
  shared: { bg: "var(--color-amber)", ink: "var(--color-forest)" },
  cards: { bg: "var(--color-forest-deep)", ink: "var(--color-lime-bright)" },
  faq: { bg: "var(--color-forest)", ink: "var(--color-lime-bright)" },
};

const IDS = NAV_LINKS.map((link) => link.href.slice(1));

/** Springy, but settles fast: the pill overshoots a hair and lands. */
const GLIDE = "duration-500 ease-[cubic-bezier(0.34,1.3,0.5,1)]";

/**
 * Which linked section sits under the middle of the screen (null between them), and the last one
 * that did, so a fading highlight keeps its colour instead of flashing.
 */
function useActiveSection() {
  const [{ active, last }, setState] = useState<{ active: string | null; last: string }>({ active: null, last: "lists" });
  useEffect(() => {
    const sections = IDS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    // A thin band across the middle of the viewport: a section is active while it crosses it.
    // State only changes when the section does, so scrolling itself never re-renders.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) setState({ active: id, last: id });
          else setState((state) => (state.active === id ? { ...state, active: null } : state));
        }
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);
  return { active, last };
}

/** One pill behind the links that slides and stretches to the active one, blending colour on the way. */
function useIndicator(active: string | null) {
  const links = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [box, setBox] = useState<{ x: number; width: number } | null>(null);
  useLayoutEffect(() => {
    const measure = () => {
      const el = active ? links.current[active] : null;
      // Between sections the pill fades where it is rather than jumping home.
      if (el) setBox({ x: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);
  return { links, box };
}

/** The Lime pop header: a cream capsule that stays at the top over every band. */
export function Header() {
  const { active, last } = useActiveSection();
  const { links, box } = useIndicator(active);
  const current = NAV_LINKS.find((link) => link.href.slice(1) === active);
  const tone = active ? SECTION_TONES[active] : null;
  const shown = SECTION_TONES[last];
  return (
    // Zero height, so the capsule floats over the hero instead of pushing it down.
    <div className="sticky top-0 z-50 h-0">
      <header className="mx-auto max-w-7xl px-3 pt-3 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-3 rounded-full bg-label/88 pr-2 pl-3 shadow-[0_14px_34px_-18px_rgba(13,33,29,0.55)] ring-1 ring-forest/10 backdrop-blur-md sm:pl-5">
          <a href="#top" className="flex shrink-0 items-center">
            {/* On phones the icon stands in for the wordmark, leaving room for the section chip. */}
            <span className="grid size-9 place-items-center rounded-full bg-forest sm:hidden">
              <Image src="/brand/grozara-icon.svg" alt="Grozara" width={64} height={64} priority className="size-[26px]" />
            </span>
            <Image src="/brand/grozara-logo.svg" alt="Grozara" width={286} height={64} priority className="hidden h-7 w-auto sm:block" />
          </a>

          <nav aria-label="Sections" className="relative hidden items-center gap-1 text-sm font-semibold text-forest/75 lg:flex">
            <span
              aria-hidden
              className={`absolute inset-y-0 left-0 rounded-full transition-[translate,width,background-color,opacity] ${GLIDE}`}
              style={{
                translate: `${box?.x ?? 0}px 0`,
                width: box?.width ?? 0,
                backgroundColor: shown.bg,
                opacity: tone && box ? 1 : 0,
              }}
            />
            {NAV_LINKS.map((link) => {
              const id = link.href.slice(1);
              const on = id === active;
              return (
                <a
                  key={link.href}
                  ref={(el) => {
                    links.current[id] = el;
                  }}
                  href={link.href}
                  aria-current={on ? "location" : undefined}
                  className={`relative rounded-full px-3.5 py-2 transition-colors ${GLIDE} ${on ? "" : "hover:text-forest"}`}
                  style={on ? { color: SECTION_TONES[id].ink } : undefined}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Phones have no room for the links, so the section you're in shows as a chip instead. */}
            <span
              aria-hidden={!current}
              className={`inline-flex h-9 items-center rounded-full px-3.5 text-sm font-semibold whitespace-nowrap transition-[background-color,color,opacity,scale] ${GLIDE} lg:hidden ${
                current ? "scale-100 opacity-100" : "scale-90 opacity-0"
              }`}
              style={{ backgroundColor: shown.bg, color: shown.ink }}
            >
              {current?.label ?? ""}
            </span>
            <a href="#get" className="inline-flex h-9 items-center rounded-full bg-forest px-4 text-sm font-semibold whitespace-nowrap text-lime-bright">
              Get the app
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}
