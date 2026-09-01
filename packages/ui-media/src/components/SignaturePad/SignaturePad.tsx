import { useRef, useEffect } from 'react';
import type { SignaturePadProps } from '../../types';

export function SignaturePad({
  onSave,
  onClear,
  penColor = 'var(--wx-adv-signature-pen-color)',
  penWidth = 2,
  backgroundColor: _backgroundColor = 'var(--wx-adv-signature-bg)',
  width = '100%',
  height = 200,
  className = '',
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const isEmptyRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = height as number;
  }, [height]);

  const getCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    isDrawingRef.current = true;
    const { x, y } = getCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    isEmptyRef.current = false;
  };

  const stopDrawing = () => { isDrawingRef.current = false; };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    isEmptyRef.current = true;
    onClear?.();
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    onSave?.({ dataUrl: canvas.toDataURL('image/png'), isEmpty: isEmptyRef.current, timestamp: new Date() });
  };

  return (
    <div className={`wx-adv-signature-pad ${className}`}>
      <canvas
        ref={canvasRef}
        className="wx-adv-signature-pad__canvas"
        style={{ width, height }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        aria-label="Signature pad"
        role="img"
      />
      <div className="wx-adv-signature-pad__actions">
        <button className="wx-adv-signature-pad__btn" onClick={handleClear} type="button">Clear</button>
        <button className="wx-adv-signature-pad__btn wx-adv-signature-pad__btn--primary" onClick={handleSave} type="button">Save Signature</button>
      </div>
    </div>
  );
}
