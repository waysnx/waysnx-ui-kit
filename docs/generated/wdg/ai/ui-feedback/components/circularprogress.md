# CircularProgress

Visualize numeric progress in a circular format.

## Purpose

Visualize numeric progress in a circular format

## Installation

```bash
npm install @waysnx/ui-feedback
```

## Import

```typescript
import { CircularProgress } from '@waysnx/ui-feedback';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | `number` | — | Yes |  |
| `default` | `100) */
  max?: number` | — | Yes |  |
| `sm` | `48px, md: 80px, lg: 120px, xl: 160px */
  size?: CircularProgressSize` | — | Yes |  |
| `default` | `true) */
  showValue?: boolean` | — | Yes |  |
| `valueLabel` | `string` | — | No |  |
| `label` | `string` | — | No |  |
| `color` | `string` | — | No |  |
| `trackColor` | `string` | — | No |  |
| `strokeWidth` | `number` | — | No |  |
| `className` | `string` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-border` | stroke | .wx-circular-progress-track | 1 |
| `--wx-color-primary` | stroke | .wx-circular-progress-fill | 1 |
| `--wx-color-text-muted` | color | .wx-circular-progress-label | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

View Interactive Storybook

## When to Use

Use this component when you need to:

- Use CircularProgress for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use CircularProgress for general-purpose components functionality

---

**Library:** `@waysnx/ui-feedback`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** label, components, value, circularprogress

**Semantic Category:** feedback

This component is indexed for AI agents, RAG pipelines, and documentation search.
