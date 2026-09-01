/**
 * @file components/Hierarchy/Hierarchy.tsx
 * Multi-level hierarchy visualization — top-down layout, compact variant.
 */

import React, { useRef, useCallback, useEffect } from 'react';
import type { VisNode, VisEdge, VisualizationConfig, VisNodeEvent, LayoutNode } from '../../types';
import { useVisualization } from '../../hooks/useVisualization';
import { useZoom } from '../../hooks/useZoom';
import { useSelection } from '../../hooks/useSelection';
import { useMiniMap } from '../../hooks/useMiniMap';
import { TreeNode } from '../TreeNode';
import { Connector } from '../Connector';
import { MiniMap } from '../MiniMap';
import { Toolbar } from '../Toolbar';
import { useTranslation } from '@waysnx/ui-i18n';

export interface HierarchyProps {
  nodes: VisNode[];
  edges?: VisEdge[];
  config?: VisualizationConfig;
  width?: number | string;
  height?: number | string;
  onNodeClick?: (event: VisNodeEvent) => void;
  onSelectionChange?: (selectedIds: string[]) => void;
  renderNode?: (node: LayoutNode) => React.ReactNode;
  showMiniMap?: boolean;
  showToolbar?: boolean;
  showGrid?: boolean;
  dark?: boolean;
  className?: string;
  'aria-label'?: string;
}

export function Hierarchy({
  nodes: initialNodes,
  edges = [],
  config = {},
  width = '100%',
  height = '600px',
  onNodeClick,
  onSelectionChange,
  renderNode,
  showMiniMap = true,
  showToolbar = true,
  showGrid = true,
  dark = false,
  className = '',
  'aria-label': ariaLabel,
}: HierarchyProps) {
  const { t } = useTranslation();
  const resolvedAriaLabel = ariaLabel ?? t('visualization.hierarchy.ariaLabel');
  const containerRef = useRef<HTMLDivElement>(null);

  const { nodes, layout, toggleExpand, expandAll, collapseAll } = useVisualization(
    initialNodes,
    edges,
    { ...config, layout: { direction: 'top-down', ...config.layout } }
  );

  const {
    viewport,
    zoomIn,
    zoomOut,
    zoomToFit,
    resetZoom,
    panTo,
    onWheel,
    isPanning,
    onMouseDown,
    onMouseMove,
    onMouseUp,
  } = useZoom(config.viewport);

  const { selection, selectNode, clearSelection, isSelected } = useSelection(
    config.selection ?? 'single'
  );

  const containerSize = {
    width: typeof width === 'number' ? width : 800,
    height: typeof height === 'number' ? height : 600,
  };

  const { miniMapState, onMiniMapClick } = useMiniMap(
    layout?.nodes ?? [],
    viewport,
    layout?.totalWidth ?? 0,
    layout?.totalHeight ?? 0,
    containerSize.width,
    containerSize.height
  );

  useEffect(() => {
    if (layout && containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      zoomToFit(layout.totalWidth, layout.totalHeight, offsetWidth, offsetHeight);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onSelectionChange?.([...selection.selectedIds]);
  }, [selection.selectedIds, onSelectionChange]);

  const handleNodeClick = useCallback(
    (event: VisNodeEvent) => {
      selectNode(event.node.id, event.originalEvent as React.MouseEvent);
      onNodeClick?.(event);
    },
    [selectNode, onNodeClick]
  );

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) clearSelection();
    },
    [clearSelection]
  );

  const handleFitView = useCallback(() => {
    if (layout && containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      zoomToFit(layout.totalWidth, layout.totalHeight, offsetWidth, offsetHeight);
    }
  }, [layout, zoomToFit]);

  const nodeMap = new Map((layout?.nodes ?? []).map((n) => [n.id, n]));
  const transformStyle: React.CSSProperties = {
    transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
  };

  const canvasClasses = [
    'wx-vis-canvas',
    dark && 'wx-vis-canvas--dark',
    showGrid && 'wx-vis-canvas--grid',
    isPanning && 'wx-vis-canvas--panning',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={containerRef}
      className={canvasClasses}
      style={{ width, height }}
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onClick={handleCanvasClick}
      tabIndex={0}
      role="tree"
      aria-label={resolvedAriaLabel}
    >
      <svg
        className="wx-vis-canvas__svg"
        style={{
          ...transformStyle,
          width: layout?.totalWidth ?? 0,
          height: layout?.totalHeight ?? 0,
        }}
        aria-hidden="true"
      >
        {(layout?.edges ?? []).map((edge) => {
          const source = nodeMap.get(edge.sourceId);
          const target = nodeMap.get(edge.targetId);
          if (!source || !target) return null;
          return <Connector key={edge.id} edge={edge} sourceNode={source} targetNode={target} />;
        })}
      </svg>

      <div className="wx-vis-canvas__transform" style={transformStyle}>
        {(layout?.nodes ?? []).map((node) => {
          const hasChildren = nodes.some((n) => n.parentId === node.id);
          return (
            <TreeNode
              key={node.id}
              node={node}
              isSelected={isSelected(node.id)}
              hasChildren={hasChildren}
              onClick={handleNodeClick}
              onToggleExpand={toggleExpand}
              renderNode={renderNode}
            />
          );
        })}
      </div>

      {showToolbar && (
        <Toolbar
          position="top-right"
          showZoom
          zoom={viewport.zoom}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onFitView={handleFitView}
          onResetZoom={resetZoom}
          actions={[
            {
              id: 'expand-all',
              label: t('visualization.toolbar.expandAll'),
              icon: <span style={{ fontSize: 12 }}>⊞</span>,
              onClick: expandAll,
              separator: true,
            },
            {
              id: 'collapse-all',
              label: t('visualization.toolbar.collapseAll'),
              icon: <span style={{ fontSize: 12 }}>⊟</span>,
              onClick: collapseAll,
            },
          ]}
        />
      )}

      {showMiniMap && (
        <MiniMap
          state={miniMapState}
          totalWidth={layout?.totalWidth ?? 0}
          totalHeight={layout?.totalHeight ?? 0}
          onNavigate={(relX, relY) =>
            onMiniMapClick(
              relX, relY,
              layout?.totalWidth ?? 0,
              layout?.totalHeight ?? 0,
              panTo,
              containerSize.width,
              containerSize.height,
              viewport.zoom
            )
          }
        />
      )}
    </div>
  );
}

export default Hierarchy;
