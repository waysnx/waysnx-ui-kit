/**
 * @file types/index.ts
 * Core type definitions for @waysnx/ui-maps
 */

// ─── Maps & Address ─────────────────────────────────────────────────────────

export interface GeoCoordinates {
  lat: number;
  lng: number;
}

export interface Address {
  id?: string;
  formatted: string;
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  coordinates?: GeoCoordinates;
}

export interface AddressSuggestion {
  id: string;
  description: string;
  mainText: string;
  secondaryText: string;
}

export type TransportMode = 'driving' | 'walking' | 'cycling' | 'transit';

export interface RouteStop {
  id: string;
  address: Address;
  order: number;
}

export interface RouteInfo {
  distance: string;
  duration: string;
  distanceMeters: number;
  durationSeconds: number;
  polyline?: GeoCoordinates[];
}

export interface MapMarkerData {
  id: string;
  position: GeoCoordinates;
  title?: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface GeofenceZone {
  id: string;
  name: string;
  center: GeoCoordinates;
  radius: number; // meters
  color?: string;
}

export interface MapsAdapter {
  initialize(container: HTMLElement, options: MapOptions): Promise<void>;
  setCenter(coords: GeoCoordinates): void;
  setZoom(level: number): void;
  addMarker(marker: MapMarkerData): string;
  removeMarker(id: string): void;
  fitBounds(markers: MapMarkerData[]): void;
  destroy(): void;
}

export interface MapsConfig {
  adapter?: MapsAdapter;
  apiKey?: string;
  provider?: 'google' | 'osm' | 'mapbox' | 'here' | 'leaflet' | 'custom';
  defaultCenter?: GeoCoordinates;
  defaultZoom?: number;
}

export interface MapOptions {
  center: GeoCoordinates;
  zoom: number;
  mapType?: 'roadmap' | 'satellite' | 'terrain';
}

// ─── Component Props ─────────────────────────────────────────────────────────

export interface AddressSelectorProps {
  value?: Address;
  onChange?: (address: Address) => void;
  onSearch?: (query: string) => void;
  suggestions?: AddressSuggestion[];
  placeholder?: string;
  showCurrentLocation?: boolean;
  loading?: boolean;
  className?: string;
}

export interface AddressAutocompleteProps {
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (address: Address) => void;
  suggestions?: AddressSuggestion[];
  onSearch?: (query: string) => void;
  placeholder?: string;
  loading?: boolean;
  className?: string;
}

export interface MapViewProps {
  center?: GeoCoordinates;
  zoom?: number;
  markers?: MapMarkerData[];
  mapType?: 'roadmap' | 'satellite' | 'terrain';
  onMapClick?: (coords: GeoCoordinates) => void;
  onMarkerClick?: (marker: MapMarkerData) => void;
  showControls?: boolean;
  height?: string | number;
  className?: string;
}

export interface DistanceCalculatorProps {
  from?: Address;
  to?: Address;
  mode?: TransportMode;
  onCalculate?: (route: RouteInfo) => void;
  onFromChange?: (address: Address) => void;
  onToChange?: (address: Address) => void;
  onModeChange?: (mode: TransportMode) => void;
  className?: string;
}

export interface RoutePlannerProps {
  stops?: RouteStop[];
  mode?: TransportMode;
  onStopsChange?: (stops: RouteStop[]) => void;
  onCalculate?: (routes: RouteInfo[]) => void;
  showGetDirections?: boolean;
  className?: string;
}

export interface CurrentLocationButtonProps {
  onLocation?: (coords: GeoCoordinates) => void;
  onError?: (error: GeolocationPositionError) => void;
  loading?: boolean;
  className?: string;
}

export interface LocationPickerProps {
  value?: GeoCoordinates;
  onChange?: (coords: GeoCoordinates) => void;
  zoom?: number;
  height?: string | number;
  className?: string;
}

export interface GeofenceEditorProps {
  zones?: GeofenceZone[];
  onChange?: (zones: GeofenceZone[]) => void;
  center?: GeoCoordinates;
  zoom?: number;
  height?: string | number;
  className?: string;
}
