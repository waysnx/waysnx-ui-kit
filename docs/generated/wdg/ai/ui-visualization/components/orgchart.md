# OrgChart

Display organizational structure and reporting relationships.

## Purpose

Display organizational structure and reporting relationships

## Installation

```bash
npm install @waysnx/ui-visualization
```

## Import

```typescript
import { OrgChart } from '@waysnx/ui-visualization';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `nodes` | `VisNode[]` | — | Yes |  |
| `edges` | `VisEdge[]` | — | No |  |
| `config` | `VisualizationConfig` | — | No |  |
| `width` | `number | string` | — | No |  |
| `height` | `number | string` | — | No |  |
| `onNodeClick` | `(event: VisNodeEvent) => void` | — | No |  |
| `onNodeDoubleClick` | `(event: VisNodeEvent) => void` | — | No |  |
| `onSelectionChange` | `(selectedIds: string[]) => void` | — | No |  |
| `renderNode` | `(node: LayoutNode) => React.ReactNode` | — | No |  |
| `showToolbar` | `boolean` | — | No |  |
| `showMiniMap` | `boolean` | — | No |  |
| `showSearch` | `boolean` | — | No |  |
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

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/visualization-orgchart)

## Related Components

- **Connector** — OrgChart depends on Connector
- **DEFAULT_VIRTUALIZE_THRESHOLD** — OrgChart is related to DEFAULT_VIRTUALIZE_THRESHOLD
- **MiniMap** — OrgChart depends on MiniMap
- **SearchBox** — OrgChart depends on SearchBox
- **Toolbar** — OrgChart depends on Toolbar
- **TreeNode** — OrgChart depends on TreeNode
- **VirtualizationEngine** — OrgChart is related to VirtualizationEngine
- **ZoomControls** — OrgChart depends on ZoomControls

## When to Use

Use this component when you need to:

- Use OrgChart for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use OrgChart for general-purpose components functionality

---

**Library:** `@waysnx/ui-visualization`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, orgchart

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
