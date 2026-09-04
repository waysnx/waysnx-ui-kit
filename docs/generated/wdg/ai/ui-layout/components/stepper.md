# Stepper

Show progress through a multi-step process.

## Purpose

Show progress through a multi-step process

## Installation

```bash
npm install @waysnx/ui-layout
```

## Import

```typescript
import { Stepper } from '@waysnx/ui-layout';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `steps` | `StepItem[]` | — | Yes |  |
| `orientation` | `'horizontal' | 'vertical'` | — | No |  |
| `className` | `string` | — | No |  |
| `label` | `string` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-border` | background | .stepper-step-circle, .stepper-step-line | 2 |
| `--wx-color-text-muted` | color | .stepper-step-circle, .stepper-step-description | 2 |
| `--wx-color-primary` | background | .stepper-step-completed .stepper-step-circle, .stepper-step-current .stepper-step-circle, .stepper-step-completed .stepper-step-line | 3 |
| `--wx-color-primary-contrast` | color | .stepper-step-completed .stepper-step-circle, .stepper-step-current .stepper-step-circle | 2 |
| `--wx-color-text` | color | .stepper-step-label | 1 |
| `--wx-color-text-light` | color | .stepper-step-upcoming .stepper-step-label | 1 |

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-size-sm` | font-size | .stepper-step-circle, .stepper-step-description | 2 |

### Shadows

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-shadow-focus` | box-shadow | .stepper-step-current .stepper-step-circle | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-stepper)

## When to Use

Use this component when you need to:

- Use Stepper for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Stepper for general-purpose components functionality

---

**Library:** `@waysnx/ui-layout`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** stepper, components, label

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
