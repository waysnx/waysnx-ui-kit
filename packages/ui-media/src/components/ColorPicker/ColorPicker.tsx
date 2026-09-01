import { useState, useRef, useCallback, useEffect } from 'react';
import type { ColorPickerProps } from '../../types';

const DEFAULT_SWATCHES = [
  '#ef4444', '#f97316', '#f59e0b', '#22c55e', '#14b8a6',
  '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#64748b',
];

// ─── Color conversion helpers ─────────────────────────────────────────────

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function isValidHex(hex: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(hex);
}

export function ColorPicker({
  value = '#3b82f6',
  onChange,
  showAlpha: _showAlpha = false,
  showSwatches = true,
  swatches = DEFAULT_SWATCHES,
  className = '',
}: ColorPickerProps) {
  const [hsl, setHsl] = useState<[number, number, number]>(() => {
    return isValidHex(value) ? hexToHsl(value) : [220, 90, 56];
  });
  const [hexInput, setHexInput] = useState(value);
  const spectrumRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const draggingSpectrum = useRef(false);
  const draggingHue = useRef(false);

  const [h, s, l] = hsl;
  const currentHex = isValidHex(hexInput) ? hexInput : hslToHex(h, s, l);

  // Sync hex input when hsl changes
  useEffect(() => {
    const hex = hslToHex(h, s, l);
    setHexInput(hex);
    onChange?.(hex);
  }, [h, s, l]);

  // ── Spectrum drag ────────────────────────────────────────────────────────

  const updateFromSpectrum = useCallback((clientX: number, clientY: number) => {
    const el = spectrumRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    // x = saturation, y = lightness inverse
    const newS = Math.round(x * 100);
    const newL = Math.round((1 - y) * 50); // 0–50 range
    setHsl([h, newS, Math.max(1, newL)]);
  }, [h]);

  const onSpectrumMouseDown = useCallback((e: React.MouseEvent) => {
    draggingSpectrum.current = true;
    updateFromSpectrum(e.clientX, e.clientY);
  }, [updateFromSpectrum]);

  // ── Hue drag ─────────────────────────────────────────────────────────────

  const updateFromHue = useCallback((clientX: number) => {
    const el = hueRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setHsl([Math.round(x * 360), s, l]);
  }, [s, l]);

  const onHueMouseDown = useCallback((e: React.MouseEvent) => {
    draggingHue.current = true;
    updateFromHue(e.clientX);
  }, [updateFromHue]);

  // ── Global mouse events ───────────────────────────────────────────────────

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (draggingSpectrum.current) updateFromSpectrum(e.clientX, e.clientY);
      if (draggingHue.current) updateFromHue(e.clientX);
    };
    const onMouseUp = () => {
      draggingSpectrum.current = false;
      draggingHue.current = false;
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [updateFromSpectrum, updateFromHue]);

  // ── Hex input ─────────────────────────────────────────────────────────────

  const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setHexInput(v);
    if (isValidHex(v)) {
      const newHsl = hexToHsl(v);
      setHsl(newHsl);
      onChange?.(v);
    }
  };

  // ── Cursor positions ─────────────────────────────────────────────────────

  const spectrumCursorX = `${s}%`;
  const spectrumCursorY = `${100 - (l / 50) * 100}%`;
  const hueCursorX = `${(h / 360) * 100}%`;
  const pureHueColor = hslToHex(h, 100, 50);

  return (
    <div className={`wx-adv-color-picker ${className}`}>
      {/* Spectrum */}
      <div
        ref={spectrumRef}
        className="wx-adv-color-picker__spectrum"
        style={{
          background: `linear-gradient(to bottom, transparent, #000),
                       linear-gradient(to right, #fff, ${pureHueColor})`,
          cursor: 'crosshair',
          position: 'relative',
          userSelect: 'none',
        }}
        onMouseDown={onSpectrumMouseDown}
      >
        {/* Cursor dot */}
        <div style={{
          position: 'absolute',
          left: spectrumCursorX,
          top: spectrumCursorY,
          width: 14,
          height: 14,
          borderRadius: '50%',
          border: '2px solid #fff',
          boxShadow: '0 0 0 1px rgba(0,0,0,0.4)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          background: currentHex,
        }} />
      </div>

      {/* Hue slider */}
      <div
        ref={hueRef}
        className="wx-adv-color-picker__hue"
        style={{
          background: 'linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)',
          position: 'relative',
          cursor: 'ew-resize',
          userSelect: 'none',
        }}
        onMouseDown={onHueMouseDown}
      >
        {/* Hue cursor */}
        <div style={{
          position: 'absolute',
          left: hueCursorX,
          top: '50%',
          width: 14,
          height: 14,
          borderRadius: '50%',
          border: '2px solid #fff',
          boxShadow: '0 0 0 1px rgba(0,0,0,0.4)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          background: pureHueColor,
        }} />
      </div>

      {/* Input row */}
      <div className="wx-adv-color-picker__input-row">
        <div className="wx-adv-color-picker__preview" style={{ background: currentHex }} />
        <input
          className="wx-adv-color-picker__hex-input"
          type="text"
          value={hexInput}
          onChange={handleHexInput}
          aria-label="Hex color value"
          maxLength={7}
        />
      </div>

      {/* Swatches */}
      {showSwatches && (
        <div className="wx-adv-color-picker__swatches">
          {swatches.map((swatch) => (
            <button
              key={swatch}
              className={`wx-adv-color-picker__swatch ${currentHex.toLowerCase() === swatch.toLowerCase() ? 'wx-adv-color-picker__swatch--active' : ''}`}
              style={{ background: swatch }}
              onClick={() => {
                if (isValidHex(swatch)) {
                  setHsl(hexToHsl(swatch));
                  setHexInput(swatch);
                  onChange?.(swatch);
                }
              }}
              aria-label={`Select color ${swatch}`}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  );
}
