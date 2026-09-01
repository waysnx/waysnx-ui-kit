/**
 * @file hooks/useVisualization.ts
 * Core engine hook — manages nodes, layout, and computed state.
 */

import { useState, useCallback, useMemo } from 'react';
import type { VisNode, VisEdge, LayoutConfig, LayoutResult, VisualizationConfig } from '../types';
import { LayoutEngine } from '../engines/LayoutEngine';
import {
  toggleNodeExpanded,
  expandAll,
  collapseAll,
  getVisibleNodes,
  reparentNode,
} from '../utils/treeUtils';

export interface UseVisualizationReturn {
  nodes: VisNode[];
  layout: LayoutResult | null;
  setNodes: React.Dispatch<React.SetStateAction<VisNode[]>>;
  toggleExpand: (nodeId: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
  reparent: (nodeId: string, newParentId: string | null) => void;
  updateLayoutConfig: (config: Partial<LayoutConfig>) => void;
  recompute: () => void;
}

export function useVisualization(
  initialNodes: VisNode[],
  edges: VisEdge[] = [],
  config?: VisualizationConfig
): UseVisualizationReturn {
  const [nodes, setNodes] = useState<VisNode[]>(initialNodes);
  const [layoutConfig, setLayoutConfig] = useState<Partial<LayoutConfig>>(
    config?.layout ?? {}
  );

  const layoutEngine = useMemo(
    () => new LayoutEngine(layoutConfig),
    [layoutConfig]
  );

  const visibleNodes = useMemo(() => getVisibleNodes(nodes), [nodes]);

  const layout = useMemo<LayoutResult>(
    () => layoutEngine.compute(visibleNodes, edges),
    [layoutEngine, visibleNodes, edges]
  );

  const toggleExpand = useCallback((nodeId: string) => {
    setNodes((prev) => toggleNodeExpanded(prev, nodeId));
  }, []);

  const handleExpandAll = useCallback(() => {
    setNodes((prev) => expandAll(prev));
  }, []);

  const handleCollapseAll = useCallback(() => {
    setNodes((prev) => collapseAll(prev));
  }, []);

  const reparent = useCallback((nodeId: string, newParentId: string | null) => {
    setNodes((prev) => reparentNode(prev, nodeId, newParentId));
  }, []);

  const updateLayoutConfig = useCallback((cfg: Partial<LayoutConfig>) => {
    setLayoutConfig((prev) => ({ ...prev, ...cfg }));
  }, []);

  const recompute = useCallback(() => {
    // Trigger re-render by forcing a new node array reference
    setNodes((prev) => [...prev]);
  }, []);

  return {
    nodes,
    layout,
    setNodes,
    toggleExpand,
    expandAll: handleExpandAll,
    collapseAll: handleCollapseAll,
    reparent,
    updateLayoutConfig,
    recompute,
  };
}
