import Image from "next/image";

import { FOOTER_COLUMNS, LEGAL, TAGLINE } from "@/content/site";

import { KRAFT, Tape, ruled, tornEdge } from "./scrap";

const NOTES = [
  { tilt: -3, tape: "rgba(126,195,64,0.65)" },
  { tilt: 2, tape: "rgba(255,185,2,0.6)" },
  { tilt: -1.5, tape: "rgba(255,143,163,0.7)" },
];

/** The album's kraft back cover: link columns on taped-on index cards, the fine print, then the wordmark. */
export function Footer() {
  return (
    <footer className="relative mt-8 overflow-hidden text-forest" style={{ ...KRAFT, clipPath: tornEdge({ top: true, depth: 16, teeth: 64, seed: 5 }) }}>
      <div className="relative mx-auto max-w-7xl px-6 pt-24 lg:px-12 lg:pt-32">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <Image src="/brand/grozara-logo.svg" alt="Grozara" width={286} height={64} className="h-9 w-auto" />
            <p className="mt-7 max-w-sm font-display text-3xl leading-[1.08] tracking-tight sm:text-4xl">{TAGLINE}</p>
            <a href="#top" className="mt-8 inline-flex items-center gap-2 font-hand text-2xl text-forest/80 underline decoration-coral decoration-2 underline-offset-4 hover:text-forest">
              back to the first page ↑
            </a>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 sm:gap-x-6">
            {FOOTER_COLUMNS.map((column, i) => (
              <div key={column.title} className="relative self-start" style={{ rotate: `${NOTES[i].tilt}deg` }}>
                <div className="bg-[#FFFDF6] px-5 pt-5 pb-4 shadow-[0_16px_22px_-14px_rgba(60,40,10,0.6)]" style={{ ...ruled(null), backgroundPosition: "0 16px" }}>
                  <p className="font-hand text-[28px] leading-8 text-coral">{column.title}</p>
                  <ul className="text-[15px] leading-8 font-semibold">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        {link.href ? (
                          <a href={link.href} className="hover:text-coral">
                            {link.label}
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-2 text-forest/55">
                            {link.label}
                            <span className="rounded-full bg-forest/8 px-2 py-0.5 text-[10px] leading-none font-bold tracking-wider uppercase">soon</span>
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <Tape className="-top-3 left-1/2 -translate-x-1/2 rotate-[4deg]" size="h-6 w-20" color={NOTES[i].tape} />
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 grid gap-2 border-t-2 border-dashed border-forest/25 pt-8 text-xs leading-relaxed text-forest/80 lg:mt-20">
          <p className="font-semibold text-forest">{LEGAL.copyright}</p>
          {LEGAL.trademarks.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>

      <div aria-hidden className="dir-wordmark relative mt-14 h-[0.64em] text-center font-display text-[23vw] leading-none tracking-[-0.045em] text-forest select-none">
        <p>Grozara</p>
      </div>
    </footer>
  );
}
