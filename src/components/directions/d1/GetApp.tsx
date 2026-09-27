import { StickerCard } from "@/components/mocks/parts";
import { WalletScreen } from "@/components/mocks/screens";
import { StoreBadges } from "@/components/site/StoreBadges";
import { SIGN_OFF } from "@/content/site";

import { Kicker, Phone } from "./ui";

export function GetAppSection() {
  return (
    <section id="get" aria-labelledby="get-title" className="relative scroll-mt-6 px-3 pt-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
      <div className="dir-reveal-zoom relative mx-auto max-w-[88rem] overflow-hidden rounded-[2.5rem] bg-forest text-mist lg:min-h-[640px]">
        <div className="dir-glow pointer-events-none absolute -top-48 -left-40 size-[44rem] rounded-full bg-[radial-gradient(circle,rgba(165,224,99,0.34),transparent_65%)]" />
        <div className="pointer-events-none absolute -right-40 -bottom-60 size-[40rem] rounded-full bg-[radial-gradient(circle,rgba(126,195,64,0.3),transparent_65%)]" />

        <div className="relative z-10 px-7 pt-14 sm:px-12 sm:pt-16 lg:max-w-[44rem] lg:px-16 lg:py-24">
          <Kicker tone="dark">Free, with optional extras</Kicker>
          <h2 id="get-title" className="mt-7 font-display text-5xl leading-[0.98] tracking-tight text-label sm:text-6xl lg:text-7xl">
            Ready for your next shop?
          </h2>
          <p className="mt-4 font-hand text-4xl text-lime-bright sm:text-5xl">{SIGN_OFF}</p>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-mist/70">
            Grozara is in beta right now and coming soon to the App Store and Google Play.
          </p>
          <StoreBadges height={56} apple="white" className="mt-10 text-mist" />
        </div>

        <div aria-hidden className="relative mt-12 h-[330px] sm:h-[380px] lg:absolute lg:right-[5%] lg:bottom-0 lg:mt-0 lg:h-[600px] lg:w-[460px] xl:right-[9%]">
          <div className="absolute top-6 left-1/2 -translate-x-1/2 rotate-[7deg] lg:top-16">
            <div className="dir-float">
              <Phone base={0.7} sm={0.78} lg={0.86}>
                <WalletScreen />
              </Phone>
            </div>
          </div>
          <div className="absolute top-2 left-[4%] sm:left-[20%] lg:top-24 lg:-left-16">
            <div className="dir-float-side origin-top-left scale-[0.75] sm:scale-100">
              <StickerCard src="/stickers/tuna.png" alt="" name="Tuna" size="170 g" note="in brine!" buy={3} width={150} aspect={0.9} tilt={-10} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
