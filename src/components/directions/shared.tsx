import Image from "next/image";
import Link from "next/link";

import { Icon, type IconName } from "@/components/mocks/Icon";
import { NAV_LINKS } from "@/content/site";

export const DIRECTIONS = [
  { slug: "1", name: "Clean split", note: "Light, Apple-calm: copy left, the Home screen right, a sticker and a card floating off it." },
  { slug: "2", name: "Night stage", note: "Forest night, a lit stage of three phones: lists, Boyfriend Mode and the wallet." },
  { slug: "3", name: "Scrapbook", note: "Leads with Boyfriend Mode on the paper board, with real stickers slapped on the page." },
  { slug: "4", name: "Bento", note: "One headline over a bento grid: every feature gets its own tile and mock." },
  { slug: "5", name: "Lime pop", note: "Loud lime, huge verbs (List it. Snap it. Scan it.), two phones and a feature marquee." },
] as const;

export function Nav({ tone }: { tone: "light" | "dark" | "lime" }) {
  const dark = tone === "dark";
  return (
    <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 pt-6 lg:px-12">
      <Image
        src={dark ? "/brand/grozara-logo-white.svg" : "/brand/grozara-logo.svg"}
        alt="Grozara"
        width={286}
        height={64}
        priority
        className="h-8 w-auto"
      />
      <nav className={`hidden items-center gap-7 text-sm font-semibold lg:flex ${dark ? "text-mist/80" : "text-forest/75"}`}>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className={dark ? "hover:text-white" : "hover:text-forest"}>
            {link.label}
          </a>
        ))}
      </nav>
      <a
        href="#get"
        className={`rounded-full px-4 py-2 text-sm font-semibold ${
          dark ? "bg-white/10 text-lime-bright ring-1 ring-white/15" : tone === "lime" ? "bg-forest text-lime-bright" : "bg-forest text-white"
        }`}
      >
        Get the app
      </a>
    </header>
  );
}

export function Proof({ items, tone = "light" }: { items: [IconName, string][]; tone?: "light" | "dark" }) {
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium ${tone === "dark" ? "text-mist/75" : "text-forest/70"}`}>
      {items.map(([icon, label]) => (
        <li key={label} className="flex items-center gap-2">
          <Icon name={icon} className={`size-5 ${tone === "dark" ? "text-lime-bright" : "text-lime"}`} />
          {label}
        </li>
      ))}
    </ul>
  );
}

/** Floating picker for comparing the directions (and the 3D version at "/3d"). */
export function DirectionSwitcher({ current }: { current: string }) {
  const active = DIRECTIONS.find((d) => d.slug === current);
  return (
    <nav
      aria-label="Direction switcher"
      className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full bg-forest-deep/90 p-1.5 text-sm font-semibold text-mist shadow-[0_18px_40px_-16px_rgba(0,0,0,0.7)] ring-1 ring-white/10 backdrop-blur-md"
    >
      <Link href="/directions" className="rounded-full px-3 py-2 whitespace-nowrap text-mist/70 hover:text-white">
        <span className="hidden sm:inline">{active ? active.name : "Directions"}</span>
        <span className="sm:hidden">
          All
        </span>
      </Link>
      {DIRECTIONS.map((d) => (
        <Link
          key={d.slug}
          href={`/directions/${d.slug}`}
          aria-current={d.slug === current ? "page" : undefined}
          className={`grid size-9 place-items-center rounded-full ${d.slug === current ? "bg-lime text-forest" : "hover:bg-white/10"}`}
        >
          {d.slug}
        </Link>
      ))}
      <Link href="/3d" className="rounded-full px-3 py-2 text-mist/70 hover:text-white">
        3D
      </Link>
    </nav>
  );
}
