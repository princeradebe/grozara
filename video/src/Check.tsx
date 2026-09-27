import { AbsoluteFill } from "remotion";

import { FONT_VARS } from "./fonts";
import { Zara, type ZaraPose } from "./Zara";

const POSES: [string, ZaraPose][] = [
  ["rest", {}],
  ["talk", { mouth: 0.7, look: [0.5, -0.2] }],
  ["wave", { mouth: 0.35, arms: [22, 150], tilt: -6, handle: 8 }],
  ["squash", { squash: 0.14, blink: 1, mouth: 0.1, cheeks: 1.4 }],
  ["stretch", { squash: -0.12, mouth: 1, look: [0, -1], arms: [150, 150] }],
  ["point", { look: [1, 0.2], arms: [22, 100], tilt: 4, mouth: 0.2 }],
];

/** Zara's pose sheet, for designing the character. */
export function Check() {
  return (
    <AbsoluteFill className="bg-lime" style={FONT_VARS}>
      <div className="grid grid-cols-2 gap-x-10 gap-y-16 p-20">
        {POSES.map(([name, pose]) => (
          <div key={name} className="flex flex-col items-center">
            <Zara size={360} pose={pose} />
            <p className="mt-6 font-display text-4xl text-forest">{name}</p>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
}
