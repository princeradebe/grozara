import Image from "next/image";
import type { ReactNode } from "react";

import { Icon } from "@/components/mocks/Icon";
import { BRANDS, CheckCircle, LoyaltyCard } from "@/components/mocks/parts";
import { EXTRAS } from "@/content/site";

import { Kicker, SectionTitle } from "./ui";

/** A little scene per extra, drawn from the app's own parts. Order matches EXTRAS. */
const SCENES: ReactNode[] = [
  // Share from any app
  <div key="share" className="relative h-[128px] w-[214px]">
    <div className="absolute top-0 left-3 grid size-[96px] rotate-[-7deg] place-items-center rounded-[24px] bg-white shadow-[0_12px_24px_-14px_rgba(24,54,49,0.55)]">
      <Image src="/stickers/rice.png" alt="" width={717} height={900} loading="eager" className="h-[74px] w-auto" />
    </div>
    <span className="absolute top-[58px] left-[92px] grid size-9 place-items-center rounded-full bg-forest text-lime-bright ring-4 ring-mist">
      <Icon name="share" className="size-[18px]" />
    </span>
    <div className="absolute right-0 bottom-1 flex items-center gap-2 rounded-full bg-white py-1.5 pr-3.5 pl-1.5 text-xs font-semibold whitespace-nowrap shadow-[0_12px_24px_-14px_rgba(24,54,49,0.55)]">
      <Image src="/brand/grozara-icon.svg" alt="" width={64} height={64} loading="eager" className="size-7 rounded-lg" />
      Braai Saturday
    </div>
  </div>,
  // Face ID lock
  <div key="lock" className="relative">
    <div className="grid size-[104px] place-items-center rounded-[30px] bg-forest text-lime-bright shadow-[0_18px_30px_-16px_rgba(24,54,49,0.8)]">
      <Icon name="faceId" className="size-14" />
    </div>
    <span className="absolute -right-3 -bottom-3 grid size-10 place-items-center rounded-full bg-lime text-white ring-4 ring-mist">
      <Icon name="tick" className="size-5" />
    </span>
  </div>,
  // Favourites on Home
  <div key="fav" className="relative rotate-[-5deg]">
    <LoyaltyCard brand={BRANDS.leaf} width={176} favourite />
    <span className="absolute -top-3 -right-3 grid size-10 place-items-center rounded-full bg-amber text-forest ring-4 ring-mist">
      <Icon name="star" className="size-5" />
    </span>
  </div>,
  // Clear in one tap
  <div key="clear" className="w-[200px]">
    <div className="divide-y divide-forest/8 rounded-2xl bg-white px-3.5 shadow-[0_12px_24px_-14px_rgba(24,54,49,0.55)]">
      {["Milk", "Brown bread", "Eggs"].map((item, i) => (
        <div key={item} className="flex items-center gap-2.5 py-2">
          <CheckCircle checked={i < 2} size={18} />
          <span className={`text-xs font-medium ${i < 2 ? "text-forest/40 line-through" : ""}`}>{item}</span>
        </div>
      ))}
    </div>
    <div className="mx-auto -mt-2 flex w-max items-center gap-1.5 rounded-full bg-lime px-3.5 py-1.5 text-xs font-bold shadow-[0_10px_18px_-10px_rgba(60,120,30,0.9)]">
      <Icon name="tick" className="size-4" /> Clear 2
    </div>
  </div>,
];

export function ExtrasSection() {
  return (
    <section aria-labelledby="extras-title" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:px-12 lg:py-36">
        <div className="dir-reveal mx-auto max-w-2xl text-center">
          <Kicker dot="blush">And there&apos;s more</Kicker>
          <SectionTitle id="extras-title" className="mt-6">
            The little things, sorted too.
          </SectionTitle>
        </div>
        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {EXTRAS.map((extra, i) => (
            <li key={extra.title} className="dir-reveal">
              <article className="flex h-full flex-col rounded-[2rem] bg-white p-3 shadow-[0_24px_48px_-32px_rgba(24,54,49,0.5)] ring-1 ring-forest/6">
                <div aria-hidden className="grid h-44 place-items-center overflow-hidden rounded-[1.5rem] bg-mist">
                  {SCENES[i]}
                </div>
                <div className="px-4 pt-6 pb-5">
                  <h3 className="flex items-center gap-2.5 text-lg font-bold">
                    <Icon name={extra.icon} className="size-5 text-lime" />
                    {extra.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-forest/65">{extra.body}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
