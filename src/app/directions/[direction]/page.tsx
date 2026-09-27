import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Direction1 } from "@/components/directions/Direction1";
import { Direction2 } from "@/components/directions/Direction2";
import { Direction3 } from "@/components/directions/Direction3";
import { Direction4 } from "@/components/directions/Direction4";
import { Direction5 } from "@/components/directions/Direction5";
import { DIRECTIONS, DirectionSwitcher } from "@/components/directions/shared";

const PAGES = { "1": Direction1, "2": Direction2, "3": Direction3, "4": Direction4, "5": Direction5 };

export const dynamicParams = false;

export function generateStaticParams() {
  return DIRECTIONS.map((d) => ({ direction: d.slug }));
}

export async function generateMetadata(props: PageProps<"/directions/[direction]">): Promise<Metadata> {
  const { direction } = await props.params;
  const found = DIRECTIONS.find((d) => d.slug === direction);
  return { title: `${found?.name ?? "Direction"} · Grozara`, robots: { index: false } };
}

export default async function DirectionPage(props: PageProps<"/directions/[direction]">) {
  const { direction } = await props.params;
  const Page = PAGES[direction as keyof typeof PAGES];
  if (!Page) notFound();
  return (
    <main>
      <Page />
      <DirectionSwitcher current={direction} />
    </main>
  );
}
