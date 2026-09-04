# Slider

Enable users to select a numeric value from a continuous range using a draggable control.

## Purpose

Enable users to select a numeric value from a continuous range using a draggable control

## Installation

```bash
npm install @waysnx/ui-core
```

## Import

```typescript
import { Slider } from '@waysnx/ui-core';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | — | No |  |
| `value` | `number` | — | No |  |
| `onChange` | `(value: number) => void` | — | No |  |
| `min` | `number` | — | No |  |
| `max` | `number` | — | No |  |
| `step` | `number` | — | No |  |
| `hint` | `string` | — | No |  |
| `className` | `string` | — | No |  |
| `showValue` | `boolean` | — | No |  |
| `ariaLabel` | `string` | — | No |  |
| `ariaDescribedBy` | `string` | — | No |  |
| `id` | `string` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-text` | color | .wx-slider-label | 1 |
| `--wx-color-border` | background | .wx-slider | 1 |
| `--wx-color-primary` | background, color | .wx-slider::-webkit-slider-thumb, .wx-slider::-moz-range-thumb, .wx-slider-value | 3 |
| `--wx-color-text-muted` | color | .wx-slider-hint | 1 |

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-family` | font-family | .wx-slider-container | 1 |
| `--wx-font-size-sm` | font-size | .wx-slider-label | 1 |
| `--wx-font-size-xs` | font-size | .wx-slider-hint | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-slider)

## When to Use

Use this component when you need to:

- Use Slider for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Slider for general-purpose components functionality

---

**Library:** `@waysnx/ui-core`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** slider, label, value, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
