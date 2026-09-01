import { useState, useRef, useCallback, useEffect } from 'react';
import type { CropperProps } from '../../types';

const ASPECTS = [
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '16:9', value: 16 / 9 },
  { label: 'Free', value: 0 },
];

// Crop stored in pixels relative to container
interface CropPx { x: number; y: number; w: number; h: number; }

export function Cropper({
  src,
  aspectRatio,
  onCrop,
  outputFormat: _outputFormat = 'png',
  className = '',
}: CropperProps) {
  const [activeAspect, setActiveAspect] = useState(aspectRatio ?? 16 / 9);
  const containerRef = useRef<HTMLDivElement>(null);
  const [crop, setCrop] = useState<CropPx>({ x: 0, y: 0, w: 0, h: 0 });
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const initialized = useRef(false);

  // Measure container and set initial crop
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const { clientWidth: w, clientHeight: h } = el;
      if (!w || !h) return;
      setContainerSize({ w, h });
      if (!initialized.current) {
        initialized.current = true;
        // Initial crop: 70% of width, height from aspect ratio
        const cw = w * 0.70;
        const aspect = activeAspect || 16 / 9;
        const ch = cw / aspect;
        const cx = (w - cw) / 2;
        const cy = (h - ch) / 2;
        setCrop({ x: cx, y: Math.max(0, cy), w: cw, h: Math.min(ch, h - Math.max(0, cy)) });
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [activeAspect]);

  // Apply aspect ratio when button clicked
  const applyAspect = useCallback((ratio: number) => {
    const { w: cw, h: ch } = containerSize;
    if (!cw || !ch) return;
    setCrop(prev => {
      if (ratio === 0) return prev; // Free — keep current box
      const newW = prev.w;
      const newH = newW / ratio;
      // If height overflows, constrain by height instead
      const finalH = newH > ch ? ch : newH;
      const finalW = finalH * ratio;
      const cx = Math.max(0, Math.min(prev.x, cw - finalW));
      const cy = Math.max(0, Math.min(prev.y, ch - finalH));
      return { x: cx, y: cy, w: finalW, h: finalH };
    });
  }, [containerSize]);

  const handleAspectChange = (ratio: number) => {
    setActiveAspect(ratio);
    applyAspect(ratio);
  };

  // ── Drag logic ───────────────────────────────────────────────────────────
  type DragType = 'move' | 'nw' | 'ne' | 'sw' | 'se' | null;
  const dragRef = useRef<{ type: DragType; startX: number; startY: number; startCrop: CropPx } | null>(null);

  const startDrag = useCallback((type: DragType, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current = { type, startX: e.clientX, startY: e.clientY, startCrop: { ...crop } };
  }, [crop]);

  useEffect(() => {
    const MIN = 30;
    const onMouseMove = (e: MouseEvent) => {
      if (!dragRef.current) return;
      const { type, startX, startY, startCrop } = dragRef.current;
      const { w: cw, h: ch } = containerSize;
      if (!cw || !ch) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      let { x, y, w, h } = startCrop;

      if (type === 'move') {
        x = Math.max(0, Math.min(cw - w, startCrop.x + dx));
        y = Math.max(0, Math.min(ch - h, startCrop.y + dy));
      } else if (type === 'se') {
        w = Math.max(MIN, startCrop.w + dx);
        h = activeAspect ? w / activeAspect : Math.max(MIN, startCrop.h + dy);
        w = Math.min(w, cw - x);
        h = Math.min(h, ch - y);
        if (activeAspect) w = h * activeAspect;
      } else if (type === 'sw') {
        w = Math.max(MIN, startCrop.w - dx);
        h = activeAspect ? w / activeAspect : Math.max(MIN, startCrop.h + dy);
        x = startCrop.x + startCrop.w - w;
        x = Math.max(0, x);
        w = startCrop.x + startCrop.w - x;
        if (activeAspect) h = w / activeAspect;
        h = Math.min(h, ch - y);
      } else if (type === 'ne') {
        w = Math.max(MIN, startCrop.w + dx);
        h = activeAspect ? w / activeAspect : Math.max(MIN, startCrop.h - dy);
        y = startCrop.y + startCrop.h - h;
        y = Math.max(0, y);
        h = startCrop.y + startCrop.h - y;
        if (activeAspect) w = h * activeAspect;
        w = Math.min(w, cw - x);
      } else if (type === 'nw') {
        w = Math.max(MIN, startCrop.w - dx);
        h = activeAspect ? w / activeAspect : Math.max(MIN, startCrop.h - dy);
        x = startCrop.x + startCrop.w - w;
        y = startCrop.y + startCrop.h - h;
        x = Math.max(0, x);
        y = Math.max(0, y);
        w = startCrop.x + startCrop.w - x;
        h = startCrop.y + startCrop.h - y;
        if (activeAspect) { w = Math.min(w, h * activeAspect); h = w / activeAspect; }
      }

      setCrop({ x, y, w, h });
    };

    const onMouseUp = () => { dragRef.current = null; };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [activeAspect, containerSize]);

  const handleCrop = () => {
    onCrop?.({ dataUrl: src, x: Math.round(crop.x), y: Math.round(crop.y), width: Math.round(crop.w), height: Math.round(crop.h) });
  };

  const hs: React.CSSProperties = {
    position: 'absolute', width: 12, height: 12,
    background: '#fff', border: '2px solid rgba(0,0,0,0.5)',
    borderRadius: 2, zIndex: 3,
  };

  const { w: cw, h: ch } = containerSize;
  const pct = cw && ch ? {
    left: `${(crop.x / cw) * 100}%`,
    top: `${(crop.y / ch) * 100}%`,
    width: `${(crop.w / cw) * 100}%`,
    height: `${(crop.h / ch) * 100}%`,
  } : { left: '15%', top: '10%', width: '70%', height: '44%' };

  return (
    <div className={`wx-adv-cropper ${className}`}>
      <div
        ref={containerRef}
        className="wx-adv-cropper__viewport"
        style={{ position: 'relative', userSelect: 'none', overflow: 'hidden', minHeight: 240 }}
      >
        {src ? (
          <>
            <img
              src={src} alt="Crop source" draggable={false}
              style={{ display: 'block', width: '100%', maxHeight: 300, objectFit: 'contain', opacity: 0.45 }}
            />

            {/* Overlays outside crop */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              {/* top */}
              <div style={{ position: 'absolute', left: 0, top: 0, right: 0, height: pct.top, background: 'rgba(0,0,0,0.6)' }} />
              {/* bottom */}
              <div style={{ position: 'absolute', left: 0, bottom: 0, right: 0, top: `calc(${pct.top} + ${pct.height})`, background: 'rgba(0,0,0,0.6)' }} />
              {/* left */}
              <div style={{ position: 'absolute', left: 0, top: pct.top, width: pct.left, height: pct.height, background: 'rgba(0,0,0,0.6)' }} />
              {/* right */}
              <div style={{ position: 'absolute', right: 0, top: pct.top, left: `calc(${pct.left} + ${pct.width})`, height: pct.height, background: 'rgba(0,0,0,0.6)' }} />
            </div>

            {/* Crop box */}
            <div
              style={{ position: 'absolute', ...pct, border: '2px solid #fff', boxSizing: 'border-box', cursor: 'move', zIndex: 2 }}
              onMouseDown={(e) => startDrag('move', e)}
            >
              {/* Grid */}
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                {[33.3, 66.6].map(p => (
                  <div key={p} style={{ position: 'absolute', left: `${p}%`, top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.25)' }} />
                ))}
                {[33.3, 66.6].map(p => (
                  <div key={p} style={{ position: 'absolute', top: `${p}%`, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.25)' }} />
                ))}
              </div>
              {/* Handles */}
              <div style={{ ...hs, top: -6, left: -6, cursor: 'nw-resize' }} onMouseDown={(e) => startDrag('nw', e)} />
              <div style={{ ...hs, top: -6, right: -6, cursor: 'ne-resize' }} onMouseDown={(e) => startDrag('ne', e)} />
              <div style={{ ...hs, bottom: -6, left: -6, cursor: 'sw-resize' }} onMouseDown={(e) => startDrag('sw', e)} />
              <div style={{ ...hs, bottom: -6, right: -6, cursor: 'se-resize' }} onMouseDown={(e) => startDrag('se', e)} />
              {/* Size badge */}
              <div style={{ position: 'absolute', bottom: 4, right: 4, background: 'rgba(0,0,0,0.65)', color: '#fff', fontSize: 10, padding: '2px 6px', borderRadius: 3, pointerEvents: 'none' }}>
                {Math.round(crop.w)} × {Math.round(crop.h)} px
              </div>
            </div>
          </>
        ) : (
          <div style={{ color: '#888', textAlign: 'center', padding: 48 }}>
            <div style={{ fontSize: 32 }}>✂️</div>
            <div style={{ fontSize: 13, marginTop: 8 }}>No image — pass src prop</div>
          </div>
        )}
      </div>

      <div className="wx-adv-cropper__controls">
        <div className="wx-adv-cropper__aspects">
          {ASPECTS.map((a) => (
            <button key={a.label} className={`wx-adv-cropper__aspect-btn ${activeAspect === a.value ? 'wx-adv-cropper__aspect-btn--active' : ''}`} onClick={() => handleAspectChange(a.value)} type="button">
              {a.label}
            </button>
          ))}
        </div>
        <button className="wx-adv-cropper__crop-btn" onClick={handleCrop} type="button">Crop</button>
      </div>

      <div style={{ padding: '8px 12px', background: 'var(--wx-color-surface-alt)', fontSize: 12, color: 'var(--wx-color-text-muted)', borderTop: '1px solid var(--wx-adv-card-border)' }}>
        💡 <strong>Drag</strong> the box to move · <strong>Drag corners</strong> to resize · <strong>Aspect buttons</strong> lock proportions · Integrate <strong>react-image-crop</strong> or <strong>cropperjs</strong> for real pixel output
      </div>
    </div>
  );
}
