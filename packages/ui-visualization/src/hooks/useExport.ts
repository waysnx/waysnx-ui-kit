/**
 * @file hooks/useExport.ts
 * Export utilities hook for visualization components.
 */

import { useCallback, useRef } from 'react';
import type { VisNode, VisEdge, ExportOptions } from '../types';
import { ExportEngine } from '../engines/ExportEngine';

const engine = new ExportEngine();

export interface UseExportReturn {
  svgRef: React.RefObject<SVGSVGElement | null>;
  exportAs: (options: ExportOptions) => Promise<void>;
}

export function useExport(nodes: VisNode[], edges: VisEdge[]): UseExportReturn {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const exportAs = useCallback(
    async (options: ExportOptions) => {
      await engine.export(svgRef.current, nodes, edges, options);
    },
    [nodes, edges]
  );

  return { svgRef, exportAs };
}
