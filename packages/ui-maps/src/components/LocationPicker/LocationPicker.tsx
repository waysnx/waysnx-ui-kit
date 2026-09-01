import type { LocationPickerProps } from '../../types';

export function LocationPicker({ value, height = 300, className = '' }: LocationPickerProps) {
  const coords = value || { lat: 40.7128, lng: -74.006 };

  return (
    <div className={`wx-adv-map ${className}`} style={{ height }}>
      <div className="wx-adv-map__container" style={{ flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 28 }}>📍</div>
        <div style={{ fontWeight: 500 }}>Location Picker</div>
        <div style={{ fontSize: 12 }}>Connect a MapsAdapter to enable click-to-pick</div>
        <div style={{ fontSize: 13, fontFamily: 'monospace', marginTop: 8, padding: '6px 12px', background: 'var(--wx-color-surface-alt)', borderRadius: 6 }}>
          {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}
        </div>
      </div>
    </div>
  );
}
