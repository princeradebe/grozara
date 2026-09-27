"use client";

import { Outlines } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
  RigidBody,
  RoundCuboidCollider,
  useBeforePhysicsStep,
  useRapier,
  type CollisionEnterPayload,
  type RapierRigidBody,
} from "@react-three/rapier";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import { GRAVITY, pointer, type Stage } from "./stage";
import {
  BODY,
  HALF,
  OUTLINE,
  createBodyGeometry,
  createHandleGeometry,
  createTongueGeometry,
  surfaceSpot,
} from "./zaraGeometry";

const FOREST = "#183631";
const EYE = { x: 0.175, y: 0.12, rx: 0.102, ry: 0.122, rz: 0.04 };
const PUPIL = 0.057;
const MOUTH = { y: -0.14, rx: 0.13, ry: 0.13 };
const ARM = { x: 0.47, y: -0.1, rest: 0.6, radius: 0.055, length: 0.13 };

type Rig = {
  root: THREE.Group | null;
  deform: THREE.Group | null;
  hit: THREE.Mesh | null;
  eyes: (THREE.Group | null)[];
  pupils: (THREE.Group | null)[];
  mouth: THREE.Group | null;
  handle: THREE.Group | null;
  arms: (THREE.Group | null)[];
};

const emptyRig = (): Rig => ({
  root: null,
  deform: null,
  hit: null,
  eyes: [null, null],
  pupils: [null, null],
  mouth: null,
  handle: null,
  arms: [null, null],
});

// ---------------------------------------------------------------------------------------------
// The figure: geometry and materials only. Everything that moves is driven through `rigRef`.

function ZaraFigure({ rigRef }: { rigRef: RefObject<Rig> }) {
  const parts = useMemo(() => {
    const body = createBodyGeometry();
    return {
      body,
      handle: createHandleGeometry(),
      tongue: createTongueGeometry(MOUTH.rx, MOUTH.ry),
      eyes: [surfaceSpot(body, -EYE.x, EYE.y), surfaceSpot(body, EYE.x, EYE.y)],
      cheeks: [surfaceSpot(body, -0.3, -0.08, 0.004), surfaceSpot(body, 0.3, -0.08, 0.004)],
      mouth: surfaceSpot(body, 0, MOUTH.y, 0.003),
      dot: surfaceSpot(body, -0.28, 0.29),
    };
  }, []);

  return (
    <group ref={(el) => void (rigRef.current.root = el)}>
      {/* Cheap proxy for grab and hover hit-tests, instead of raycasting 20k triangles. */}
      <mesh ref={(el) => void (rigRef.current.hit = el)} position={[0, 0.1, 0]} visible={false}>
        <boxGeometry args={[HALF.x * 2, HALF.y * 2 + 0.2, HALF.z * 2]} />
      </mesh>

      <group ref={(el) => void (rigRef.current.deform = el)} matrixAutoUpdate={false}>
        <mesh geometry={parts.body}>
          <meshPhysicalMaterial
            vertexColors
            roughness={0.36}
            clearcoat={1}
            clearcoatRoughness={0.14}
            sheen={0.5}
            sheenRoughness={0.5}
            sheenColor="#E8FFC8"
          />
          <Outlines screenspace thickness={OUTLINE} color="white" toneMapped={false} />
        </mesh>

        <group ref={(el) => void (rigRef.current.handle = el)} position={[0, BODY.h / 2, 0]}>
          <mesh geometry={parts.handle}>
            <meshPhysicalMaterial color={FOREST} roughness={0.45} clearcoat={0.6} clearcoatRoughness={0.3} />
            <Outlines screenspace thickness={0.03} color="white" toneMapped={false} />
          </mesh>
        </group>

        {parts.eyes.map((spot, i) => (
          <group key={i} position={spot.position} quaternion={spot.quaternion}>
            <group ref={(el) => void (rigRef.current.eyes[i] = el)}>
              <mesh scale={[EYE.rx, EYE.ry, EYE.rz]}>
                <sphereGeometry args={[1, 32, 20]} />
                <meshPhysicalMaterial color="white" roughness={0.2} clearcoat={1} clearcoatRoughness={0.1} />
              </mesh>
              <group ref={(el) => void (rigRef.current.pupils[i] = el)} position={[0, -0.01, EYE.rz * 0.8]}>
                <mesh scale={[PUPIL, PUPIL, 0.022]}>
                  <sphereGeometry args={[1, 24, 16]} />
                  <meshPhysicalMaterial color={FOREST} roughness={0.15} clearcoat={1} clearcoatRoughness={0.05} />
                </mesh>
                <mesh position={[-0.018, 0.021, 0.023]}>
                  <circleGeometry args={[0.017, 16]} />
                  <meshBasicMaterial color="white" toneMapped={false} />
                </mesh>
              </group>
            </group>
          </group>
        ))}

        {parts.cheeks.map((spot, i) => (
          <mesh key={i} position={spot.position} quaternion={spot.quaternion} scale={[0.072, 0.038, 1]}>
            <circleGeometry args={[1, 32]} />
            <meshBasicMaterial color="#FF8FA3" transparent opacity={0.55} depthWrite={false} />
          </mesh>
        ))}

        <group position={parts.mouth.position} quaternion={parts.mouth.quaternion}>
          <group ref={(el) => void (rigRef.current.mouth = el)} scale={[0.62, 0.42, 1]}>
            <mesh scale={[MOUTH.rx, MOUTH.ry, 1]}>
              <circleGeometry args={[1, 40]} />
              <meshStandardMaterial color={FOREST} roughness={0.6} polygonOffset polygonOffsetFactor={-1} />
            </mesh>
            <mesh geometry={parts.tongue} position={[0, 0, 0.001]}>
              <meshStandardMaterial color="#FF6B5B" roughness={0.5} polygonOffset polygonOffsetFactor={-2} />
            </mesh>
          </group>
        </group>

        <group position={parts.dot.position} quaternion={parts.dot.quaternion}>
          <mesh scale={[0.054, 0.054, 0.014]}>
            <sphereGeometry args={[1, 24, 12]} />
            <meshStandardMaterial color="white" roughness={0.3} />
          </mesh>
          <mesh scale={[0.037, 0.037, 0.02]}>
            <sphereGeometry args={[1, 24, 12]} />
            <meshPhysicalMaterial color="#FFB902" roughness={0.25} clearcoat={1} />
          </mesh>
        </group>

        {[-1, 1].map((side, i) => (
          <group
            key={side}
            ref={(el) => void (rigRef.current.arms[i] = el)}
            position={[side * ARM.x, ARM.y, 0.02]}
            rotation={[0, 0, side * ARM.rest]}
          >
            <mesh position={[0, -(ARM.length / 2 + ARM.radius) + 0.03, 0]}>
              <capsuleGeometry args={[ARM.radius, ARM.length, 6, 12]} />
              <meshPhysicalMaterial color="#7EC340" roughness={0.4} clearcoat={0.8} clearcoatRoughness={0.2} />
              <Outlines screenspace thickness={0.026} color="white" toneMapped={false} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

// ---------------------------------------------------------------------------------------------
// Reduced motion: a friendly, still pose standing on the island. No simulation.

export function StaticZara({ stage }: { stage: Stage }) {
  const rig = useRef<Rig>(emptyRig());
  return (
    <group position={[stage.island.x, stage.island.y + HALF.y, 0]}>
      <ZaraFigure rigRef={rig} />
    </group>
  );
}

// ---------------------------------------------------------------------------------------------
// The live Zara: a Rapier body you can grab and throw, plus springs for everything soft.

type Sim = ReturnType<typeof createSim>;
type SimBox = { make: typeof createSim; sim: Sim };

function createSim() {
  const SAMPLES = 8;
  return {
    dragging: false,
    pointerId: -1,
    grabOffset: new THREE.Vector3(),
    dragPos: new THREE.Vector3(),
    dragAngle: 0,
    dragVel: new THREE.Vector3(),
    sampleX: new Float32Array(SAMPLES),
    sampleY: new Float32Array(SAMPLES),
    sampleT: new Float64Array(SAMPLES),
    sampleHead: 0,
    sampleCount: 0,

    preStepVel: new THREE.Vector3(),
    vel: new THREE.Vector3(),
    prevVel: new THREE.Vector3(),
    acc: new THREE.Vector3(),
    contacts: 0,
    anchor: new THREE.Vector2(),
    stillFor: 0,
    quietFor: 0,
    homing: false,
    landing: false,

    impactAxis: new THREE.Vector3(0, -1, 0),
    squash: 0,
    squashVel: 0,
    stretch: 0,
    handle: 0,
    handleVel: 0,
    arms: [-ARM.rest, ARM.rest],
    armsVel: [0, 0],
    pupil: [new THREE.Vector2(), new THREE.Vector2()],
    pupilVel: [new THREE.Vector2(), new THREE.Vector2()],
    blinkIn: 1.2,
    blinkT: -1,
    doubleBlink: false,
    excite: 0,
    hovering: false,
  };
}

// Fast Refresh keeps refs across edits, so state built by an older createSim() can outlive it and
// crash every physics step. Rebuild it whenever it wasn't made by this module's createSim.
function simFrom(ref: RefObject<SimBox | null>) {
  if (ref.current?.make !== createSim) ref.current = { make: createSim, sim: createSim() };
  return ref.current.sim;
}

const tmp = {
  v: new THREE.Vector3(),
  v2: new THREE.Vector3(),
  q: new THREE.Quaternion(),
  qInv: new THREE.Quaternion(),
  m: new THREE.Matrix4(),
  ma: new THREE.Matrix4(),
  mb: new THREE.Matrix4(),
  ray: new THREE.Raycaster(),
  plane: new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
  gazePlane: new THREE.Plane(new THREE.Vector3(0, 0, 1), -2.5),
  hit: new THREE.Vector3(),
  ndc: new THREE.Vector2(),
  gaze: new THREE.Vector3(),
};

// Volume-preserving scale by `s` along unit axis `a`: p·I + (s − p)·aaᵀ with p = 1/√s.
function axisScale(out: THREE.Matrix4, a: THREE.Vector3, s: number) {
  const p = 1 / Math.sqrt(s);
  const k = s - p;
  return out.set(
    p + k * a.x * a.x, k * a.x * a.y, k * a.x * a.z, 0,
    k * a.y * a.x, p + k * a.y * a.y, k * a.y * a.z, 0,
    k * a.z * a.x, k * a.z * a.y, p + k * a.z * a.z, 0,
    0, 0, 0, 1,
  );
}

function spring(x: number, v: number, target: number, k: number, c: number, dt: number): [number, number] {
  const nv = v + (-k * (x - target) - c * v) * dt;
  return [x + nv * dt, nv];
}

export function Zara({ stage }: { stage: Stage }) {
  const body = useRef<RapierRigidBody>(null);
  const rig = useRef<Rig>(emptyRig());
  const simRef = useRef<SimBox | null>(null);
  const { rapier } = useRapier();
  const gl = useThree((s) => s.gl);
  const camera = useThree((s) => s.camera);
  const stageRef = useRef(stage);
  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  // Only the first stage decides where she drops in.
  const [spawn] = useState<[number, number, number]>(() => [stage.island.x, stage.top + HALF.y + 0.3, 0]);

  // Grab, release, hover and the touch-scroll guard, all on the canvas element.
  useEffect(() => {
    const el = gl.domElement;

    const hitsZara = (clientX: number, clientY: number) => {
      const r = el.getBoundingClientRect();
      tmp.ndc.set(((clientX - r.left) / r.width) * 2 - 1, -((clientY - r.top) / r.height) * 2 + 1);
      tmp.ray.setFromCamera(tmp.ndc, camera);
      const hit = rig.current.hit;
      return hit ? tmp.ray.intersectObject(hit, false).length > 0 : false;
    };

    const onDown = (e: PointerEvent) => {
      const sim = simFrom(simRef);
      const rb = body.current;
      if (!rb || !hitsZara(e.clientX, e.clientY)) return;
      e.preventDefault();
      el.setPointerCapture(e.pointerId);
      sim.dragging = true;
      sim.homing = false;
      sim.landing = false;
      sim.pointerId = e.pointerId;
      const t = rb.translation();
      tmp.ray.ray.intersectPlane(tmp.plane, tmp.hit);
      sim.grabOffset.set(tmp.hit.x - t.x, tmp.hit.y - t.y, 0);
      sim.dragPos.set(t.x, t.y, 0);
      const r = rb.rotation();
      sim.dragAngle = 2 * Math.atan2(r.z, r.w);
      sim.sampleCount = 0;
      sim.dragVel.set(0, 0, 0);
      rb.setBodyType(rapier.RigidBodyType.KinematicPositionBased, true);
      el.style.cursor = "grabbing";
      document.documentElement.dataset.zaraGrabbed = "";
    };

    const onUp = (e: PointerEvent) => {
      const sim = simFrom(simRef);
      if (!sim.dragging || e.pointerId !== sim.pointerId) return;
      sim.dragging = false;
      const rb = body.current;
      if (!rb) return;
      // Release velocity from the last ~100 ms of pointer samples, not the last frame alone.
      const n = sim.sampleCount;
      const size = sim.sampleT.length;
      const newest = (sim.sampleHead - 1 + size) % size;
      let oldest = newest;
      for (let i = 1; i < n; i++) {
        const idx = (newest - i + size) % size;
        if (sim.sampleT[newest] - sim.sampleT[idx] > 100) break;
        oldest = idx;
      }
      const dt = (sim.sampleT[newest] - sim.sampleT[oldest]) / 1000;
      const v = tmp.v.set(0, 0, 0);
      if (n > 1 && dt > 0.001) {
        v.set((sim.sampleX[newest] - sim.sampleX[oldest]) / dt, (sim.sampleY[newest] - sim.sampleY[oldest]) / dt, 0);
      }
      v.clampLength(0, 22);
      rb.setBodyType(rapier.RigidBodyType.Dynamic, true);
      rb.setLinvel({ x: v.x, y: v.y, z: 0 }, true);
      rb.setAngvel({ x: 0, y: 0, z: THREE.MathUtils.clamp(-v.x * 0.6 + sim.grabOffset.x * v.y * 0.8, -12, 12) }, true);
      el.style.cursor = sim.hovering ? "grab" : "";
    };

    // With touch-action: pan-y the page can still scroll, so cancel the gesture only when the
    // finger lands on Zara. Our own hit-test, so it doesn't depend on pointer/touch event order.
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t && hitsZara(t.clientX, t.clientY)) e.preventDefault();
    };

    const onMove = (e: PointerEvent) => {
      const sim = simFrom(simRef);
      if (e.pointerType !== "mouse" || sim.dragging) return;
      const over = hitsZara(e.clientX, e.clientY);
      if (over !== sim.hovering) {
        sim.hovering = over;
        el.style.cursor = over ? "grab" : "";
      }
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("touchstart", onTouchStart, { passive: false });
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("touchstart", onTouchStart);
    };
  }, [gl, camera, rapier]);

  useBeforePhysicsStep((world) => {
    const rb = body.current;
    const sim = simFrom(simRef);
    if (!rb) return;
    const dt = world.timestep;
    const s = stageRef.current;

    if (sim.dragging) {
      tmp.ray.setFromCamera(pointer.ndc, camera);
      if (tmp.ray.ray.intersectPlane(tmp.plane, tmp.hit)) {
        const tx = THREE.MathUtils.clamp(tmp.hit.x - sim.grabOffset.x, s.left + HALF.x, s.right - HALF.x);
        const ty = THREE.MathUtils.clamp(tmp.hit.y - sim.grabOffset.y, s.bottom + HALF.y, s.top + 1.5);
        const px = sim.dragPos.x;
        const py = sim.dragPos.y;
        sim.dragPos.x += (tx - sim.dragPos.x) * 0.6;
        sim.dragPos.y += (ty - sim.dragPos.y) * 0.6;
        sim.dragVel.set((sim.dragPos.x - px) / dt, (sim.dragPos.y - py) / dt, 0);

        const size = sim.sampleT.length;
        sim.sampleX[sim.sampleHead] = sim.dragPos.x;
        sim.sampleY[sim.sampleHead] = sim.dragPos.y;
        sim.sampleT[sim.sampleHead] = performance.now();
        sim.sampleHead = (sim.sampleHead + 1) % size;
        sim.sampleCount = Math.min(sim.sampleCount + 1, size);
      }
      // Dangle: swing against the direction of travel, like holding a bag by its corner.
      const swing = THREE.MathUtils.clamp(-sim.dragVel.x * 0.045, -0.6, 0.6);
      sim.dragAngle += (swing - sim.dragAngle) * 0.15;
      rb.setNextKinematicTranslation({ x: sim.dragPos.x, y: sim.dragPos.y, z: 0 });
      rb.setNextKinematicRotation(tmp.q.setFromAxisAngle(tmp.v.set(0, 0, 1), sim.dragAngle));
      return;
    }

    const lv = rb.linvel();
    sim.preStepVel.set(lv.x, lv.y, lv.z);
    const t = rb.translation();
    const grounded = sim.contacts > 0;

    // Self-righting: a weak pull in the air, a firm one on the ground, so she lands and pops upright.
    const r = rb.rotation();
    let angle = 2 * Math.atan2(r.z, r.w);
    angle = Math.atan2(Math.sin(angle), Math.cos(angle));
    const w = rb.angvel().z;
    // (Off while a homing flip is in the air, so the flip lands where it was aimed.)
    const [k, c] = sim.landing ? [0, 0] : grounded ? [38, 7] : [3, 0.4];
    const alpha = THREE.MathUtils.clamp(-k * angle - c * w, -70, 70);
    rb.setAngvel({ x: 0, y: 0, z: w + alpha * dt }, true);

    // Fallen off the bottom (or outside the walls after a resize): drop back in over the island.
    if (t.y < s.bottom - HALF.y * 2 || t.x < s.left - 2 || t.x > s.right + 2) {
      rb.setTranslation({ x: s.island.x + (Math.random() - 0.5) * 0.4, y: s.top + HALF.y + 0.3, z: 0 }, true);
      rb.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
      rb.setLinvel({ x: 0, y: 0, z: 0 }, true);
      rb.setAngvel({ x: 0, y: 0, z: (Math.random() - 0.5) * 3 }, true);
      sim.homing = false;
      sim.landing = false;
      return;
    }

    // Settled somewhere that isn't the island (perched on its rim, or against a wall): hop home.
    // Two triggers: resting quietly, or not having moved for a while, which catches jittering.
    if (Math.hypot(t.x - sim.anchor.x, t.y - sim.anchor.y) > 0.25) {
      sim.anchor.set(t.x, t.y);
      sim.stillFor = 0;
    } else {
      sim.stillFor += dt;
    }
    sim.quietFor = grounded && Math.hypot(lv.x, lv.y) < 0.3 ? sim.quietFor + dt : 0;
    const onIsland = Math.abs(t.x - s.island.x) < s.island.radius + 0.15 && t.y > s.island.y;
    const g = -GRAVITY;
    if (!onIsland && !sim.homing && !sim.landing && (sim.stillFor > 1.3 || sim.quietFor > 0.6)) {
      sim.stillFor = 0;
      sim.quietFor = 0;
      // Up first, then over: a single arc from beside the island clips its rim.
      const apex = Math.max(s.island.y + HALF.y * 2 + 0.9, t.y + 1);
      rb.setLinvel({ x: 0, y: Math.sqrt(2 * g * (apex - t.y)), z: 0 }, true);
      rb.setAngvel({ x: 0, y: 0, z: 0 }, true);
      sim.homing = true;
    }

    // Mid-jump, once she's cleared the island top: steer to land on its centre, with one front
    // flip timed to finish upright on touchdown.
    if (sim.homing) {
      const land = s.island.y + HALF.y + 0.05;
      if (t.y > land + 0.1) {
        const tLeft = Math.max((lv.y + Math.sqrt(lv.y * lv.y + 2 * g * (t.y - land))) / g, 0.2);
        const vx = (s.island.x - t.x) / tLeft;
        const flip = -Math.sign(vx) || 1;
        rb.setLinvel({ x: vx, y: lv.y, z: 0 }, true);
        rb.setAngvel({ x: 0, y: 0, z: (flip * Math.PI * 2 - angle) / tLeft }, true);
        sim.homing = false;
        sim.landing = true;
      } else if (lv.y < 0) {
        sim.homing = false; // blocked on the way up; the checks above will try again
      }
    }

    // Stick the landing: bleed off the slide and the spin so she doesn't roll off the far side.
    if (sim.landing && grounded) {
      rb.setLinvel({ x: lv.x * 0.25, y: lv.y, z: 0 }, true);
      rb.setAngvel({ x: 0, y: 0, z: 0 }, true);
      sim.landing = false;
    }
  });

  const onCollisionEnter = (payload: CollisionEnterPayload) => {
    const sim = simFrom(simRef);
    sim.contacts++;
    if (sim.dragging) return;
    // Rapier reports after the solver ran, so use the velocity from before this step.
    const n = payload.manifold.normal();
    tmp.v2.set(n.x, n.y, n.z).normalize();
    const along = sim.preStepVel.dot(tmp.v2);
    const speed = Math.abs(along);
    if (speed < 0.8) return;
    sim.impactAxis.copy(tmp.v2).multiplyScalar(Math.sign(along) || 1);
    sim.squashVel += Math.min(speed, 16) * 0.55;
    if (speed > 3 && sim.blinkT < 0) sim.blinkT = 0;
  };

  const onCollisionExit = () => {
    const sim = simFrom(simRef);
    sim.contacts = Math.max(0, sim.contacts - 1);
  };

  useFrame((state, delta) => {
    const rb = body.current;
    const sim = simFrom(simRef);
    const r = rig.current;
    if (!rb || !r.deform) return;
    const dt = Math.min(delta, 1 / 30);
    const time = state.clock.elapsedTime;

    // Velocity and "proper" acceleration (what an accelerometer inside her would feel).
    sim.prevVel.copy(sim.vel);
    if (sim.dragging) sim.vel.copy(sim.dragVel);
    else {
      const lv = rb.linvel();
      sim.vel.set(lv.x, lv.y, 0);
    }
    const rot = rb.rotation();
    tmp.q.set(rot.x, rot.y, rot.z, rot.w);
    tmp.qInv.copy(tmp.q).invert();
    tmp.v.subVectors(sim.vel, sim.prevVel).divideScalar(Math.max(dt, 1e-3));
    tmp.v.y -= GRAVITY;
    tmp.v.applyQuaternion(tmp.qInv).clampLength(0, 90);
    sim.acc.lerp(tmp.v, 0.35);

    const speed = sim.vel.length();
    const grounded = sim.contacts > 0 && !sim.dragging;

    // Impact squash: an underdamped spring, so a hard landing wobbles like jelly.
    [sim.squash, sim.squashVel] = spring(sim.squash, sim.squashVel, 0, 260, 9, dt);
    sim.squash = THREE.MathUtils.clamp(sim.squash, -0.22, 0.38);

    // Stretch along the direction of travel.
    const stretchTarget = !grounded || speed > 4 ? Math.min(speed * 0.018, 0.24) : 0;
    sim.stretch += (stretchTarget - sim.stretch) * (1 - Math.exp(-dt * 14));

    const a = tmp.v2.copy(sim.impactAxis).applyQuaternion(tmp.qInv);
    axisScale(tmp.ma, a, 1 - sim.squash);
    const b = tmp.gaze.copy(sim.vel);
    if (b.lengthSq() > 1e-4) b.normalize().applyQuaternion(tmp.qInv);
    else b.set(0, 1, 0);
    axisScale(tmp.mb, b, 1 + sim.stretch);

    const breathe = Math.sin(time * 2.3) * 0.016 * (1 - sim.excite);
    tmp.m.makeScale(1 - breathe * 0.5, 1 + breathe, 1 - breathe * 0.5);
    tmp.m.premultiply(tmp.ma).premultiply(tmp.mb);
    // Keep the contact side planted while squashed, so she doesn't float off the ground.
    tmp.m.setPosition(a.x * HALF.y * sim.squash, a.y * HALF.y * sim.squash - breathe * 0.25, a.z * HALF.y * sim.squash);
    r.deform.matrix.copy(tmp.m);
    r.deform.matrixWorldNeedsUpdate = true;

    // Excitement: big "O" mouth and wide eyes when she's grabbed or flying.
    const exciteTarget = sim.dragging || (!grounded && speed > 2.5) ? 1 : 0;
    sim.excite += (exciteTarget - sim.excite) * (1 - Math.exp(-dt * (exciteTarget ? 10 : 3)));

    // Handle: a stiff inverted pendulum that lags behind acceleration.
    const handleTarget = THREE.MathUtils.clamp(sim.acc.x * 0.012, -0.5, 0.5);
    [sim.handle, sim.handleVel] = spring(sim.handle, sim.handleVel, handleTarget, 170, 5, dt);
    if (r.handle) r.handle.rotation.z = sim.handle;

    // Arms: hang when she's supported, float up in free fall, lag sideways.
    const lift = THREE.MathUtils.clamp((-GRAVITY - sim.acc.y) / -GRAVITY, -0.3, 1.4) * 0.8;
    const sway = THREE.MathUtils.clamp(-sim.acc.x * 0.018, -0.7, 0.7);
    for (let i = 0; i < 2; i++) {
      const side = i === 0 ? -1 : 1;
      const target = side * (ARM.rest + lift) + sway;
      [sim.arms[i], sim.armsVel[i]] = spring(sim.arms[i], sim.armsVel[i], target, 90, 6, dt);
      const arm = r.arms[i];
      if (arm) arm.rotation.z = sim.arms[i];
    }

    // Blinking: every few seconds, sometimes twice.
    let lid = 1;
    if (sim.blinkT >= 0) {
      sim.blinkT += dt;
      const d = 0.15;
      lid = 1 - Math.sin(Math.min(sim.blinkT / d, 1) * Math.PI) * 0.92;
      if (sim.blinkT >= d) {
        sim.blinkT = -1;
        if (sim.doubleBlink) {
          sim.doubleBlink = false;
          sim.blinkIn = 0.09;
        } else {
          sim.blinkIn = 2 + Math.random() * 3.5;
          sim.doubleBlink = Math.random() < 0.2;
        }
      }
    } else {
      sim.blinkIn -= dt;
      if (sim.blinkIn <= 0) sim.blinkT = 0;
    }

    // Gaze: the pointer (projected a little in front of her), or a slow wander when idle.
    const idle = performance.now() / 1000 - pointer.lastMove > 4 || (pointer.isTouch && !pointer.touching && !sim.dragging);
    if (idle) {
      tmp.hit.set(Math.sin(time * 0.37) * 1.6, Math.cos(time * 0.29) * 0.8 + 0.3, 2.5);
    } else {
      tmp.ray.setFromCamera(pointer.ndc, state.camera);
      tmp.ray.ray.intersectPlane(tmp.gazePlane, tmp.hit);
    }
    if (r.root) r.root.worldToLocal(tmp.hit);

    const eyeScale = 1 + sim.excite * 0.1;
    for (let i = 0; i < 2; i++) {
      const eye = r.eyes[i];
      const pupil = r.pupils[i];
      if (eye) eye.scale.set(eyeScale, eyeScale * lid, eyeScale);
      if (!pupil) continue;
      const ex = (i === 0 ? -1 : 1) * EYE.x;
      tmp.v.set(tmp.hit.x - ex, tmp.hit.y - EYE.y, tmp.hit.z).normalize();
      const maxX = EYE.rx - PUPIL * 0.92;
      const maxY = EYE.ry - PUPIL * 0.92;
      const tx = THREE.MathUtils.clamp(tmp.v.x * 1.8, -1, 1) * maxX;
      const ty = THREE.MathUtils.clamp(tmp.v.y * 1.8, -1, 1) * maxY;
      const p = sim.pupil[i];
      const pv = sim.pupilVel[i];
      pv.x += (-(p.x - tx) * 260 - pv.x * 16 - sim.acc.x * 0.12) * dt;
      pv.y += (-(p.y - ty) * 260 - pv.y * 16 - sim.acc.y * 0.12) * dt;
      p.addScaledVector(pv, dt);
      const e = (p.x / maxX) ** 2 + (p.y / maxY) ** 2;
      if (e > 1) p.divideScalar(Math.sqrt(e));
      const onSurface = Math.sqrt(Math.max(0, 1 - (p.x / EYE.rx) ** 2 - (p.y / EYE.ry) ** 2));
      pupil.position.set(p.x, p.y, EYE.rz * onSurface - 0.006);
    }

    if (r.mouth) {
      const e = sim.excite;
      r.mouth.scale.set(0.62 + 0.38 * e, 0.42 + 0.66 * e + sim.squash * 0.4, 1);
    }
  });

  return (
    <RigidBody
      ref={body}
      colliders={false}
      position={spawn}
      enabledRotations={[false, false, true]}
      enabledTranslations={[true, true, false]}
      canSleep={false}
      ccd
      linearDamping={0.08}
      angularDamping={0.5}
      onCollisionEnter={onCollisionEnter}
      onCollisionExit={onCollisionExit}
    >
      <RoundCuboidCollider args={[HALF.x - 0.24, HALF.y - 0.24, HALF.z - 0.24, 0.24]} restitution={0.32} friction={0.9} />
      <ZaraFigure rigRef={rig} />
    </RigidBody>
  );
}
