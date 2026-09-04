# Autocomplete

Enable users to search and select from a filtered list of options as they type.

## Purpose

Enable users to search and select from a filtered list of options as they type

## Installation

```bash
npm install @waysnx/ui-core
```

## Import

```typescript
import { Autocomplete } from '@waysnx/ui-core';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `options` | `AutocompleteOption[]` | — | No |  |
| `onChange` | `(value: string) => void` | — | No |  |
| `onSelect` | `(option: AutocompleteOption | null) => void` | — | No |  |
| `placeholder` | `string` | — | No |  |
| `label` | `string` | — | No |  |
| `error` | `string` | — | No |  |
| `hint` | `string` | — | No |  |
| `disabled` | `boolean` | — | No |  |
| `noOptionsText` | `string` | — | No |  |
| `minChars` | `number` | — | No |  |
| `id` | `string` | — | No |  |
| `ariaLabel` | `string` | — | No |  |
| `ariaDescribedBy` | `string` | — | No |  |
| `fetchOptions` | `(url: string) => Promise<any[]>` | — | No |  |
| `xrefIdProp` | `string` | — | No |  |
| `xrefDisplayProp` | `string` | — | No |  |
| `onLoadStart` | `() => void` | — | No |  |
| `onLoadEnd` | `() => void` | — | No |  |
| `onError` | `(error: Error) => void` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-border` | border | .wx-autocomplete-input, .wx-autocomplete-dropdown | 2 |
| `--wx-color-primary` | border-color | .wx-autocomplete-input:focus | 1 |
| `--wx-color-error` | border-color, color | .wx-autocomplete-input-error, .wx-autocomplete-error-text | 2 |
| `--wx-color-surface` | background | .wx-autocomplete-dropdown | 1 |
| `--wx-color-surface-hover` | background, background-color | .wx-autocomplete-option:hover, .wx-autocomplete-option-highlighted, .wx-autocomplete-input:disabled | 2 |
| `--wx-color-text-muted` | color | .wx-autocomplete-no-options, .wx-autocomplete-hint | 2 |

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-family` | font-family | .wx-autocomplete-wrapper | 1 |
| `--wx-font-size-sm` | font-size | .wx-autocomplete-label, .wx-autocomplete-input, .wx-autocomplete-no-options | 3 |
| `--wx-font-size-xs` | font-size | .wx-autocomplete-hint, .wx-autocomplete-error-text | 2 |

### Radius

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-radius-md` | border-radius | .wx-autocomplete-input, .wx-autocomplete-dropdown | 2 |

### Shadows

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-shadow-md` | box-shadow | .wx-autocomplete-dropdown | 1 |

### Other

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-input-height` | height | .wx-autocomplete-input | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-autocomplete)

## When to Use

Use this component when you need to:

- Use Autocomplete for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Autocomplete for general-purpose components functionality

---

**Library:** `@waysnx/ui-core`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** label, placeholder, autocomplete, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
