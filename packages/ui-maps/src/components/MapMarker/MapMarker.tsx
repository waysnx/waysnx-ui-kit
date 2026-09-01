import type { MapMarkerData } from '../../types';

interface MapMarkerProps {
  marker: MapMarkerData;
  onClick?: (marker: MapMarkerData) => void;
  className?: string;
}

export function MapMarker({ marker, onClick, className = '' }: MapMarkerProps) {
  return (
    <div
      className={className}
      style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', cursor: onClick ? 'pointer' : 'default' }}
      onClick={() => onClick?.(marker)}
      role={onClick ? 'button' : undefined}
      aria-label={marker.title || 'Map marker'}
      tabIndex={onClick ? 0 : undefined}
    >
      <div style={{ fontSize: 28, color: marker.color || 'var(--wx-color-primary, #2563eb)', lineHeight: 1 }}>📍</div>
      {marker.title && (
        <div style={{ fontSize: 11, fontWeight: 500, background: 'var(--wx-color-surface)', border: '1px solid var(--wx-color-border)', borderRadius: 4, padding: '2px 6px', marginTop: 2, whiteSpace: 'nowrap', boxShadow: 'var(--wx-shadow-sm)' }}>
          {marker.title}
        </div>
      )}
    </div>
  );
}
