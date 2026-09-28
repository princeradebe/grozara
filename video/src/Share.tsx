import { AbsoluteFill, Img, staticFile } from "remotion";

import { Icon, type IconName } from "@/components/mocks/Icon";
import { BuyStamp, StickerCard } from "@/components/mocks/parts";
import { PhoneFrame } from "@/components/mocks/PhoneFrame";
import { BoardScreen, CardDetailScreen } from "@/components/mocks/screens";
import { TAGLINE } from "@/content/site";

import { FONT_VARS } from "./fonts";
import { Zara } from "./Zara";

// The same verbs and chips as the homepage hero.
const VERBS: [string, IconName, string][] = [
  ["List it.", "list", "bg-forest text-lime-bright"],
  ["Snap it.", "camera", "bg-coral text-white"],
  ["Share it.", "userGroup", "bg-blush text-forest"],
  ["Scan it.", "barcode", "bg-amber text-forest"],
];

/**
 * The link preview for WhatsApp, X, Facebook and friends: 1200 × 630, in the homepage's Lime pop
 * style. Rendered to a still with `pnpm share` and copied to the site's app/ folder.
 */
export function Share() {
  return (
    <AbsoluteFill className="overflow-hidden bg-lime text-forest" style={FONT_VARS}>
      <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_78%_45%,rgba(200,245,140,0.95),transparent_70%)]" />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{ backgroundImage: "radial-gradient(#183631 1.4px, transparent 1.5px)", backgroundSize: "26px 26px" }}
      />

      <div className="absolute top-[54px] left-[64px] flex flex-col">
        <Img src={staticFile("site/brand/grozara-logo.svg")} className="h-[46px] w-auto self-start" />
        <h1 className="mt-[34px] font-display text-[98px] leading-[0.86] tracking-[-0.035em]">
          {VERBS.map(([word, icon, chip]) => (
            <span key={word} className="flex items-center gap-[0.2em]">
              {word}
              <span className={`grid size-[0.6em] place-items-center rounded-[0.18em] ${chip}`}>
                <Icon name={icon} className="size-[0.34em]" />
              </span>
            </span>
          ))}
        </h1>
        <p className="mt-[26px] font-display text-[30px] leading-tight tracking-[-0.01em] text-forest/85">{TAGLINE}</p>
        <span className="mt-[18px] inline-flex items-center gap-3 self-start rounded-full bg-forest px-5 py-2.5 text-[20px] font-semibold text-lime-bright">
          <span className="size-2.5 rounded-full bg-amber" /> Coming soon to the App Store and Google Play
        </span>
      </div>

      {/* Two phones leaning out of the right edge, cropped by the bottom for some movement. */}
      <div className="absolute top-[70px] left-[648px] rotate-[-7deg]">
        <PhoneFrame scale={0.66}>
          <BoardScreen />
        </PhoneFrame>
      </div>
      <div className="absolute top-[28px] left-[900px] rotate-[8deg]">
        <PhoneFrame scale={0.62}>
          <CardDetailScreen />
        </PhoneFrame>
      </div>
      <div className="absolute top-[250px] left-[596px] rotate-[-12deg]">
        <StickerCard src="/stickers/rice.png" alt="" name="Rice" size="1 kg" buy={2} width={170} aspect={1.25} tilt={0} />
      </div>
      <BuyStamp count={3} size={116} className="absolute top-[26px] left-[824px] rotate-[10deg]" />

      <div className="absolute right-[14px] bottom-[-2px]">
        <Zara size={250} pose={{ arms: [24, 146], mouth: 0.35, look: [-0.6, -0.2], cheeks: 1.3, tilt: -6 }} />
      </div>
    </AbsoluteFill>
  );
}
