import * as THREE from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";

// Body proportions from the brief: about 1 : 1 : 0.55.
// `corner` rounds the front silhouette (the reel's squircle); `edge` rounds the depth edges.
export const BODY = { w: 1, h: 1, d: 0.55, corner: 0.34, edge: 0.2, puff: 0.05 };
export const OUTLINE = 0.042;
// Half extents of the physics collider, sticker border included.
export const HALF = { x: BODY.w / 2 + OUTLINE, y: BODY.h / 2 + OUTLINE, z: BODY.d / 2 + OUTLINE };

const LIME_TOP = new THREE.Color("#A5E063");
const LIME_MID = new THREE.Color("#7EC340");
const LIME_BOTTOM = new THREE.Color("#5FA52C");

function roundedRectSdf(x: number, y: number, hx: number, hy: number, r: number) {
  const qx = Math.abs(x) - hx + r;
  const qy = Math.abs(y) - hy + r;
  return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r;
}

// A rounded rectangle extruded with rounded edges, so corner and depth rounding are independent.
function bodySdf(p: THREE.Vector3, half: THREE.Vector3) {
  const e = BODY.edge;
  const d2 = roundedRectSdf(p.x, p.y, half.x - e, half.y - e, BODY.corner - e);
  const wx = d2;
  const wz = Math.abs(p.z) - (half.z - e);
  return Math.min(Math.max(wx, wz), 0) + Math.hypot(Math.max(wx, 0), Math.max(wz, 0)) - e;
}

// A radially projected icosphere instead of RoundedBoxGeometry: the stock one leaves each flat
// face as a single quad, so the pillow bulge and the gradient would have nothing to bend.
// detail 22 → 20 × 23² ≈ 10.6k triangles.
export function createBodyGeometry(detail = 22) {
  const half = new THREE.Vector3(BODY.w / 2, BODY.h / 2, BODY.d / 2);
  let geo: THREE.BufferGeometry = new THREE.IcosahedronGeometry(1, detail);
  geo.deleteAttribute("normal");
  geo.deleteAttribute("uv");
  geo = mergeVertices(geo, 1e-5);

  const pos = geo.getAttribute("position") as THREE.BufferAttribute;
  const dir = new THREE.Vector3();
  const probe = new THREE.Vector3();
  const colors = new Float32Array(pos.count * 3);
  const c = new THREE.Color();

  for (let i = 0; i < pos.count; i++) {
    dir.fromBufferAttribute(pos, i).normalize();
    let lo = 0;
    let hi = 1;
    for (let k = 0; k < 24; k++) {
      const mid = (lo + hi) / 2;
      if (bodySdf(probe.copy(dir).multiplyScalar(mid), half) > 0) hi = mid;
      else lo = mid;
    }
    const p = probe.copy(dir).multiplyScalar(lo);

    // Soft pillow: push the faces out, fading to nothing at the sides so the silhouette stays.
    const fx = Math.max(0, 1 - (p.x / half.x) ** 2);
    const fy = Math.max(0, 1 - (p.y / half.y) ** 2);
    p.z += (p.z / half.z) * BODY.puff * fx * fy;
    pos.setXYZ(i, p.x, p.y, p.z);

    const t = THREE.MathUtils.clamp((p.y + half.y) / BODY.h, 0, 1);
    if (t > 0.5) c.lerpColors(LIME_MID, LIME_TOP, (t - 0.5) * 2);
    else c.lerpColors(LIME_BOTTOM, LIME_MID, t * 2);
    colors.set([c.r, c.g, c.b], i * 3);
  }

  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  geo.computeBoundingSphere();
  return geo;
}

// The forest handle: two short legs sunk into the body and a semicircle on top.
export function createHandleGeometry() {
  const r = 0.17;
  const legBottom = -0.07;
  const legTop = 0.06;
  const points: THREE.Vector3[] = [new THREE.Vector3(-r, legBottom, 0), new THREE.Vector3(-r, legTop, 0)];
  const steps = 16;
  for (let i = 1; i < steps; i++) {
    const a = Math.PI - (i / steps) * Math.PI;
    points.push(new THREE.Vector3(Math.cos(a) * r, legTop + Math.sin(a) * r, 0));
  }
  points.push(new THREE.Vector3(r, legTop, 0), new THREE.Vector3(r, legBottom, 0));
  const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
  return new THREE.TubeGeometry(curve, 64, 0.036, 12, false);
}

// The coral tongue: the part of the mouth ellipse below an upward-bulging curve.
export function createTongueGeometry(rx: number, ry: number) {
  const cut = -0.38;
  const a1 = Math.PI + Math.asin(-cut);
  const a2 = 2 * Math.PI - Math.asin(-cut);
  const shape = new THREE.Shape();
  shape.moveTo(Math.cos(a1) * rx, Math.sin(a1) * ry);
  shape.absellipse(0, 0, rx, ry, a1, a2, false, 0);
  shape.quadraticCurveTo(0, ry * 0.02, Math.cos(a1) * rx, Math.sin(a1) * ry);
  return new THREE.ShapeGeometry(shape, 24);
}

export type SurfaceSpot = { position: THREE.Vector3; quaternion: THREE.Quaternion };

// Where a face feature sits: cast a ray at the front of the body and align to the surface.
export function surfaceSpot(body: THREE.BufferGeometry, x: number, y: number, lift = 0): SurfaceSpot {
  const mesh = new THREE.Mesh(body);
  const ray = new THREE.Raycaster(new THREE.Vector3(x, y, 2), new THREE.Vector3(0, 0, -1));
  const hit = ray.intersectObject(mesh)[0];
  const normal = hit?.face?.normal.clone() ?? new THREE.Vector3(0, 0, 1);
  const position = (hit?.point.clone() ?? new THREE.Vector3(x, y, BODY.d / 2)).addScaledVector(normal, lift);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
  return { position, quaternion };
}
