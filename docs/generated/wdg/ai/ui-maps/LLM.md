# Ui Maps - AI Agent Guide

## Overview

**Package:** `@waysnx/ui-maps`
**Version:** `1.0.0`
**Description:** Maps and location components from WaysNX - address search, map views, route planning, and geolocation

---

## Quick Reference

- **Total Components:** 9
- **Installation:** `npm install @waysnx/ui-maps`
- **Latest Version:** `1.0.0`


## Installation & Setup

### NPM

```bash
npm install @waysnx/ui-maps
```

### Yarn

```bash
yarn add @waysnx/ui-maps
```


## Component Catalog

### Components

- **AddressAutocomplete** - Enable rapid address input with autocomplete suggestions
- **AddressSelector** - Enable selection from list of available addresses
- **CurrentLocationButton** - Enable quick access to current device location
- **DistanceCalculator** - Calculate and display distance between two locations
- **GeofenceEditor** - Enable drawing and editing geographic boundaries on a map
- **LocationPicker** - Enable selection of geographic location from map
- **MapMarker** - Display point of interest markers on a map
- **MapView** - MapView — ADAPTER-BASED map container
- **RoutePlanner** - Display and manage routes with turn-by-turn directions


## Component Selection Guide

Choose components based on your needs:

### Display

- `CurrentLocationButton` - Enable quick access to current device location

### Input

- `AddressSelector` - Enable selection from list of available addresses

### Utility

- `AddressAutocomplete` - Enable rapid address input with autocomplete suggestions
- `DistanceCalculator` - Calculate and display distance between two locations
- `GeofenceEditor` - Enable drawing and editing geographic boundaries on a map
- `LocationPicker` - Enable selection of geographic location from map
- `MapMarker` - Display point of interest markers on a map
- `MapView` - MapView — ADAPTER-BASED map container
- `RoutePlanner` - Display and manage routes with turn-by-turn directions


## Common Usage Patterns

### Basic Usage

```typescript
import { Component } from '@waysnx/{library}';

export function MyComponent() {
  return <Component />;
}
```

### Composition

Common component combinations:

- **AddressAutocomplete** is often used with other input components
- **AddressSelector** is often used with other input components
- **CurrentLocationButton** is often used with other input components


## Common Mistakes & Anti-Patterns

Avoid these patterns when using components from this library:

- **Prop Drilling:** Use Context or composition instead of passing props deeply
- **Missing a11y:** Always include ARIA labels and semantic HTML
- **Hardcoded Values:** Use design tokens and theme values instead
- **Missing Error Handling:** Always handle loading and error states

See individual component documentation for specific anti-patterns.


## Package Dependencies

### Runtime Dependencies

- `@waysnx/ui-i18n` (`workspace:*`)
- `dompurify` (`^3.3.1`)

### Peer Dependencies

Your project must provide:

- `react` (`>=18`)
- `react-dom` (`>=18`)


## AI Guidance

This library is optimized for AI code generation and documentation search.

### Component Metadata

**AddressAutocomplete**
- Keywords: components, addressautocomplete

**AddressSelector**
- Keywords: components, addressselector

**CurrentLocationButton**
- Keywords: components, currentlocationbutton

### Searchable Metadata

Components are indexed with:

- **Keywords:** For semantic search
- **Aliases:** Alternative names AI agents might search for
- **Semantic Categories:** Classification for AI recommendations
- **Use Cases:** AI understands when to suggest each component
- **Anti-patterns:** AI avoids suggesting incorrect usage

### Querying Components

AI agents can answer:

- 'Which component should I use for X?'
- 'What are the props for Component Y?'
- 'What components work with X?'
- 'Show me examples of Z'
- 'What are the accessibility features?'


## References & Documentation

- [Component Documentation](./components/) - Detailed component docs
- [Design System](./library.json) - Library metadata
- [Component Relationships](./relationships.json) - Dependency graph
- [Search Index](./search-index.json) - Full-text search data

## Support

For issues or questions:

- Check component-specific documentation
- Review examples in Storybook
- File issues on GitHub

