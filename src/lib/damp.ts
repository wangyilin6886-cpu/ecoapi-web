import * as THREE from 'three';

/**
 * Frame-rate-independent exponential smoothing toward a target.
 * `lambda` controls stiffness (higher = snappier); `dt` is the frame delta.
 */
export function damp(current: number, target: number, lambda: number, dt: number) {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * dt));
}
