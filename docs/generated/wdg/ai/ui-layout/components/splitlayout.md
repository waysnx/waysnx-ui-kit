# SplitLayout

Create a two-panel layout with resizable divider.

## Purpose

Create a two-panel layout with resizable divider

## Installation

```bash
npm install @waysnx/ui-layout
```

## Import

```typescript
import { SplitLayout } from '@waysnx/ui-layout';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `[React.ReactNode, React.ReactNode]` | — | Yes |  |
| `direction` | `'horizontal' | 'vertical'` | — | No |  |
| `initialSize` | `number` | — | No |  |
| `minSize` | `number` | — | No |  |
| `maxSize` | `number` | — | No |  |
| `className` | `string` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-border` | background | .split-layout-divider | 1 |
| `--wx-color-text-light` | background | .split-layout-divider:hover, .split-layout-divider-handle | 2 |
| `--wx-color-text-muted` | background | .split-layout-divider:hover .split-layout-divider-handle | 1 |
| `--wx-color-primary` | background | .split-layout-dragging .split-layout-divider, .split-layout-dragging .split-layout-divider-handle | 2 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

View Interactive Storybook

## When to Use

Use this component when you need to:

- Use SplitLayout for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use SplitLayout for general-purpose components functionality

---

**Library:** `@waysnx/ui-layout`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** splitlayout, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
