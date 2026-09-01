/**
 * @file index.ts
 * Main barrel export for @waysnx/ui-maps
 */

import './styles/index.css';

export * from './types';
export { MapsProvider, useMapsContext } from './providers/MapsProvider';
export type { MapsProviderProps, MapsContextType } from './providers/MapsProvider';
export * from './components';
export { useCurrentLocation } from './hooks/useCurrentLocation';
export type { UseCurrentLocationReturn } from './hooks/useCurrentLocation';
