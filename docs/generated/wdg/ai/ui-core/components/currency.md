# Currency

Collect and display monetary amounts with automatic currency formatting.

## Purpose

Collect and display monetary amounts with automatic currency formatting

## Installation

```bash
npm install @waysnx/ui-core
```

## Import

```typescript
import { Currency } from '@waysnx/ui-core';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | — | No |  |
| `value` | `number | string` | — | No |  |
| `onChange` | `(value: number | null, event?: React.ChangeEvent<HTMLInputElement>) => void` | — | No |  |
| `onBlur` | `(event: React.FocusEvent<HTMLInputElement>) => void` | — | No |  |
| `currencySymbol` | `string` | — | No |  |
| `currencySymbolPosition` | `'start' | 'end'` | — | No |  |
| `precision` | `number` | — | No |  |
| `thousandSeparator` | `string` | — | No |  |
| `decimalSeparator` | `string` | — | No |  |
| `error` | `string` | — | No |  |
| `hint` | `string` | — | No |  |
| `disabled` | `boolean` | — | No |  |
| `required` | `boolean` | — | No |  |
| `id` | `string` | — | No |  |
| `ariaLabel` | `string` | — | No |  |
| `ariaDescribedBy` | `string` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-text` | color | .wx-currency-label | 1 |
| `--wx-color-border` | border | .wx-currency-input | 1 |
| `--wx-color-primary` | border-color | .wx-currency-input:focus | 1 |
| `--wx-color-error` | border-color, color | .wx-currency-input-error, .wx-currency-input-error:focus, .wx-currency-error | 3 |
| `--wx-color-surface-hover` | background-color | .wx-currency-input:disabled | 1 |
| `--wx-color-text-muted` | color | .wx-currency-hint | 1 |

### Other

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-input-height` | height | .wx-currency-input | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-currency)

## When to Use

Use this component when you need to:

- Use Currency for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Currency for general-purpose components functionality

---

**Library:** `@waysnx/ui-core`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** label, components, value, currency

**Semantic Category:** input

This component is indexed for AI agents, RAG pipelines, and documentation search.
