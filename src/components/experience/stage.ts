import * as THREE from "three";

export const CAMERA = {
  fov: 32,
  position: [0, 0.9, 10] as [number, number, number],
};

export const GRAVITY = -20;

// Written by window listeners, read inside useFrame. Never React state, so moving the mouse
// (and later, scrolling) doesn't re-render anything.
export const pointer = {
  ndc: new THREE.Vector2(0, 0),
  lastMove: -Infinity,
  isTouch: false,
  touching: false,
};

export type Stage = {
  portrait: boolean;
  // Visible bounds of the z = 0 plane, where Zara lives.
  left: number;
  right: number;
  bottom: number;
  top: number;
  island: { x: number; y: number; radius: number };
};

const planeZ0 = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

// Pure function of the aspect ratio so it can run in render without touching the live camera.
export function computeStage(aspect: number): Stage {
  const cam = new THREE.PerspectiveCamera(CAMERA.fov, aspect, 0.1, 100);
  cam.position.set(...CAMERA.position);
  cam.lookAt(0, 0, 0);
  cam.updateMatrixWorld();

  const ray = new THREE.Raycaster();
  const hit = new THREE.Vector3();
  const at = (x: number, y: number) => {
    ray.setFromCamera(new THREE.Vector2(x, y), cam);
    return ray.ray.intersectPlane(planeZ0, hit)?.clone() ?? new THREE.Vector3();
  };

  // The camera looks slightly down, so the visible slice is a trapezoid: use the narrow edge.
  const tl = at(-1, 1);
  const bl = at(-1, -1);
  const halfWidth = Math.min(Math.abs(tl.x), Math.abs(bl.x));
  const top = tl.y;
  const bottom = bl.y;
  const width = halfWidth * 2;
  const height = top - bottom;

  const portrait = aspect < 0.85;
  const island = portrait
    ? { x: 0, y: bottom + height * 0.24, radius: Math.min(1.05, width * 0.38) }
    : {
        // Leave more than Zara's diagonal between the rim and the wall, so she can't jam in it.
        x: -halfWidth + width * 0.7,
        y: bottom + height * 0.3,
        radius: Math.min(1.2, width * 0.15),
      };

  return { portrait, left: -halfWidth, right: halfWidth, bottom, top, island };
}
