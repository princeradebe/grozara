"use client";

import Image from "next/image";
import { type ReactNode, type RefObject, useEffect, useReducer, useRef, useState } from "react";

import { Icon } from "@/components/mocks/Icon";
import { AvatarStack, BRANDS, BuyStamp, CheckCircle, LiveDot, LiveToast, LoyaltyCard, PEOPLE, type Person, StickerCard } from "@/components/mocks/parts";
import { PhoneFrame } from "@/components/mocks/PhoneFrame";
import {
  type BoardItem,
  BoardScreen,
  CardDetailScreen,
  LIST_ROWS,
  type ListRow,
  ListScreen,
  SHARED_ROWS,
  type SharedRow,
  SharedListScreen,
  TUNA_NOTE,
} from "@/components/mocks/screens";

import { tilt } from "./ui";

// The Lime pop mocks, made to play with. The mocks stay stateless and shared; state lives here.

/** A small "try it" nudge, so visitors know the mock responds. */
export function TryIt({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full bg-label px-4 py-2 text-sm font-bold text-forest shadow-[0_14px_26px_-14px_rgba(0,0,0,0.6)] ${className}`}>
      <Icon name="sparkles" className="size-4 text-lime" />
      {children}
    </span>
  );
}

// ——— Lists ————————————————————————————————————————————————————————————————————

/** Drag a row left past the line to delete it, as in the app. Delete or Backspace does it from the keyboard. */
function SwipeRow({ children, onDelete }: { children: ReactNode; onDelete: () => void }) {
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ x: number; scale: number; moved: boolean } | null>(null);
  const swallowClick = useRef(false);
  return (
    <div
      className="relative touch-pan-y overflow-hidden"
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        const el = event.currentTarget;
        // The phone is scaled on screen; measure the drag in the list's own points.
        drag.current = { x: event.clientX, scale: el.getBoundingClientRect().width / el.offsetWidth || 1, moved: false };
      }}
      onPointerMove={(event) => {
        const d = drag.current;
        if (!d) return;
        const delta = (event.clientX - d.x) / d.scale;
        if (!d.moved && Math.abs(delta) > 6) {
          d.moved = true;
          swallowClick.current = true;
          setDragging(true);
          // Keep the drag even if the pointer leaves the row; not every pointer can be captured.
          try {
            event.currentTarget.setPointerCapture(event.pointerId);
          } catch {}
        }
        if (d.moved) setDx(Math.min(0, delta));
      }}
      onPointerUp={() => {
        const moved = drag.current?.moved;
        drag.current = null;
        setDragging(false);
        if (!moved) return;
        if (dx < -110) {
          setDx(-420);
          window.setTimeout(onDelete, 170);
        } else setDx(0);
      }}
      onPointerCancel={() => {
        drag.current = null;
        setDragging(false);
        setDx(0);
      }}
      // A drag isn't a tap: don't let it tick the row too.
      onClickCapture={(event) => {
        if (!swallowClick.current) return;
        swallowClick.current = false;
        event.stopPropagation();
        event.preventDefault();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Delete" && event.key !== "Backspace") return;
        event.preventDefault();
        onDelete();
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-end bg-coral pr-[18px] text-[15px] font-semibold text-white"
        style={{ opacity: Math.min(1, -dx / 50) }}
      >
        Delete
      </div>
      <div className={`relative ${dragging ? "" : "transition-transform duration-200 ease-out"}`} style={{ transform: `translateX(${dx}px)` }}>
        {children}
      </div>
    </div>
  );
}

type ListItem = ListRow;
const TOMATOES = LIST_ROWS.findIndex(([name]) => name === "Tomatoes");

/**
 * The pinned list: tap to tick, swipe left to delete, and the toast beside it undoes the last delete.
 * It opens with Tomatoes already deleted, so the toast and the list agree from the first frame.
 */
export function ListsStage() {
  const [rows, setRows] = useState<ListItem[]>(() => LIST_ROWS.filter((_, i) => i !== TOMATOES));
  const [deleted, setDeleted] = useState<{ row: ListItem; index: number; id: number } | null>({ row: LIST_ROWS[TOMATOES], index: TOMATOES, id: 0 });
  const remove = (index: number) => {
    setDeleted((last) => ({ row: rows[index], index, id: (last?.id ?? 0) + 1 }));
    setRows((list) => list.filter((_, i) => i !== index));
  };
  const undo = () => {
    if (!deleted) return;
    setRows((list) => [...list.slice(0, deleted.index), deleted.row, ...list.slice(deleted.index)]);
    setDeleted(null);
  };
  return (
    <>
      <div className="absolute top-[44px] left-[150px] rotate-[6deg]">
        <div className="dir-float">
          <PhoneFrame scale={0.72}>
            <ListScreen
              rows={rows}
              onToggle={(i) => setRows((list) => list.map((row, j) => (j === i ? [row[0], row[1], !row[2]] : row)))}
              wrapRow={(button, i) => <SwipeRow onDelete={() => remove(i)}>{button}</SwipeRow>}
            />
          </PhoneFrame>
        </div>
      </div>
      <div aria-live="polite" className="absolute bottom-[64px] left-[0px] z-20 -rotate-[4deg]">
        <div
          key={deleted ? `deleted-${deleted.id}` : "hint"}
          className="dir-pop flex items-center gap-6 rounded-[22px] bg-forest-deep py-4 pr-5 pl-6 text-mist shadow-[0_22px_40px_-18px_rgba(0,0,0,0.8)] ring-1 ring-white/10"
        >
          {deleted ? (
            <>
              <span className="text-lg">
                <span className="font-semibold">{deleted.row[0]}</span> deleted
              </span>
              <button
                type="button"
                onClick={undo}
                className="cursor-pointer rounded-full bg-lime-bright px-4 py-2 font-display text-lg text-forest transition-transform hover:scale-105 active:scale-95"
              >
                Undo
              </button>
            </>
          ) : (
            <span className="py-2 text-lg text-mist/80">Swipe an item left to delete it</span>
          )}
        </div>
      </div>
    </>
  );
}

// ——— Boyfriend Mode ——————————————————————————————————————————————————————————

/** The board in the phone and the stickers floating beside it share one state: tick either, both tick. */
export function BoyfriendStage() {
  const [ticks, setTicks] = useState<Record<BoardItem, boolean>>({ rice: false, tuna: false, wood: false });
  const [note, setNote] = useState(TUNA_NOTE);
  const toggle = (item: BoardItem) => setTicks((t) => ({ ...t, [item]: !t[item] }));
  return (
    <>
      <div className="absolute top-[40px] left-[130px] -rotate-[5deg]">
        <div className="dir-float">
          <PhoneFrame scale={0.72}>
            <BoardScreen ticks={ticks} onToggle={toggle} tunaNote={note} />
          </PhoneFrame>
        </div>
      </div>
      <div aria-hidden className="absolute top-[40px] left-[10px] z-20 -rotate-[10deg]">
        <span className="grid size-[112px] place-items-center rounded-full border-[6px] border-label bg-forest text-label shadow-[0_18px_30px_-14px_rgba(0,0,0,0.6)]">
          <Icon name="camera" className="size-[52px]" />
        </span>
      </div>
      <div aria-hidden className="pointer-events-none absolute top-[150px] right-[0px] z-30">
        <BuyStamp count={2} size={150} className="dir-pop dir-delay-3" />
      </div>
      <div className="absolute top-[300px] left-[0px] z-20">
        <div className="dir-float-side">
          <StickerCard src="/stickers/rice.png" alt="" name="Rice" size="1 kg" buy={2} width={210} aspect={1.25} tilt={-10} checked={ticks.rice} onToggle={() => toggle("rice")} />
        </div>
      </div>
      <div className="absolute top-[392px] right-[0px] z-20">
        <StickerCard
          src="/stickers/tuna.png"
          alt=""
          name="Tuna"
          size="170 g"
          note={note}
          onNoteChange={setNote}
          buy={3}
          width={236}
          aspect={0.9}
          tilt={8}
          checked={ticks.tuna}
          onToggle={() => toggle("tuna")}
        />
      </div>
      {/* Bottom-left, under the rice: clear of the tuna's note it points visitors to. */}
      <div className="absolute bottom-[-8px] left-[0px] z-30">
        <TryIt>Tick them off · edit the note</TryIt>
      </div>
    </>
  );
}

/** A sticker you can tick and re-note on its own, like the FAQ's tuna. */
export function TickableSticker(props: Omit<Parameters<typeof StickerCard>[0], "checked" | "onToggle" | "onNoteChange">) {
  const [checked, setChecked] = useState(false);
  const [note, setNote] = useState(props.note ?? "");
  return (
    <StickerCard
      {...props}
      checked={checked}
      onToggle={() => setChecked((c) => !c)}
      note={note}
      onNoteChange={props.note === undefined ? undefined : setNote}
    />
  );
}

// ——— Shared lists: a live shop, simulated ————————————————————————————————————

type Step = { kind: "tick"; item: string } | { kind: "add"; who: Person; item: string; size: string };

/** The shop, in order. Thandi works down the list; Sipho remembers the tomato sauce from home. */
const SCRIPT: Step[] = [
  { kind: "tick", item: "Charcoal" },
  { kind: "add", who: PEOPLE.sipho, item: "Tomato sauce", size: "1 bottle" },
  { kind: "tick", item: "Ice" },
  { kind: "tick", item: "Cream soda" },
  { kind: "tick", item: "Tomato sauce" },
  { kind: "tick", item: "Potato salad" },
  { kind: "tick", item: "Serviettes" },
];

type Toast = { id: number; person: Person; action: string; item: string; when: string };

type Shop = { rows: SharedRow[]; step: number; ticked: Toast; added: Toast; finishedFor: number; count: number };

const START: Shop = {
  rows: SHARED_ROWS,
  step: 0,
  ticked: { id: 0, person: PEOPLE.thandi, action: "ticked off", item: "Rolls", when: "just now" },
  added: { id: 0, person: PEOPLE.sipho, action: "added", item: "Charcoal", when: "1 min ago" },
  finishedFor: 0,
  count: 0,
};

/** Ticks a row and makes it the one "ticked just now". */
function tick(rows: SharedRow[], name: string, by?: Person): SharedRow[] {
  return rows.map((row) => (row.name === name ? { ...row, done: true, by, live: true } : { ...row, live: false }));
}

function advance(shop: Shop): Shop {
  // Everything picked up: hold the finished list for a beat, then start the shop again.
  if (shop.rows.every((row) => row.done)) {
    return shop.finishedFor >= 2 ? { ...START, count: shop.count + 1 } : { ...shop, finishedFor: shop.finishedFor + 1 };
  }
  for (let step = shop.step; step < SCRIPT.length; step++) {
    const next = SCRIPT[step];
    const count = shop.count + 1;
    if (next.kind === "add") {
      if (shop.rows.some((row) => row.name === next.item)) continue;
      const rows = [...shop.rows.map((row) => ({ ...row, live: false })), { name: next.item, size: next.size, done: false, added: next.who }];
      return { ...shop, rows, step: step + 1, count, added: { id: count, person: next.who, action: "added", item: next.item, when: "just now" } };
    }
    const row = shop.rows.find((r) => r.name === next.item);
    if (!row || row.done) continue;
    return {
      ...shop,
      rows: tick(shop.rows, next.item, PEOPLE.thandi),
      step: step + 1,
      count,
      ticked: { id: count, person: PEOPLE.thandi, action: "ticked off", item: next.item, when: "just now" },
    };
  }
  // The visitor ticked the rest themselves: finish anything left.
  const open = shop.rows.find((row) => !row.done);
  return open ? { ...shop, rows: tick(shop.rows, open.name, PEOPLE.thandi), count: shop.count + 1 } : shop;
}

type Action = { type: "advance" } | { type: "toggle"; index: number };

function reduce(shop: Shop, action: Action): Shop {
  if (action.type === "advance") return advance(shop);
  const rows = shop.rows.map((row, i) => {
    if (i !== action.index) return { ...row, live: false };
    // The visitor is shopping too: their ticks have no avatar.
    return row.done ? { ...row, done: false, by: undefined, live: false } : { ...row, done: true, by: undefined, live: true };
  });
  return { ...shop, rows, finishedFor: 0 };
}

/** True while `ref` is on screen and the visitor hasn't asked for reduced motion. */
function usePlaying(ref: RefObject<HTMLElement | null>) {
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => setPlaying(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return playing;
}

export function SharedStage() {
  const ref = useRef<HTMLDivElement>(null);
  const playing = usePlaying(ref);
  const [shop, dispatch] = useReducer(reduce, START);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => dispatch({ type: "advance" }), 2100);
    return () => window.clearInterval(timer);
  }, [playing]);
  const allDone = shop.rows.every((row) => row.done);
  return (
    <div ref={ref} className="absolute inset-0">
      <div className="absolute top-[40px] left-[140px] rotate-[5deg]">
        <div className="dir-float">
          <PhoneFrame scale={0.72}>
            <SharedListScreen rows={shop.rows} onToggle={(index) => dispatch({ type: "toggle", index })} />
          </PhoneFrame>
        </div>
      </div>
      {/* Toasts re-mount on every new event, so each one pops in. */}
      <div aria-live="polite" className="absolute top-[250px] left-[0px] z-20">
        <div className="dir-float-side">
          <div key={shop.ticked.id} className="dir-pop">
            <LiveToast {...shop.ticked} className="-rotate-[4deg] scale-[1.12]" />
          </div>
        </div>
      </div>
      <div aria-live="polite" className="absolute top-[400px] right-[0px] z-20">
        <div key={shop.added.id} className="dir-pop">
          <LiveToast {...shop.added} className="rotate-[3deg] scale-[1.12]" />
        </div>
      </div>
      <div className="absolute bottom-[34px] left-[0px] z-20 -rotate-[5deg]">
        <div className="flex items-center gap-4 rounded-full bg-white py-3 pr-7 pl-3 shadow-[0_24px_40px_-20px_rgba(24,54,49,0.7)]">
          <AvatarStack people={[PEOPLE.thandi, PEOPLE.sipho, PEOPLE.lerato]} size={84} />
          <span key={allDone ? "done" : "live"} className="dir-pop flex items-center gap-2.5 font-display text-2xl">
            {allDone ? (
              <>
                <Icon name="tick" className="size-7 text-lime" /> All picked up
              </>
            ) : (
              <>
                <LiveDot size={12} /> Live
              </>
            )}
          </span>
        </div>
      </div>
      <div className="absolute right-[0px] bottom-[-8px] z-30">
        <TryIt>Tick along with Thandi</TryIt>
      </div>
    </div>
  );
}

// ——— Loyalty cards ———————————————————————————————————————————————————————————

export function CardsPhone() {
  const [barcodeFirst, setBarcodeFirst] = useState(false);
  return (
    <PhoneFrame scale={0.72}>
      <CardDetailScreen barcodeFirst={barcodeFirst} onSwap={() => setBarcodeFirst((b) => !b)} />
    </PhoneFrame>
  );
}

// ——— Extras ——————————————————————————————————————————————————————————————————

/** Share from any app: a photo in a chat, the share sheet, then the sticker on the list. */
export function ShareTileArt() {
  const [stage, setStage] = useState<"photo" | "sheet" | "sent">("photo");
  return (
    <div className="relative h-full overflow-hidden rounded-[1.5rem]">
      {stage !== "sent" ? (
        <div className="absolute top-1 left-1 w-[62%] -rotate-[3deg] rounded-[20px] rounded-bl-md bg-white p-2 shadow-[0_14px_24px_-14px_rgba(0,0,0,0.6)]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-[linear-gradient(#D7E6EC_0_58%,#D3A676_58%_100%)]">
            <Image src="/stickers/tuna.png" alt="" width={450} height={403} className="absolute bottom-[6%] left-1/2 h-[80%] w-auto -translate-x-1/2" />
          </div>
          <p className="mt-1.5 px-1 text-xs font-semibold text-forest/55">Get this one ♥ · 10:24</p>
          <button
            type="button"
            onClick={() => setStage("sheet")}
            aria-label="Share this photo"
            className="absolute -right-4 -bottom-4 grid size-[48px] cursor-pointer place-items-center rounded-full bg-forest text-lime-bright ring-4 ring-lime transition-transform hover:scale-105 active:scale-95"
          >
            {stage === "photo" ? <span className="absolute inset-0 animate-ping rounded-full bg-forest/40" /> : null}
            <Icon name="share" className="relative size-[22px]" />
          </button>
        </div>
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <div className="dir-pop flex items-center gap-4" style={tilt(-4)}>
            <StickerCard src="/stickers/tuna.png" alt="" name="Tuna" buy={1} width={116} aspect={0.9} tilt={-4} />
            <div className="flex flex-col items-start gap-2">
              <span className="rounded-full bg-forest px-3 py-1.5 text-xs font-bold text-lime-bright">✓ On Braai Saturday</span>
              <button type="button" onClick={() => setStage("photo")} className="cursor-pointer rounded-full bg-white/70 px-3 py-1.5 text-xs font-bold text-forest hover:bg-white">
                Share another
              </button>
            </div>
          </div>
        </div>
      )}
      {/* The share sheet, generic apart from Grozara itself. */}
      <div
        className={`absolute inset-x-0 bottom-0 rounded-t-[1.5rem] bg-white px-4 pt-3 pb-4 text-forest shadow-[0_-16px_30px_-18px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.2,0.9,0.2,1)] ${
          stage === "sheet" ? "translate-y-0" : "pointer-events-none translate-y-[110%]"
        }`}
        aria-hidden={stage !== "sheet"}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold tracking-[0.12em] text-forest/50 uppercase">Share to</span>
          <button type="button" tabIndex={stage === "sheet" ? 0 : -1} onClick={() => setStage("photo")} className="cursor-pointer text-xs font-bold text-forest/60">
            Cancel
          </button>
        </div>
        <div className="mt-3 flex items-start gap-4">
          <button type="button" tabIndex={stage === "sheet" ? 0 : -1} onClick={() => setStage("sent")} className="group flex cursor-pointer flex-col items-center gap-1.5">
            <Image src="/brand/grozara-icon.svg" alt="" width={64} height={64} className="size-[52px] rounded-[14px] ring-2 ring-lime ring-offset-2 transition-transform group-hover:scale-105" />
            <span className="text-[11px] font-bold">Grozara</span>
          </button>
          {(["copy", "image", "more"] as const).map((icon, i) => (
            <span key={icon} className="flex flex-col items-center gap-1.5 text-forest/45">
              <span className="grid size-[52px] place-items-center rounded-[14px] bg-forest/6">
                <Icon name={icon} className="size-6" />
              </span>
              <span className="text-[11px] font-semibold">{["Copy", "Save", "More"][i]}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const FAVOURITE_CARDS = ["corner", "leaf", "sunny"] as const;
type FavouriteCard = (typeof FAVOURITE_CARDS)[number];

/** Favourites on Home: tap a card to make it the favourite; it comes to the front wearing the star. */
export function FavouritesTileArt() {
  const [favourite, setFavourite] = useState<FavouriteCard>("leaf");
  const others = FAVOURITE_CARDS.filter((card) => card !== favourite);
  const slot = (card: FavouriteCard) =>
    card === favourite
      ? { left: "50%", top: 58, x: "-50%", rotate: -3, z: 3, width: 196 }
      : card === others[0]
        ? { left: "0%", top: 0, x: "0%", rotate: -9, z: 1, width: 170 }
        : { left: "100%", top: 8, x: "-100%", rotate: 8, z: 2, width: 170 };
  return (
    <div className="relative h-full">
      {FAVOURITE_CARDS.map((card) => {
        const s = slot(card);
        const brand = BRANDS[card];
        return (
          <button
            key={card}
            type="button"
            onClick={() => setFavourite(card)}
            aria-pressed={card === favourite}
            aria-label={`Make ${brand.name} a favourite`}
            className="absolute cursor-pointer transition-[left,top,transform] duration-500 ease-[cubic-bezier(0.3,1.3,0.4,1)] hover:brightness-105"
            style={{ left: s.left, top: s.top, zIndex: s.z, transform: `translateX(${s.x}) rotate(${s.rotate}deg)` }}
          >
            <LoyaltyCard brand={brand} width={s.width} favourite={card === favourite} className="transition-[width,height] duration-500" />
          </button>
        );
      })}
      <span key={favourite} className="dir-pop absolute -top-2 right-2 z-10 grid size-[52px] place-items-center rounded-full bg-forest text-amber" style={tilt(8)}>
        <Icon name="star" className="size-[26px]" />
      </span>
    </div>
  );
}

const CLEAR_START = [
  { name: "Milk", done: true },
  { name: "Brown bread", done: true },
  { name: "Eggs", done: false },
];

/** Clear in one tap: tick rows, then Clear sweeps the ticked ones away. */
export function ClearTileArt() {
  const [items, setItems] = useState(CLEAR_START);
  const [leaving, setLeaving] = useState(false);
  const ticked = items.filter((item) => item.done).length;
  const clear = () => {
    setLeaving(true);
    window.setTimeout(() => {
      setItems((list) => list.filter((item) => !item.done));
      setLeaving(false);
    }, 380);
  };
  return (
    <div className="grid h-full content-center">
      <div className="rotate-[-3deg] rounded-[22px] bg-white p-3 text-forest shadow-[0_18px_30px_-16px_rgba(0,0,0,0.8)]">
        {items.length === 0 ? (
          <div className="dir-pop flex flex-col items-center gap-2 py-4 text-center">
            <span className="grid size-11 place-items-center rounded-full bg-lime text-white">
              <Icon name="tick" className="size-6" />
            </span>
            <span className="font-display text-lg">All clear, ready for next time</span>
            <button type="button" onClick={() => setItems(CLEAR_START)} className="cursor-pointer rounded-full bg-forest/6 px-3 py-1.5 text-xs font-bold hover:bg-forest/10">
              Fill it again
            </button>
          </div>
        ) : (
          <>
            {items.map((item, i) => (
              <div
                key={item.name}
                className={`grid transition-[grid-template-rows,opacity,transform] duration-[380ms] ease-out ${
                  leaving && item.done ? "grid-rows-[0fr] translate-x-6 opacity-0" : "grid-rows-[1fr]"
                }`}
              >
                <button
                  type="button"
                  aria-pressed={item.done}
                  onClick={() => setItems((list) => list.map((it, j) => (j === i ? { ...it, done: !it.done } : it)))}
                  className="flex min-h-0 cursor-pointer items-center gap-3 overflow-hidden border-b border-forest/8 px-1 py-2 text-left"
                >
                  <CheckCircle checked={item.done} size={22} />
                  <span className={`font-medium transition-colors ${item.done ? "text-forest/40 line-through decoration-forest/30" : ""}`}>{item.name}</span>
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={clear}
              disabled={ticked === 0 || leaving}
              className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-lime py-2.5 font-display text-lg text-white transition-[opacity,transform] active:scale-95 disabled:cursor-default disabled:opacity-45"
            >
              <Icon name="tick" className="size-5" /> {ticked ? `Clear ${ticked}` : "Tick to clear"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ——— How it works ————————————————————————————————————————————————————————————

const HOUSEHOLD: { person: Person; key: string }[] = [
  { person: PEOPLE.thandi, key: "thandi" },
  { person: PEOPLE.sipho, key: "sipho" },
  { person: PEOPLE.lerato, key: "lerato" },
];

/** Share it: tap the dashed invite to add Lerato. Thandi owns the list, so she stays. */
export function HouseholdArt() {
  const [joined, setJoined] = useState<Record<string, boolean>>({ thandi: true, sipho: true, lerato: false });
  const count = Object.values(joined).filter(Boolean).length;
  return (
    <div className="flex -rotate-[6deg] flex-col items-center gap-3">
      <span className="flex items-center">
        {HOUSEHOLD.map(({ person, key }, i) => {
          const on = joined[key];
          const owner = person.isOwner;
          return (
            <button
              key={key}
              type="button"
              disabled={owner}
              onClick={() => setJoined((j) => ({ ...j, [key]: !j[key] }))}
              aria-pressed={on}
              aria-label={owner ? `${person.name} owns the list` : on ? `Remove ${person.name}` : `Add ${person.name}`}
              className="relative grid size-[78px] cursor-pointer place-items-center rounded-full font-display text-[28px] text-forest transition-[background-color,box-shadow,scale] duration-300 ease-[cubic-bezier(0.3,1.5,0.5,1)] hover:scale-105 active:scale-95 disabled:cursor-default disabled:hover:scale-100"
              style={{
                marginLeft: i ? -17 : 0,
                zIndex: HOUSEHOLD.length - i,
                background: on ? person.color : "rgba(255,252,245,0.55)",
                boxShadow: on ? "0 0 0 5px #fff" : "inset 0 0 0 3px rgba(24,54,49,0.35)",
              }}
            >
              {on ? person.initials : <Icon name="plus" className="size-7 text-forest/60" />}
              {!on ? <span className="absolute inset-0 animate-ping rounded-full ring-2 ring-forest/30" /> : null}
            </button>
          );
        })}
      </span>
      <span key={count} className="dir-pop flex items-center gap-2 rounded-full bg-forest px-3.5 py-1.5 text-sm font-bold text-blush">
        <LiveDot size={7} /> Shared with {count}
      </span>
    </div>
  );
}

/** Shop and scan: tap the card and it flips to its barcode, the way it's shown at the till. */
export function ScanCardArt() {
  const [flipped, setFlipped] = useState(false);
  const brand = BRANDS.basket;
  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={flipped ? `Show the ${brand.name} card` : `Show the ${brand.name} barcode`}
      className="relative block cursor-pointer rotate-[7deg] perspective-[900px]"
    >
      <span
        className={`relative block transition-transform duration-700 ease-[cubic-bezier(0.3,1.25,0.4,1)] transform-3d ${flipped ? "rotate-y-180" : ""}`}
        style={{ width: 210, height: 210 * 0.63 }}
      >
        <span className="absolute inset-0 backface-hidden">
          <LoyaltyCard brand={brand} width={210} />
        </span>
        <span className="absolute inset-0 flex rotate-y-180 flex-col items-center justify-center overflow-hidden rounded-[16px] bg-white px-4 shadow-[0_18px_30px_-16px_rgba(10,30,25,0.55)] backface-hidden">
          <span className="flex h-[62px] items-stretch gap-[2px]">
            {Array.from({ length: 34 }, (_, i) => (
              <span key={i} className="bg-forest" style={{ width: [2, 3, 1, 2, 1, 4, 1, 2][i % 8] }} />
            ))}
          </span>
          <span className="mt-1.5 font-mono text-[11px] tracking-[0.2em] text-forest">6009 8812 {brand.digits}</span>
          {flipped ? <span className="dir-scan absolute inset-x-3 h-[3px] rounded-full bg-[#ff3b30] shadow-[0_0_14px_4px_rgba(255,59,48,0.6)]" /> : null}
        </span>
      </span>
      <span
        className={`absolute -top-3 -right-3 rounded-full bg-forest px-3 py-1.5 text-xs font-bold text-lime-bright transition-[opacity,scale] duration-300 ${flipped ? "scale-100 opacity-100 delay-500" : "scale-75 opacity-0"}`}
      >
        ✓ Scanned
      </span>
    </button>
  );
}
