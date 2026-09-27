import type { Viewport } from "next";

import { Direction5 } from "@/components/directions/Direction5";

import "./directions/directions.css";

// Direction 5 (Lime pop) is the site. The 3D night garden lives at /3d and the other directions at /directions.
export const viewport: Viewport = {
  themeColor: "#7EC340",
};

export default function Home() {
  return (
    <main>
      <Direction5 />
    </main>
  );
}
