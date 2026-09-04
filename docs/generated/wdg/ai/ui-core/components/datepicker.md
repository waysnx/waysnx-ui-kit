# DatePicker

Enable users to select a specific date through an interactive calendar interface.

## Purpose

Enable users to select a specific date through an interactive calendar interface

## Installation

```bash
npm install @waysnx/ui-core
```

## Import

```typescript
import { DatePicker } from '@waysnx/ui-core';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | `Date | null` | — | No |  |
| `onChange` | `(date: Date | null) => void` | — | No |  |
| `label` | `string` | — | No |  |
| `placeholder` | `string` | — | No |  |
| `error` | `string` | — | No |  |
| `hint` | `string` | — | No |  |
| `disabled` | `boolean` | — | No |  |
| `minDate` | `Date` | — | No |  |
| `maxDate` | `Date` | — | No |  |
| `dateFormat` | `string` | — | No |  |
| `showTimeSelect` | `boolean` | — | No |  |
| `id` | `string` | — | No |  |
| `className` | `string` | — | No |  |
| `ariaLabel` | `string` | — | No |  |
| `ariaDescribedBy` | `string` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-border` | border | .wx-datepicker-input, .react-datepicker__month-select, .react-datepicker__year-select | 2 |
| `--wx-color-text-muted` | color | .wx-datepicker-icon, .wx-datepicker-hint | 2 |
| `--wx-color-primary` | border-color | .wx-datepicker-input:focus, .react-datepicker__month-select:focus, .react-datepicker__year-select:focus, .react-datepicker__month-select:hover, .react-datepicker__year-select:hover | 3 |
| `--wx-color-error` | border-color, color | .wx-datepicker-input-error, .wx-datepicker-error-text | 2 |
| `--wx-color-surface` | background | .react-datepicker__month-select, .react-datepicker__year-select | 1 |
| `--wx-color-text` | color | .react-datepicker__month-select, .react-datepicker__year-select | 1 |

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-family` | font-family | .wx-datepicker-wrapper | 1 |
| `--wx-font-size-sm` | font-size | .wx-datepicker-label, .wx-datepicker-input | 2 |
| `--wx-font-size-xs` | font-size | .wx-datepicker-hint, .wx-datepicker-error-text | 2 |

### Radius

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-radius-md` | border-radius | .wx-datepicker-input | 1 |
| `--wx-radius-sm` | border-radius | .react-datepicker__month-select, .react-datepicker__year-select | 1 |

### Other

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-input-height` | height | .wx-datepicker-input | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-datepicker)

## Related Components

- **AuditTimeline** — DatePicker is an alternative to AuditTimeline
- **DateTimePicker** — DatePicker is an alternative to DateTimePicker
- **Input** — DatePicker works well with Input
- **Input** — DatePicker typically contains Input
- **SessionTimeoutDialog** — DatePicker is an alternative to SessionTimeoutDialog
- **TimePicker** — DatePicker is an alternative to TimePicker

## Child Components

This component typically contains:

- Input

## When to Use

Use this component when you need to:

- Use DatePicker for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use DatePicker for general-purpose components functionality

---

**Library:** `@waysnx/ui-core`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** label, placeholder, value, datepicker, components

**Semantic Category:** input

This component is indexed for AI agents, RAG pipelines, and documentation search.
