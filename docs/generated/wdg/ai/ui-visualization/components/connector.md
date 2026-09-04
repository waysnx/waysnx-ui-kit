# Connector

Draw connections between elements to show relationships.

## Purpose

Draw connections between elements to show relationships

## Installation

```bash
npm install @waysnx/ui-visualization
```

## Import

```typescript
import { Connector } from '@waysnx/ui-visualization';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `edge` | `VisEdge` | — | Yes |  |
| `sourceNode` | `LayoutNode` | — | Yes |  |
| `targetNode` | `LayoutNode` | — | Yes |  |
| `isSelected` | `boolean` | — | No |  |
| `onClick` | `(edgeId: string) => void` | — | No |  |

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

- Use Connector for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Connector for general-purpose components functionality

---

**Library:** `@waysnx/ui-visualization`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, connector

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
