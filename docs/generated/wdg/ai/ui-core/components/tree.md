# Tree

Display hierarchical data with expandable nodes and checkboxes for selection.

## Purpose

Display hierarchical data with expandable nodes and checkboxes for selection

## Installation

```bash
npm install @waysnx/ui-core
```

## Import

```typescript
import { Tree } from '@waysnx/ui-core';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `data` | `TreeNode[]` | — | Yes |  |
| `label` | `string` | — | No |  |
| `className` | `string` | — | No |  |
| `ariaLabel` | `string` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-text` | color | .wx-tree-label-header, .wx-tree-label | 2 |
| `--wx-color-primary` | accent-color | .wx-tree-checkbox | 1 |
| `--wx-color-border` | border-left, background-color | .wx-tree-children, .wx-tree-children > li::before | 2 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-tree)

## When to Use

Use this component when you need to:

- Use Tree for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Tree for general-purpose components functionality

---

**Library:** `@waysnx/ui-core`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** label, tree, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
