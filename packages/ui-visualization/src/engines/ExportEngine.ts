/**
 * @file engines/ExportEngine.ts
 * Export the visualization as PNG, SVG, PDF, or JSON.
 */

import type { VisNode, VisEdge, ExportOptions } from '../types';
import { downloadBlob, serializeSvg, svgToPngDataUrl } from '../utils/domUtils';

export class ExportEngine {
  /**
   * Export the visualization.
   *
   * @param svgEl   - The root SVG element (for PNG/SVG export)
   * @param nodes   - All nodes (for JSON export)
   * @param edges   - All edges (for JSON export)
   * @param options - Export options
   */
  async export(
    svgEl: SVGSVGElement | null,
    nodes: VisNode[],
    edges: VisEdge[],
    options: ExportOptions
  ): Promise<void> {
    const filename = options.filename ?? `visualization.${options.format}`;

    switch (options.format) {
      case 'svg':
        return this.exportSvg(svgEl, filename);
      case 'png':
        return this.exportPng(svgEl, filename, options.scale ?? 2);
      case 'json':
        return this.exportJson(nodes, edges, filename);
      case 'pdf':
        return this.exportPdf(svgEl, filename);
      default:
        throw new Error(`Unsupported export format: ${options.format}`);
    }
  }

  private exportSvg(svgEl: SVGSVGElement | null, filename: string): void {
    if (!svgEl) throw new Error('No SVG element available for export');
    const svgString = serializeSvg(svgEl);
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    downloadBlob(blob, filename);
  }

  private async exportPng(
    svgEl: SVGSVGElement | null,
    filename: string,
    scale: number
  ): Promise<void> {
    if (!svgEl) throw new Error('No SVG element available for export');
    const { width, height } = svgEl.getBoundingClientRect();
    const svgString = serializeSvg(svgEl);
    const dataUrl = await svgToPngDataUrl(svgString, width, height, scale);

    const res = await fetch(dataUrl);
    const blob = await res.blob();
    downloadBlob(blob, filename);
  }

  private exportJson(nodes: VisNode[], edges: VisEdge[], filename: string): void {
    const data = { nodes, edges };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    downloadBlob(blob, filename);
  }

  private exportPdf(svgEl: SVGSVGElement | null, filename: string): void {
    // PDF export requires a PDF library (e.g. jsPDF).
    // For now, we log a warning and fall back to SVG export.
    console.warn(
      '[ui-visualization] PDF export requires jsPDF. Falling back to SVG export.'
    );
    this.exportSvg(svgEl, filename.replace('.pdf', '.svg'));
  }
}
