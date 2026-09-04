# Skeleton

Display a placeholder while content is loading.

## Purpose

Display a placeholder while content is loading

## Installation

```bash
npm install @waysnx/ui-feedback
```

## Import

```typescript
import { Skeleton } from '@waysnx/ui-feedback';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `"text" | "circle" | "rect"` | — | No |  |
| `width` | `string | number` | — | No |  |
| `height` | `string | number` | — | No |  |
| `count` | `number` | — | No |  |
| `className` | `string` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-border` | background | .wx-skeleton | 2 |
| `--wx-color-surface-hover` | — | .wx-skeleton | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-skeleton)

## When to Use

Use this component when you need to:

- Use Skeleton for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Skeleton for general-purpose components functionality

---

**Library:** `@waysnx/ui-feedback`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, skeleton

**Semantic Category:** feedback

This component is indexed for AI agents, RAG pipelines, and documentation search.
