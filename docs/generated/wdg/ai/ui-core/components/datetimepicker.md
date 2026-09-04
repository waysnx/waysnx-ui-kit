# DateTimePicker

Enable users to select a specific date and time through an interactive calendar interface.

## Purpose

Enable users to select a specific date and time through an interactive calendar interface

## Installation

```bash
npm install @waysnx/ui-core
```

## Import

```typescript
import { DateTimePicker } from '@waysnx/ui-core';
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
| `timeIntervals` | `number` | — | No |  |
| `id` | `string` | — | No |  |
| `className` | `string` | — | No |  |
| `ariaLabel` | `string` | — | No |  |
| `ariaDescribedBy` | `string` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-border` | border | .wx-datetimepicker-input | 1 |
| `--wx-color-text-muted` | color | .wx-datetimepicker-icon, .wx-datetimepicker-hint | 2 |
| `--wx-color-primary` | border-color | .wx-datetimepicker-input:focus | 1 |
| `--wx-color-error` | border-color, color | .wx-datetimepicker-input-error, .wx-datetimepicker-error-text | 2 |

### Other

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-input-height` | height | .wx-datetimepicker-input | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-datetimepicker)

## Related Components

- **AuditTimeline** — DateTimePicker is an alternative to AuditTimeline
- **DatePicker** — DateTimePicker is an alternative to DatePicker
- **DateRangePicker** — DateTimePicker is an alternative to DateRangePicker
- **SessionTimeoutDialog** — DateTimePicker is an alternative to SessionTimeoutDialog
- **TimePicker** — DateTimePicker is an alternative to TimePicker

## When to Use

Use this component when you need to:

- Use DateTimePicker for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use DateTimePicker for general-purpose components functionality

---

**Library:** `@waysnx/ui-core`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, placeholder, value, label, datetimepicker

**Semantic Category:** input

This component is indexed for AI agents, RAG pipelines, and documentation search.
