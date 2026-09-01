/**
 * @file constants/index.ts
 * Shared constants for @waysnx/ui-visualization
 */

// ─── Layout Defaults ─────────────────────────────────────────────────────────

export const DEFAULT_NODE_WIDTH = 220;
export const DEFAULT_NODE_HEIGHT = 80;
export const DEFAULT_NODE_GAP_X = 40;
export const DEFAULT_NODE_GAP_Y = 60;

// ─── Viewport Defaults ───────────────────────────────────────────────────────

export const DEFAULT_MIN_ZOOM = 0.1;
export const DEFAULT_MAX_ZOOM = 3;
export const DEFAULT_ZOOM_STEP = 0.1;
export const DEFAULT_INITIAL_ZOOM = 1;
export const DEFAULT_VIEWPORT_PADDING = 40;

// ─── Zoom Preset Levels ──────────────────────────────────────────────────────

export const ZOOM_PRESETS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2] as const;

// ─── Animation Durations (ms) ────────────────────────────────────────────────

export const ANIMATION_DURATION_FAST = 150;
export const ANIMATION_DURATION_NORMAL = 250;
export const ANIMATION_DURATION_SLOW = 400;

// ─── Virtualization ──────────────────────────────────────────────────────────

export const DEFAULT_VIRTUALIZE_THRESHOLD = 200;
export const VIRTUALIZE_OVERSCAN = 2; // extra nodes to render outside viewport

// ─── Selection ───────────────────────────────────────────────────────────────

export const MULTI_SELECT_KEY = 'Meta'; // Cmd on Mac, can also be Ctrl
export const RANGE_SELECT_KEY = 'Shift';

// ─── Keyboard Navigation ─────────────────────────────────────────────────────

export const KEYBOARD_KEYS = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  HOME: 'Home',
  END: 'End',
  PLUS: '+',
  MINUS: '-',
  ZERO: '0',
  F: 'f',
  F_KEY: 'F',
} as const;

// ─── CSS Class Prefixes ──────────────────────────────────────────────────────

export const VIS_PREFIX = 'wx-vis';

// ─── Data Attributes ─────────────────────────────────────────────────────────

export const DATA_NODE_ID = 'data-node-id';
export const DATA_EDGE_ID = 'data-edge-id';
