"use client";

import { Environment, Lightformer } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { FX_LAYER, Fireflies } from "./Fireflies";
import { Bounds, Island, IslandModel } from "./Island";
import { CAMERA, GRAVITY, computeStage, pointer } from "./stage";
import { StaticZara, Zara } from "./Zara";

export type ExperienceMode = "ready" | "static";

declare global {
  interface Window {
    __grozaraPerf?: { fps: number; avgMs: number; worstMs: number; calls: number; triangles: number; dpr: number };
  }
}

export default function Experience({ onReady }: { onReady: (mode: ExperienceMode) => void }) {
  const [env] = useState(() => ({
    reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    coarse: window.matchMedia("(pointer: coarse)").matches,
    showFps: process.env.NODE_ENV !== "production" || new URLSearchParams(window.location.search).has("fps"),
  }));

  return (
    <Canvas
      dpr={env.coarse ? [1, 1.5] : [1, 1.75]}
      camera={{ fov: CAMERA.fov, position: CAMERA.position, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance", toneMapping: THREE.NeutralToneMapping }}
      frameloop={env.reduced ? "demand" : "always"}
      onCreated={({ camera }) => camera.layers.enable(FX_LAYER)}
      // pan-y keeps the page scrollable on phones; Zara cancels the touch herself when grabbed.
      style={{ position: "absolute", inset: 0, touchAction: "pan-y" }}
      fallback={null}
    >
      <Scene reduced={env.reduced} coarse={env.coarse} onReady={onReady} />
      {env.showFps && <FpsMeter />}
    </Canvas>
  );
}

function Scene({
  reduced,
  coarse,
  onReady,
}: {
  reduced: boolean;
  coarse: boolean;
  onReady: (mode: ExperienceMode) => void;
}) {
  const width = useThree((s) => s.size.width);
  const height = useThree((s) => s.size.height);
  const stage = useMemo(() => computeStage(width / height), [width, height]);

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[-3, 5, 6]} intensity={1.3} />
      <directionalLight position={[3, 2, -5]} intensity={1.8} color="#A5E063" />
      <Environment resolution={128} frames={1}>
        <color attach="background" args={["#0D211D"]} />
        <Lightformer form="rect" intensity={3.2} position={[-2.5, 3, 4]} scale={[4, 2.5, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={1.1} position={[3.5, 0.5, 3]} scale={[2, 4, 1]} target={[0, 0, 0]} color="#F1EDDF" />
        <Lightformer form="rect" intensity={2.4} position={[0, 2, -5]} scale={[8, 3, 1]} target={[0, 0, 0]} color="#A5E063" />
        <Lightformer form="ring" intensity={1.4} position={[0, -4, 1]} scale={3} target={[0, 0, 0]} color="#24524A" />
      </Environment>

      <Fireflies count={coarse ? 60 : 120} animate={!reduced} />

      <Suspense fallback={null}>
        {reduced ? (
          <>
            <group position={[stage.island.x, stage.island.y, 0]}>
              <IslandModel radius={stage.island.radius} />
            </group>
            <StaticZara stage={stage} />
          </>
        ) : (
          // Rapier's WASM loads here, with the rest of the 3D chunk, never before.
          <Physics gravity={[0, GRAVITY, 0]} timeStep={1 / 60} interpolate>
            <Bounds stage={stage} />
            <Island stage={stage} />
            <Zara stage={stage} />
          </Physics>
        )}
        <Ready onReady={() => onReady(reduced ? "static" : "ready")} />
      </Suspense>

      <PointerTracker />
    </>
  );
}

// Fires after the first frame that includes the (suspended) physics world.
function Ready({ onReady }: { onReady: () => void }) {
  const done = useRef(false);
  useFrame(() => {
    if (done.current) return;
    done.current = true;
    onReady();
  });
  return null;
}

function PointerTracker() {
  useEffect(() => {
    const update = (e: PointerEvent) => {
      pointer.ndc.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
      pointer.lastMove = performance.now() / 1000;
      pointer.isTouch = e.pointerType === "touch";
    };
    const down = (e: PointerEvent) => {
      update(e);
      if (e.pointerType === "touch") pointer.touching = true;
    };
    const up = (e: PointerEvent) => {
      if (e.pointerType === "touch") pointer.touching = false;
    };
    window.addEventListener("pointermove", update, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    window.addEventListener("pointercancel", up, { passive: true });
    return () => {
      window.removeEventListener("pointermove", update);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, []);
  return null;
}

// Dev (or ?fps) overlay. Writes straight to a DOM node so measuring doesn't cost React renders.
function FpsMeter() {
  const gl = useThree((s) => s.gl);
  const el = useRef<HTMLDivElement | null>(null);
  const acc = useRef({ frames: 0, since: 0, last: 0, worst: 0 });

  useEffect(() => {
    const div = document.createElement("div");
    div.setAttribute("aria-hidden", "true");
    div.style.cssText =
      "position:fixed;right:8px;bottom:8px;z-index:50;font:600 11px/1.35 ui-monospace,monospace;color:#A5E063;" +
      "background:rgba(13,33,29,.88);padding:6px 8px;border-radius:8px;pointer-events:none;white-space:pre";
    document.body.appendChild(div);
    el.current = div;
    return () => div.remove();
  }, []);

  useFrame(() => {
    const a = acc.current;
    const now = performance.now();
    if (a.since === 0) {
      a.since = now;
      a.last = now;
      return;
    }
    a.worst = Math.max(a.worst, now - a.last);
    a.last = now;
    a.frames++;
    if (now - a.since < 500) return;
    const fps = (a.frames * 1000) / (now - a.since);
    const { calls, triangles } = gl.info.render;
    const dpr = gl.getPixelRatio();
    window.__grozaraPerf = { fps, avgMs: 1000 / fps, worstMs: a.worst, calls, triangles, dpr };
    if (el.current) {
      el.current.textContent =
        `${fps.toFixed(0)} fps · ${(1000 / fps).toFixed(1)} ms avg · ${a.worst.toFixed(1)} ms worst\n` +
        `${calls} draws · ${(triangles / 1000).toFixed(0)}k tris · dpr ${dpr.toFixed(2)}`;
    }
    a.frames = 0;
    a.since = now;
    a.worst = 0;
  });
  return null;
}
