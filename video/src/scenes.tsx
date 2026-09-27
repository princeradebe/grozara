import type { ReactNode } from "react";
import { AbsoluteFill, Img, random, staticFile, useCurrentFrame } from "remotion";

import { Icon } from "@/components/mocks/Icon";
import { AvatarStack, BRANDS, BuyStamp, LiveDot, LiveToast, LoyaltyCard, PEOPLE, StickerCard } from "@/components/mocks/parts";
import { PhoneFrame } from "@/components/mocks/PhoneFrame";
import { CardDetailScreen, ListScreen, SharedListScreen } from "@/components/mocks/screens";
import { StoreBadges } from "@/components/site/StoreBadges";
import { SIGN_OFF, TICKER } from "@/content/site";

import { bob, lerp, pop, ramp, slam, wobble } from "./anim";
import { Band, Bubble, Spark, Verb } from "./kit";
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

// ——— 1 · Howzit ———————————————————————————————————————————————————————————————

export function Hello({ s }: { s: Scene }) {
  const frame = useCurrentFrame();
  const nameAt = cue(s, CUES.hello.name);
  const logoAt = cue(s, CUES.hello.logo);
  const name = pop(frame, nameAt);
  const logo = pop(frame, logoAt, 9);
  return (
    <Band className="bg-lime text-forest" entrance={false} hits={[s.voiceAt + 1]}>
      <Glow color="rgba(200,245,140,0.95)" x={760} y={700} size={1500} />
      <Sparkles seed="hello" color="text-label" />
      <div className="absolute top-[230px] flex w-full justify-center">
        <Verb text="Howzit!" at={s.voiceAt - 3} className="text-[250px] text-forest" />
      </div>
      <div className="absolute top-[560px] flex w-full justify-center">
        <Img
          src={staticFile("site/brand/grozara-logo.svg")}
          className="h-[132px] w-auto"
          style={{ opacity: Math.min(1, logo * 2), transform: `scale(${lerp(2.2, 1, logo)}) rotate(${(1 - logo) * -12}deg)` }}
        />
      </div>
      <At x={96} y={880}>
        <div style={{ opacity: Math.min(1, name * 2), transform: `scale(${name}) rotate(-8deg)`, transformOrigin: "80% 80%" }}>
          <p className="font-hand text-[92px] leading-none text-forest">I&rsquo;m Zara!</p>
          <svg viewBox="0 0 160 100" className="mt-2 ml-44 w-40 text-coral" aria-hidden>
            <path d="M6 10 C 60 8, 112 28, 136 80" fill="none" stroke="currentColor" strokeWidth={9} strokeLinecap="round" />
            <path d="M116 66 L 137 82 L 142 57" fill="none" stroke="currentColor" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </At>
    </Band>
  );
}

// ——— 2 · List it ——————————————————————————————————————————————————————————————

export function List({ s }: { s: Scene }) {
  const frame = useCurrentFrame();
  const phone = pop(frame, s.voiceAt, 13);
  const tickAt = cue(s, CUES.list.tick);
  const tick = pop(frame, tickAt, 8);
  const toast = slam(frame, cue(s, CUES.list.toast));
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
          style={{ width: 230, height: 230, transform: `scale(${tick}) rotate(${(1 - tick) * -40 + wobble(frame, tickAt) * 6}deg)` }}
        >
          <Tick size={230} />
        </div>
      </At>
      <At x={60} y={1010}>
        <div
          className="flex items-center gap-6 rounded-full bg-label py-4 pr-4 pl-9 text-[40px] font-semibold text-forest shadow-[0_24px_40px_-18px_rgba(0,0,0,0.7)]"
          style={{ transform: `translateX(${(1 - toast) * -700}px) rotate(-3deg)` }}
        >
          Tomatoes deleted
          <span className="rounded-full bg-forest px-7 py-3 font-bold text-lime-bright">Undo</span>
        </div>
      </At>
      <Bubble text={s.text} at={s.voiceAt} frames={s.voiceFrames} side="left" lead={2} style={{ left: 330, top: 1290 }} />
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
      <Bubble text={s.text} at={s.voiceAt} frames={s.voiceFrames} side="right" lead={2} style={{ right: 300, top: 1290 }} />
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
      <Bubble text={s.text} at={s.voiceAt} frames={s.voiceFrames} side="left" lead={2} style={{ left: 330, top: 1290 }} />
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
          <span className="font-display text-[96px] leading-none">80</span>
          <span className="-mt-12 text-[24px] font-bold tracking-[0.12em] uppercase">SA cards</span>
        </div>
      </At>
      <Bubble text={s.text} at={s.voiceAt} frames={s.voiceFrames} side="right" lead={2} style={{ right: 300, top: 1290 }} />
    </Band>
  );
}

// ——— 6 · Shopping, sorted ————————————————————————————————————————————————————

const CONFETTI = ["rice", "tuna", "basket", "leaf", "sunny", "corner", "spark", "spark", "rice", "tuna", "spark", "corner"] as const;

export function Outro({ s }: { s: Scene }) {
  const frame = useCurrentFrame();
  const icon = pop(frame, s.voiceAt - 2, 9);
  const logo = pop(frame, s.voiceAt + 6, 11);
  const sortedAt = cue(s, CUES.outro.sorted);
  const lekkerAt = cue(s, CUES.outro.lekker);
  const badgesAt = cue(s, CUES.outro.badges);
  const lekker = pop(frame, lekkerAt, 8);
  const badges = pop(frame, badgesAt, 12);
  return (
    <Band
      className="bg-lime text-forest"
      hits={[sortedAt + 3, lekkerAt + 2]}
      ticker={{ words: turn(4), bar: "bg-forest-deep", ink: "text-lime-bright", spark: "text-amber" }}
    >
      <Glow color="rgba(200,245,140,0.95)" x={540} y={620} size={1500} />
      <Sparkles seed="outro" color="text-label" />
      {frame >= lekkerAt
        ? CONFETTI.map((kind, i) => {
            const t = frame - lekkerAt - i * 6;
            if (t < 0) return null;
            const x = random(`cx${i}`) * 1000;
            // Slow enough to keep raining until the last frame.
            const y = -260 + t * (3 + random(`cv${i}`) * 3) + t * t * 0.06;
            const r = (random(`cr${i}`) - 0.5) * 60 + t * (random(`cs${i}`) - 0.5) * 8;
            const node =
              kind === "spark" ? (
                <Spark size={70} className="text-label" />
              ) : kind === "rice" || kind === "tuna" ? (
                <Img src={staticFile(`site/stickers/${kind}.png`)} className="w-[170px]" />
              ) : (
                <LoyaltyCard brand={BRANDS[kind]} width={200} />
              );
            return (
              <div key={i} className="absolute" style={{ left: x, top: y, transform: `rotate(${r}deg)` }}>
                {node}
              </div>
            );
          })
        : null}
      <div className="absolute top-[250px] flex w-full justify-center">
        <Img
          src={staticFile("site/brand/app-icon.png")}
          className="size-[230px] rounded-[54px] shadow-[0_30px_50px_-20px_rgba(13,33,29,0.6)]"
          style={{ transform: `scale(${icon}) rotate(${(1 - icon) * 20 + wobble(frame, s.voiceAt + 8) * 5}deg)` }}
        />
      </div>
      <div className="absolute top-[540px] flex w-full justify-center">
        <Img src={staticFile("site/brand/grozara-logo.svg")} className="h-[120px] w-auto" style={{ opacity: Math.min(1, logo * 2), transform: `scale(${lerp(0.6, 1, logo)})` }} />
      </div>
      <div className="absolute top-[720px] flex w-full justify-center">
        <Verb text={SIGN_OFF} at={sortedAt} className="text-[124px] text-forest" />
      </div>
      <At x={620} y={1150}>
        <div
          className="rounded-[28px] bg-coral px-9 pt-3 pb-5 shadow-[0_22px_34px_-16px_rgba(0,0,0,0.5)]"
          style={{ opacity: frame < lekkerAt ? 0 : 1, transform: `scale(${lekker}) rotate(${8 + wobble(frame, lekkerAt) * 8}deg)` }}
        >
          <p className="font-hand text-[100px] leading-none text-label">Lekker!</p>
        </div>
      </At>
      <div
        className="absolute top-[920px] flex w-full justify-center text-forest"
        style={{ opacity: frame < badgesAt ? 0 : 1, transform: `translateY(${(1 - badges) * 120}px)` }}
      >
        <StoreBadges height={104} center />
      </div>
    </Band>
  );
}
