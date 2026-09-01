/**
 * @file utils/mathUtils.ts
 * Math and geometry utilities for layout and rendering
 */

/**
 * Clamp a value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation between two values.
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Check if a point is within a rectangle.
 */
export function pointInRect(
  px: number,
  py: number,
  rx: number,
  ry: number,
  rw: number,
  rh: number
): boolean {
  return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh;
}

/**
 * Check if two rectangles overlap.
 */
export function rectsOverlap(
  ax: number, ay: number, aw: number, ah: number,
  bx: number, by: number, bw: number, bh: number
): boolean {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

/**
 * Calculate midpoint between two points.
 */
export function midpoint(
  x1: number, y1: number,
  x2: number, y2: number
): { x: number; y: number } {
  return { x: (x1 + x2) / 2, y: (y1 + y2) / 2 };
}

/**
 * Round to a given number of decimal places.
 */
export function round(value: number, decimals = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Convert screen coordinates to canvas/viewport coordinates.
 */
export function screenToCanvas(
  screenX: number,
  screenY: number,
  offsetX: number,
  offsetY: number,
  zoom: number
): { x: number; y: number } {
  return {
    x: (screenX - offsetX) / zoom,
    y: (screenY - offsetY) / zoom,
  };
}

/**
 * Convert canvas coordinates to screen coordinates.
 */
export function canvasToScreen(
  canvasX: number,
  canvasY: number,
  offsetX: number,
  offsetY: number,
  zoom: number
): { x: number; y: number } {
  return {
    x: canvasX * zoom + offsetX,
    y: canvasY * zoom + offsetY,
  };
}
