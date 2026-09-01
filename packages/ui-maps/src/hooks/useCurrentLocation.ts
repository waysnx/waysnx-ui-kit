import { useState, useCallback } from 'react';
import type { GeoCoordinates } from '../types';

export interface UseCurrentLocationReturn {
  location: GeoCoordinates | null;
  loading: boolean;
  error: string | null;
  getLocation: () => void;
}

export function useCurrentLocation(): UseCurrentLocationReturn {
  const [location, setLocation] = useState<GeoCoordinates | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  }, []);

  return { location, loading, error, getLocation };
}
