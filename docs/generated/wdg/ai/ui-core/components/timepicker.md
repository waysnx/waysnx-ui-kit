# TimePicker

Enable users to select a specific time through a time picker interface.

## Purpose

Enable users to select a specific time through a time picker interface

## Installation

```bash
npm install @waysnx/ui-core
```

## Import

```typescript
import { TimePicker } from '@waysnx/ui-core';
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
| `timeIntervals` | `number` | — | No |  |
| `timeFormat` | `string` | — | No |  |
| `id` | `string` | — | No |  |
| `className` | `string` | — | No |  |
| `ariaLabel` | `string` | — | No |  |
| `ariaDescribedBy` | `string` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-border` | border | .wx-timepicker-input | 1 |
| `--wx-color-text-muted` | color | .wx-timepicker-icon, .wx-timepicker-hint | 2 |
| `--wx-color-primary` | border-color | .wx-timepicker-input:focus | 1 |
| `--wx-color-error` | border-color, color | .wx-timepicker-input-error, .wx-timepicker-error-text | 2 |

### Other

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-input-height` | height | .wx-timepicker-input | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-timepicker)

## Related Components

- **DatePicker** — TimePicker is an alternative to DatePicker
- **DateRangePicker** — TimePicker is an alternative to DateRangePicker
- **DateTimePicker** — TimePicker is an alternative to DateTimePicker

## When to Use

Use this component when you need to:

- Use TimePicker for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use TimePicker for general-purpose components functionality

---

**Library:** `@waysnx/ui-core`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** label, placeholder, timepicker, value, components

**Semantic Category:** input

This component is indexed for AI agents, RAG pipelines, and documentation search.
