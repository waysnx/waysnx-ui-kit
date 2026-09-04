# GridToolbar

GridToolbar component

## Purpose

GridToolbar component

## Installation

```bash
npm install @waysnx/ui-grid-builder
```

## Import

```typescript
import { GridToolbar } from '@waysnx/ui-grid-builder';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `title` | `string` | — | No |  |
| `totalCount` | `number` | — | Yes |  |
| `columns` | `GridColumn[]` | — | Yes |  |
| `onVisibilityChange` | `(key: string, visible: boolean) => void` | — | Yes |  |
| `showColumnToggle` | `boolean` | — | Yes |  |
| `showGlobalFilter` | `boolean` | — | No |  |
| `globalFilter` | `string` | — | No |  |
| `onGlobalFilterChange` | `(value: string) => void` | — | No |  |
| `toolbarActions` | `React.ReactNode` | — | No |  |
| `colDropdownOpen` | `boolean` | — | Yes |  |
| `setColDropdownOpen` | `(open: boolean) => void` | — | Yes |  |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

View Interactive Storybook

## When to Use

Use this component when you need to:

- Use GridToolbar for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use GridToolbar for general-purpose components functionality

---

**Library:** `@waysnx/ui-grid-builder`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** gridtoolbar, components

**Semantic Category:** layout

This component is indexed for AI agents, RAG pipelines, and documentation search.
