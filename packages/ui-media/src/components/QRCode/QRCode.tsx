import { useRef, useEffect, useState } from 'react';
import QRCodeLib from 'qrcode';
import type { QRCodeProps } from '../../types';

/**
 * QRCode — renders a real, scannable QR code to a canvas using the `qrcode`
 * library, with optional PNG download.
 *
 * The encoded payload is the raw `value` string (URLs, text, `otpauth://`
 * URIs, etc.). Colors, size and error-correction level are configurable.
 */
export function QRCode({
  value,
  size = 200,
  fgColor = '#000000',
  bgColor = '#ffffff',
  errorCorrection = 'M',
  showDownload = true,
  className = '',
}: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;

    QRCodeLib.toCanvas(
      canvas,
      value,
      {
        width: size,
        margin: 1,
        errorCorrectionLevel: errorCorrection,
        color: { dark: fgColor, light: bgColor },
      },
      (err) => {
        if (cancelled) return;
        setError(err ? 'Failed to generate QR code' : '');
      }
    );

    return () => {
      cancelled = true;
    };
  }, [value, size, fgColor, bgColor, errorCorrection]);

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
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          aria-label={`QR Code: ${value}`}
          role="img"
        />
        {error && (
          <div className="wx-adv-qr__error" role="alert" style={{ color: 'var(--wx-color-danger, #d4183d)', fontSize: 12 }}>
            {error}
          </div>
        )}
      </div>
      {showDownload && !error && (
        <button className="wx-adv-qr__download-btn" onClick={handleDownload} type="button">
          ⬇ Download PNG
        </button>
      )}
    </div>
  );
}
