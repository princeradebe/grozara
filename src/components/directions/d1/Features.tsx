import Image from "next/image";

import { Icon } from "@/components/mocks/Icon";
import { AvatarStack, BRANDS, LiveToast, LoyaltyCard, PEOPLE } from "@/components/mocks/parts";
import { BoardScreen, CardDetailScreen, ListScreen, SharedListScreen } from "@/components/mocks/screens";
import { FEATURES } from "@/content/site";

import { Chip, FeatureSection, Glow, Phone } from "./ui";

export function ListsSection() {
  return (
    <FeatureSection
      feature={FEATURES.lists}
      side="left"
      backdrop={<Glow className="top-[10%] left-[-20%] size-[44rem]" color="rgba(126,195,64,0.2)" />}
      visual={
        <div className="relative mx-auto w-fit">
          <div className="dir-float">
            <Phone base={0.66} sm={0.74}>
              <ListScreen />
            </Phone>
          </div>
          <div className="absolute top-[13%] -right-8 rotate-[5deg] sm:-right-28 lg:-right-20 xl:-right-28">
            <div className="dir-float-side">
              <Chip icon="pin" tint="bg-amber/20 text-forest" title="Pinned to Home" sub="Your next shop" />
            </div>
          </div>
          <div className="absolute bottom-[30%] -left-8 rotate-[-4deg] sm:-left-28 lg:-left-24 xl:-left-32">
            <div className="flex w-max items-center gap-4 rounded-full bg-forest py-2.5 pr-2.5 pl-5 text-sm font-semibold text-white shadow-[0_18px_34px_-16px_rgba(24,54,49,0.8)]">
              Tomatoes deleted
              <span className="rounded-full bg-lime-bright px-3.5 py-1.5 text-forest">Undo</span>
            </div>
          </div>
          <div className="absolute -right-4 bottom-[7%] rotate-[-3deg] sm:-right-16">
            <div className="flex w-max items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-bold text-forest shadow-[0_16px_30px_-14px_rgba(60,120,30,0.9)]">
              <Icon name="tick" className="size-5" /> Clear picked up
            </div>
          </div>
        </div>
      }
    />
  );
}

export function BoyfriendModeSection() {
  return (
    <FeatureSection
      feature={FEATURES.boyfriendMode}
      side="right"
      dot="coral"
      className="mx-3 rounded-[2.5rem] sm:mx-6 lg:mx-8"
      backdrop={
        <>
          <div aria-hidden className="dir-paper absolute inset-0" />
          <Glow className="-top-40 right-[-10%] size-[40rem]" color="rgba(255,185,2,0.18)" />
        </>
      }
      visual={
        <div className="relative mx-auto w-fit">
          <div className="dir-float">
            <Phone base={0.66} sm={0.74}>
              <BoardScreen />
            </Phone>
          </div>
          <div className="absolute top-[7%] -right-6 rotate-[4deg] sm:-right-24 lg:-right-16 xl:-right-24">
            <Chip icon="sparkles" tint="bg-lime text-white" title="Sticker ready" sub="Lifted from your photo" />
          </div>
          <div className="absolute bottom-[9%] -left-10 origin-bottom-left scale-[0.7] sm:-left-32 sm:scale-100 lg:-left-28 xl:-left-36">
            <div className="dir-float-side">
              <SnapshotPhoto />
            </div>
          </div>
          <div className="absolute top-[40%] -right-6 hidden sm:-right-32 sm:block lg:-right-20 xl:-right-28">
            <p className="w-max rotate-[-6deg] font-hand text-3xl leading-none text-forest">
              exactly
              <br />
              this one!
            </p>
            <svg viewBox="0 0 90 60" className="mt-1 -ml-6 w-20 text-forest/70" aria-hidden>
              <path d="M80 6 C 60 40, 30 50, 8 44" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M18 36 8 44l12 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      }
    />
  );
}

/** The raw photo before Grozara lifts it into a sticker: a snapshot on a kitchen-counter backdrop. */
function SnapshotPhoto() {
  return (
    <figure className="relative w-[176px] rotate-[-8deg] rounded-[20px] bg-white p-2.5 pb-3 shadow-[0_24px_40px_-20px_rgba(24,54,49,0.65)]">
      <div className="relative grid h-[184px] place-items-center overflow-hidden rounded-[13px] bg-[linear-gradient(160deg,#e4ddcc,#b9ad95)]">
        <span className="absolute inset-x-0 bottom-0 h-[38%] bg-[linear-gradient(180deg,#a89c83,#8f836b)]" />
        <Image src="/stickers/tuna.png" alt="" width={900} height={805} loading="eager" className="relative h-auto w-[122px]" />
        <span className="absolute top-2.5 left-2.5 grid size-8 place-items-center rounded-full bg-black/35 text-white backdrop-blur-sm">
          <Icon name="camera" className="size-[18px]" />
        </span>
      </div>
      <figcaption className="mt-2 px-1 font-hand text-2xl leading-none text-forest">snap!</figcaption>
    </figure>
  );
}

export function SharedSection() {
  return (
    <FeatureSection
      feature={FEATURES.shared}
      side="left"
      backdrop={<Glow className="top-[20%] left-[-10%] size-[50rem] dir-glow" color="rgba(126,195,64,0.18)" />}
      visual={
        <div className="relative mx-auto w-fit">
          <span className="absolute top-1/2 left-1/2 size-[125%] -translate-1/2 rounded-full border-2 border-dashed border-forest/12" />
          <span className="absolute top-1/2 left-1/2 hidden size-[175%] -translate-1/2 rounded-full border border-dashed border-forest/10 sm:block" />
          <div className="dir-float relative">
            <Phone base={0.66} sm={0.74}>
              <SharedListScreen />
            </Phone>
          </div>
          <div className="absolute -top-5 -right-6 rotate-[3deg] sm:-right-24">
            <div className="flex w-max items-center gap-3 rounded-full bg-white py-2 pr-5 pl-2 shadow-[0_18px_34px_-18px_rgba(24,54,49,0.6)] ring-1 ring-forest/5">
              <AvatarStack people={[PEOPLE.thandi, PEOPLE.sipho, PEOPLE.lerato]} size={34} />
              <span className="text-sm leading-tight font-semibold">
                Family braai
                <span className="block text-xs font-medium text-forest/50">shared with 3</span>
              </span>
            </div>
          </div>
          <div className="absolute top-[30%] -left-10 w-max rotate-[-3deg] sm:-left-36 lg:-left-28 xl:-left-40">
            <div className="dir-float-side">
              <LiveToast person={PEOPLE.thandi} action="ticked off" item="Rolls" />
            </div>
          </div>
          <div className="absolute top-[58%] -right-10 w-max rotate-[2deg] sm:-right-36 lg:-right-28 xl:-right-40">
            <LiveToast person={PEOPLE.sipho} action="added" item="Charcoal" when="1 min ago" />
          </div>
          <div className="absolute bottom-[4%] -left-6 w-max rotate-[-2deg] sm:-left-24 lg:-left-16 xl:-left-28">
            <div className="dir-float-side">
              <LiveToast person={PEOPLE.lerato} action="added" item="Ice" when="3 min ago" />
            </div>
          </div>
        </div>
      }
    />
  );
}

export function CardsSection() {
  const fan = [
    { brand: BRANDS.basket, rotate: "rotate-[-26deg]" },
    { brand: BRANDS.sunny, rotate: "rotate-[-14deg]" },
    { brand: BRANDS.corner, rotate: "rotate-[-3deg]" },
  ];
  return (
    <FeatureSection
      feature={FEATURES.cards}
      side="right"
      dot="amber"
      className="bg-white"
      backdrop={<Glow className="top-[25%] right-[-5%] size-[42rem]" color="rgba(255,185,2,0.2)" />}
      visual={
        <div className="relative mr-0 ml-auto w-fit sm:mx-auto">
          <div className="dir-glow absolute top-[20%] left-1/2 size-[130%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,201,60,0.35),transparent_62%)]" />
          <div className="absolute top-[36%] -left-[115px] origin-bottom-right scale-[0.72] sm:-left-44 sm:scale-100 lg:-left-36 xl:-left-44">
            {fan.map(({ brand, rotate }, i) => (
              <div key={brand.name} className={`${i ? "absolute inset-0" : "relative"} origin-bottom-right ${rotate}`}>
                <LoyaltyCard brand={brand} width={230} />
              </div>
            ))}
          </div>
          <div className="dir-float relative">
            <Phone base={0.64} sm={0.74}>
              <CardDetailScreen />
            </Phone>
          </div>
          <div className="absolute top-[6%] -left-6 rotate-[-4deg] sm:-left-28 lg:-left-20 xl:-left-28">
            <Chip icon="card" tint="bg-forest text-lime-bright" title="80 South African templates" sub="Or add any card" />
          </div>
          <div className="absolute -right-2 bottom-[16%] rotate-[4deg] sm:-right-20">
            <div className="dir-float-side">
              <Chip icon="sun" tint="bg-amber text-forest" title="Brightens at the till" />
            </div>
          </div>
        </div>
      }
    />
  );
}
