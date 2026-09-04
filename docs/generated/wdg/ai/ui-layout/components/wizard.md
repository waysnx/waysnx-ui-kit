# Wizard

Guide users through a multi-step process or form.

## Purpose

Guide users through a multi-step process or form

## Installation

```bash
npm install @waysnx/ui-layout
```

## Import

```typescript
import { Wizard } from '@waysnx/ui-layout';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `React.ReactNode` | — | Yes |  |
| `onComplete` | `() => void` | — | No |  |
| `onStepChange` | `(step: number) => void` | — | No |  |
| `defaultStep` | `number` | — | No |  |
| `showStepNumbers` | `boolean` | — | No |  |
| `className` | `string` | — | No |  |
| `Default` | `'default' */
  theme?: 'default' | 'minimal' | 'modern'` | — | Yes |  |
| `Default` | `'horizontal' */
  layout?: 'horizontal' | 'vertical'` | — | Yes |  |
| `Default` | `false */
  saveProgress?: boolean` | — | Yes |  |
| `onSaveProgress` | `(stepIndex: number) => void` | — | No |  |
| `Default` | `'Finish' */
  submitButtonText?: string` | — | Yes |  |
| `successMessage` | `string` | — | No |  |
| `errorMessage` | `string` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-surface-alt` | background | .wx-wizard-steps | 1 |
| `--wx-color-border` | background, border-top, border, border-color | .wx-wizard-step-circle, .wx-wizard-step-line, .wx-wizard-step-actions, .wx-wizard-button-secondary, .wx-wizard--minimal .wx-wizard-step-circle, .wx-wizard--minimal .wx-wizard-step-line, .wx-wizard--minimal .wx-wizard-step-completed .wx-wizard-step-line, .wx-wizard--modern .wx-wizard-step-circle, .wx-wizard--modern .wx-wizard-button-secondary, .wx-wizard--vertical .wx-wizard-step-line | 10 |
| `--wx-color-text-muted` | color | .wx-wizard-step-circle, .wx-wizard-step-description, .wx-wizard--minimal .wx-wizard-step-circle | 3 |
| `--wx-color-primary` | background, border-color, color, border | .wx-wizard-step-active .wx-wizard-step-circle, .wx-wizard-button-primary, .wx-wizard--minimal .wx-wizard-step-active .wx-wizard-step-circle, .wx-wizard--minimal .wx-wizard-button-primary, .wx-wizard--minimal .wx-wizard-button-primary:hover:not(:disabled), .wx-wizard--modern .wx-wizard-step-active .wx-wizard-step-circle, .wx-wizard--modern .wx-wizard-button-primary | 9 |
| `--wx-color-primary-contrast` | color | .wx-wizard-step-active .wx-wizard-step-circle, .wx-wizard-step-completed .wx-wizard-step-circle, .wx-wizard-button-primary, .wx-wizard--minimal .wx-wizard-button-primary:hover:not(:disabled) | 4 |
| `--wx-color-success` | background, border, border-color, color | .wx-wizard-step-completed .wx-wizard-step-circle, .wx-wizard-step-completed .wx-wizard-step-line, .wx-wizard-success, .wx-wizard--minimal .wx-wizard-step-completed .wx-wizard-step-circle, .wx-wizard--modern .wx-wizard-step-completed .wx-wizard-step-circle, .wx-wizard--vertical .wx-wizard-step-completed .wx-wizard-step-line | 7 |
| `--wx-color-text` | color | .wx-wizard-step-title, .wx-wizard-button-secondary | 2 |
| `--wx-color-text-light` | color | .wx-wizard-step-upcoming .wx-wizard-step-title, .wx-wizard-step-upcoming .wx-wizard-step-description | 2 |
| `--wx-color-primary-hover` | background | .wx-wizard-button-primary:hover:not(:disabled), .wx-wizard--modern .wx-wizard-step-active .wx-wizard-step-circle, .wx-wizard--modern .wx-wizard-button-primary | 3 |
| `--wx-color-surface` | background | .wx-wizard-button-secondary, .wx-wizard--modern .wx-wizard-steps, .wx-wizard--modern .wx-wizard-content | 3 |
| `--wx-color-surface-hover` | background | .wx-wizard-button-secondary:hover:not(:disabled) | 1 |
| `--wx-color-success-bg` | background | .wx-wizard-success | 1 |
| `--wx-color-success-text` | color | .wx-wizard-success | 1 |
| `--wx-color-error-bg` | background | .wx-wizard-error | 1 |
| `--wx-color-error-text` | color | .wx-wizard-error | 1 |
| `--wx-color-error` | border | .wx-wizard-error | 1 |

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-family` | font-family | .wx-wizard | 1 |
| `--wx-font-size-md` | font-size | .wx-wizard-step-circle, .wx-wizard-success | 2 |
| `--wx-font-size-sm` | font-size | .wx-wizard-step-title, .wx-wizard-error | 2 |
| `--wx-font-size-xs` | font-size | .wx-wizard-step-description | 1 |

### Radius

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-radius-md` | border-radius | .wx-wizard-steps, .wx-wizard-success, .wx-wizard--modern .wx-wizard-button, .wx-wizard--modern .wx-wizard-button-secondary | 4 |
| `--wx-radius-sm` | border-radius | .wx-wizard-button, .wx-wizard-error | 2 |
| `--wx-radius-lg` | border-radius | .wx-wizard--modern .wx-wizard-steps, .wx-wizard--modern .wx-wizard-content | 2 |

### Shadows

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-shadow-focus` | box-shadow | .wx-wizard-step-active .wx-wizard-step-circle | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-wizard)

## When to Use

Use this component when you need to:

- Use Wizard for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Wizard for general-purpose components functionality

---

**Library:** `@waysnx/ui-layout`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** wizard, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
