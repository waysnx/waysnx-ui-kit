# DateRangePicker

Enable users to select a start and end date range through an interactive calendar.

## Purpose

Enable users to select a start and end date range through an interactive calendar

## Installation

```bash
npm install @waysnx/ui-core
```

## Import

```typescript
import { DateRangePicker } from '@waysnx/ui-core';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `startDate` | `Date | null` | — | No |  |
| `endDate` | `Date | null` | — | No |  |
| `onChange` | `(dates: [Date | null, Date | null]) => void` | — | No |  |
| `label` | `string` | — | No |  |
| `placeholder` | `string` | — | No |  |
| `error` | `string` | — | No |  |
| `hint` | `string` | — | No |  |
| `disabled` | `boolean` | — | No |  |
| `minDate` | `Date` | — | No |  |
| `maxDate` | `Date` | — | No |  |
| `dateFormat` | `string` | — | No |  |
| `id` | `string` | — | No |  |
| `className` | `string` | — | No |  |
| `ariaLabel` | `string` | — | No |  |
| `ariaDescribedBy` | `string` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-border` | border | .wx-daterangepicker-input | 1 |
| `--wx-color-text-muted` | color | .wx-daterangepicker-icon, .wx-daterangepicker-hint | 2 |
| `--wx-color-primary` | border-color | .wx-daterangepicker-input:focus | 1 |
| `--wx-color-error` | border-color, color | .wx-daterangepicker-input-error, .wx-daterangepicker-error-text | 2 |

### Other

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-input-height` | height | .wx-daterangepicker-input | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-daterangepicker)

## Related Components

- **AuditTimeline** — DateRangePicker is an alternative to AuditTimeline
- **DateTimePicker** — DateRangePicker is an alternative to DateTimePicker
- **SessionTimeoutDialog** — DateRangePicker is an alternative to SessionTimeoutDialog
- **TimePicker** — DateRangePicker is an alternative to TimePicker

## When to Use

Use this component when you need to:

- Use DateRangePicker for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use DateRangePicker for general-purpose components functionality

---

**Library:** `@waysnx/ui-core`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** label, components, placeholder, daterangepicker

**Semantic Category:** input

This component is indexed for AI agents, RAG pipelines, and documentation search.
