import { useRef, useEffect } from 'react';
import type { QRCodeProps } from '../../types';

/**
 * Simple QR code generator using a canvas-based pattern.
 * For production, consumers would integrate a library like 'qrcode' or 'qrcode.react'.
 * This component provides the UI shell + download functionality.
 */
export function QRCode({
  value,
  size = 200,
  fgColor = '#000000',
  bgColor = '#ffffff',
  showDownload = true,
  className = '',
}: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw placeholder QR pattern (real impl would use qrcode library)
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = fgColor;

    const moduleSize = size / 25;
    // Draw corner patterns
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        if (i === 0 || i === 6 || j === 0 || j === 6 || (i >= 2 && i <= 4 && j >= 2 && j <= 4)) {
          ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize, moduleSize);
          ctx.fillRect((size - 7 * moduleSize) + i * moduleSize, j * moduleSize, moduleSize, moduleSize);
          ctx.fillRect(i * moduleSize, (size - 7 * moduleSize) + j * moduleSize, moduleSize, moduleSize);
        }
      }
    }
    // Draw data area (simplified random pattern based on value hash)
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0;
    }
    for (let x = 8; x < 17; x++) {
      for (let y = 8; y < 17; y++) {
        if ((hash + x * y) % 3 !== 0) {
          ctx.fillRect(x * moduleSize, y * moduleSize, moduleSize, moduleSize);
        }
      }
    }
  }, [value, size, fgColor, bgColor]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className={`wx-adv-qr ${className}`}>
      <div className="wx-adv-qr__canvas">
        <canvas ref={canvasRef} width={size} height={size} aria-label={`QR Code: ${value}`} role="img" />
      </div>
      {showDownload && (
        <button className="wx-adv-qr__download-btn" onClick={handleDownload} type="button">
          ⬇ Download PNG
        </button>
      )}
    </div>
  );
}
