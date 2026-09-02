import { useState } from 'react';
import type { PDFViewerProps } from '../../types';

/**
 * PDFViewer — SHELL / ADAPTER (not a functional PDF renderer in 1.0.0).
 *
 * This component provides the viewer chrome (toolbar layout, zoom controls,
 * accessible region) but does NOT render PDF page content. To display real
 * pages, integrate a rendering engine such as PDF.js and draw into the content
 * area below. Because no document is parsed, page count and per-page navigation
 * are intentionally not provided — the previous build reported a hard-coded
 * placeholder page count, which has been removed to avoid implying real
 * rendering.
 *
 * The `src` prop is surfaced in the UI so integrators can confirm the value is
 * wired through, but it is not fetched or parsed by this shell.
 */
export function PDFViewer({
  src,
  initialPage: _initialPage = 1,
  showToolbar = true,
  showThumbnails: _showThumbnails = false,
  height = 500,
  className = '',
}: PDFViewerProps) {
  const [zoom, setZoom] = useState(100);

  return (
    <div className={`wx-adv-pdf-viewer ${className}`} style={{ height }} role="region" aria-label="PDF Viewer">
      {showToolbar && (
        <div className="wx-adv-pdf-viewer__toolbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="wx-adv-pdf-viewer__page-info">Preview unavailable</span>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button className="wx-adv-toolbar__btn" onClick={() => setZoom(z => Math.max(50, z - 25))} type="button" aria-label="Zoom out">🔍−</button>
            <span style={{ fontSize: 12, color: 'var(--wx-color-text-muted)', padding: '0 4px' }}>{zoom}%</span>
            <button className="wx-adv-toolbar__btn" onClick={() => setZoom(z => Math.min(200, z + 25))} type="button" aria-label="Zoom in">🔍+</button>
          </div>
        </div>
      )}
      <div className="wx-adv-pdf-viewer__content">
        <div style={{ textAlign: 'center', color: 'var(--wx-color-text-muted)', fontSize: 14 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>📄</div>
          <div>PDF preview not rendered</div>
          <div style={{ fontSize: 12, marginTop: 4 }}>
            This is a viewer shell. Integrate PDF.js (or a similar engine) to render page content.
          </div>
          <div style={{ fontSize: 12, marginTop: 4 }}>Source: {src || 'No file loaded'}</div>
        </div>
      </div>
    </div>
  );
}
