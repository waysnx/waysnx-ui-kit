# Progress

Visualize numeric progress as a linear bar.

## Purpose

Visualize numeric progress as a linear bar

## Installation

```bash
npm install @waysnx/ui-feedback
```

## Import

```typescript
import { Progress } from '@waysnx/ui-feedback';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | `number` | — | Yes |  |
| `max` | `number` | — | No |  |
| `label` | `string` | — | No |  |
| `showValue` | `boolean` | — | No |  |
| `size` | `"sm" | "md" | "lg"` | — | No |  |
| `color` | `string` | — | No |  |
| `className` | `string` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-text` | color | .wx-progress-label | 1 |
| `--wx-color-text-muted` | color | .wx-progress-value | 1 |
| `--wx-color-border` | background | .wx-progress-track | 1 |
| `--wx-color-primary` | background | .wx-progress-fill | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-progress)

## When to Use

Use this component when you need to:

- Use Progress for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Progress for general-purpose components functionality

---

**Library:** `@waysnx/ui-feedback`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** label, progress, components, value

**Semantic Category:** feedback

This component is indexed for AI agents, RAG pipelines, and documentation search.
