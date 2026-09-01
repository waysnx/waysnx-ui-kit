# @waysnx/ui-maps

Maps and location components from WaysNX — address search, map views, route planning, and geolocation.

## Installation

```bash
npm install @waysnx/ui-maps
```

Requires `react` and `react-dom` (>=18) as peer dependencies.

If your bundler does not import package CSS automatically, include the stylesheet:

```ts
import "@waysnx/ui-maps/dist/index.css";
```

## Overview

`@waysnx/ui-maps` provides maps and location UI — map views and markers, address search and selection, geolocation, distance calculation, route planning, and geofence editing. A `MapsProvider` and a location hook support shared maps configuration and state.

## Representative exports

- Map display: `MapView`, `MapMarker`, `GeofenceEditor`
- Location & address: `AddressSelector`, `AddressAutocomplete`, `LocationPicker`, `CurrentLocationButton`, `DistanceCalculator`, `RoutePlanner`
- Provider & hooks: `MapsProvider`, `useMapsContext`, `useCurrentLocation`

See the documentation site for the complete, authoritative export and prop reference.

## Usage

```tsx
import { MapsProvider, MapView } from "@waysnx/ui-maps";

export function Example() {
  return (
    <MapsProvider>
      <MapView />
    </MapsProvider>
  );
}
```

## Documentation

Full component and API reference: https://uikit.waysnx.tech
