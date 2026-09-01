/**
 * @file hooks/useSelection.ts
 * Node selection state — single, multiple, and range selection.
 */

import { useState, useCallback } from 'react';
import type { SelectionMode, SelectionState, VisNode } from '../types';

export interface UseSelectionReturn {
  selection: SelectionState;
  selectNode: (nodeId: string, event?: React.MouseEvent | React.KeyboardEvent) => void;
  deselectNode: (nodeId: string) => void;
  selectAll: (nodes: VisNode[]) => void;
  clearSelection: () => void;
  isSelected: (nodeId: string) => boolean;
}

export function useSelection(mode: SelectionMode = 'single'): UseSelectionReturn {
  const [selection, setSelection] = useState<SelectionState>({
    selectedIds: new Set(),
    mode,
  });

  const selectNode = useCallback(
    (nodeId: string, event?: React.MouseEvent | React.KeyboardEvent) => {
      if (mode === 'none') return;

      const isMultiKey = event?.metaKey || event?.ctrlKey;
      const isShiftKey = event?.shiftKey;

      setSelection((prev) => {
        if (mode === 'single') {
          return {
            ...prev,
            selectedIds: new Set([nodeId]),
          };
        }

        if (mode === 'multiple') {
          if (isMultiKey) {
            const next = new Set(prev.selectedIds);
            if (next.has(nodeId)) {
              next.delete(nodeId);
            } else {
              next.add(nodeId);
            }
            return { ...prev, selectedIds: next };
          }
          return { ...prev, selectedIds: new Set([nodeId]) };
        }

        if (mode === 'range') {
          if (isShiftKey && prev.selectedIds.size > 0) {
            // Range selection requires ordered node list — caller handles this externally
            // Here we just add the node to the selection
            const next = new Set(prev.selectedIds);
            next.add(nodeId);
            return { ...prev, selectedIds: next };
          }
          if (isMultiKey) {
            const next = new Set(prev.selectedIds);
            if (next.has(nodeId)) {
              next.delete(nodeId);
            } else {
              next.add(nodeId);
            }
            return { ...prev, selectedIds: next };
          }
          return { ...prev, selectedIds: new Set([nodeId]) };
        }

        return prev;
      });
    },
    [mode]
  );

  const deselectNode = useCallback((nodeId: string) => {
    setSelection((prev) => {
      const next = new Set(prev.selectedIds);
      next.delete(nodeId);
      return { ...prev, selectedIds: next };
    });
  }, []);

  const selectAll = useCallback((nodes: VisNode[]) => {
    setSelection((prev) => ({
      ...prev,
      selectedIds: new Set(nodes.map((n) => n.id)),
    }));
  }, []);

  const clearSelection = useCallback(() => {
    setSelection((prev) => ({ ...prev, selectedIds: new Set() }));
  }, []);

  const isSelected = useCallback(
    (nodeId: string) => selection.selectedIds.has(nodeId),
    [selection]
  );

  return {
    selection,
    selectNode,
    deselectNode,
    selectAll,
    clearSelection,
    isSelected,
  };
}
