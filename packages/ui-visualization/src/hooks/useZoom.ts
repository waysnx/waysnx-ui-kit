/**
 * @file hooks/useZoom.ts
 * Zoom and pan state management for the visualization canvas.
 */

import { useState, useCallback, useRef } from 'react';
import type { Viewport, ViewportBounds } from '../types';
import {
  DEFAULT_MIN_ZOOM,
  DEFAULT_MAX_ZOOM,
  DEFAULT_ZOOM_STEP,
  DEFAULT_INITIAL_ZOOM,
} from '../constants';
import { clamp } from '../utils/mathUtils';

export interface UseZoomReturn {
  viewport: Viewport;
  zoomIn: () => void;
  zoomOut: () => void;
  zoomTo: (zoom: number) => void;
  zoomToFit: (contentWidth: number, contentHeight: number, containerWidth: number, containerHeight: number) => void;
  resetZoom: () => void;
  panTo: (x: number, y: number) => void;
  panBy: (dx: number, dy: number) => void;
  onWheel: (e: React.WheelEvent) => void;
  isPanning: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
}

export function useZoom(bounds?: ViewportBounds): UseZoomReturn {
  const minZoom = bounds?.minZoom ?? DEFAULT_MIN_ZOOM;
  const maxZoom = bounds?.maxZoom ?? DEFAULT_MAX_ZOOM;
  const padding = bounds?.padding ?? 40;

  const [viewport, setViewport] = useState<Viewport>({
    x: 0,
    y: 0,
    zoom: DEFAULT_INITIAL_ZOOM,
  });

  const isPanningRef = useRef(false);
  const lastPanPos = useRef({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);

  const zoomIn = useCallback(() => {
    setViewport((v) => ({ ...v, zoom: clamp(v.zoom + DEFAULT_ZOOM_STEP, minZoom, maxZoom) }));
  }, [minZoom, maxZoom]);

  const zoomOut = useCallback(() => {
    setViewport((v) => ({ ...v, zoom: clamp(v.zoom - DEFAULT_ZOOM_STEP, minZoom, maxZoom) }));
  }, [minZoom, maxZoom]);

  const zoomTo = useCallback((zoom: number) => {
    setViewport((v) => ({ ...v, zoom: clamp(zoom, minZoom, maxZoom) }));
  }, [minZoom, maxZoom]);

  const zoomToFit = useCallback(
    (contentWidth: number, contentHeight: number, containerWidth: number, containerHeight: number) => {
      if (!contentWidth || !contentHeight) return;
      const scaleX = (containerWidth - padding * 2) / contentWidth;
      const scaleY = (containerHeight - padding * 2) / contentHeight;
      const zoom = clamp(Math.min(scaleX, scaleY), minZoom, maxZoom);
      const x = (containerWidth - contentWidth * zoom) / 2;
      const y = (containerHeight - contentHeight * zoom) / 2;
      setViewport({ x, y, zoom });
    },
    [minZoom, maxZoom, padding]
  );

  const resetZoom = useCallback(() => {
    setViewport({ x: 0, y: 0, zoom: DEFAULT_INITIAL_ZOOM });
  }, []);

  const panTo = useCallback((x: number, y: number) => {
    setViewport((v) => ({ ...v, x, y }));
  }, []);

  const panBy = useCallback((dx: number, dy: number) => {
    setViewport((v) => ({ ...v, x: v.x + dx, y: v.y + dy }));
  }, []);

  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = -e.deltaY * 0.001;
      setViewport((v) => ({
        ...v,
        zoom: clamp(v.zoom + delta, minZoom, maxZoom),
      }));
    },
    [minZoom, maxZoom]
  );

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    // Only pan with middle button or when space is held (handled externally)
    if (e.button === 1 || e.button === 0) {
      isPanningRef.current = true;
      setIsPanning(true);
      lastPanPos.current = { x: e.clientX, y: e.clientY };
    }
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanningRef.current) return;
    const dx = e.clientX - lastPanPos.current.x;
    const dy = e.clientY - lastPanPos.current.y;
    lastPanPos.current = { x: e.clientX, y: e.clientY };
    panBy(dx, dy);
  }, [panBy]);

  const onMouseUp = useCallback(() => {
    isPanningRef.current = false;
    setIsPanning(false);
  }, []);

  return {
    viewport,
    zoomIn,
    zoomOut,
    zoomTo,
    zoomToFit,
    resetZoom,
    panTo,
    panBy,
    onWheel,
    isPanning,
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
}
