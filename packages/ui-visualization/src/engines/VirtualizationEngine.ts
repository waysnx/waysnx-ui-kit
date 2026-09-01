/**
 * @file engines/VirtualizationEngine.ts
 * Determines which nodes are visible in the current viewport
 * for high-performance rendering of large graphs.
 */

import type { LayoutNode, Viewport } from '../types';
import { VIRTUALIZE_OVERSCAN } from '../constants';
import { rectsOverlap } from '../utils/mathUtils';

export class VirtualizationEngine {
  /**
   * Filter layout nodes to only those visible in the current viewport.
   *
   * @param nodes      - All laid-out nodes with x/y/width/height
   * @param viewport   - Current viewport (x, y = pan offset, zoom = scale)
   * @param viewWidth  - Container width in px
   * @param viewHeight - Container height in px
   * @returns Subset of nodes that should be rendered
   */
  getVisibleNodes(
    nodes: LayoutNode[],
    viewport: Viewport,
    viewWidth: number,
    viewHeight: number
  ): LayoutNode[] {
    const { x: panX, y: panY, zoom } = viewport;

    // Canvas area that corresponds to the visible screen area
    const overscanPx = VIRTUALIZE_OVERSCAN * 100;
    const visLeft = (-panX - overscanPx) / zoom;
    const visTop = (-panY - overscanPx) / zoom;
    const visWidth = (viewWidth + overscanPx * 2) / zoom;
    const visHeight = (viewHeight + overscanPx * 2) / zoom;

    return nodes.filter((node) =>
      rectsOverlap(
        node.x, node.y, node.width, node.height,
        visLeft, visTop, visWidth, visHeight
      )
    );
  }

  /**
   * Check if a node is within the visible viewport.
   */
  isNodeVisible(
    node: LayoutNode,
    viewport: Viewport,
    viewWidth: number,
    viewHeight: number
  ): boolean {
    return this.getVisibleNodes([node], viewport, viewWidth, viewHeight).length > 0;
  }
}
