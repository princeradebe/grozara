"use client";

import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

// Layer 1 keeps fireflies out of ContactShadows' depth pass (its camera only sees layer 0).
export const FX_LAYER = 1;

// Seeded (mulberry32) so the sky is the same on every visit and render stays pure.
function random(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const vertexShader = /* glsl */ `
  attribute vec4 aSeed;
  uniform float uTime;
  uniform float uSize;
  varying vec2 vUv;
  varying float vGlow;

  void main() {
    vec3 p = (instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
    float t = uTime * (0.18 + aSeed.x * 0.3) + aSeed.w * 6.2831;
    p += vec3(
      sin(t * 1.3 + aSeed.y * 4.0) * 0.45,
      sin(t * 0.9 + aSeed.z * 5.0) * 0.3 + sin(uTime * 0.15 + aSeed.w * 6.2831) * 0.35,
      cos(t * 1.1 + aSeed.x * 3.0) * 0.3
    );
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vGlow = 0.35 + 0.65 * pow(0.5 + 0.5 * sin(uTime * (1.2 + aSeed.y * 2.2) + aSeed.w * 20.0), 3.0);
    mv.xy += position.xy * uSize * (0.55 + aSeed.z * 0.9);
    vUv = uv;
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  varying vec2 vUv;
  varying float vGlow;

  void main() {
    float d = length(vUv - 0.5) * 2.0;
    float halo = pow(max(1.0 - d, 0.0), 2.2);
    float core = smoothstep(0.28, 0.0, d);
    vec3 color = mix(uColor, vec3(1.0, 1.0, 0.85), core * 0.7);
    gl_FragColor = vec4(color, (halo * 0.7 + core) * vGlow);
  }
`;

export function Fireflies({ count, animate = true }: { count: number; animate?: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null);

  const { geometry, material } = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(1, 1);
    const rand = random(7);
    const seeds = new Float32Array(count * 4);
    for (let i = 0; i < seeds.length; i++) seeds[i] = rand();
    geometry.setAttribute("aSeed", new THREE.InstancedBufferAttribute(seeds, 4));
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 0.16 },
        uColor: { value: new THREE.Color("#C6F27A") },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    return { geometry, material };
  }, [count]);

  useLayoutEffect(() => {
    const m = mesh.current;
    if (!m) return;
    const rand = random(11);
    const o = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      // Spread through the night, deeper ones further back so they parallax against Zara.
      const z = -9 + rand() * 10;
      const spread = 1 + (1 - z) * 0.1;
      o.position.set((rand() * 2 - 1) * 9 * spread, (rand() * 2 - 1) * 4.5 * spread, z);
      o.updateMatrix();
      m.setMatrixAt(i, o.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
    m.layers.set(FX_LAYER);
  }, [count]);

  useFrame((state) => {
    const m = mesh.current;
    if (animate && m) (m.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.elapsedTime;
  });

  return <instancedMesh ref={mesh} args={[geometry, material, count]} frustumCulled={false} />;
}
