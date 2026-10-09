// The voiceover. Every claim traces back to src/content/site.ts in the site. `text` is what the
// captions show; `say`, when given, is what the voice reads instead: the same words with Eleven v4
// delivery tags (bracketed directions it performs rather than reads) and spoken-out numbers.
export const LINES: readonly { id: string; text: string; say?: string }[] = [
  {
    id: "hello",
    text: "Meet Grozara: your shopping list and your loyalty card wallet.",
    say: "[warm, bright, welcoming] Meet Grozara: your shopping list and your loyalty card wallet.",
  },
  {
    id: "list",
    text: "List it. Milk, bread, boerewors. Tick, tick, tick.",
    say: "[light, playful] List it. Milk, bread, boerewors. [satisfied, rhythmic] Tick, tick, tick.",
  },
  {
    id: "snap",
    text: "Snap it. Boyfriend Mode turns your photo into a sticker. No more tuna in oil.",
    say: "[upbeat] Snap it. Boyfriend Mode turns your photo into a sticker. [cheeky] No more tuna in oil.",
  },
  {
    id: "share",
    text: "Share it. Thandi grabs the rolls, Sipho remembers the charcoal… and I, the drinks.",
    say: "[upbeat] Share it. Thandi grabs the rolls, Sipho remembers the charcoal… [playful, pleased with herself] and I, the drinks.",
  },
  {
    id: "scan",
    text: "Scan it. Every loyalty card, on your phone. No more digging at the till.",
    say: "[confident] Scan it. Every loyalty card, on your phone. [relieved] No more digging at the till.",
  },
  {
    id: "outro",
    text: "Shopping, sorted. Coming soon to the App Store and Google Play.",
    say: "[warm, proud, satisfied] Shopping, sorted. [bright, upbeat] Coming soon to the App Store and Google Play.",
  },
];
