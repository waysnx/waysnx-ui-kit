/**
 * @file components/MiniMap/MiniMap.tsx
 * Overview navigation minimap for large visualizations.
 */

import React, { useCallback } from 'react';
import type { MiniMapState } from '../../hooks/useMiniMap';
import { useTranslation } from '@waysnx/ui-i18n';

export interface MiniMapProps {
  state: MiniMapState;
  totalWidth: number;
  totalHeight: number;
  /** Called when user clicks on the minimap to navigate */
  onNavigate: (relX: number, relY: number) => void;
  className?: string;
  'aria-label'?: string;
}

export function MiniMap({
  state,
  onNavigate,
  className = '',
  'aria-label': ariaLabel,
}: MiniMapProps) {
  const { t } = useTranslation();
  const resolvedAriaLabel = ariaLabel ?? t('visualization.minimap.ariaLabel');
  const handleClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;
      onNavigate(relX, relY);
    },
    [onNavigate]
  );

  const { nodeRects, viewportRect } = state;

  return (
    <div
      className={`wx-vis-minimap ${className}`}
      role="navigation"
      aria-label={resolvedAriaLabel}
    >
      <svg
        className="wx-vis-minimap__svg"
        viewBox="0 0 1 1"
        preserveAspectRatio="xMidYMid meet"
        onClick={handleClick}
        aria-hidden="true"
      >
        {/* Node dots */}
        {nodeRects.map((node) => (
          <rect
            key={node.id}
            className="wx-vis-minimap__node"
            x={node.x}
            y={node.y}
            width={Math.max(node.width, 0.005)}
            height={Math.max(node.height, 0.005)}
            rx={0.002}
          />
        ))}

        {/* Viewport indicator */}
        <rect
          className="wx-vis-minimap__viewport"
          x={viewportRect.x}
          y={viewportRect.y}
          width={Math.min(Math.max(viewportRect.width, 0.01), 1)}
          height={Math.min(Math.max(viewportRect.height, 0.01), 1)}
        />
      </svg>
    </div>
  );
}

export default MiniMap;
