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
    text: "List it. Tick, tick… yep, I want this and this.",
    say: "[light, playful] List it. Tick, tick… [pleased, decisive] yep, I want this… and this.",
  },
  {
    id: "snap",
    text: "Snap it. Click… it's a sticker! Now nobody comes home with tuna in oil.",
    say: "[upbeat] Snap it. Click… [delighted] it's a sticker! [cheeky] Now nobody comes home with tuna in oil.",
  },
  {
    id: "share",
    text: "Share it. Thandi grabs the rolls, Sipho remembers the charcoal… from the couch.",
    say: "[upbeat] Share it. Thandi grabs the rolls, Sipho remembers the charcoal… [dry, deadpan] from the couch.",
  },
  {
    id: "scan",
    text: "Scan it. 80+ cards, and no more “hold on, it's in here somewhere…”",
    say: "[confident] Scan it. Eighty-plus cards, and no more… [flustered, searching voice] hold on, it's in here somewhere…",
  },
  {
    id: "outro",
    text: "Shopping, sorted. Coming soon to the App Store and Google Play.",
    say: "[warm, proud, satisfied] Shopping, sorted. [bright, upbeat] Coming soon to the App Store and Google Play.",
  },
];
