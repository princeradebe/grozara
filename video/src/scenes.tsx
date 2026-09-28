import type { ReactNode } from "react";
import { AbsoluteFill, Img, random, staticFile, useCurrentFrame } from "remotion";

import { Icon } from "@/components/mocks/Icon";
import { AvatarStack, BRANDS, BuyStamp, LiveDot, LiveToast, LoyaltyCard, PEOPLE, StickerCard } from "@/components/mocks/parts";
import { PhoneFrame } from "@/components/mocks/PhoneFrame";
import { CardDetailScreen, ListScreen, SharedListScreen } from "@/components/mocks/screens";
import { StoreBadges } from "@/components/site/StoreBadges";
import { SIGN_OFF, TICKER } from "@/content/site";

import { bob, lerp, pop, ramp, slam, wobble } from "./anim";
import { Band, Caption, Spark, Verb } from "./kit";
import { CUES, cue, STAMP_DELAY, type Scene } from "./timeline";

const turn = (n: number) => [...TICKER.slice(n), ...TICKER.slice(0, n)];

/** Places a child with its top-left at (x, y) on the 1080 × 1920 frame. */
function At({ x, y, children, className = "" }: { x: number; y: number; children: ReactNode; className?: string }) {
  return (
    <div className={`absolute ${className}`} style={{ left: x, top: y }}>
      {children}
    </div>
  );
}

function Glow({ color, x, y, size }: { color: string; x: number; y: number; size: number }) {
  return (
    <div
      className="absolute rounded-full"
      style={{ left: x - size / 2, top: y - size / 2, width: size, height: size, background: `radial-gradient(circle, ${color}, transparent 65%)` }}
    />
  );
}

/** Sparkles drifting upward, placed by a seeded random so every render matches. */
function Sparkles({ seed, color, count = 14 }: { seed: string; color: string; count?: number }) {
  const frame = useCurrentFrame();
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const x = random(`${seed}x${i}`) * 1080;
        const y = (random(`${seed}y${i}`) * 2100 - frame * (0.6 + random(`${seed}v${i}`) * 1.4)) % 2100;
        const size = 14 + random(`${seed}s${i}`) * 26;
        const twinkle = 0.35 + 0.65 * Math.abs(Math.sin((frame + i * 13) / 17));
        return <Spark key={i} size={size} className={`absolute ${color}`} style={{ left: x, top: y < -40 ? y + 2100 : y, opacity: twinkle }} />;
      })}
    </>
  );
}

function Tick({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size * 0.55} height={size * 0.55} aria-hidden>
      <path d="M4.5 12.8 9.4 17.6 19.5 6.6" fill="none" stroke="currentColor" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ——— 1 · Meet Grozara ————————————————————————————————————————————————————————

/** The full logo's proportions, and where its icon tile ends (the wordmark follows it). */
const LOGO_ASPECT = 305 / 79;
const TILE_END = 76 / 305;

/**
 * The full logo, as drawn: the icon lands, then the wordmark wipes out from behind it. Nothing
 * glows or sparkles around it, and it never shares a screen with the icon on its own.
 */
function Logo({ at, revealAt, width }: { at: number; revealAt: number; width: number }) {
  const frame = useCurrentFrame();
  const land = pop(frame, at, 10);
  const shown = lerp(TILE_END, 1, ramp(frame, revealAt, revealAt + 12));
  return (
    <Img
      src={staticFile("logo/grozara-logo.svg")}
      style={{
        width,
        height: width / LOGO_ASPECT,
        opacity: frame < at ? 0 : Math.min(1, land * 2),
        clipPath: `inset(0 ${(1 - shown) * 100}% 0 0)`,
        transform: `scale(${lerp(0.7, 1, land)})`,
        transformOrigin: `${(TILE_END / 2) * 100}% 50%`,
      }}
    />
  );
}

const WALLET = [BRANDS.basket, BRANDS.sunny, BRANDS.leaf];

export function Hello({ s }: { s: Scene }) {
  const frame = useCurrentFrame();
  const logoAt = cue(s, CUES.hello.logo);
  const listAt = cue(s, CUES.hello.list);
  const cardsAt = cue(s, CUES.hello.cards);
  const list = pop(frame, listAt, 13);
  const cards = pop(frame, cardsAt, 12);
  return (
    <Band className="bg-lime text-forest" entrance={false} hits={[listAt + 3]}>
      <div className="absolute top-[300px] flex w-full justify-center">
        <Logo at={0} revealAt={logoAt - 6} width={880} />
      </div>
      <At x={60} y={600}>
        <div style={{ opacity: frame < listAt ? 0 : 1, transform: `translateY(${(1 - list) * 900}px) rotate(${-6 + (1 - list) * -10}deg)` }}>
          <PhoneFrame scale={0.9}>
            <ListScreen />
          </PhoneFrame>
        </div>
      </At>
      {WALLET.map((brand, i) => (
        <At key={brand.name} x={470} y={900}>
          <div
            style={{
              opacity: frame < cardsAt ? 0 : 1,
              transformOrigin: "20% 110%",
              transform: `rotate(${lerp(0, -8 + i * 11, cards)}deg) translateX(${(1 - cards) * 700}px)`,
            }}
          >
            <LoyaltyCard brand={brand} width={480} />
          </div>
        </At>
      ))}
      <Caption s={s} />
    </Band>
  );
}

// ——— 2 · List it ——————————————————————————————————————————————————————————————

/** Two items from the list mock that aren't ticked yet. */
const PICKS = ["Boerewors", "Rooibos tea"];

export function List({ s }: { s: Scene }) {
  const frame = useCurrentFrame();
  const phone = pop(frame, s.voiceAt, 13);
  const tickAt = cue(s, CUES.list.tick);
  const tickAgainAt = cue(s, CUES.list.tickAgain);
  const tick = pop(frame, tickAt, 8);
  const picks = [cue(s, CUES.list.pick), cue(s, CUES.list.pickAgain)];
  return (
    <Band
      className="bg-forest text-mist"
      hits={[s.voiceAt + 3]}
      ticker={{ words: turn(1), bar: "bg-lime", ink: "text-forest", spark: "text-coral" }}
    >
      <Glow color="rgba(126,195,64,0.3)" x={700} y={900} size={1300} />
      <At x={64} y={210}>
        <Verb text="List it." at={s.voiceAt - 2} className="text-[230px] text-lime-bright" />
      </At>
      <At x={470} y={500}>
        <div style={{ transform: `translateX(${(1 - phone) * 760}px) rotate(${5 + (1 - phone) * 14}deg)` }}>
          <PhoneFrame scale={0.9}>
            <ListScreen />
          </PhoneFrame>
        </div>
      </At>
      <At x={120} y={640}>
        <div
          className="grid place-items-center rounded-full bg-lime text-forest shadow-[0_24px_40px_-16px_rgba(0,0,0,0.6)]"
          style={{
            width: 230,
            height: 230,
            transform: `scale(${tick * (1 + wobble(frame, tickAgainAt) * 0.12)}) rotate(${(1 - tick) * -40 + (wobble(frame, tickAt) + wobble(frame, tickAgainAt)) * 6}deg)`,
          }}
        >
          <Tick size={230} />
        </div>
      </At>
      {/* "Yep, I want this… and this": each item lands ticked on its word. */}
      {PICKS.map((item, i) => {
        const t = slam(frame, picks[i]);
        return (
          <At key={item} x={60} y={1000 + i * 150}>
            <div
              className="flex items-center gap-5 rounded-full bg-label py-4 pr-11 pl-4 text-[46px] font-semibold text-forest shadow-[0_24px_40px_-18px_rgba(0,0,0,0.7)]"
              style={{ opacity: frame < picks[i] ? 0 : 1, transform: `translateX(${(1 - t) * -700}px) rotate(${i ? 2 : -3}deg)` }}
            >
              <span className="grid size-[70px] place-items-center rounded-full bg-lime text-forest">
                <Tick size={70} />
              </span>
              {item}
            </div>
          </At>
        );
      })}
      <Caption s={s} lead={2} />
    </Band>
  );
}

// ——— 3 · Snap it ——————————————————————————————————————————————————————————————

export function Snap({ s }: { s: Scene }) {
  const frame = useCurrentFrame();
  const flashAt = cue(s, CUES.snap.flash);
  const liftAt = cue(s, CUES.snap.lift);
  const stampAt = liftAt + STAMP_DELAY;
  const noteAt = cue(s, CUES.snap.note);
  const photo = pop(frame, flashAt, 12);
  const lift = pop(frame, liftAt, 10);
  const away = ramp(frame, liftAt + 4, liftAt + 20);
  const note = pop(frame, noteAt, 11);
  const ring = ramp(frame, noteAt + 10, noteAt + 26);
  const flash = frame < flashAt ? 0 : Math.max(0, 1 - (frame - flashAt) / 7);
  return (
    <Band
      className="bg-coral text-forest"
      hits={[s.voiceAt + 3, stampAt + 3]}
      ticker={{ words: turn(3), bar: "bg-forest", ink: "text-label", spark: "text-amber" }}
    >
      <Sparkles seed="snap" color="text-label" count={10} />
      <div className="absolute top-[210px] right-[64px]">
        <Verb text="Snap it." at={s.voiceAt - 2} className="text-[230px] text-label" style={{ textShadow: "0.045em 0.045em 0 #183631" }} />
      </div>

      {/* The photo on the counter, then the rice lifting out of it as a sticker. */}
      <At x={90} y={560}>
        <div
          className="bg-white p-5 pb-20 shadow-[0_30px_50px_-20px_rgba(0,0,0,0.5)]"
          style={{
            width: 470,
            opacity: frame < flashAt ? 0 : 1 - away,
            transform: `scale(${lerp(0.6, 1, photo)}) rotate(${-6 + (1 - photo) * -10}deg) translate(${away * -260}px, ${away * 120}px)`,
          }}
        >
          <div className="relative aspect-square overflow-hidden" style={{ background: "linear-gradient(#D7E6EC 0 58%, #D3A676 58% 100%)" }}>
            <Img
              src={staticFile("site/stickers/rice.png")}
              className="absolute bottom-[8%] left-1/2 h-[76%] w-auto -translate-x-1/2 rotate-[-4deg]"
              style={{ opacity: 1 - lift }}
            />
            <span className="absolute top-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/40 px-4 py-1.5 text-[22px] font-bold tracking-wider text-white">
              <Icon name="camera" className="size-6" /> PHOTO
            </span>
          </div>
          <p className="absolute bottom-5 left-0 w-full text-center font-hand text-[44px] text-forest/70">on the counter</p>
        </div>
      </At>
      <At x={lerp(170, 520, lift)} y={lerp(640, 520, lift)}>
        <div
          className="relative"
          style={{ opacity: frame < liftAt ? 0 : 1, transform: `scale(${lerp(0.72, 1.15, lift)}) rotate(${lerp(-4, 7, lift)}deg)`, transformOrigin: "50% 60%" }}
        >
          <Img
            src={staticFile("site/stickers/rice.png")}
            className="w-[380px]"
            style={{ filter: "drop-shadow(0 26px 22px rgba(0,0,0,0.35))" }}
          />
          <div
            className="absolute -right-6 bottom-2"
            style={{ transform: `scale(${frame < stampAt ? 0 : lerp(2.6, 1, slam(frame, stampAt))}) rotate(${-14 + wobble(frame, stampAt) * 10}deg)` }}
          >
            <BuyStamp count={2} size={170} />
          </div>
        </div>
      </At>
      <At x={120} y={720}>
        <div style={{ opacity: frame < noteAt ? 0 : 1, transform: `scale(${note}) rotate(-6deg)`, transformOrigin: "30% 80%" }}>
          <StickerCard src="/stickers/tuna.png" alt="" name="Tuna" size="170 g" note="in brine, not oil!" buy={3} width={330} aspect={0.9} tilt={0} />
          <svg viewBox="0 0 360 120" className="absolute -bottom-9 -left-6 w-[400px] text-lime-bright" aria-hidden>
            <path
              d="M40 60 C 40 16, 320 10, 330 58 C 338 104, 60 112, 30 70 C 22 56, 44 34, 90 26"
              fill="none"
              stroke="currentColor"
              strokeWidth={9}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - ring}
            />
          </svg>
        </div>
      </At>
      <AbsoluteFill className="bg-white" style={{ opacity: flash }} />
      <Caption s={s} lead={2} />
    </Band>
  );
}

// ——— 4 · Share it —————————————————————————————————————————————————————————————

export function Share({ s }: { s: Scene }) {
  const frame = useCurrentFrame();
  const phone = pop(frame, s.voiceAt, 13);
  const toasts: [keyof typeof PEOPLE, string, string, number][] = [
    ["thandi", "ticked off", "Rolls", cue(s, CUES.share.thandi)],
    ["sipho", "added", "Charcoal", cue(s, CUES.share.sipho)],
  ];
  const liveAt = cue(s, CUES.share.live);
  const live = pop(frame, liveAt, 9);
  return (
    <Band
      className="bg-amber text-forest"
      hits={[s.voiceAt + 3]}
      ticker={{ words: turn(5), bar: "bg-coral", ink: "text-label", spark: "text-forest" }}
    >
      <At x={64} y={210}>
        <Verb text="Share it." at={s.voiceAt - 2} className="text-[230px] text-forest" />
      </At>
      {[0, 1, 2].map((i) => {
        const t = ((frame + i * 20) % 60) / 60;
        return (
          <div
            key={i}
            className="absolute rounded-full border-[6px] border-forest"
            style={{ left: 690 - 380 * t, top: 930 - 380 * t, width: 760 * t, height: 760 * t, opacity: (1 - t) * 0.35 * phone }}
          />
        );
      })}
      <At x={500} y={500}>
        <div style={{ transform: `translateY(${(1 - phone) * 900}px) rotate(${-4 + (1 - phone) * -10}deg)` }}>
          <PhoneFrame scale={0.9}>
            <SharedListScreen />
          </PhoneFrame>
        </div>
      </At>
      {toasts.map(([who, action, item, at], i) => {
        const t = pop(frame, at, 10);
        return (
          <At key={who} x={40} y={620 + i * 190}>
            <div style={{ opacity: frame < at ? 0 : 1, transform: `scale(${1.45 * t}) rotate(${i ? 3 : -3}deg)`, transformOrigin: "0 50%" }}>
              <LiveToast person={PEOPLE[who]} action={action} item={item} />
            </div>
          </At>
        );
      })}
      <At x={60} y={1040}>
        <div
          className="flex items-center gap-6 rounded-full bg-white py-4 pr-10 pl-4 shadow-[0_26px_40px_-20px_rgba(24,54,49,0.7)]"
          style={{ opacity: frame < liveAt ? 0 : 1, transform: `scale(${live}) rotate(-5deg)`, transformOrigin: "0 50%" }}
        >
          <AvatarStack people={[PEOPLE.thandi, PEOPLE.sipho, PEOPLE.lerato]} size={96} />
          <span className="flex items-center gap-3 font-display text-[52px] text-forest">
            <LiveDot size={18} /> Live
          </span>
        </div>
      </At>
      <Caption s={s} lead={2} />
    </Band>
  );
}

// ——— 5 · Scan it ——————————————————————————————————————————————————————————————

const FAN = [BRANDS.basket, BRANDS.sunny, BRANDS.corner, BRANDS.leaf];

export function Scan({ s }: { s: Scene }) {
  const frame = useCurrentFrame();
  const phone = pop(frame, s.voiceAt, 13);
  const fan = pop(frame, cue(s, CUES.scan.fan), 12);
  const brightAt = cue(s, CUES.scan.bright);
  const bright = ramp(frame, brightAt, brightAt + 10);
  const sweep = ((frame - brightAt) % 34) / 34;
  const badge = pop(frame, cue(s, CUES.scan.badge), 9);
  return (
    <Band
      className="bg-forest-deep text-mist"
      hits={[s.voiceAt + 3]}
      ticker={{ words: turn(2), bar: "bg-amber", ink: "text-forest", spark: "text-coral" }}
    >
      <Sparkles seed="scan" color="text-lime-bright" count={12} />
      <div className="absolute top-[210px] right-[64px]">
        <Verb text="Scan it." at={s.voiceAt - 2} className="text-[230px] text-lime-bright" />
      </div>
      <Glow color={`rgba(255,250,220,${0.15 + bright * 0.55})`} x={640} y={930} size={900 + bright * 500} />
      {FAN.map((brand, i) => (
        <At key={brand.name} x={60} y={760}>
          <div style={{ transformOrigin: "85% 110%", transform: `rotate(${lerp(0, -30 + i * 11, fan)}deg) translateX(${(1 - fan) * 200}px)` }}>
            <LoyaltyCard brand={brand} width={400} />
          </div>
        </At>
      ))}
      <At x={430} y={500}>
        <div className="relative" style={{ transform: `translateY(${(1 - phone) * 900}px) rotate(${3 + (1 - phone) * 12}deg)` }}>
          <PhoneFrame scale={0.9}>
            <CardDetailScreen />
          </PhoneFrame>
          <div className="pointer-events-none absolute inset-[10px] rounded-[48px] bg-white mix-blend-soft-light" style={{ opacity: bright * 0.5 }} />
          {frame >= brightAt ? (
            <div
              className="absolute left-[40px] h-[6px] w-[300px] rounded-full bg-[#ff3b30] shadow-[0_0_24px_6px_rgba(255,59,48,0.7)]"
              style={{ top: 420 + sweep * 140, opacity: 0.9 }}
            />
          ) : null}
        </div>
      </At>
      <At x={760} y={1060}>
        <div
          className="grid size-[230px] place-items-center rounded-full bg-amber text-center text-forest shadow-[0_20px_36px_-14px_rgba(0,0,0,0.7)]"
          style={{ transform: `scale(${badge}) rotate(${-12 + bob(frame, 60) * 4}deg)` }}
        >
          <span className="font-display text-[96px] leading-none">80+</span>
          <span className="-mt-12 text-[24px] font-bold tracking-[0.12em] uppercase">SA cards</span>
        </div>
      </At>
      <Caption s={s} lead={2} />
    </Band>
  );
}

// ——— 6 · Shopping, sorted ————————————————————————————————————————————————————

/** Photo stickers in the haul and how wide each falls. Oros, oil and plates went through the app's own sticker cutout. */
const STICKERS = {
  rice: ["site/stickers/rice.png", 190],
  tuna: ["site/stickers/tuna.png", 190],
  oros: ["stickers/oros.png", 120],
  oil: ["stickers/oil.png", 150],
  plates: ["stickers/plates.png", 240],
} as const;

const isSticker = (kind: string): kind is keyof typeof STICKERS => kind in STICKERS;

/** The haul: a braai shop and a few loyalty cards. */
const CONFETTI = [
  "oros", "rice", "basket", "plates", "tuna", "leaf", "oil", "spark",
  "sunny", "oros", "plates", "corner", "rice", "oil", "spark", "tuna",
] as const;

/** Where something dropped `t` frames ago is: it falls, bounces twice on its floor and settles. */
function dropped(t: number, floor: number) {
  let y = -320;
  let v = 6;
  for (let f = 0; f < t; f++) {
    v += 2.4;
    y += v;
    if (y > floor) {
      y = floor;
      v = Math.abs(v) < 6 ? 0 : -v * 0.32;
    }
  }
  return y;
}

export function Outro({ s }: { s: Scene }) {
  const frame = useCurrentFrame();
  const sortedAt = cue(s, CUES.outro.sorted);
  const comingAt = cue(s, CUES.outro.coming);
  const badgesAt = cue(s, CUES.outro.badges);
  const coming = pop(frame, comingAt, 10);
  const badges = pop(frame, badgesAt, 12);
  // The shower starts with "Shopping", so it rains for the whole end card.
  const rainAt = sortedAt + 4;
  return (
    <Band className="bg-lime text-forest" hits={[sortedAt + 3]} ticker={{ words: turn(4), bar: "bg-forest-deep", ink: "text-lime-bright", spark: "text-amber" }}>
      {/*
        The haul showers down from the top of the frame and piles up at the bottom. It's drawn
        first, so it falls behind the logo and the words and never covers them.
      */}
      <AbsoluteFill className="overflow-hidden">
        {CONFETTI.map((kind, i) => {
          const t = frame - rainAt - i * 4;
          if (t < 0) return null;
          const x = 10 + ((i * 67) % 960) + random(`hx${i}`) * 30;
          const y = dropped(t, 1640 + random(`hf${i}`) * 120);
          const r = lerp(random(`hr${i}`) * 90 - 45, random(`hs${i}`) * 50 - 25, Math.min(1, t / 24));
          const node =
            kind === "spark" ? (
              <Spark size={70} className="text-label" />
            ) : isSticker(kind) ? (
              <Img src={staticFile(STICKERS[kind][0])} style={{ width: STICKERS[kind][1] }} />
            ) : (
              <LoyaltyCard brand={BRANDS[kind]} width={240} />
            );
          return (
            <div key={i} className="absolute" style={{ left: x, top: y, transform: `rotate(${r}deg)` }}>
              {node}
            </div>
          );
        })}
      </AbsoluteFill>
      <div className="absolute top-[520px] flex w-full justify-center">
        <Logo at={s.voiceAt - 8} revealAt={s.voiceAt - 2} width={880} />
      </div>
      <div className="absolute top-[850px] flex w-full justify-center">
        <Verb text={SIGN_OFF} at={sortedAt} className="text-[124px] text-forest" />
      </div>
      <div
        className="absolute top-[1090px] flex w-full justify-center"
        style={{ opacity: frame < comingAt ? 0 : 1, transform: `scale(${coming}) rotate(${-3 + wobble(frame, comingAt) * 4}deg)` }}
      >
        <p className="rounded-full bg-forest px-10 py-4 font-display text-[64px] leading-none tracking-[-0.02em] text-lime-bright">Coming soon</p>
      </div>
      <div
        className="absolute top-[1260px] flex w-full justify-center text-forest"
        style={{ opacity: frame < badgesAt ? 0 : 1, transform: `translateY(${(1 - badges) * 120}px)` }}
      >
        <StoreBadges height={110} caption={false} center />
      </div>
    </Band>
  );
}
