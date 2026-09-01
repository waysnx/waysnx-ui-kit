import { useState } from 'react';
import type { PDFViewerProps } from '../../types';

export function PDFViewer({ src, initialPage = 1, showToolbar = true, showThumbnails: _showThumbnails = false, height = 500, className = '' }: PDFViewerProps) {
  const [page, setPage] = useState(initialPage);
  const [totalPages] = useState(24); // placeholder — real impl uses PDF.js
  const [zoom, setZoom] = useState(100);

  return (
    <div className={`wx-adv-pdf-viewer ${className}`} style={{ height }} role="region" aria-label="PDF Viewer">
      {showToolbar && (
        <div className="wx-adv-pdf-viewer__toolbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button className="wx-adv-toolbar__btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1} type="button" aria-label="Previous page">‹</button>
            <span className="wx-adv-pdf-viewer__page-info">{page} / {totalPages}</span>
            <button className="wx-adv-toolbar__btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages} type="button" aria-label="Next page">›</button>
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
          <div>PDF Viewer</div>
          <div style={{ fontSize: 12, marginTop: 4 }}>Integrate PDF.js or similar library to render pages</div>
          <div style={{ fontSize: 12, marginTop: 4 }}>Source: {src || 'No file loaded'}</div>
          <div style={{ fontSize: 12, marginTop: 4 }}>Page {page} of {totalPages} · {zoom}% zoom</div>
        </div>
      </div>
    </div>
  );
}
