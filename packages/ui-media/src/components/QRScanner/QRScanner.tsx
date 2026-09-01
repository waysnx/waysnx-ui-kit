import { useState } from 'react';
import type { QRScannerProps } from '../../types';

export function QRScanner({ onScan: _onScan, onError: _onError, active = true, className = '' }: QRScannerProps) {
  const [scanning, setScanning] = useState(active);

  const handleToggle = () => setScanning(v => !v);

  return (
    <div className={`wx-adv-scanner ${className}`} role="region" aria-label="QR Scanner">
      <div className="wx-adv-scanner__viewport">
        {scanning ? (
          <div style={{ color: '#fff', textAlign: 'center' }}>
            <div style={{ fontSize: 32 }}>📷</div>
            <div>Camera feed — connect a QR scanning library</div>
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
          <div className="wx-adv-scanner__frame" />
        </div>
      )}
      <div style={{ display: 'flex', gap: 8, padding: 12, background: '#111' }}>
        <button
          onClick={handleToggle}
          style={{ flex: 1, padding: '8px', background: 'var(--wx-color-primary, #2563eb)', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}
          type="button"
        >
          {scanning ? '⏹ Stop' : '▶ Scan QR Code'}
        </button>
      </div>
      <div className="wx-adv-scanner__status">{scanning ? 'Scanning...' : 'Paused'}</div>
    </div>
  );
}
