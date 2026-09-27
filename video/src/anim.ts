import { Easing, interpolate, spring } from "remotion";

import { FPS } from "./timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** 0 → 1 with a little overshoot: things landing on the page. */
export const pop = (frame: number, at = 0, damping = 11) =>
  spring({ frame: frame - at, fps: FPS, config: { damping, stiffness: 170, mass: 0.7 } });

/** 0 → 1, firm and quick, no overshoot: giant type slamming in. */
export const slam = (frame: number, at = 0) =>
  spring({ frame: frame - at, fps: FPS, config: { damping: 18, stiffness: 260, mass: 0.6 } });

/** Plain eased ramp between two frames. */
export const ramp = (frame: number, from: number, to: number, ease = Easing.inOut(Easing.cubic)) =>
  interpolate(frame, [from, to], [0, 1], { ...clamp, easing: ease });

/** A decaying wobble after an impact, in the range -1..1. */
export const wobble = (frame: number, at: number, freq = 0.55, decay = 0.09) => {
  const t = frame - at;
  return t < 0 ? 0 : Math.sin(t * freq) * Math.exp(-t * decay);
};

/** Gentle idle bob, -1..1. */
export const bob = (frame: number, period = 42, phase = 0) => Math.sin(((frame + phase) / period) * Math.PI * 2);

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
