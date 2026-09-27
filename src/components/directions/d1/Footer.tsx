import Image from "next/image";

import { StoreBadges } from "@/components/site/StoreBadges";
import { FOOTER_COLUMNS, LEGAL, TAGLINE } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative flex flex-col overflow-hidden bg-forest-deep text-mist lg:min-h-[92svh]">
      <div className="pointer-events-none absolute -top-60 left-1/2 size-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(126,195,64,0.16),transparent_62%)]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-20 lg:px-12 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <Image src="/brand/grozara-logo-white.svg" alt="Grozara" width={286} height={64} loading="eager" className="h-9 w-auto" />
            <p className="mt-8 max-w-md font-display text-4xl leading-[1.05] tracking-tight text-label sm:text-5xl">{TAGLINE}</p>
            <StoreBadges height={48} apple="white" className="mt-10" />
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <p className="text-xs font-semibold tracking-[0.16em] text-lime-bright/80 uppercase">{column.title}</p>
                <ul className="mt-5 grid gap-3.5 text-[15px] font-medium">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.href ? (
                        <a href={link.href} className="text-mist/80 transition-colors hover:text-white">
                          {link.label}
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-mist/40">
                          {link.label}
                          <span className="rounded-full bg-white/8 px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase">soon</span>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 grid gap-2 border-t border-white/10 pt-8 text-xs leading-relaxed text-mist/45 lg:mt-20">
          <p className="font-semibold text-mist/60">{LEGAL.copyright}</p>
          {LEGAL.trademarks.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>

      <div aria-hidden className="dir-wordmark relative mt-14 h-[0.64em] text-center font-display text-[23vw] leading-none tracking-[-0.045em] text-lime-bright select-none lg:mt-auto">
        <p>Grozara</p>
      </div>
    </footer>
  );
}
