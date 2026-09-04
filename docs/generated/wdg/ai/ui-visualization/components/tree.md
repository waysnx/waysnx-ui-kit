# Tree

Display hierarchical tree structure with expandable nodes.

## Purpose

Display hierarchical tree structure with expandable nodes

## Installation

```bash
npm install @waysnx/ui-visualization
```

## Import

```typescript
import { Tree } from '@waysnx/ui-visualization';
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
| `showZoomControls` | `boolean` | — | No |  |
| `showGrid` | `boolean` | — | No |  |
| `dark` | `boolean` | — | No |  |
| `className` | `string` | — | No |  |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-tree)

## Related Components

- **Connector** — Tree depends on Connector
- **TreeNode** — Tree depends on TreeNode
- **ZoomControls** — Tree depends on ZoomControls

## When to Use

Use this component when you need to:

- Use Tree for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Tree for general-purpose components functionality

---

**Library:** `@waysnx/ui-visualization`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, tree

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
