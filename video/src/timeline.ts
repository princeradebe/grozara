import { LINES } from "./script";
import voice from "./voice.json";

export const FPS = 30;
export const TARGET = 30 * FPS;
/** Frames the next band spends pushing up over the last one. */
export const PUSH = 16;

export type SceneId = "hello" | "list" | "snap" | "share" | "scan" | "outro";

/** Frames before each line starts (the verb lands first) and the minimum after it ends. */
const PAD: Record<SceneId, [lead: number, tail: number]> = {
  hello: [10, 8],
  list: [14, 8],
  snap: [14, 8],
  share: [14, 8],
  scan: [14, 8],
  outro: [14, 36],
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
};

function build(): Scene[] {
  const lines = new Map(voice.lines.map((l) => [l.id, l]));
  const base = ORDER.map((id) => {
    const line = lines.get(id);
    if (!line) throw new Error(`voice.json has no "${id}" line; run pnpm voice`);
    const voiceFrames = Math.ceil(line.seconds * FPS);
    return { id, voiceFrames, file: line.file, lead: PAD[id][0], tail: PAD[id][1] };
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
    };
    from += duration;
    return scene;
  });
}

const TEXT = Object.fromEntries(LINES.map((l) => [l.id, l.text])) as Record<SceneId, string>;

/**
 * When things happen inside each scene, as a fraction of its voice line: the pictures land on the
 * words that describe them, and the sound effects fire on the same frames.
 */
export const CUES = {
  hello: { name: 0.3, logo: 0.66 },
  list: { tick: 0.3, toast: 0.6 },
  snap: { flash: 0.13, lift: 0.42, note: 0.7 },
  share: { thandi: 0.3, sipho: 0.5, live: 0.78 },
  scan: { fan: 0.2, badge: 0.4, bright: 0.62 },
  outro: { sorted: 0.18, lekker: 0.4, badges: 0.55 },
} as const satisfies Record<SceneId, Record<string, number>>;

/** Frames after the rice lifts before the BUY stamp slams on. */
export const STAMP_DELAY = 12;

/** Frame within the scene at a fraction of its voice line. */
export const cue = (s: Scene, t: number) => s.voiceAt + Math.round(s.voiceFrames * t);

export const SCENES = build();
export const TOTAL = SCENES.reduce((t, s) => t + s.duration, 0);
export const scene = (id: SceneId) => SCENES.find((s) => s.id === id)!;
