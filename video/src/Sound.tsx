import { Audio, interpolate, Sequence, staticFile } from "remotion";

import manifest from "./sound.json";
import { type Anchor, CUES, cue, scene, SCENES, STAMP_DELAY, TOTAL, type SceneId } from "./timeline";

type Effect = "whoosh" | "slam" | "drop" | "pop" | "tick" | "shutter" | "stamp" | "ding" | "cards" | "beep";

const SFX = manifest.sfx as Partial<Record<Effect, string>>;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const at = (id: SceneId, anchor: Anchor, offset = 0) => {
  const s = scene(id);
  return s.from + cue(s, anchor) + offset;
};

/** Every effect as [effect, frame, volume], on the same cues the pictures use. */
const HITS: [Effect, number, number][] = [
  ...SCENES.slice(1).map((s): [Effect, number, number] => ["whoosh", s.from - 2, 0.55]),
  ...SCENES.filter((s) => s.id !== "outro").map((s): [Effect, number, number] => ["slam", s.from + s.voiceAt + 2, 0.7]),
  ["drop", 11, 0.8],
  ["pop", at("hello", CUES.hello.logo), 0.6],
  ["whoosh", at("hello", CUES.hello.list, -3), 0.45],
  ["cards", at("hello", CUES.hello.cards), 0.6],
  ["tick", at("list", CUES.list.tick), 0.8],
  ["tick", at("list", CUES.list.tickAgain), 0.7],
  ["tick", at("list", CUES.list.pick), 0.7],
  ["tick", at("list", CUES.list.pickAgain), 0.7],
  ["shutter", at("snap", CUES.snap.flash), 0.9],
  ["pop", at("snap", CUES.snap.lift), 0.6],
  ["stamp", at("snap", CUES.snap.lift, STAMP_DELAY + 2), 0.9],
  ["pop", at("snap", CUES.snap.note), 0.6],
  ["ding", at("share", CUES.share.thandi), 0.6],
  ["ding", at("share", CUES.share.sipho), 0.5],
  ["pop", at("share", CUES.share.live), 0.6],
  ["cards", at("scan", CUES.scan.fan), 0.7],
  ["pop", at("scan", CUES.scan.badge), 0.6],
  ["beep", at("scan", CUES.scan.bright), 0.7],
  ["slam", at("outro", CUES.outro.sorted, 3), 0.6],
  ["pop", at("outro", CUES.outro.coming), 0.5],
  ["pop", at("outro", CUES.outro.badges), 0.5],
];

const VOICE = SCENES.map((s) => [s.from + s.voiceAt, s.from + s.voiceAt + s.voiceFrames] as const);

/** The music sits back under the voice and comes up between them, fading in and out at the ends. */
function musicVolume(frame: number) {
  const gap = Math.min(...VOICE.map(([a, b]) => (frame < a ? a - frame : frame > b ? frame - b : 0)));
  const duck = interpolate(gap, [0, 8], [0.22, 0.55], clamp);
  return duck * interpolate(frame, [0, 8, TOTAL - 24, TOTAL], [0, 1, 1, 0], clamp);
}

/** The whole mix: voice, music bed and effects. Missing music or effects are simply skipped. */
export function Sound() {
  return (
    <>
      {SCENES.map((s) => (
        <Sequence key={`vo-${s.id}`} from={s.from + s.voiceAt} name={`vo ${s.id}`}>
          <Audio src={staticFile(s.file)} />
        </Sequence>
      ))}
      {manifest.music ? <Audio src={staticFile(manifest.music)} volume={musicVolume} /> : null}
      {HITS.map(([effect, frame, volume], i) =>
        SFX[effect] ? (
          <Sequence key={i} from={frame} name={`sfx ${effect}`} durationInFrames={60}>
            <Audio src={staticFile(SFX[effect])} volume={volume} />
          </Sequence>
        ) : null,
      )}
    </>
  );
}
