# ZoomControls

Provide zoom in/out controls for interactive visualizations.

## Purpose

Provide zoom in/out controls for interactive visualizations

## Installation

```bash
npm install @waysnx/ui-visualization
```

## Import

```typescript
import { ZoomControls } from '@waysnx/ui-visualization';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `zoom` | `number` | — | Yes |  |
| `onZoomIn` | `() => void` | — | Yes |  |
| `onZoomOut` | `() => void` | — | Yes |  |
| `onFitView` | `() => void` | — | No |  |
| `onResetZoom` | `() => void` | — | No |  |
| `className` | `string` | — | No |  |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

View Interactive Storybook

## Used By

This component is used by:

- OrgChart
- Tree

## When to Use

Use this component when you need to:

- Use ZoomControls for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use ZoomControls for general-purpose components functionality

---

**Library:** `@waysnx/ui-visualization`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, zoomcontrols

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
