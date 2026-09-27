import type { ReactNode } from "react";

/** Logical iPhone screen size the mock screens are designed at (points). */
export const SCREEN = { width: 390, height: 844 } as const;
const BEZEL = 11;

/**
 * An iPhone with a titanium edge, Dynamic Island and status bar. The screens are laid out at
 * 390 × 844 points and the whole phone scales, so text and spacing stay true to the app.
 */
export function PhoneFrame({
  children,
  scale = 0.7,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  scale?: number;
  tone?: "light" | "dark";
  className?: string;
}) {
  const outerW = SCREEN.width + BEZEL * 2;
  const outerH = SCREEN.height + BEZEL * 2;
  return (
    <div className={className} style={{ width: outerW * scale, height: outerH * scale }}>
      <div
        className="relative origin-top-left rounded-[68px] bg-[#1d2321] p-[11px] shadow-[0_2px_0_1px_#3a4441_inset,0_0_0_2px_#0b0f0e,0_40px_80px_-20px_rgba(4,20,16,0.55),0_18px_36px_-18px_rgba(4,20,16,0.5)]"
        style={{ width: outerW, height: outerH, transform: `scale(${scale})` }}
      >
        {/* side buttons */}
        <span className="absolute top-[170px] -left-[3px] h-[64px] w-[4px] rounded-l bg-[#2b3330]" />
        <span className="absolute top-[250px] -left-[3px] h-[64px] w-[4px] rounded-l bg-[#2b3330]" />
        <span className="absolute top-[210px] -right-[3px] h-[96px] w-[4px] rounded-r bg-[#2b3330]" />
        <div
          className={`relative h-full w-full overflow-hidden rounded-[57px] ${tone === "dark" ? "bg-forest-deep text-label" : "bg-mist text-forest"}`}
        >
          <StatusBar tone={tone} />
          <div className="absolute top-[11px] left-1/2 h-[34px] w-[122px] -translate-x-1/2 rounded-full bg-black" />
          {children}
          <div
            className={`absolute bottom-[8px] left-1/2 h-[5px] w-[134px] -translate-x-1/2 rounded-full ${tone === "dark" ? "bg-white/80" : "bg-forest/85"}`}
          />
        </div>
      </div>
    </div>
  );
}

function StatusBar({ tone }: { tone: "light" | "dark" }) {
  const ink = tone === "dark" ? "text-white" : "text-forest";
  return (
    <div className={`absolute inset-x-0 top-0 z-20 flex h-[54px] items-center justify-between px-[34px] pt-[4px] ${ink}`}>
      <span className="text-[16px] font-semibold tracking-tight">9:41</span>
      <span className="flex items-center gap-[6px]">
        <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden className="fill-current">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden className="fill-current">
          <path d="M8 2.2c2.4 0 4.6.9 6.2 2.5l1.3-1.3A10.4 10.4 0 0 0 8 .4 10.4 10.4 0 0 0 .5 3.4l1.3 1.3A8.6 8.6 0 0 1 8 2.2Zm0 3.6c1.4 0 2.7.5 3.7 1.5l1.3-1.3A7 7 0 0 0 8 4a7 7 0 0 0-5 2l1.3 1.3c1-1 2.3-1.5 3.7-1.5Zm0 3.5c.5 0 1 .2 1.3.5L8 11.6 6.7 9.8c.3-.3.8-.5 1.3-.5Z" />
        </svg>
        <span className="relative flex h-[12px] w-[25px] items-center rounded-[4px] border border-current/40 p-[1.5px]">
          <span className="h-full w-[80%] rounded-[2px] bg-current" />
          <span className="absolute -right-[3px] h-[4px] w-[1.5px] rounded-r bg-current/40" />
        </span>
      </span>
    </div>
  );
}
