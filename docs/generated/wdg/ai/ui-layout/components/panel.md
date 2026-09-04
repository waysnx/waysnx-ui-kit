# Panel

Create a contained panel or section with consistent styling.

## Purpose

Create a contained panel or section with consistent styling

## Installation

```bash
npm install @waysnx/ui-layout
```

## Import

```typescript
import { Panel } from '@waysnx/ui-layout';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `React.ReactNode` | — | Yes |  |
| `className` | `string` | — | No |  |
| `title` | `string` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-surface` | background | .wx-panel | 1 |
| `--wx-color-border` | border | .wx-panel | 1 |
| `--wx-color-text` | color | .wx-panel, .wx-panel-title | 2 |

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-size-sm` | font-size | .wx-panel | 1 |
| `--wx-font-size-md` | font-size | .wx-panel-title | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-panel)

## When to Use

Use this component when you need to:

- Use Panel for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Panel for general-purpose components functionality

---

**Library:** `@waysnx/ui-layout`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, panel

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
