import { useState } from 'react';
import type { BarcodeScannerProps } from '../../types';

export function BarcodeScanner({ onScan: _onScan, onError: _onError, active = true, className = '' }: BarcodeScannerProps) {
  const [scanning, setScanning] = useState(active);

  return (
    <div className={`wx-adv-scanner ${className}`} role="region" aria-label="Barcode Scanner">
      <div className="wx-adv-scanner__viewport">
        {scanning ? (
          <div style={{ color: '#fff', textAlign: 'center' }}>
            <div style={{ fontSize: 32 }}>📷</div>
            <div>Camera feed — connect a barcode library</div>
          </div>
        ) : (
          <div style={{ color: '#888', textAlign: 'center' }}>
            <div style={{ fontSize: 32 }}>⏸</div>
            <div>Scanner paused</div>
          </div>
        )}
      </div>
      {scanning && (
        <div className="wx-adv-scanner__overlay">
          <div className="wx-adv-scanner__frame" style={{ borderRadius: 4, width: 250, height: 80 }} />
        </div>
      )}
      <div style={{ display: 'flex', gap: 8, padding: 12, background: '#111' }}>
        <button
          onClick={() => setScanning(v => !v)}
          style={{ flex: 1, padding: 8, background: 'var(--wx-color-primary, #2563eb)', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}
          type="button"
        >
          {scanning ? '⏹ Stop' : '▶ Scan Barcode'}
        </button>
      </div>
      <div className="wx-adv-scanner__status">{scanning ? 'Scanning...' : 'Paused'}</div>
    </div>
  );
}
