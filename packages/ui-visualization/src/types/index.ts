/**
 * @file types/index.ts
 * Core type definitions for @waysnx/ui-visualization
 */

// ─── Node & Edge ────────────────────────────────────────────────────────────

/**
 * A single node in a visualization graph.
 */
export interface VisNode {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Parent node id (null for root) */
  parentId?: string | null;
  /** Optional subtitle / description */
  subtitle?: string;
  /** Avatar / profile image URL */
  avatarUrl?: string;
  /** Badge text or count */
  badge?: string | number;
  /** Status indicator */
  status?: 'online' | 'offline' | 'away' | 'busy';
  /** Whether this node is expanded */
  expanded?: boolean;
  /** Whether this node is selected */
  selected?: boolean;
  /** Whether this node is disabled */
  disabled?: boolean;
  /** Whether this node is highlighted (e.g. search result) */
  highlighted?: boolean;
  /** Arbitrary metadata for custom rendering */
  data?: Record<string, unknown>;
  /** Children nodes (alternative to parentId-based tree) */
  children?: VisNode[];
}

/**
 * A connection between two nodes.
 */
export interface VisEdge {
  id: string;
  sourceId: string;
  targetId: string;
  label?: string;
  type?: 'straight' | 'curved' | 'elbow' | 'step';
  style?: React.CSSProperties;
  data?: Record<string, unknown>;
}

// ─── Layout ──────────────────────────────────────────────────────────────────

export type LayoutDirection = 'top-down' | 'left-right' | 'radial' | 'compact';

export interface LayoutConfig {
  direction: LayoutDirection;
  /** Horizontal gap between sibling nodes (px) */
  nodeGapX?: number;
  /** Vertical gap between levels (px) */
  nodeGapY?: number;
  /** Node width (px) */
  nodeWidth?: number;
  /** Node height (px) */
  nodeHeight?: number;
}

// ─── Viewport ────────────────────────────────────────────────────────────────

export interface Viewport {
  x: number;
  y: number;
  zoom: number;
}

export interface ViewportBounds {
  minZoom?: number;
  maxZoom?: number;
  padding?: number;
}

// ─── Selection ───────────────────────────────────────────────────────────────

export type SelectionMode = 'single' | 'multiple' | 'range' | 'none';

export interface SelectionState {
  selectedIds: Set<string>;
  mode: SelectionMode;
}

// ─── Search ──────────────────────────────────────────────────────────────────

export interface SearchResult {
  nodeId: string;
  matchedField: string;
  score: number;
}

export interface SearchState {
  query: string;
  results: SearchResult[];
  activeIndex: number;
}

// ─── Export ──────────────────────────────────────────────────────────────────

export type ExportFormat = 'png' | 'svg' | 'pdf' | 'json';

export interface ExportOptions {
  format: ExportFormat;
  filename?: string;
  quality?: number;
  backgroundColor?: string;
  scale?: number;
}

// ─── Drag & Drop ─────────────────────────────────────────────────────────────

export interface DragState {
  isDragging: boolean;
  draggingNodeId: string | null;
  dragOverNodeId: string | null;
  canDrop: boolean;
}

export interface DropRule {
  /** Return true if the dragged node can be dropped onto the target */
  canDrop: (draggingNode: VisNode, targetNode: VisNode, nodes: VisNode[]) => boolean;
}

// ─── Theme ───────────────────────────────────────────────────────────────────

export type VisTheme = 'light' | 'dark' | 'auto';

// ─── Visualization Config ────────────────────────────────────────────────────

export interface VisualizationConfig {
  layout?: LayoutConfig;
  viewport?: ViewportBounds;
  selection?: SelectionMode;
  enableZoom?: boolean;
  enablePan?: boolean;
  enableMiniMap?: boolean;
  enableSearch?: boolean;
  enableDragDrop?: boolean;
  enableExport?: boolean;
  enableKeyboard?: boolean;
  /** Virtualize nodes outside viewport for performance */
  virtualize?: boolean;
  /** Max nodes before virtualization kicks in */
  virtualizeThreshold?: number;
  theme?: VisTheme;
  dropRules?: DropRule[];
}

// ─── Events ──────────────────────────────────────────────────────────────────

export interface VisNodeEvent {
  node: VisNode;
  originalEvent?: React.MouseEvent | React.KeyboardEvent;
}

export interface VisEdgeEvent {
  edge: VisEdge;
  originalEvent?: React.MouseEvent;
}

export interface VisDragEvent {
  draggingNode: VisNode;
  targetNode: VisNode;
}

// ─── Computed Layout ─────────────────────────────────────────────────────────

export interface LayoutNode extends VisNode {
  x: number;
  y: number;
  width: number;
  height: number;
  depth: number;
}

export interface LayoutResult {
  nodes: LayoutNode[];
  edges: VisEdge[];
  totalWidth: number;
  totalHeight: number;
}
