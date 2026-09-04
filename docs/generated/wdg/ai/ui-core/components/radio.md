# Radio

Enable users to select exactly one option from a list of mutually exclusive choices.

## Purpose

Enable users to select exactly one option from a list of mutually exclusive choices

## Installation

```bash
npm install @waysnx/ui-core
```

## Import

```typescript
import { Radio } from '@waysnx/ui-core';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | — | No |  |
| `name` | `string` | — | Yes |  |
| `options` | `RadioOption[]` | — | No |  |
| `onChange` | `(value: string | number) => void` | — | No |  |
| `disabled` | `boolean` | — | No |  |
| `columns` | `number` | — | No |  |
| `ariaDescribedBy` | `string` | — | No |  |
| `fetchOptions` | `(url: string) => Promise<any[]>` | — | No |  |
| `xrefIdProp` | `string` | — | No |  |
| `xrefDisplayProp` | `string` | — | No |  |
| `error` | `string` | — | No |  |
| `onLoadStart` | `() => void` | — | No |  |
| `onLoadEnd` | `() => void` | — | No |  |
| `onError` | `(error: Error) => void` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-text` | color | .wx-radio-group-label, .wx-radio-label | 2 |
| `--wx-color-text-muted` | color | .wx-radio-loading | 1 |
| `--wx-color-text-light` | color | .wx-radio-no-options | 1 |
| `--wx-color-error` | border, color | .wx-radio-group-error, .wx-radio-error-text | 2 |

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-family` | font-family | .wx-radio-group | 1 |
| `--wx-font-size-sm` | font-size | .wx-radio-group-label, .wx-radio-label, .wx-radio-loading, .wx-radio-no-options | 4 |
| `--wx-font-size-xs` | font-size | .wx-radio-error-text | 1 |

### Radius

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-radius-sm` | border-radius | .wx-radio-group-error | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-radio)

## Related Components

- **Checkbox** — Radio is an alternative to Checkbox

## When to Use

Use this component when you need to:

- Use Radio for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Radio for general-purpose components functionality

---

**Library:** `@waysnx/ui-core`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** label, single, choice, radio, button

**Synonyms:** radio button, option selector

**Semantic Category:** input

This component is indexed for AI agents, RAG pipelines, and documentation search.
