# MiniMap

Display a zoomed-out overview of large visualizations.

## Purpose

Display a zoomed-out overview of large visualizations

## Installation

```bash
npm install @waysnx/ui-visualization
```

## Import

```typescript
import { MiniMap } from '@waysnx/ui-visualization';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `state` | `MiniMapState` | — | Yes |  |
| `totalWidth` | `number` | — | Yes |  |
| `totalHeight` | `number` | — | Yes |  |
| `onNavigate` | `(relX: number, relY: number) => void` | — | Yes |  |
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

- Hierarchy
- OrgChart

## When to Use

Use this component when you need to:

- Use MiniMap for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use MiniMap for general-purpose components functionality

---

**Library:** `@waysnx/ui-visualization`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, minimap

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
