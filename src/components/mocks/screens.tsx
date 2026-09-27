import Image from "next/image";

import { Icon } from "./Icon";
import { Avatar, AvatarStack, BRANDS, CheckCircle, GlassCircle, LiveDot, LoyaltyCard, PEOPLE, type Person, StickerCard, TabBar } from "./parts";

// Recreations of the Grozara iPhone app, laid out at 390 × 844 points inside <PhoneFrame>.

function Chevron() {
  return (
    <span className="grid size-[44px] place-items-center rounded-full border border-white/80 bg-white/85 text-forest shadow-[0_6px_16px_-10px_rgba(10,40,33,0.5)]">
      <svg viewBox="0 0 24 24" className="size-[22px]" aria-hidden>
        <path d="M15 5 8 12l7 7" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function HomeScreen() {
  return (
    <div className="absolute inset-0 pt-[62px]">
      <div className="px-[22px]">
        <Image src="/brand/grozara-logo.svg" alt="" width={286} height={64} className="h-[30px] w-auto" />
        <h2 className="mt-[26px] font-display text-[33px] leading-[1.02] tracking-tight">A little more organised.</h2>
        <p className="mt-[6px] text-[15px] text-forest/55">Your lists and cards, together.</p>

        <div className="mt-[28px] flex items-baseline justify-between">
          <h3 className="text-[20px] font-bold">Your next shop</h3>
          <span className="text-[15px] font-semibold text-forest/80">All lists</span>
        </div>
        <div className="mt-[12px] rounded-[26px] bg-forest p-[20px] text-white shadow-[0_18px_30px_-18px_rgba(10,40,33,0.8)]">
          <div className="flex items-start justify-between">
            <span className="text-[22px] font-bold">Weekend shop</span>
            <Icon name="task" className="size-[26px] text-lime-bright" />
          </div>
          <div className="mt-[18px] h-[5px] rounded-full bg-white/15">
            <div className="h-full w-[40%] rounded-full bg-lime" />
          </div>
          <div className="mt-[14px] flex items-center justify-between text-[15px] text-white/85">
            <span>3 left to pick up</span>
            <Icon name="arrowRight" className="size-[20px]" />
          </div>
        </div>

        <div className="mt-[26px] flex items-baseline justify-between">
          <h3 className="text-[20px] font-bold">Cards at hand</h3>
          <span className="text-[15px] font-semibold text-forest/80">View all</span>
        </div>
        <div className="mt-[12px] flex gap-[12px]">
          <LoyaltyCard brand={BRANDS.leaf} width={218} favourite />
          <LoyaltyCard brand={BRANDS.basket} width={218} className="opacity-90" />
        </div>
        <p className="mt-[18px] flex items-center gap-[8px] text-[13px] text-forest/50">
          <Icon name="userGroup" className="size-[16px]" /> Weekend shop is shared with 2 people.
        </p>
      </div>
      <TabBar active="home" />
    </div>
  );
}

const LIST_ROWS: [string, string, boolean][] = [
  ["Milk", "2 L", true],
  ["Brown bread", "", true],
  ["Eggs", "× 6", false],
  ["Boerewors", "1 kg", false],
  ["Tomatoes", "", false],
  ["Rooibos tea", "80 bags", false],
];

export function ListScreen() {
  return (
    <div className="absolute inset-0 pt-[60px]">
      <div className="flex items-center justify-between px-[16px]">
        <Chevron />
        <GlassCircle icon="more" />
      </div>
      <div className="px-[22px]">
        <p className="mt-[14px] flex items-center gap-[6px] text-[13px] font-semibold text-lime">
          <span className="size-[7px] rounded-full bg-amber" /> Pinned for your next shop
        </p>
        <h2 className="mt-[4px] font-display text-[34px] leading-none tracking-tight">Weekend shop</h2>
        <p className="mt-[8px] text-[15px] text-forest/55">2 of 6 picked up</p>
        <ul className="mt-[18px] divide-y divide-forest/8 rounded-[22px] bg-white px-[16px] shadow-[0_10px_24px_-18px_rgba(10,40,33,0.5)]">
          {LIST_ROWS.map(([name, size, done]) => (
            <li key={name} className="flex items-center gap-[14px] py-[15px]">
              <CheckCircle checked={done} size={26} />
              <span className={`text-[17px] font-medium ${done ? "text-forest/40" : ""}`}>{name}</span>
              {size ? <span className={`text-[15px] text-forest/45 ${done ? "opacity-60" : ""}`}>{size}</span> : null}
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute inset-x-[16px] bottom-[34px] flex items-center gap-[10px] rounded-full bg-white p-[6px] pl-[20px] shadow-[0_12px_28px_-14px_rgba(10,40,33,0.6)]">
        <span className="flex-1 text-[17px] text-forest/40">Add an item</span>
        <span className="grid size-[44px] place-items-center rounded-full bg-lime text-white">
          <Icon name="plus" className="size-[22px]" />
        </span>
      </div>
    </div>
  );
}

const SHARED_ROWS: { name: string; size: string; done: boolean; by?: Person; live?: boolean; added?: Person }[] = [
  { name: "Boerewors", size: "2 kg", done: true, by: PEOPLE.thandi },
  { name: "Chakalaka", size: "2 tins", done: true, by: PEOPLE.thandi },
  { name: "Rolls", size: "× 12", done: true, by: PEOPLE.thandi, live: true },
  { name: "Charcoal", size: "1 bag", done: false, added: PEOPLE.sipho },
  { name: "Ice", size: "2 bags", done: false },
  { name: "Cream soda", size: "2 L", done: false },
  { name: "Potato salad", size: "", done: false },
  { name: "Serviettes", size: "1 pack", done: false },
];

/** A shared list mid-shop: Thandi is in the aisle ticking things off, Sipho adds from home. */
export function SharedListScreen() {
  return (
    <div className="absolute inset-0 pt-[60px]">
      <div className="flex items-center justify-between px-[16px]">
        <Chevron />
        <span className="flex items-center gap-[10px] rounded-full bg-white/85 py-[6px] pr-[8px] pl-[14px] shadow-[0_6px_16px_-10px_rgba(10,40,33,0.5)]">
          <span className="text-[13px] font-semibold text-forest/70">Shared</span>
          <AvatarStack people={[PEOPLE.thandi, PEOPLE.sipho, PEOPLE.lerato]} size={30} />
        </span>
      </div>
      <div className="px-[22px]">
        <p className="mt-[14px] inline-flex items-center gap-[8px] rounded-full bg-lime/15 px-[10px] py-[4px] text-[13px] font-semibold text-forest">
          <LiveDot size={8} /> Thandi is shopping now
        </p>
        <h2 className="mt-[8px] font-display text-[34px] leading-none tracking-tight">Family braai</h2>
        <p className="mt-[8px] text-[15px] text-forest/55">3 of 8 picked up · shared with 3</p>
        <ul className="mt-[18px] divide-y divide-forest/8 rounded-[22px] bg-white px-[16px] shadow-[0_10px_24px_-18px_rgba(10,40,33,0.5)]">
          {SHARED_ROWS.map((row) => (
            <li
              key={row.name}
              className={`relative flex items-center gap-[14px] py-[14px] ${row.live ? "-mx-[16px] bg-lime/12 px-[16px]" : ""}`}
            >
              <CheckCircle checked={row.done} size={26} />
              <span className="min-w-0 flex-1">
                <span className={`text-[17px] font-medium ${row.done ? "text-forest/40" : ""}`}>{row.name}</span>
                <span className={`ml-[8px] text-[15px] text-forest/45 ${row.done ? "opacity-60" : ""}`}>{row.size}</span>
                {row.live ? <span className="block text-[12px] font-semibold text-lime">Ticked just now</span> : null}
                {row.added ? <span className="block text-[12px] font-semibold text-amber">Added by {row.added.name}</span> : null}
              </span>
              {row.by ? <Avatar person={row.by} size={24} /> : null}
              {row.added ? <Avatar person={row.added} size={24} /> : null}
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute inset-x-[16px] bottom-[34px] flex items-center gap-[10px] rounded-full bg-white p-[6px] pl-[20px] shadow-[0_12px_28px_-14px_rgba(10,40,33,0.6)]">
        <span className="flex-1 text-[17px] text-forest/40">Add for everyone</span>
        <span className="grid size-[44px] place-items-center rounded-full bg-lime text-white">
          <Icon name="plus" className="size-[22px]" />
        </span>
      </div>
    </div>
  );
}

export function BoardScreen() {
  return (
    <div className="absolute inset-0 bg-paper pt-[60px]">
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{ backgroundImage: "radial-gradient(#183631 1.2px, transparent 1.3px)", backgroundSize: "22px 22px" }}
      />
      <div className="relative flex items-center justify-between px-[16px]">
        <Chevron />
        <span className="text-[17px] font-bold">Braai Saturday</span>
        <span className="rounded-full border border-white/80 bg-white/85 px-[16px] py-[11px] text-[15px] font-semibold text-forest/40">
          Undo
        </span>
      </div>
      <div className="relative mx-[12px] mt-[16px] h-[650px] rounded-[24px]">
        <StickerCard
          src="/stickers/rice.png"
          alt="A bag of rice as a sticker"
          name="Rice"
          size="1 kg"
          buy={2}
          checked
          width={168}
          aspect={1.25}
          tilt={-4}
          className="absolute top-[18px] left-[6px]"
        />
        <StickerCard
          src="/stickers/tuna.png"
          alt="A tin of tuna as a sticker"
          name="Tuna"
          size="170 g"
          note="in brine, not oil!"
          buy={3}
          width={182}
          aspect={0.9}
          tilt={5}
          className="absolute top-[150px] right-[4px]"
        />
        <div className="absolute top-[392px] left-[20px] w-[150px] rotate-[3deg]">
          <div className="grid h-[118px] place-items-center rounded-[16px] border-[5px] border-white bg-gradient-to-br from-[#FFE9C7] to-[#F7C98B] shadow-[0_8px_10px_-4px_rgba(0,0,0,0.22)]">
            <span className="font-hand text-[28px] text-forest/80">Braai wood</span>
          </div>
          <div className="mt-[5px] flex items-center gap-[8px] rounded-[10px] bg-label p-[9px] text-[15px] font-semibold">
            <CheckCircle size={22} /> 1 bag
          </div>
        </div>
      </div>
      <span className="absolute right-[20px] bottom-[34px] grid size-[62px] place-items-center rounded-full bg-forest text-white shadow-[0_12px_24px_-10px_rgba(10,40,33,0.8)]">
        <Icon name="plus" className="size-[28px]" />
      </span>
    </div>
  );
}

export function WalletScreen() {
  const stack = [BRANDS.corner, BRANDS.sunny, BRANDS.basket, BRANDS.leaf];
  return (
    <div className="absolute inset-0 pt-[62px]">
      <div className="flex items-center justify-between px-[22px]">
        <Image src="/brand/grozara-icon.svg" alt="" width={64} height={64} className="size-[30px] rounded-[8px]" />
        <Icon name="search" className="size-[24px]" />
      </div>
      <div className="px-[22px]">
        <h2 className="mt-[14px] font-display text-[34px] tracking-tight">Cards</h2>
        <div className="mt-[12px] grid grid-cols-3 rounded-full bg-forest/6 p-[4px] text-center text-[14px] font-semibold">
          <span className="py-[8px] text-forest/60">Grid</span>
          <span className="rounded-full bg-white py-[8px] shadow-sm">Stack</span>
          <span className="py-[8px] text-forest/60">List</span>
        </div>
        <div className="relative mt-[22px] h-[470px]">
          {stack.map((brand, i) => (
            <div key={brand.name} className="absolute inset-x-0" style={{ top: i * 64 }}>
              <LoyaltyCard brand={brand} width={346} favourite={i === stack.length - 1} />
            </div>
          ))}
        </div>
      </div>
      <TabBar active="cards" />
    </div>
  );
}

/** A single card opened at the till: the card, its barcode below, the screen brightened. */
export function CardDetailScreen() {
  return (
    <div className="absolute inset-0 bg-white pt-[62px]">
      <div className="flex items-center justify-between px-[16px]">
        <Chevron />
        <span className="text-[17px] font-bold">Leaf Rewards</span>
        <GlassCircle icon="more" />
      </div>
      <div className="mt-[26px] px-[22px]">
        <LoyaltyCard brand={BRANDS.leaf} width={346} favourite />
        <div className="relative mt-[18px] rounded-[26px] bg-white p-[22px] shadow-[0_14px_34px_-20px_rgba(10,40,33,0.55)] ring-1 ring-forest/6">
          <span className="absolute -top-[30px] left-1/2 grid size-[48px] -translate-x-1/2 place-items-center rounded-full border-[3px] border-white bg-forest text-white">
            <Icon name="barcode" className="size-[22px]" />
          </span>
          <div className="mt-[10px] flex h-[120px] items-stretch justify-center gap-[3px]">
            {Array.from({ length: 44 }, (_, i) => (
              <span key={i} className="bg-forest" style={{ width: [2, 4, 1, 3, 2, 5, 1, 2][i % 8] }} />
            ))}
          </div>
          <p className="mt-[12px] text-center font-mono text-[17px] tracking-[0.2em]">6009 1204 0931</p>
        </div>
        <div className="mt-[18px] grid grid-cols-3 gap-[10px] text-[13px] font-semibold">
          {(["sun", "copy", "share"] as const).map((icon, i) => (
            <span key={icon} className="flex flex-col items-center gap-[6px] rounded-[18px] bg-forest/5 py-[12px]">
              <Icon name={icon} className="size-[22px]" />
              {["Brighten", "Copy", "Share"][i]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
