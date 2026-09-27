import { PhoneFrame } from "@/components/mocks/PhoneFrame";
import { BuyStamp } from "@/components/mocks/parts";
import { CardDetailScreen } from "@/components/mocks/screens";
import { StoreBadges } from "@/components/site/StoreBadges";
import { SIGN_OFF, TAGLINE } from "@/content/site";

import { Kicker, tile, WRAP } from "./ui";

/** The closing call: a big forest tile with the badges, beside a lime tile holding a card at the till. */
export function GetApp() {
  return (
    <section id="get" aria-labelledby="d4-get" className="scroll-mt-4 pt-24 sm:pt-32">
      <div className={`${WRAP} grid gap-3 lg:grid-cols-12 lg:gap-4`}>
        <div className={tile("forest", "dir-reveal flex min-h-[480px] flex-col justify-between gap-12 p-8 sm:min-h-[560px] sm:p-12 lg:col-span-8")}>
          <div aria-hidden className="dir-glow absolute -top-40 -right-32 size-[640px] rounded-full bg-[radial-gradient(circle,rgb(126_195_64/0.6),transparent_62%)]" />
          <div aria-hidden className="absolute -bottom-48 -left-40 size-[480px] rounded-full bg-[radial-gradient(circle,rgb(165_224_99/0.22),transparent_65%)]" />
          <Kicker label="Get Grozara" dark className="relative" />
          <div className="relative">
            <h2 id="d4-get" className="font-display text-[64px] leading-[0.92] tracking-tight text-label sm:text-8xl lg:text-[112px]">
              {SIGN_OFF}
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-mist/75 sm:text-xl">{TAGLINE}</p>
          </div>
          <StoreBadges apple="white" height={56} className="relative text-mist" />
        </div>

        <div aria-hidden className={tile("lime", "dir-reveal min-h-[460px] lg:col-span-4 lg:min-h-0")}>
          <div className="absolute inset-x-0 top-10 flex justify-center">
            <div className="dir-float">
              <PhoneFrame scale={0.66}>
                <CardDetailScreen />
              </PhoneFrame>
            </div>
          </div>
          <span className="absolute top-6 right-6 rotate-12">
            <BuyStamp count={1} size={72} />
          </span>
          <span className="absolute bottom-8 left-5 -rotate-6 rounded-2xl bg-forest px-4 py-2 font-hand text-2xl text-lime-bright shadow-[0_14px_24px_-14px_rgba(24,54,49,0.9)]">
            see you at the till!
          </span>
        </div>
      </div>
    </section>
  );
}
