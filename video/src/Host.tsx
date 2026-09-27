import { useAudioData, visualizeAudio } from "@remotion/media-utils";
import { interpolate, staticFile, useCurrentFrame } from "remotion";

import { bob, lerp, ramp, wobble } from "./anim";
import { CUES, cue, FPS, PUSH, SCENES, type Scene, type SceneId } from "./timeline";
import { Zara, type ZaraPose } from "./Zara";

/** Where Zara stands in each scene: her base point and size. */
const SPOT: Record<SceneId, { x: number; y: number; size: number; look: [number, number] }> = {
  hello: { x: 540, y: 1700, size: 600, look: [0, 0.15] },
  list: { x: 215, y: 1800, size: 320, look: [0.85, -0.55] },
  snap: { x: 865, y: 1800, size: 320, look: [-0.85, -0.6] },
  share: { x: 215, y: 1800, size: 320, look: [0.85, -0.5] },
  scan: { x: 865, y: 1800, size: 320, look: [-0.85, -0.6] },
  outro: { x: 540, y: 1810, size: 440, look: [0, 0.1] },
};

/** How loud the voice is right now, 0..1, from the line that's playing. */
function useVoiceLevel(frame: number) {
  const data = SCENES.map((s) => useAudioData(staticFile(s.file)));
  const i = SCENES.findIndex((s) => frame >= s.from + s.voiceAt && frame < s.from + s.voiceAt + s.voiceFrames);
  const audio = i >= 0 ? data[i] : null;
  if (!audio) return 0;
  const at = frame - (SCENES[i].from + SCENES[i].voiceAt);
  const level = (f: number) => {
    const bins = visualizeAudio({ fps: FPS, frame: Math.max(0, f), audioData: audio, numberOfSamples: 32 });
    return bins.slice(0, 12).reduce((t, v) => t + v, 0) / 12;
  };
  // A two-frame max keeps the jaw from chattering on every sample.
  return Math.min(1, Math.max(level(at), level(at - 1)) * 5);
}

function armsFor(s: Scene, local: number, frame: number): [number, number] | undefined {
  const talking = local >= s.voiceAt && local < s.voiceAt + s.voiceFrames;
  const wave = 138 + Math.sin(frame * 0.45) * 20;
  switch (s.id) {
    case "hello":
      return talking && local < s.voiceAt + s.voiceFrames * 0.5 ? [22, wave] : [22, 30];
    case "list":
      return local > cue(s, CUES.list.tick) ? [22, 96] : [22, 26];
    case "snap": {
      const lifted = local > cue(s, CUES.snap.lift);
      return lifted ? [70, 70] : [22, 22];
    }
    case "share":
      return talking ? [wave, 26] : [24, 24];
    case "scan":
      return [22, 22];
    case "outro":
      return local > cue(s, CUES.outro.lekker) ? [150 + Math.sin(frame * 0.4) * 10, 150 - Math.sin(frame * 0.4) * 10] : [26, 26];
  }
}

/** Zara, above every band, hopping to her spot as each new band pushes in. */
export function Host() {
  const frame = useCurrentFrame();
  const mouth = useVoiceLevel(frame);

  let index = SCENES.findIndex((s, i) => frame >= s.from && (i === SCENES.length - 1 || frame < SCENES[i + 1].from));
  if (index < 0) index = 0;
  const s = SCENES[index];
  const local = frame - s.from;
  const to = SPOT[s.id];
  const from = index > 0 ? SPOT[SCENES[index - 1].id] : { ...to, y: 260 };

  // The hop: a quick arc to the new spot, landing on the band's push.
  // The opening drop is short: the first half-second decides whether anyone keeps watching.
  const hopFrames = index === 0 ? 12 : PUSH;
  const t = ramp(local, 0, hopFrames);
  const arc = index === 0 ? 0 : Math.sin(t * Math.PI) * 300;
  const x = lerp(from.x, to.x, t);
  const y = lerp(from.y, to.y, index === 0 ? t * t : t) - arc;
  const size = lerp(from.size, to.size, t);
  const landed = local >= hopFrames;

  const flash = s.id === "snap" ? cue(s, CUES.snap.flash) : -99;
  const blinking = (frame % 83 < 3 && landed) || (local >= flash && local < flash + 6);

  const pose: ZaraPose = {
    squash: landed ? wobble(local, hopFrames, 0.7, 0.14) * 0.16 + bob(frame, 26) * 0.015 + (blinking && local >= flash ? 0.06 : 0) : -0.08 * Math.sin(t * Math.PI),
    tilt: bob(frame, 54) * 3 + (landed ? 0 : (to.x - from.x > 0 ? 1 : -1) * 12 * Math.sin(t * Math.PI)),
    look: [interpolate(t, [0, 1], [from.look[0], to.look[0]]), interpolate(t, [0, 1], [from.look[1], to.look[1]])],
    blink: blinking ? 1 : 0,
    mouth,
    handle: wobble(local, hopFrames, 0.5, 0.08) * 16 + bob(frame, 40) * 3,
    arms: landed ? armsFor(s, local, frame) : [60, 60],
    cheeks: s.id === "outro" ? 1.4 : 1,
  };

  // On "Lekker!" she crouches, jumps and lands with a squash.
  const lekkerAt = s.id === "outro" ? cue(s, CUES.outro.lekker) - 4 : -99;
  const air = local - lekkerAt;
  const jump = air >= 0 && air < 20 ? Math.sin((air / 20) * Math.PI) : 0;
  if (air >= -5 && air < 0) pose.squash = (pose.squash ?? 0) + 0.12 * ((air + 5) / 5);
  if (air >= 20) pose.squash = (pose.squash ?? 0) + wobble(air, 20, 0.8, 0.16) * 0.14;
  const lift = jump * 260;

  const k = size / 400;
  return (
    <div className="absolute" style={{ left: x - 200 * k, top: y - 418 * k - lift }}>
      <Zara size={size} pose={pose} />
    </div>
  );
}
