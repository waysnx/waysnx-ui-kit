# Toolbar

Display tool or action buttons for interactive visualizations.

## Purpose

Display tool or action buttons for interactive visualizations

## Installation

```bash
npm install @waysnx/ui-visualization
```

## Import

```typescript
import { Toolbar } from '@waysnx/ui-visualization';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `position` | `ToolbarPosition` | — | No |  |
| `actions` | `ToolbarAction[]` | — | No |  |
| `showZoom` | `boolean` | — | No |  |
| `zoom` | `number` | — | No |  |
| `onZoomIn` | `() => void` | — | No |  |
| `onZoomOut` | `() => void` | — | No |  |
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

- Hierarchy
- OrgChart

## When to Use

Use this component when you need to:

- Use Toolbar for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Toolbar for general-purpose components functionality

---

**Library:** `@waysnx/ui-visualization`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** toolbar, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
