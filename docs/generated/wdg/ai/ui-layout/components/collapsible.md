# Collapsible

Show or hide content with a click or interaction.

## Purpose

Show or hide content with a click or interaction

## Installation

```bash
npm install @waysnx/ui-layout
```

## Import

```typescript
import { Collapsible } from '@waysnx/ui-layout';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `title` | `React.ReactNode` | — | Yes |  |
| `children` | `React.ReactNode` | — | Yes |  |
| `defaultOpen` | `boolean` | — | No |  |
| `className` | `string` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-border` | border, border-top | .wx-collapsible, .wx-collapsible-content | 2 |
| `--wx-color-surface` | background | .wx-collapsible-trigger | 1 |
| `--wx-color-surface-alt` | background | .wx-collapsible-trigger:hover | 1 |

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-size-md` | font-size | .wx-collapsible-trigger | 1 |
| `--wx-font-size-xs` | font-size | .wx-collapsible-icon | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

View Interactive Storybook

## When to Use

Use this component when you need to:

- Use Collapsible for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Collapsible for general-purpose components functionality

---

**Library:** `@waysnx/ui-layout`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** collapsible, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
