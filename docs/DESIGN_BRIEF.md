# Grozara landing page — design brief

> **Status (Sep 27 2026):** the homepage is Direction 5, "Lime pop", a static page with no 3D. The
> scroll-driven 3D story below lives at `/3d`. Its palette, claims and Zara spec still apply.

A one-page, scroll-driven story where **the world transforms as you scroll** and **Zara**, the
Grozara mascot, guides you through it as a physical 3D character you can grab and throw. It
should feel alive and handmade, never "a bunch of text". Mobile first (most visitors arrive from
a phone), with a desktop layout that uses the extra room for the 3D worlds.

References: `docs/reference/` has Zara from the 15-second reel (front and corner poses) and a
highlights strip of the reel. The reel itself is `public/media/grozara-reel.mp4`.

## What Grozara is (only claim what's true)

Grozara is a shopping app for South Africans: **your lists and loyalty cards, together.** Every
factual line the page uses lives in `src/content/site.ts`; change facts there, not in components.

- **Lists**: simple checklists; pin the list for your next shop; swipe to delete with undo; clear
  checked items; share a text copy.
- **Boyfriend Mode**: a photo list for the person doing the shopping. Snap a photo and it becomes
  a sticker (the subject is lifted on the device); add how many to buy (the yellow BUY N stamp), a
  note ("in brine, not oil!") and the stores that stock it; tap the label to tick it off; hold to
  drag, pinch and rotate stickers on the board. *No more guessing.*
- **Share from any app**: share a photo from WhatsApp or Photos straight into a Boyfriend Mode list.
- **Loyalty cards**: 80 South African card templates; add a card by scanning its barcode,
  importing a screenshot, or typing the number; a wallet that stacks your cards; the screen
  brightens at the till; favourites on Home.
- **Shared lists and live shopping**: share a list with friends and family; everyone sees items
  ticked off live while someone is at the shop, and items added from home appear straight away.
- **Face ID lock**: an optional app lock.
- **Price**: free to use, with optional extras.

Owner decisions (Sep 27): shared lists are presented as live; the page makes **no on-device or
privacy claims** ("stored on your phone", "nothing in the cloud", "works offline", "no account
needed"). Don't imply prices, specials or release dates.
The app is in beta (TestFlight). The page shows the **official** App Store and Google Play badges
(`public/badges/`, unmodified artwork, via `<StoreBadges>`), unlinked and captioned "Coming soon"
until `STORE_LINKS` in `src/content/site.ts` has the listing URLs. When badges appear, the footer
carries Apple's and Google's trademark lines (`LEGAL.trademarks`). A "Get notified" form needs a
backend decision first (ask).

**Tone**: warm, playful, confident, a little South African ("lekker", "sho't left" used sparingly).
Headlines short, verbs first.

## The worlds

One persistent 3D canvas sits behind the page. Each section pins, and scrubbing through it morphs
the canvas's world preset (background, light, fog, props, camera) while the HTML copy
animates on top. Zara stays in the canvas the whole way and reacts to each world.

| # | World | What happens as you scroll | Zara |
|---|---|---|---|
| 0 | **Hero · Night garden** | Deep forest gradient (`#0D211D → #24524A`), drifting lime fireflies, a floating paper island. Headline + wordmark. | Drops onto the island, squashes, blinks, eyes follow the cursor. Grab and throw her. |
| 1 | **The list** | The island unfolds into a giant paper checklist (Milk 2 L, Bread, Eggs × 6). Items tick in time with the scroll. | Hops from checkbox to checkbox; each tick gives her a little bounce. |
| 2 | **The wallet** | Loyalty cards (fictional brands: *Basket Club, Leaf Rewards, Corner Points*) fly in and stack like a wallet; one flips to its barcode and the scene flares brighter (the till brightness boost). | Peeks out from behind the stack. |
| 3 | **Snap** | Darkroom: a viewfinder closes in, shutter flash, the photo shatters into particles and leaves the white-outlined sticker (`public/stickers/rice.png`). | Poses for the photo; blinks at the flash. |
| 4 | **Boyfriend Mode** | A heart-shaped iris wipes to the paper board (`#F1EDDF`, dot grid). Stickers slap down (rice, tuna) with BUY 2 / BUY 3 stamps; the note writes itself on; a big "?" gets scribbled out. | Heart eyes; winks. |
| 5 | **Share from anywhere** | A chat bubble with a photo flies across and lands on the board as a sticker. | Catches it. |
| 6 | **Shop together** | A shared list glows live: avatars light up, items tick themselves off, a toast flies in ("Sipho added Charcoal"). | High-fives an avatar. |
| 7 | **See you in the aisles** | Back to the night garden; logo, the store badges ("Coming soon"), the reel. | Waves goodbye. |

Transitions between worlds should be *physical*: things fold, flip, fall, peel and slap
rather than simply cross-fade.

## Zara (3D)

Match the reel's design (`docs/reference/zara-front.png`) and make her feel real:

- **Anatomy**: a soft shopping-bag body (rounded box, about 1 : 1 : 0.55), lime gradient
  (`#A5E063` top → `#7EC340` → `#5FA52C` bottom); a white sticker outline (inverted hull);
  a forest handle arch (tube) on top; the amber brand dot (`#FFB902`, white ring) at top left;
  white eyes with forest pupils and a highlight; blush cheeks (`#FF8FA3` at ~55%); a forest mouth
  with a coral tongue; lime capsule arms with white outlines.
- **Realism**: `MeshPhysicalMaterial` (clearcoat, low roughness, a little sheen); soft studio light
  from drei `Environment` built with `Lightformer`s (no external HDR download); `ContactShadows`;
  ambient occlusion on the handle joins if cheap.
- **Physics** (`@react-three/rapier`): a dynamic body with a rounded cuboid collider; world colliders
  per scene (island, checkboxes, board). Pointer-drag moves her kinematically; release throws her
  with the pointer's velocity. Squash and stretch along her velocity; an impact squash from
  collision events (scaled by impact speed). Secondary motion from springs: the handle sways,
  arms flop, pupils jiggle. Idle breathing, blinking every few seconds, eyes tracking the pointer.
- **Voice (optional)**: the reel's audio can drive her mouth on the final section if sound is on
  (muted by default; a clear sound toggle).
- **Reduced motion**: no simulation; a static, friendly pose per world.

## Visual system

| Token | Hex | Use |
|---|---|---|
| forest | `#183631` | brand, text on light |
| forest-deep | `#0D211D` | night backgrounds |
| forest-lift | `#24524A` | night gradient highlight |
| lime | `#7EC340` | primary accent, Zara |
| lime-bright | `#A5E063` | highlights, active words |
| amber | `#FFB902` | BUY stamps, brand dot |
| paper | `#F1EDDF` | Boyfriend Mode board |
| label | `#FFFCF5` | sticker labels, cards |
| mist | `#F7F9F5` | light sections |
| coral | `#FF6B5B` | hearts, the "?" |
| blush | `#FF8FA3` | cheeks, hearts |

- **Type** (via `next/font/google`, self-hosted at build): headings **Nunito 800–900** (rounded,
  echoes the app's SF Rounded); body **Inter**; handwritten notes **Caveat**.
- **Logo**: `public/brand/grozara-logo.svg` (dark text) and `grozara-logo-white.svg` (dark
  sections); icon `grozara-icon.svg`. The icon's forest tile nearly vanishes on `#0D211D`, so give it
  a thin lime or white ring on dark sections. Both SVGs have had their baked-in white background
  removed.
- **Motif**: the sticker look (white outline plus a soft drop shadow) on anything "stuck" to a world.

## Architecture

- **Next 16** App Router, React 19 with the React Compiler, **Tailwind v4** (CSS-first `@theme`
  tokens in `globals.css`), strict TypeScript. Read `node_modules/next/dist/docs/` before writing
  Next-specific code (see AGENTS.md).
- **All copy is server-rendered** HTML: real headings, readable with JavaScript or WebGL off, good
  for SEO and first paint.
- **One 3D island**: `<Experience />`, a client component loaded with `next/dynamic`
  (`ssr: false`), fixed full-screen behind the content, `aria-hidden`, with a poster image while it
  loads or if WebGL is unavailable. Rapier's WASM loads with it, not before.
- **Scroll**: Lenis driven by `gsap.ticker` (`autoRaf: false`), `ScrollTrigger.update` on Lenis
  scroll, `useGSAP` for setup and cleanup. Pinned sections scrub timelines.
- **Scroll → 3D**: keep scroll progress in a mutable ref or module object read inside `useFrame`,
  so scrolling never re-renders React.
- **Performance budget**: DPR capped at `[1, 1.75]` (1.5 on phones); instanced meshes for particles
  and fireflies; pause the render loop when the canvas is off screen or the tab is hidden; images via
  `next/image`; the reel video `preload="none"` with its poster. Target a steady 60 fps on an iPhone
  15 Pro and a usable 30+ on a mid-range Android.
- **Accessibility**: `prefers-reduced-motion` turns off Lenis, pins become simple fades and physics
  stops; visible focus styles; a logical heading order; captions or a transcript for the reel.

## Milestones

1. **Hero world + 3D Zara with physics.** Check the feel and frame rate at 390 × 844 and on desktop
   before building more.
2. Scroll engine (Lenis + ScrollTrigger + world presets) with two worlds.
3. The remaining worlds.
4. Polish: metadata and Open Graph image, favicon from the icon, sound toggle, 404.
5. Deploy to Vercel (ask first).

## Assets

| File | Source |
|---|---|
| `public/brand/grozara-logo.svg`, `grozara-logo-white.svg`, `grozara-icon.svg` | Supplied logo SVGs, cleaned (background removed, cropped, one forest green) |
| `public/brand/app-icon.png` | The iOS app icon |
| `public/stickers/rice.png`, `tuna.png` | Real stickers cut with the app's own sticker processor. The packaging shows **Tastic** and **Woolworths Food**; swap in neutral items if the promo must carry no third-party marks. |
| `public/media/grozara-reel.mp4`, `grozara-reel-poster.jpg` | The 15 s reel, voiced by Ava (ElevenLabs, paid plan). It shows the same Tastic and Woolworths Food packs as the stickers. |
| `docs/reference/*` | Zara and reel reference frames |

## Don'ts

- No retailer logos or names on cards (they'd imply the retailers endorse Grozara).
- Only the official store badges, never redrawn, recoloured, tilted or cropped; no "Download now"
  wording until the app is live.
- No features that don't exist yet.
- No `git push`, GitHub repo creation, Vercel linking or deploys without asking.
- The old Tailwind UI "Pocket" template is in git history (commit `b0fee05`); don't bring back its
  invented reviews, press logos, pricing or login pages.
