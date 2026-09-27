// Zara's lines. Every claim traces back to src/content/site.ts in the site. `say`, when given, is
// a respelling the voice reads instead of `text` (which the captions show).
export const LINES: readonly { id: string; text: string; say?: string }[] = [
  { id: "hello", text: "Howzit! I'm Zara, and this is Grozara.", say: "Hows-it! I'm Zara, and this is Gro-zara." },
  { id: "list", text: "List it. Tick it off, undo if you slipped." },
  { id: "snap", text: "Snap it. Boyfriend Mode turns your photo into a sticker, so nobody brings home the wrong one." },
  { id: "share", text: "Share it. The whole house watches the list tick off, live." },
  { id: "scan", text: "Scan it. Every loyalty card, ready at the till." },
  { id: "outro", text: "Grozara. Shopping, sorted. Lekker! Coming soon to the App Store and Google Play." },
];
