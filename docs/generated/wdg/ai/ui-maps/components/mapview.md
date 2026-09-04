# MapView

MapView — ADAPTER-BASED map container. Renders map chrome and controls but does NOT display an interactive map on its own: `@waysnx/ui-maps` bundles no maps vendor SDK. Connect a maps adapter (e.g. Google Maps / Mapbox / custom) via `MapsProvider` to render real tiles and markers. Until then, an informational placeholder is shown. See the package README "Adapter / backend requirement" section.

## Purpose

MapView — ADAPTER-BASED map container

## Installation

```bash
npm install @waysnx/ui-maps
```

## Import

```typescript
import { MapView } from '@waysnx/ui-maps';
```

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/maps-mapview)

## When to Use

Use this component when you need to:

- Use MapView for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use MapView for general-purpose components functionality

---

**Library:** `@waysnx/ui-maps`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** mapview, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
