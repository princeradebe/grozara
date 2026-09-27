"use client";

import { ContactShadows } from "@react-three/drei";
import { CuboidCollider, CylinderCollider, RigidBody, useBeforePhysicsStep, type RapierRigidBody } from "@react-three/rapier";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { Stage } from "./stage";

// Cut-paper layers, cream on top tapering to forest underneath, like a stack of torn card.
const LAYERS = [
  { r: 1, depth: 0.1, color: "#F1EDDF", seed: 1 },
  { r: 0.86, depth: 0.16, color: "#2F6358", seed: 2 },
  { r: 0.66, depth: 0.18, color: "#24524A", seed: 3 },
  { r: 0.44, depth: 0.18, color: "#1C4540", seed: 4 },
  { r: 0.22, depth: 0.16, color: "#183631", seed: 5 },
];

// How far below the island's top surface each layer starts.
const LAYER_TOPS = LAYERS.map((_, i) => LAYERS.slice(0, i).reduce((sum, l) => sum + l.depth, 0));

// A little sideways shuffle per layer, so the stack looks hand-cut rather than turned.
const layerOffset = (seed: number, radius: number) => 0.03 * Math.sin(seed * 2.3) * radius;

function wobblyDisc(radius: number, depth: number, seed: number) {
  const shape = new THREE.Shape();
  const steps = 72;
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const wobble =
      1 + 0.035 * Math.sin(a * 3 + seed * 1.7) + 0.02 * Math.sin(a * 7 + seed * 3.1) + 0.012 * Math.sin(a * 13 + seed);
    const x = Math.cos(a) * radius * wobble;
    const y = Math.sin(a) * radius * wobble * 0.62;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  const bevel = Math.min(0.02, depth * 0.2);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: depth - bevel * 2,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 2,
    curveSegments: 4,
  });
  // Lay it flat with the top face at y = 0 and the depth going down.
  geo.translate(0, 0, bevel);
  geo.rotateX(Math.PI / 2);
  return geo;
}

function leafGeometry() {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.quadraticCurveTo(0.09, 0.14, 0, 0.34);
  s.quadraticCurveTo(-0.09, 0.14, 0, 0);
  return new THREE.ShapeGeometry(s, 8);
}

const SPRIGS = [
  { angle: 2.2, scale: 1.1, color: "#7EC340" },
  { angle: 2.45, scale: 0.8, color: "#4F8A2E" },
  { angle: 0.75, scale: 0.95, color: "#A5E063" },
  { angle: 1.0, scale: 0.7, color: "#4F8A2E" },
];

export function IslandModel({ radius }: { radius: number }) {
  const geos = useMemo(
    () =>
      LAYERS.map((layer, i) => {
        const geo = wobblyDisc(layer.r * radius, layer.depth, layer.seed);
        geo.translate(layerOffset(layer.seed, radius), -LAYER_TOPS[i], 0);
        return geo;
      }),
    [radius],
  );
  const leaf = useMemo(() => leafGeometry(), []);

  return (
    <group>
      {geos.map((geo, i) => (
        <mesh key={i} geometry={geo}>
          <meshStandardMaterial color={LAYERS[i].color} roughness={0.92} />
        </mesh>
      ))}
      {SPRIGS.map((sprig, i) => (
        <group
          key={i}
          position={[Math.cos(sprig.angle) * radius * 0.82, 0, -Math.sin(sprig.angle) * radius * 0.5]}
          scale={sprig.scale}
        >
          {[-0.45, 0, 0.5].map((tilt, j) => (
            <mesh key={j} geometry={leaf} rotation={[0, j * 0.6, tilt]}>
              <meshStandardMaterial color={sprig.color} roughness={0.85} side={THREE.DoubleSide} />
            </mesh>
          ))}
        </group>
      ))}
      <ContactShadows
        position={[0, 0.012, 0]}
        scale={[radius * 2.2, radius * 1.4]}
        far={1.4}
        blur={2.4}
        opacity={0.45}
        resolution={256}
        color="#0D211D"
      />
    </group>
  );
}

// The island bobs gently, so it's a kinematic body: Zara rides it instead of hovering.
export function Island({ stage }: { stage: Stage }) {
  const body = useRef<RapierRigidBody>(null);
  const clock = useRef(0);
  const { x, y, radius } = stage.island;

  useBeforePhysicsStep((world) => {
    clock.current += world.timestep;
    body.current?.setNextKinematicTranslation({ x, y: y + Math.sin(clock.current * 1.1) * 0.05, z: 0 });
  });

  return (
    <RigidBody ref={body} type="kinematicPosition" colliders={false} position={[x, y, 0]}>
      {/* One cylinder per paper layer, so the tapered underside is solid too. */}
      {LAYERS.map((layer, i) => (
        <CylinderCollider
          key={i}
          args={[layer.depth / 2, layer.r * radius * 0.97]}
          position={[layerOffset(layer.seed, radius), -LAYER_TOPS[i] - layer.depth / 2, 0]}
          friction={1}
        />
      ))}
      <IslandModel radius={radius} />
    </RigidBody>
  );
}

// Invisible walls at the screen's sides. No floor on purpose: fall off the bottom and she drops
// back in from the top, rather than getting stuck under the island or beside it.
export function Bounds({ stage }: { stage: Stage }) {
  const { left, right, bottom } = stage;
  return (
    <RigidBody type="fixed" colliders={false}>
      <CuboidCollider args={[0.5, 40, 2]} position={[left - 0.5, bottom + 39, 0]} />
      <CuboidCollider args={[0.5, 40, 2]} position={[right + 0.5, bottom + 39, 0]} />
    </RigidBody>
  );
}
