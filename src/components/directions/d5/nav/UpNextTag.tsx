"use client";

import { Icon } from "@/components/mocks/Icon";

import { sectionIndex, SECTIONS } from "./sections";

/**
 * Desktop only: when the next section isn't in the menu, a tag swings down from the capsule to
 * say what's coming ("Up next: Extras"), and inside one it says where you are, so Extras and How
 * it works are announced at the moment they're relevant.
 */
export function UpNextTag({ active }: { active: string | null }) {
  const i = sectionIndex(active);
  const here = SECTIONS[i];
  const next = SECTIONS[i + 1];
  const inside = here && !here.inMenu ? here : null;
  const coming = next && !next.inMenu ? next : null;
  const tag = inside ?? coming;
  if (!tag) return null;
  const arrow = <Icon name="arrowRight" className="size-4 rotate-90" />;
  return (
    // Keyed by where you are, so every new tag swings in afresh.
    <div key={active} className="absolute top-[64px] right-[340px] hidden flex-col items-center lg:flex">
      <span aria-hidden className="h-4 w-[2px] bg-forest/40" />
      <a
        href={`#${coming?.id ?? tag.id}`}
        className="nav-tag-swing flex origin-top items-center gap-2.5 rounded-2xl px-4 py-2.5 text-sm font-semibold whitespace-nowrap shadow-[0_16px_28px_-14px_rgba(13,33,29,0.6)]"
        style={{ backgroundColor: tag.bg, color: tag.ink }}
      >
        {inside ? (
          <>
            <span className="opacity-75">You&rsquo;re in</span>
            <span className="font-display text-base">{inside.label}</span>
            {coming ? (
              <>
                <span className="opacity-40">·</span>
                <span className="opacity-75">next</span>
                <span className="font-display text-base">{coming.label}</span>
                {arrow}
              </>
            ) : null}
          </>
        ) : (
          <>
            <span className="opacity-75">Up next</span>
            <span className="font-display text-base">{coming?.label}</span>
            {arrow}
          </>
        )}
      </a>
    </div>
  );
}
