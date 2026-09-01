import { useRef, useEffect } from 'react';
import type { BarcodeProps } from '../../types';

export function Barcode({
  value,
  format: _format = 'CODE128',
  width = 280,
  height = 80,
  displayValue = true,
  showDownload = true,
  className = '',
}: BarcodeProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Draw simplified barcode pattern (production: use jsbarcode library)
    const barCount = 60;
    const barWidth = width / (barCount * 1.5);
    let xPos = 8;

    // Clear
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    // Background
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('width', String(width));
    bg.setAttribute('height', String(height + (displayValue ? 20 : 0)));
    bg.setAttribute('fill', '#ffffff');
    svg.appendChild(bg);

    // Bars
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0;
    }

    for (let i = 0; i < barCount; i++) {
      if (((hash >> i) & 1) || i % 3 === 0) {
        const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bar.setAttribute('x', String(xPos));
        bar.setAttribute('y', '4');
        bar.setAttribute('width', String(barWidth));
        bar.setAttribute('height', String(height - 8));
        bar.setAttribute('fill', '#000000');
        svg.appendChild(bar);
      }
      xPos += barWidth * 1.5;
    }

    // Value label
    if (displayValue) {
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', String(width / 2));
      text.setAttribute('y', String(height + 14));
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('font-size', '12');
      text.setAttribute('font-family', 'monospace');
      text.textContent = value;
      svg.appendChild(text);
    }
  }, [value, width, height, displayValue]);

  const handleDownload = () => {
    const svg = svgRef.current;
    if (!svg) return;
    const data = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([data], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'barcode.svg';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`wx-adv-barcode ${className}`}>
      <svg
        ref={svgRef}
        width={width}
        height={height + (displayValue ? 20 : 0)}
        aria-label={`Barcode: ${value}`}
        role="img"
      />
      {showDownload && (
        <button className="wx-adv-barcode__download-btn" onClick={handleDownload} type="button">
          ⬇ Download SVG
        </button>
      )}
    </div>
  );
}
