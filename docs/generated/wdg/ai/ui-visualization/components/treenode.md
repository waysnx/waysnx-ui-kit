# TreeNode

Represent a single node within a hierarchical tree structure.

## Purpose

Represent a single node within a hierarchical tree structure

## Installation

```bash
npm install @waysnx/ui-visualization
```

## Import

```typescript
import { TreeNode } from '@waysnx/ui-visualization';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `node` | `LayoutNode` | — | Yes |  |
| `isSelected` | `boolean` | — | No |  |
| `isDragging` | `boolean` | — | No |  |
| `isDragOver` | `boolean` | — | No |  |
| `canDropHere` | `boolean` | — | No |  |
| `onClick` | `(event: VisNodeEvent) => void` | — | No |  |
| `onDoubleClick` | `(event: VisNodeEvent) => void` | — | No |  |
| `onContextMenu` | `(event: VisNodeEvent) => void` | — | No |  |
| `onToggleExpand` | `(nodeId: string) => void` | — | No |  |
| `onDragStart` | `(nodeId: string) => void` | — | No |  |
| `onDragOver` | `(nodeId: string) => void` | — | No |  |
| `onDrop` | `(nodeId: string) => void` | — | No |  |
| `enableDragDrop` | `boolean` | — | No |  |
| `renderNode` | `(node: LayoutNode) => React.ReactNode` | — | No |  |
| `hasChildren` | `boolean` | — | No |  |
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
- Tree

## When to Use

Use this component when you need to:

- Use TreeNode for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use TreeNode for general-purpose components functionality

---

**Library:** `@waysnx/ui-visualization`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, treenode

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
