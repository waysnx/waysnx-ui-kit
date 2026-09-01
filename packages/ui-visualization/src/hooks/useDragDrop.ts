/**
 * @file hooks/useDragDrop.ts
 * Drag and drop state management for node reparenting.
 */

import { useState, useCallback } from 'react';
import type { DragState, DropRule, VisNode } from '../types';

export interface UseDragDropReturn {
  dragState: DragState;
  onDragStart: (nodeId: string) => void;
  onDragOver: (targetNodeId: string, nodes: VisNode[]) => void;
  onDragEnd: () => void;
  onDrop: (targetNodeId: string, nodes: VisNode[], onReparent: (nodeId: string, newParentId: string | null) => void) => void;
}
export function useDragDrop(dropRules?: DropRule[]): UseDragDropReturn {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggingNodeId: null,
    dragOverNodeId: null,
    canDrop: false,
  });

  const onDragStart = useCallback((nodeId: string) => {
    setDragState({
      isDragging: true,
      draggingNodeId: nodeId,
      dragOverNodeId: null,
      canDrop: false,
    });
  }, []);

  const onDragOver = useCallback(
    (targetNodeId: string, _nodes: VisNode[]) => {
      if (!dragState.draggingNodeId || targetNodeId === dragState.draggingNodeId) {
        return;
      }

      let canDrop = true;

      if (dropRules && dropRules.length > 0) {
        const draggingNode = _nodes.find((n) => n.id === dragState.draggingNodeId);
        const targetNode = _nodes.find((n) => n.id === targetNodeId);

        if (draggingNode && targetNode) {
          canDrop = dropRules.every((rule) => rule.canDrop(draggingNode, targetNode, _nodes));
        }
      }

      setDragState((prev) => ({
        ...prev,
        dragOverNodeId: targetNodeId,
        canDrop,
      }));
    },
    [dragState.draggingNodeId, dropRules]
  );

  const onDragEnd = useCallback(() => {
    setDragState({
      isDragging: false,
      draggingNodeId: null,
      dragOverNodeId: null,
      canDrop: false,
    });
  }, []);

  const onDrop = useCallback(
    (
      targetNodeId: string,
      _nodes: VisNode[],
      onReparent: (nodeId: string, newParentId: string | null) => void
    ) => {
      if (dragState.draggingNodeId && dragState.canDrop) {
        onReparent(dragState.draggingNodeId, targetNodeId);
      }
      onDragEnd();
    },
    [dragState, onDragEnd]
  );

  return { dragState, onDragStart, onDragOver, onDragEnd, onDrop };
}
