import Image from "next/image";

import { Icon } from "@/components/mocks/Icon";
import { BRANDS, BuyStamp, LoyaltyCard, StickerCard } from "@/components/mocks/parts";
import { PhoneFrame } from "@/components/mocks/PhoneFrame";
import { HomeScreen, ListScreen, WalletScreen } from "@/components/mocks/screens";
import { StoreBadges } from "@/components/site/StoreBadges";
import { FAQS, FOOTER_COLUMNS, LEGAL, SIGN_OFF, TAGLINE } from "@/content/site";

import { TickableSticker } from "./Interactive";
import { Kicker, tilt, Verb } from "./ui";

export function Faq() {
  return (
    <section id="faq" className="relative scroll-mt-20 overflow-clip bg-forest text-mist">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-16 pb-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-12 lg:pt-24 lg:pb-28">
        <div className="lg:sticky lg:top-10 lg:self-start">
          <Verb className="dir-reveal-left text-lime-bright">Ask it.</Verb>
          <Kicker className="mt-8 bg-lime-bright text-forest">FAQ</Kicker>
          <h2 className="mt-5 font-display text-[clamp(2.3rem,4.6vw,4rem)] leading-[0.98] tracking-[-0.025em]">Good questions.</h2>
          <div className="relative mt-10 hidden h-[300px] lg:block">
            <div className="absolute top-0 left-4">
              <div className="dir-float-side">
                <TickableSticker
                  src="/stickers/tuna.png"
                  alt=""
                  name="Tuna"
                  size="170 g"
                  note="in brine, not oil!"
                  buy={3}
                  width={230}
                  aspect={0.9}
                  tilt={-7}
                />
              </div>
            </div>
            <span aria-hidden className="absolute top-6 left-[250px] grid size-[120px] rotate-[10deg] place-items-center rounded-full bg-coral font-display text-[84px] leading-none text-forest shadow-[0_20px_34px_-16px_rgba(0,0,0,0.7)]">
              ?
            </span>
          </div>
        </div>

        <div className="faq-list dir-reveal border-t border-white/12">
          {FAQS.map((faq, i) => (
            // Sharing a name makes these one accordion: opening one closes the rest, natively.
            <details key={faq.q} name="faq" className="faq-item group border-b border-white/12" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center gap-4 py-6 lg:gap-6 [&::-webkit-details-marker]:hidden">
                <span aria-hidden className="faq-num w-14 shrink-0 origin-left font-display text-4xl leading-none tracking-[-0.04em] text-lime-bright transition-[opacity,scale] duration-500 group-open:scale-110 lg:w-20 lg:text-6xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-display text-xl leading-tight transition-[color,translate] duration-300 group-open:text-lime-bright group-hover:translate-x-1 lg:text-[1.65rem]">
                  {faq.q}
                </span>
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-lime-bright text-forest transition-[rotate,background-color,color] duration-500 ease-[cubic-bezier(0.3,1.6,0.5,1)] group-open:rotate-[135deg] group-open:bg-coral group-open:text-label">
                  <Icon name="plus" className="size-6" />
                </span>
              </summary>
              <p className="faq-answer -mt-1 max-w-xl pr-14 pb-7 pl-[4.5rem] text-lg leading-relaxed text-mist/75 lg:pl-[6.5rem]">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GetIt() {
  return (
    <section id="get" className="relative scroll-mt-20 overflow-clip bg-lime text-forest">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_30%,rgba(165,224,99,0.95),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-6 pt-16 text-center lg:px-12 lg:pt-24">
        <h2 className="dir-reveal-zoom font-display text-[clamp(5.5rem,22vw,19rem)] leading-[0.8] tracking-[-0.055em]">Get it.</h2>
        <p className="dir-reveal mt-6 font-display text-[clamp(1.8rem,4vw,3.25rem)] leading-none tracking-[-0.02em]">{SIGN_OFF}</p>
        <p className="dir-reveal mx-auto mt-4 max-w-md text-lg font-medium text-forest/80">{TAGLINE}</p>
        <StoreBadges height={58} apple="black" center className="dir-reveal mt-9" />
      </div>

      <div aria-hidden className="relative mx-auto mt-14 h-[380px] max-w-5xl sm:h-[440px] lg:mt-16 lg:h-[500px]">
        <div className="absolute top-0 left-1/2 z-10 -translate-x-1/2">
          <div className="dir-reveal">
            <div className="origin-top scale-[0.78] sm:scale-100">
              <PhoneFrame scale={0.8}>
                <HomeScreen />
              </PhoneFrame>
            </div>
          </div>
        </div>
        <div className="absolute top-[70px] left-[calc(50%-440px)] hidden -rotate-[9deg] md:block">
          <div className="dir-drift-up">
            <PhoneFrame scale={0.66}>
              <WalletScreen />
            </PhoneFrame>
          </div>
        </div>
        <div className="absolute top-[70px] right-[calc(50%-440px)] hidden rotate-[9deg] md:block">
          <div className="dir-drift-up">
            <PhoneFrame scale={0.66}>
              <ListScreen />
            </PhoneFrame>
          </div>
        </div>
        <div className="absolute top-[40px] left-[calc(50%-250px)] z-20 hidden sm:block">
          <BuyStamp count={2} size={110} className="dir-pop dir-delay-2" />
        </div>
        <div className="absolute top-[150px] right-[calc(50%-196px)] z-20 sm:top-[320px] sm:right-[calc(50%-300px)]">
          <div className="dir-float-side">
            <LoyaltyCard brand={BRANDS.sunny} width={180} favourite className="rotate-[12deg]" />
          </div>
        </div>
        <div className="absolute top-[250px] left-[calc(50%-196px)] z-20 sm:left-[calc(50%-300px)]">
          <span style={tilt(-8)} className="dir-pop dir-delay-4 block">
            <StickerCard src="/stickers/rice.png" alt="" name="Rice" buy={2} width={130} aspect={1.25} tilt={0} />
          </span>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative flex flex-col overflow-clip bg-forest-deep text-mist lg:min-h-svh">
      <div className="mx-auto grid w-full max-w-7xl flex-1 gap-14 px-6 pt-20 lg:grid-cols-[1.2fr_1fr] lg:gap-20 lg:px-12 lg:pt-28">
        <div>
          <Image src="/brand/grozara-logo-white.svg" alt="Grozara" width={286} height={64} className="h-10 w-auto" />
          <p className="mt-8 max-w-xl font-display text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.95] tracking-[-0.03em]">{TAGLINE}</p>
          <StoreBadges height={52} apple="white" className="mt-10 text-mist" />
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-2">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-bold tracking-[0.16em] text-lime-bright uppercase">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label} className="font-display text-2xl leading-tight tracking-[-0.01em] lg:text-[1.75rem]">
                    {link.href ? (
                      <a href={link.href} className="transition-colors hover:text-lime-bright">
                        {link.label}
                      </a>
                    ) : (
                      <span className="text-mist/40">
                        {link.label}
                        <span className="ml-2 rounded-full bg-white/8 px-2 py-0.5 align-middle font-sans text-[0.7rem] font-semibold tracking-wide uppercase">
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

      <div className="mx-auto w-full max-w-7xl px-6 pt-14 pb-24 lg:px-12">
        <div className="space-y-1.5 border-t border-white/10 pt-6 text-xs leading-relaxed text-mist/55">
          <p className="font-semibold text-mist/75">{LEGAL.copyright}</p>
          {LEGAL.trademarks.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>

      <div aria-hidden className="dir-wordmark">
        <p className="-mb-[0.2em] text-center font-display text-[25vw] leading-[0.9] tracking-[-0.055em] whitespace-nowrap text-lime">
          Grozara
        </p>
      </div>
    </footer>
  );
}
