import { LINES } from "./script";
import voice from "./voice.json";

export const FPS = 30;
export const TARGET = 30 * FPS;
/** Frames the next band spends pushing up over the last one. */
export const PUSH = 16;

export type SceneId = "hello" | "list" | "snap" | "share" | "scan" | "outro";

/** A spoken word and when it starts and ends, in seconds from the start of its line. */
export type Word = { text: string; start: number; end: number };

/**
 * Frames before each line starts and the minimum after it ends. Tight, because Eleven v4's acted
 * delivery runs long and everything has to fit 30 seconds: each line starts just as its band
 * begins pushing in (the verb still slams down on the word), and the outro holds the end card.
 */
const PAD: Record<SceneId, [lead: number, tail: number]> = {
  hello: [2, 2],
  list: [4, 2],
  snap: [4, 2],
  share: [4, 2],
  scan: [4, 2],
  outro: [4, 20],
};

const ORDER: SceneId[] = ["hello", "list", "snap", "share", "scan", "outro"];

export type Scene = {
  id: SceneId;
  from: number;
  duration: number;
  /** Frame (relative to the scene) the voice line starts. */
  voiceAt: number;
  voiceFrames: number;
  file: string;
  text: string;
  /** What the transcriber heard, with timings; empty for a scratch track. */
  words: Word[];
};

function build(): Scene[] {
  const lines = new Map<string, { file: string; seconds: number; words?: Word[] }>(voice.lines.map((l) => [l.id, l]));
  const base = ORDER.map((id) => {
    const line = lines.get(id);
    if (!line) throw new Error(`voice.json has no "${id}" line; run pnpm voice`);
    const voiceFrames = Math.ceil(line.seconds * FPS);
    return { id, voiceFrames, file: line.file, words: line.words ?? [], lead: PAD[id][0], tail: PAD[id][1] };
  });
  const needed = base.reduce((t, s) => t + s.lead + s.voiceFrames + s.tail, 0);
  // Spare time is shared out as breathing room after every line.
  const spare = Math.max(0, TARGET - needed);
  const share = Math.floor(spare / base.length);
  let from = 0;
  return base.map((s, i) => {
    const extra = share + (i === base.length - 1 ? spare - share * base.length : 0);
    const duration = s.lead + s.voiceFrames + s.tail + extra;
    const scene: Scene = {
      id: s.id,
      from,
      duration,
      voiceAt: s.lead,
      voiceFrames: s.voiceFrames,
      file: s.file,
      text: TEXT[s.id],
      words: s.words,
    };
    from += duration;
    return scene;
  });
}

const TEXT = Object.fromEntries(LINES.map((l) => [l.id, l.text])) as Record<SceneId, string>;

/**
 * A moment in a line: when a spoken word starts (or ends), taking its `nth` occurrence, counted
 * from 0. `fallback` is a fraction of the line, used when the transcript doesn't have the word
 * (a scratch track, or a take the transcriber heard differently).
 */
export type Anchor = { word: string; nth?: number; edge?: "start" | "end"; fallback: number };

/** When things happen inside each scene: the pictures land on the words that describe them, and the sound effects fire on the same frames. */
export const CUES = {
  hello: {
    logo: { word: "grozara", fallback: 0.15 },
    list: { word: "shopping", fallback: 0.45 },
    cards: { word: "loyalty", fallback: 0.8 },
  },
  list: {
    milk: { word: "milk", fallback: 0.25 },
    bread: { word: "bread", fallback: 0.36 },
    boerewors: { word: "boerewors", fallback: 0.48 },
    tick: { word: "tick", fallback: 0.72 },
    tickAgain: { word: "tick", nth: 1, fallback: 0.82 },
    tickLast: { word: "tick", nth: 2, fallback: 0.92 },
  },
  snap: {
    flash: { word: "snap", edge: "end", fallback: 0.06 },
    mode: { word: "boyfriend", fallback: 0.19 },
    lift: { word: "sticker", fallback: 0.56 },
    note: { word: "tuna", fallback: 0.82 },
  },
  share: {
    live: { word: "share", edge: "end", fallback: 0.05 },
    thandi: { word: "rolls", fallback: 0.29 },
    sipho: { word: "charcoal", fallback: 0.57 },
    me: { word: "drinks", fallback: 0.91 },
  },
  scan: {
    fan: { word: "every", fallback: 0.2 },
    badge: { word: "loyalty", fallback: 0.27 },
    bright: { word: "no", fallback: 0.66 },
  },
  outro: {
    sorted: { word: "shopping", fallback: 0.05 },
    coming: { word: "coming", fallback: 0.45 },
    badges: { word: "app", fallback: 0.7 },
  },
} as const satisfies Record<SceneId, Record<string, Anchor>>;

/** Frames after the rice lifts before the BUY stamp slams on. */
export const STAMP_DELAY = 12;

const plain = (text: string) => text.toLowerCase().replace(/[^a-z0-9+]/g, "");

/** Frame within the scene at an anchor. */
export function cue(s: Scene, a: Anchor) {
  const word = s.words.filter((w) => plain(w.text) === a.word)[a.nth ?? 0];
  const seconds = word ? (a.edge === "end" ? word.end : word.start) : (a.fallback * s.voiceFrames) / FPS;
  return s.voiceAt + Math.round(seconds * FPS);
}

export const SCENES = build();
export const TOTAL = SCENES.reduce((t, s) => t + s.duration, 0);
export const scene = (id: SceneId) => SCENES.find((s) => s.id === id)!;
