import { useState } from 'react';
import type { CurrentLocationButtonProps } from '../../types';

export function CurrentLocationButton({ onLocation, onError, className = '' }: CurrentLocationButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (!navigator.geolocation) { onError?.(new GeolocationPositionError()); return; }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => { setLoading(false); onLocation?.({ lat: pos.coords.latitude, lng: pos.coords.longitude }); },
      (err) => { setLoading(false); onError?.(err); },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <button className={`wx-adv-address-selector__current-location ${className}`} onClick={handleClick} disabled={loading} type="button" aria-label="Use current location">
      {loading ? '⏳' : '📍'} {loading ? 'Getting location...' : 'Use my current location'}
    </button>
  );
}
