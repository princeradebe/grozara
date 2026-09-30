"use client";

import Image from "next/image";

import { PageMap } from "./nav/PageMap";
import { GLIDE, SectionLinks } from "./nav/SectionLinks";
import { MENU_SECTIONS, SECTIONS } from "./nav/sections";
import { UpNextTag } from "./nav/UpNextTag";
import { useActiveSection } from "./nav/useActiveSection";

/**
 * The Lime pop header: a cream capsule that stays at the top over every band. The menu keeps five
 * links; Extras and How it works are reached without growing it. On desktop an "Up next" tag
 * swings down as you reach them, and on every screen the page map (beside "Get the app") shows
 * the whole page in miniature. Phones swap the links for a chip naming the section you're in.
 */
export function Header() {
  const { active, last } = useActiveSection();
  const current = SECTIONS.find((s) => s.id === active);
  const shown = SECTIONS.find((s) => s.id === last) ?? SECTIONS[0];
  return (
    // Zero height, so the capsule floats over the hero instead of pushing it down.
    <div className="sticky top-0 z-50 h-0">
      <header className="relative mx-auto max-w-7xl px-3 pt-3 lg:px-8">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-full bg-label/88 pr-2 pl-3 shadow-[0_14px_34px_-18px_rgba(13,33,29,0.55)] ring-1 ring-forest/10 backdrop-blur-md sm:pl-5">
          <a href="#top" className="flex shrink-0 items-center">
            {/* On phones the icon stands in for the wordmark, leaving room for the section chip. */}
            <span className="grid size-9 place-items-center rounded-full bg-forest sm:hidden">
              <Image src="/brand/grozara-icon.svg" alt="Grozara" width={64} height={64} priority className="size-[26px]" />
            </span>
            <Image src="/brand/grozara-logo.svg" alt="Grozara" width={286} height={64} priority className="hidden h-7 w-auto sm:block" />
          </a>

          <div className="hidden lg:block">
            <SectionLinks sections={MENU_SECTIONS} active={active} last={last} />
          </div>

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
            <PageMap />
            <a href="#get" className="inline-flex h-9 items-center rounded-full bg-forest px-4 text-sm font-semibold whitespace-nowrap text-lime-bright">
              Get the app
            </a>
          </div>
        </div>
        <UpNextTag active={active} />
      </header>
    </div>
  );
}
