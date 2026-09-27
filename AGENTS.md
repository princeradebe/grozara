<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Grozara landing page — agent notes

Marketing site for Grozara (iPhone app: shopping lists, loyalty cards and Boyfriend Mode, for South
Africa). **Read `docs/DESIGN_BRIEF.md` first**: it has the scroll story, Zara's 3D and physics spec,
the palette, the architecture and what the app can truthfully claim.

The homepage (`/`) is Direction 5, "Lime pop" (`src/components/directions/Direction5.tsx`), chosen on
Sep 27 2026. The brief's 3D night garden with Zara lives at `/3d`; directions 1–4 stay at `/directions` for
comparison.

## Commands

- `pnpm dev` — dev server on http://localhost:3000 (`.claude/launch.json` runs this for the preview)
- `pnpm build` — production build; run it before calling anything done
- `pnpm lint`

## Stack

Next 16 (App Router, React Compiler), React 19, Tailwind v4, TypeScript; GSAP + `@gsap/react`
(free "no charge" licence covers commercial sites, all plugins included); Lenis; three +
`@react-three/fiber` + `@react-three/drei`; `@react-three/rapier` for Zara's physics.
Ask before adding any other dependency.

## Rules

- Server components for all copy; the 3D canvas is a single `next/dynamic` (`ssr: false`) client
  island with a poster fallback and a reduced-motion path.
- Never re-render React on scroll: read scroll progress from refs inside `useFrame`/GSAP.
- Only claim what the brief and `src/content/site.ts` say. No on-device/privacy claims. Store badges
  are the official artwork via `<StoreBadges>`, captioned "Coming soon" until the store links exist.
- No retailer logos. Fictional card brands only.
- For UI changes, look at the page in the browser preview (phone width 390 and desktop) before
  saying it's done.
- Don't commit, push, create the GitHub repo or deploy unless asked. `.vercel/project.json` links this
  folder to the existing Vercel project `trae_grozara-web_rw70` (untracked); ask before any deploy.
