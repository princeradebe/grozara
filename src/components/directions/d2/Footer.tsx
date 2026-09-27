import Image from "next/image";

import { StoreBadges } from "@/components/site/StoreBadges";
import { FOOTER_COLUMNS, LEGAL, TAGLINE } from "@/content/site";

import styles from "./d2.module.css";
import { Fireflies } from "./ui";

/** The stage door: links and legal over a starfield, the name in neon rising out of the floor. */
export function Footer() {
  return (
    <footer className="relative flex flex-col overflow-hidden border-t border-white/10 bg-[#091814] md:min-h-[92svh]">
      <Fireflies count={70} seed={9} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(60%_70%_at_50%_100%,rgba(36,82,74,0.75),transparent)]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-20 lg:px-12 lg:pt-24">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Image src="/brand/grozara-logo-white.svg" alt="Grozara" width={286} height={64} className="h-9 w-auto" />
            <p className="mt-6 max-w-sm font-display text-3xl leading-tight text-label">{TAGLINE}</p>
            <StoreBadges apple="white" height={48} className="mt-8 text-mist" />
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-bold tracking-[0.2em] text-lime-bright uppercase">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.href ? (
                        <a href={link.href} className="text-[15px] text-mist/75 transition-colors hover:text-white">
                          {link.label}
                        </a>
                      ) : (
                        <span className="flex items-center gap-2 text-[15px] text-mist/40">
                          {link.label}
                          <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-mist/45 uppercase ring-1 ring-white/10">
                            soon
                          </span>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 space-y-1.5 border-t border-white/10 pt-6 text-xs leading-relaxed text-mist/45">
          <p className="text-mist/60">{LEGAL.copyright}</p>
          {LEGAL.trademarks.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>

      {/* the neon wordmark, rising out of the floor and clipped by it */}
      <div aria-hidden className="relative mt-auto h-[clamp(130px,19vw,330px)] pt-10">
        <div className="dir-wordmark absolute inset-x-0 bottom-0">
          <p
            className={`${styles.neon} translate-y-[24%] bg-gradient-to-b from-lime-bright/30 via-lime-bright/5 to-transparent bg-clip-text text-center font-display text-[23vw] leading-none tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.5px_var(--color-lime-bright)] [filter:drop-shadow(0_0_10px_rgba(165,224,99,0.7))_drop-shadow(0_0_46px_rgba(126,195,64,0.45))] sm:[-webkit-text-stroke:2px_var(--color-lime-bright)]`}
          >
            Grozara
          </p>
        </div>
      </div>
    </footer>
  );
}
