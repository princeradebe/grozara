import Image from "next/image";

import { STORE_LINKS } from "@/content/site";

// Official badge artwork, used as supplied (Apple and Google both forbid redrawing or recolouring).
// Apple's SVG is exactly the badge. Google's PNG carries its own clear space: the badge is the
// 564 × 168 box at (41, 41) inside a 646 × 250 file, so it's offset to line up with Apple's.
const GOOGLE = { fileW: 646, fileH: 250, x: 41, y: 41, w: 564, h: 168 };
const APPLE_RATIO = 119.66407 / 40;

function Slot({ href, children }: { href: string | null; children: React.ReactNode }) {
  return href ? (
    <a href={href} className="block transition-transform hover:-translate-y-0.5">
      {children}
    </a>
  ) : (
    children
  );
}

/**
 * The App Store and Google Play badges side by side. `height` is the visible badge height (Apple
 * asks for at least 40px on screen). Until the store links exist the badges aren't links and a
 * "Coming soon" caption sits above them. `center` centres both, including when the badges wrap.
 */
export function StoreBadges({
  height = 48,
  apple = "black",
  caption = true,
  center = false,
  className = "",
}: {
  height?: number;
  apple?: "black" | "white";
  caption?: boolean;
  center?: boolean;
  className?: string;
}) {
  const live = STORE_LINKS.appStore !== null && STORE_LINKS.googlePlay !== null;
  const scale = height / GOOGLE.h;
  return (
    <div className={`${center ? "text-center" : ""} ${className}`}>
      {caption && !live ? (
        <p className="mb-3 text-xs font-semibold tracking-[0.14em] uppercase opacity-65">Coming soon</p>
      ) : null}
      <div className={`flex flex-wrap items-center ${center ? "justify-center" : ""}`} style={{ gap: height * 0.3 }}>
        <Slot href={STORE_LINKS.appStore}>
          <Image
            src={`/badges/app-store-${apple}.svg`}
            alt={live ? "Download on the App Store" : "App Store, coming soon"}
            width={120}
            height={40}
            style={{ height, width: height * APPLE_RATIO }}
          />
        </Slot>
        <Slot href={STORE_LINKS.googlePlay}>
          <span className="relative block" style={{ width: GOOGLE.w * scale, height }}>
            <Image
              src="/badges/google-play.png"
              alt={live ? "Get it on Google Play" : "Google Play, coming soon"}
              width={GOOGLE.fileW}
              height={GOOGLE.fileH}
              unoptimized
              className="absolute max-w-none"
              style={{ width: GOOGLE.fileW * scale, height: GOOGLE.fileH * scale, left: -GOOGLE.x * scale, top: -GOOGLE.y * scale }}
            />
          </span>
        </Slot>
      </div>
    </div>
  );
}
