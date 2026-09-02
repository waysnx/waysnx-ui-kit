import { useState } from 'react';
import type { MapViewProps } from '../../types';

/**
 * MapView — ADAPTER-BASED map container.
 *
 * Renders map chrome and controls but does NOT display an interactive map on
 * its own: `@waysnx/ui-maps` bundles no maps vendor SDK. Connect a maps adapter
 * (e.g. Google Maps / Mapbox / custom) via `MapsProvider` to render real tiles
 * and markers. Until then, an informational placeholder is shown. See the
 * package README "Adapter / backend requirement" section.
 */
export function MapView({
  markers = [],
  mapType = 'roadmap',
  onMapClick: _onMapClick,
  showControls = true,
  height = 400,
  className = '',
}: MapViewProps) {
  const [activeType, setActiveType] = useState(mapType);

  return (
    <div className={`wx-adv-map ${className}`} style={{ height }}>
      <div className="wx-adv-map__container">
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🗺️</div>
          <div>Map View</div>
          <div style={{ fontSize: 12, marginTop: 4 }}>Connect a MapsAdapter to render an interactive map</div>
          {markers.length > 0 && <div style={{ fontSize: 12, marginTop: 4 }}>{markers.length} marker(s)</div>}
        </div>
      </div>

      {showControls && (
        <div className="wx-adv-map__controls">
          {(['roadmap', 'satellite'] as const).map((type) => (
            <button
              key={type}
              className={`wx-adv-map__control-btn ${activeType === type ? 'wx-adv-map__control-btn--active' : ''}`}
              onClick={() => setActiveType(type)}
              type="button"
            >
              {type === 'roadmap' ? 'Map' : 'Satellite'}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
