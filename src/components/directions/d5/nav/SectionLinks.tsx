"use client";

import { useLayoutEffect, useRef, useState } from "react";

import { type Section, SECTIONS } from "./sections";

/** Springy, but settles fast: highlights overshoot a hair and land. */
export const GLIDE = "duration-500 ease-[cubic-bezier(0.34,1.3,0.5,1)]";

/**
 * The menu links, with one pill behind them that slides and stretches to the section you're in,
 * wearing that section's colour and blending from band to band. Between sections it fades where
 * it is rather than jumping home.
 */
export function SectionLinks({ sections, active, last }: { sections: Section[]; active: string | null; last: string }) {
  const nav = useRef<HTMLElement>(null);
  const [box, setBox] = useState<{ x: number; width: number } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const el = active ? nav.current?.querySelector<HTMLElement>(`[data-section="${active}"]`) : null;
      if (el) setBox({ x: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  const tone = SECTIONS.find((s) => s.id === last) ?? SECTIONS[0];
  const on = sections.some((s) => s.id === active);
  return (
    <nav ref={nav} aria-label="Sections" className="relative flex items-center gap-1 text-sm font-semibold text-forest/75">
      <span
        aria-hidden
        className={`absolute inset-y-0 left-0 rounded-full transition-[translate,width,background-color,opacity] ${GLIDE}`}
        style={{ translate: `${box?.x ?? 0}px 0`, width: box?.width ?? 0, backgroundColor: tone.bg, opacity: on && box ? 1 : 0 }}
      />
      {sections.map((section) => {
        const current = section.id === active;
        return (
          <a
            key={section.id}
            data-section={section.id}
            href={`#${section.id}`}
            aria-current={current ? "location" : undefined}
            className={`relative rounded-full px-3.5 py-2 whitespace-nowrap transition-colors ${GLIDE} ${current ? "" : "hover:text-forest"}`}
            style={current ? { color: section.ink } : undefined}
          >
            {section.label}
          </a>
        );
      })}
    </nav>
  );
}
