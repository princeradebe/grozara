import type { Metadata } from "next";
import Link from "next/link";

import { DIRECTIONS } from "@/components/directions/shared";

export const metadata: Metadata = {
  title: "Page directions · Grozara",
  robots: { index: false },
};

export default function DirectionsIndex() {
  return (
    <main className="min-h-svh bg-mist px-6 py-16 text-forest lg:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold text-forest/60">Grozara landing page</p>
        <h1 className="mt-2 font-display text-5xl tracking-tight">Five page directions</h1>
        <p className="mt-4 max-w-2xl text-lg text-forest/70">
          Full landing pages with no 3D, built from mocks of the real app. Compare them with each other and with the 3D
          night-garden version.
        </p>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2">
          {DIRECTIONS.map((d) => (
            <li key={d.slug}>
              <Link
                href={`/directions/${d.slug}`}
                className="flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-forest/8 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <span className="font-display text-3xl text-lime">{d.slug}</span>
                <span className="mt-2 text-xl font-bold">{d.name}</span>
                <span className="mt-2 text-forest/65">{d.note}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/3d"
              className="flex h-full flex-col rounded-3xl bg-forest-deep p-6 text-mist transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="font-display text-3xl text-lime-bright">3D</span>
              <span className="mt-2 text-xl font-bold">Night garden with Zara</span>
              <span className="mt-2 text-mist/70">The original direction: a 3D Zara you can grab and throw.</span>
            </Link>
          </li>
        </ol>
      </div>
    </main>
  );
}
