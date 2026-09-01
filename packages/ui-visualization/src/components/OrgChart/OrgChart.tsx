/**
 * @file components/OrgChart/OrgChart.tsx
 * Complete org chart visualization component.
 * Composes: canvas, layout engine, nodes, connectors, minimap, toolbar, search.
 */

import React, { useRef, useCallback, useEffect } from 'react';
import type {
  VisNode,
  VisEdge,
  VisualizationConfig,
  VisNodeEvent,
  LayoutNode,
} from '../../types';
import { useVisualization } from '../../hooks/useVisualization';
import { useZoom } from '../../hooks/useZoom';
import { useSelection } from '../../hooks/useSelection';
import { useSearch } from '../../hooks/useSearch';
import { useDragDrop } from '../../hooks/useDragDrop';
import { useMiniMap } from '../../hooks/useMiniMap';
import { useExport } from '../../hooks/useExport';
import { VirtualizationEngine } from '../../engines/VirtualizationEngine';
import { TreeNode } from '../TreeNode';
import { Connector } from '../Connector';
import { MiniMap } from '../MiniMap';
import { Toolbar } from '../Toolbar';
import { SearchBox } from '../SearchBox';
import { ZoomControls } from '../ZoomControls';
import { DEFAULT_VIRTUALIZE_THRESHOLD } from '../../constants';
import { useTranslation } from '@waysnx/ui-i18n';

const virtualizationEngine = new VirtualizationEngine();

export interface OrgChartProps {
  /** Flat array of nodes */
  nodes: VisNode[];
  /** Optional explicit edges (auto-generated from parentId if not provided) */
  edges?: VisEdge[];
  /** Visualization configuration */
  config?: VisualizationConfig;
  /** Container width in px */
  width?: number | string;
  /** Container height in px */
  height?: number | string;
  /** Node click handler */
  onNodeClick?: (event: VisNodeEvent) => void;
  /** Node double-click handler */
  onNodeDoubleClick?: (event: VisNodeEvent) => void;
  /** Selection change handler */
  onSelectionChange?: (selectedIds: string[]) => void;
  /** Custom node renderer */
  renderNode?: (node: LayoutNode) => React.ReactNode;
  /** Show toolbar */
  showToolbar?: boolean;
  /** Show minimap */
  showMiniMap?: boolean;
  /** Show search */
  showSearch?: boolean;
  /** Show zoom controls */
  showZoomControls?: boolean;
  /** Show dot grid background */
  showGrid?: boolean;
  /** Dark mode */
  dark?: boolean;
  /** CSS class */
  className?: string;
  /** aria-label for the canvas */
  'aria-label'?: string;
}

export function OrgChart({
  nodes: initialNodes,
  edges = [],
  config = {},
  width = '100%',
  height = '600px',
  onNodeClick,
  onNodeDoubleClick,
  onSelectionChange,
  renderNode,
  showToolbar = true,
  showMiniMap = true,
  showSearch = true,
  showZoomControls = false,
  showGrid = true,
  dark = false,
  className = '',
  'aria-label': ariaLabel,
}: OrgChartProps) {
  const { t } = useTranslation();
  const resolvedAriaLabel = ariaLabel ?? t('visualization.orgChart.ariaLabel');
  const containerRef = useRef<HTMLDivElement>(null);

  // ─── Core engines / hooks ──────────────────────────────────────────────────
  const {
    nodes,
    layout,
    toggleExpand,
    expandAll,
    collapseAll,
    reparent,
  } = useVisualization(initialNodes, edges, config);

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

  const { searchState, setQuery, nextResult, prevResult, clearSearch, highlightedNodes } =
    useSearch(nodes);

  const { dragState, onDragStart, onDragOver, onDrop } = useDragDrop(
    config.dropRules
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

  const { svgRef, exportAs } = useExport(nodes, layout?.edges ?? []);

  // ─── Virtualization ────────────────────────────────────────────────────────
  const shouldVirtualize =
    (config.virtualize ?? true) &&
    nodes.length > (config.virtualizeThreshold ?? DEFAULT_VIRTUALIZE_THRESHOLD);

  const visibleLayoutNodes = shouldVirtualize
    ? virtualizationEngine.getVisibleNodes(
        layout?.nodes ?? [],
        viewport,
        containerSize.width,
        containerSize.height
      )
    : (layout?.nodes ?? []);

  // ─── Fit on mount ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (layout && containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      zoomToFit(layout.totalWidth, layout.totalHeight, offsetWidth, offsetHeight);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Notify selection changes ─────────────────────────────────────────────
  useEffect(() => {
    onSelectionChange?.([...selection.selectedIds]);
  }, [selection.selectedIds, onSelectionChange]);

  // ─── Handlers ─────────────────────────────────────────────────────────────
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

  const handleExportPng = useCallback(() => {
    exportAs({ format: 'png', filename: 'orgchart.png' });
  }, [exportAs]);

  const handleExportSvg = useCallback(() => {
    exportAs({ format: 'svg', filename: 'orgchart.svg' });
  }, [exportAs]);

  // ─── Canvas classes ────────────────────────────────────────────────────────
  const canvasClasses = [
    'wx-vis-canvas',
    dark && 'wx-vis-canvas--dark',
    showGrid && 'wx-vis-canvas--grid',
    isPanning && 'wx-vis-canvas--panning',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const transformStyle: React.CSSProperties = {
    transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
  };

  // ─── Toolbar actions ───────────────────────────────────────────────────────
  const toolbarActions = [
    {
      id: 'expand-all',
      label: t('visualization.toolbar.expandAll'),
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
        </svg>
      ),
      onClick: expandAll,
      separator: true,
    },
    {
      id: 'collapse-all',
      label: t('visualization.toolbar.collapseAll'),
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z" />
        </svg>
      ),
      onClick: collapseAll,
    },
    {
      id: 'export-png',
      label: t('visualization.toolbar.exportPng'),
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
        </svg>
      ),
      onClick: handleExportPng,
      separator: true,
    },
    {
      id: 'export-svg',
      label: t('visualization.toolbar.exportSvg'),
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z" />
        </svg>
      ),
      onClick: handleExportSvg,
    },
  ];

  // ─── Node map for edge rendering ───────────────────────────────────────────
  const nodeMap = new Map(visibleLayoutNodes.map((n) => [n.id, n]));

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
      aria-multiselectable={config.selection === 'multiple' || config.selection === 'range'}
    >
      {/* SVG edge layer */}
      <svg
        ref={svgRef as React.RefObject<SVGSVGElement>}
        className="wx-vis-canvas__svg"
        style={{
          ...transformStyle,
          width: layout?.totalWidth ?? 0,
          height: layout?.totalHeight ?? 0,
          zIndex: 1,
        }}
        aria-hidden="true"
      >
        {(layout?.edges ?? []).map((edge) => {
          const source = nodeMap.get(edge.sourceId);
          const target = nodeMap.get(edge.targetId);
          if (!source || !target) return null;
          return (
            <Connector
              key={edge.id}
              edge={edge}
              sourceNode={source}
              targetNode={target}
            />
          );
        })}
      </svg>

      {/* Node layer */}
      <div className="wx-vis-canvas__transform" style={transformStyle}>
        {visibleLayoutNodes.map((node) => {
          const hasChildren = nodes.some((n) => n.parentId === node.id);
          const searchNode = highlightedNodes.find((n) => n.id === node.id);
          const mergedNode = { ...node, highlighted: searchNode?.highlighted };

          return (
            <TreeNode
              key={node.id}
              node={mergedNode}
              isSelected={isSelected(node.id)}
              isDragging={dragState.draggingNodeId === node.id}
              isDragOver={dragState.dragOverNodeId === node.id}
              canDropHere={dragState.canDrop}
              hasChildren={hasChildren}
              onClick={handleNodeClick}
              onDoubleClick={onNodeDoubleClick}
              onToggleExpand={toggleExpand}
              enableDragDrop={config.enableDragDrop}
              onDragStart={onDragStart}
              onDragOver={(id) => onDragOver(id, nodes)}
              onDrop={(id) =>
                onDrop(id, nodes, reparent)
              }
              renderNode={renderNode}
            />
          );
        })}
      </div>

      {/* Toolbar */}
      {showToolbar && (
        <Toolbar
          position="top-right"
          showZoom
          zoom={viewport.zoom}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onFitView={handleFitView}
          onResetZoom={resetZoom}
          actions={toolbarActions}
        />
      )}

      {/* Search */}
      {showSearch && (
        <SearchBox
          searchState={searchState}
          onSearch={setQuery}
          onNext={nextResult}
          onPrev={prevResult}
          onClear={clearSearch}
        />
      )}

      {/* Zoom controls (alternative to toolbar) */}
      {showZoomControls && !showToolbar && (
        <ZoomControls
          zoom={viewport.zoom}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onFitView={handleFitView}
          onResetZoom={resetZoom}
        />
      )}

      {/* MiniMap */}
      {showMiniMap && (
        <MiniMap
          state={miniMapState}
          totalWidth={layout?.totalWidth ?? 0}
          totalHeight={layout?.totalHeight ?? 0}
          onNavigate={(relX, relY) =>
            onMiniMapClick(
              relX,
              relY,
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

export default OrgChart;
