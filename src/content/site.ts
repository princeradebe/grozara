import type { IconName } from "@/components/mocks/Icon";

// Everything the landing page claims about Grozara, in one place. The page designs are skins over
// this: change a fact here and every direction (and the 3D page) says the same thing.

/** Store listings. Null until Grozara is live; the badges then render unlinked, captioned "Coming soon". */
export const STORE_LINKS: { appStore: string | null; googlePlay: string | null } = {
  appStore: null,
  googlePlay: null,
};

export const TAGLINE = "Your lists and loyalty cards, together.";
export const SIGN_OFF = "Shopping, sorted.";

export const NAV_LINKS = [
  { href: "#lists", label: "Lists" },
  { href: "#boyfriend-mode", label: "Boyfriend Mode" },
  { href: "#shared", label: "Shared lists" },
  { href: "#cards", label: "Loyalty cards" },
  { href: "#faq", label: "FAQ" },
] as const;

/** Short proof points for hero chips and strips. */
export const HIGHLIGHTS: [IconName, string][] = [
  ["userGroup", "Shared lists, live"],
  ["card", "80 SA card templates"],
  ["faceId", "Face ID lock"],
];

export type Feature = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  points: [IconName, string][];
};

export const FEATURES = {
  lists: {
    id: "lists",
    eyebrow: "Lists",
    title: "Tick it off. Undo if you slipped.",
    body: "Simple checklists for every shop. Pin the list for your next trip, swipe to delete with undo, and clear what you've picked up in one tap.",
    points: [
      ["pin", "Pin your next shop to Home"],
      ["tick", "Tick, swipe, undo"],
      ["share", "Send a text copy to anyone"],
    ],
  },
  boyfriendMode: {
    id: "boyfriend-mode",
    eyebrow: "Boyfriend Mode",
    title: "Send photos, not guesswork.",
    body: "Snap what you need and Grozara lifts it into a sticker. Add how many to buy, a little note and the stores that stock it. Whoever does the shop gets exactly what you meant, then ticks it off.",
    points: [
      ["camera", "A photo becomes a sticker"],
      ["heart", "BUY stamps and little notes"],
      ["image", "Drag, pinch and rotate on the board"],
    ],
  },
  shared: {
    id: "shared",
    eyebrow: "Shared lists",
    title: "Shop together, live.",
    body: "Share a list with friends and family. When someone's at the shop, everyone watches items get ticked off as it happens, and anything you add from home lands on their phone straight away.",
    points: [
      ["userGroup", "One list for the whole household"],
      ["cart", "Live shopping: see every tick as it happens"],
      ["plus", "Add from home, it shows up in the aisle"],
    ],
  },
  cards: {
    id: "cards",
    eyebrow: "Loyalty cards",
    title: "Every card, ready at the till.",
    body: "Templates for 80 South African programmes. Scan a barcode, import a screenshot or type the number. Your cards stack like a wallet, and the screen brightens when it's time to scan.",
    points: [
      ["barcode", "Scan, import or type it in"],
      ["card", "80 South African templates"],
      ["sun", "Brightens at the till"],
    ],
  },
} satisfies Record<string, Feature>;

/** Smaller features for an "and there's more" row. */
export const EXTRAS: { icon: IconName; title: string; body: string }[] = [
  { icon: "share", title: "Share from any app", body: "Send a photo from WhatsApp or Photos straight onto a Boyfriend Mode list." },
  { icon: "faceId", title: "Face ID lock", body: "Turn on the app lock and Grozara opens with Face ID." },
  { icon: "star", title: "Favourites on Home", body: "Your go-to cards and your next shop, one tap from opening the app." },
  { icon: "tick", title: "Clear in one tap", body: "Done shopping? Clear the checked items and the list is ready for next time." },
];

export const STEPS: { icon: IconName; title: string; body: string }[] = [
  { icon: "list", title: "Make a list", body: "Type it out, or snap photos in Boyfriend Mode." },
  { icon: "userGroup", title: "Share it", body: "Add the household. Everyone sees the same list, live." },
  { icon: "cart", title: "Shop and scan", body: "Tick it off in the aisle, scan your card at the till." },
];

/** Words for marquees and tickers. */
export const TICKER = ["Lists", "Boyfriend Mode", "Shared lists", "Live shopping", "Loyalty cards", "Share from WhatsApp", "Face ID lock"];

export const FAQS: { q: string; a: string }[] = [
  { q: "Is Grozara free?", a: "Yes. Grozara is free to use, with optional extras." },
  {
    q: "What is Boyfriend Mode?",
    a: "A photo list for whoever is doing the shop. Snap what you need, Grozara turns it into a sticker, and you add how many to buy, a note and where to find it. No more guessing which one you meant.",
  },
  {
    q: "How do shared lists work?",
    a: "Share a list with friends or family and everyone sees the same list. When someone ticks off the milk in the aisle, it's ticked on your phone too, and anything you add shows up on theirs straight away.",
  },
  {
    q: "Which loyalty cards can I add?",
    a: "Grozara has templates for 80 South African programmes. You can add any other card too: scan its barcode, import a screenshot of it or type the number.",
  },
  { q: "Can I add photos from WhatsApp?", a: "Yes. Share a photo from WhatsApp, Photos or any other app and pick the Boyfriend Mode list it belongs on." },
  { q: "Can I lock the app?", a: "Yes. Turn on the app lock and Grozara opens with Face ID." },
  { q: "When can I get it?", a: "Grozara is in beta right now and coming soon to the App Store and Google Play." },
];

export type FooterLink = { label: string; href?: string };

/** Links without an href are pages that don't exist yet; they render as plain text. */
export const FOOTER_COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Features",
    links: [
      { label: "Lists", href: "#lists" },
      { label: "Boyfriend Mode", href: "#boyfriend-mode" },
      { label: "Shared lists", href: "#shared" },
      { label: "Loyalty cards", href: "#cards" },
    ],
  },
  {
    title: "Grozara",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Get the app", href: "#get" },
    ],
  },
  {
    title: "Legal",
    links: [{ label: "Privacy" }, { label: "Terms" }],
  },
];

export const LEGAL = {
  copyright: `© ${new Date().getFullYear()} Grozara. Made in South Africa.`,
  trademarks: [
    "Apple, the Apple logo and App Store are trademarks of Apple Inc., registered in the U.S. and other countries.",
    "Google Play and the Google Play logo are trademarks of Google LLC.",
  ],
};
