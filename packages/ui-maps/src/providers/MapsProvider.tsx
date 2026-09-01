import { createContext, useContext, type ReactNode } from 'react';
import type { MapsConfig, MapsAdapter, GeoCoordinates } from '../types';

export interface MapsContextType {
  adapter: MapsAdapter | null;
  config: MapsConfig;
  defaultCenter: GeoCoordinates;
  defaultZoom: number;
}

const MapsContext = createContext<MapsContextType | null>(null);

export interface MapsProviderProps {
  config: MapsConfig;
  children: ReactNode;
}

export function MapsProvider({ config, children }: MapsProviderProps) {
  const value: MapsContextType = {
    adapter: config.adapter || null,
    config,
    defaultCenter: config.defaultCenter || { lat: 40.7128, lng: -74.006 },
    defaultZoom: config.defaultZoom || 12,
  };

  return <MapsContext.Provider value={value}>{children}</MapsContext.Provider>;
}

export function useMapsContext(): MapsContextType {
  const context = useContext(MapsContext);
  if (!context) {
    throw new Error('useMapsContext must be used within a MapsProvider');
  }
  return context;
}

export { MapsContext };
