import Image from "next/image";

import { Icon } from "@/components/mocks/Icon";
import { FOOTER_COLUMNS, type FooterLink, LEGAL, TAGLINE } from "@/content/site";

import { Kicker, tile, type Tone, WRAP } from "./ui";

/** A footer link, or the label with a "soon" pill while the page doesn't exist yet. */
function ColumnLink({ link, className = "" }: { link: FooterLink; className?: string }) {
  return link.href ? (
    <a href={link.href} className={`underline-offset-4 hover:underline ${className}`}>
      {link.label}
    </a>
  ) : (
    <span className={`inline-flex items-center gap-2 opacity-50 ${className}`}>
      {link.label}
      <span className="rounded-full bg-forest/10 px-2 py-0.5 font-sans text-[10px] font-semibold tracking-wider uppercase">soon</span>
    </span>
  );
}

const SMALL_TONES: Tone[] = ["lime", "paper"];

/** The footer as one more bento: brand, the feature index, the small link columns, fine print, then the wordmark. */
export function Footer() {
  const [features, ...columns] = FOOTER_COLUMNS;
  return (
    <footer className="mt-24 pb-4 sm:mt-32 sm:pb-6">
      <div className={`${WRAP} grid gap-3 lg:grid-cols-12 lg:gap-4`}>
        <div className={tile("deep", "dir-reveal flex min-h-[300px] flex-col justify-between gap-10 p-7 sm:p-10 lg:col-span-5")}>
          <div aria-hidden className="dir-glow absolute -top-48 -left-40 size-[560px] rounded-full bg-[radial-gradient(circle,rgb(126_195_64/0.4),transparent_62%)]" />
          <Image src="/brand/grozara-logo-white.svg" alt="Grozara" width={286} height={64} className="relative h-9 w-auto self-start" />
          <p className="relative max-w-sm font-display text-4xl leading-[1.05] tracking-tight text-label sm:text-5xl">{TAGLINE}</p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-3 lg:col-span-7 lg:grid-cols-7 lg:gap-4">
          <div className={tile("white", "dir-reveal col-span-2 p-7 sm:p-8 lg:col-span-4 lg:row-span-2")}>
            <Kicker label={features.title} />
            <ul className="mt-5">
              {features.links.map((link, i) => (
                <li key={link.label} className="border-t border-forest/8">
                  {link.href ? (
                    <a href={link.href} className="group flex items-center gap-4 py-3.5 font-display text-xl leading-tight sm:text-2xl">
                      <span className="font-mono text-xs font-semibold opacity-55">{String(i + 1).padStart(2, "0")}</span>
                      <span className="flex-1">{link.label}</span>
                      <span className="grid size-8 place-items-center rounded-full bg-forest/8 transition-colors group-hover:bg-forest group-hover:text-lime-bright">
                        <Icon name="arrowRight" className="size-4 -rotate-90" />
                      </span>
                    </a>
                  ) : (
                    <ColumnLink link={link} className="py-3.5 font-display text-xl sm:text-2xl" />
                  )}
                </li>
              ))}
            </ul>
          </div>

          {columns.map((column, i) => (
            <div key={column.title} className={tile(SMALL_TONES[i % SMALL_TONES.length], "dir-reveal min-h-[150px] p-6 sm:p-7 lg:col-span-3")}>
              <Kicker label={column.title} />
              <ul className="mt-4 grid gap-2.5 font-display text-lg leading-tight sm:text-xl">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <ColumnLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className={tile("mist", "dir-reveal flex flex-col gap-6 p-6 sm:p-7 lg:col-span-12 lg:flex-row lg:items-end lg:justify-between")}>
          <div className="grid gap-1.5 text-xs leading-relaxed text-forest/55">
            <p className="text-sm font-semibold text-forest/80">{LEGAL.copyright}</p>
            {LEGAL.trademarks.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <a href="#top" className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white lg:self-auto">
            Back to top
            <Icon name="arrowRight" className="size-4 -rotate-90 text-lime-bright" />
          </a>
        </div>

        <div aria-hidden className={tile("forest", "@container pt-10 sm:pt-14 lg:col-span-12")}>
          <div className="dir-glow absolute bottom-0 left-1/2 size-[720px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(126_195_64/0.45),transparent_62%)]" />
          <p className="dir-wordmark relative h-[0.64em] text-center font-display text-[23cqw] leading-none tracking-[-0.045em] text-lime-bright select-none">
            Grozara
          </p>
        </div>
      </div>
    </footer>
  );
}
