# Hierarchy

Visualize organizational or hierarchical relationships.

## Purpose

Visualize organizational or hierarchical relationships

## Installation

```bash
npm install @waysnx/ui-visualization
```

## Import

```typescript
import { Hierarchy } from '@waysnx/ui-visualization';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `nodes` | `VisNode[]` | — | Yes |  |
| `width` | `number | string` | — | No |  |
| `height` | `number | string` | — | No |  |
| `onNodeClick` | `(event: VisNodeEvent) => void` | — | No |  |
| `onSelectionChange` | `(selectedIds: string[]) => void` | — | No |  |
| `renderNode` | `(node: LayoutNode) => React.ReactNode` | — | No |  |
| `showMiniMap` | `boolean` | — | No |  |
| `showToolbar` | `boolean` | — | No |  |
| `showGrid` | `boolean` | — | No |  |
| `dark` | `boolean` | — | No |  |
| `className` | `string` | — | No |  |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/visualization-hierarchy)

## Related Components

- **Connector** — Hierarchy depends on Connector
- **MiniMap** — Hierarchy depends on MiniMap
- **Toolbar** — Hierarchy depends on Toolbar
- **TreeNode** — Hierarchy depends on TreeNode

## When to Use

Use this component when you need to:

- Use Hierarchy for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Hierarchy for general-purpose components functionality

---

**Library:** `@waysnx/ui-visualization`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** hierarchy, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
