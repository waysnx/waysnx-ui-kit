/**
 * @file hooks/useMiniMap.ts
 * MiniMap state — tracks viewport position within total canvas bounds.
 */

import { useMemo } from 'react';
import type { LayoutNode, Viewport } from '../types';

export interface MiniMapState {
  /** MiniMap viewport rect as percentages (0–1) */
  viewportRect: { x: number; y: number; width: number; height: number };
  /** All node rects as percentages (0–1) */
  nodeRects: Array<{ id: string; x: number; y: number; width: number; height: number; status?: string }>;
}

export interface UseMiniMapReturn {
  miniMapState: MiniMapState;
  /** Call this to navigate: pass a click position (0–1) on the minimap */
  onMiniMapClick: (relX: number, relY: number, totalWidth: number, totalHeight: number, panTo: (x: number, y: number) => void, containerWidth: number, containerHeight: number, zoom: number) => void;
}

export function useMiniMap(
  layoutNodes: LayoutNode[],
  viewport: Viewport,
  totalWidth: number,
  totalHeight: number,
  containerWidth: number,
  containerHeight: number
): UseMiniMapReturn {
  const miniMapState = useMemo<MiniMapState>(() => {
    const tw = totalWidth || 1;
    const th = totalHeight || 1;

    const nodeRects = layoutNodes.map((n) => ({
      id: n.id,
      x: n.x / tw,
      y: n.y / th,
      width: n.width / tw,
      height: n.height / th,
      status: n.status,
    }));

    // Viewport rect: what portion of the total canvas is currently visible?
    const visLeft = -viewport.x / viewport.zoom;
    const visTop = -viewport.y / viewport.zoom;
    const visWidth = containerWidth / viewport.zoom;
    const visHeight = containerHeight / viewport.zoom;

    const viewportRect = {
      x: visLeft / tw,
      y: visTop / th,
      width: visWidth / tw,
      height: visHeight / th,
    };

    return { nodeRects, viewportRect };
  }, [layoutNodes, viewport, totalWidth, totalHeight, containerWidth, containerHeight]);

  const onMiniMapClick = (
    relX: number,
    relY: number,
    tw: number,
    th: number,
    panTo: (x: number, y: number) => void,
    cw: number,
    ch: number,
    zoom: number
  ) => {
    const canvasX = relX * tw;
    const canvasY = relY * th;
    const newPanX = -(canvasX * zoom) + cw / 2;
    const newPanY = -(canvasY * zoom) + ch / 2;
    panTo(newPanX, newPanY);
  };

  return { miniMapState, onMiniMapClick };
}
