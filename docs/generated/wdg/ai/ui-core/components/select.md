# Select

Enable users to select one or more options from a dropdown list with optional search.

## Purpose

Enable users to select one or more options from a dropdown list with optional search

## Installation

```bash
npm install @waysnx/ui-core
```

## Import

```typescript
import { Select } from '@waysnx/ui-core';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | — | No |  |
| `options` | `SelectOption[]` | — | No |  |
| `showSelectAll` | `boolean` | — | No |  |
| `searchable` | `boolean` | — | No |  |
| `value` | `string | string[]` | — | No |  |
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
| `--wx-color-border` | border, border-bottom | .wx-select, .wx-select-multi, .wx-select-dropdown, .wx-select-search, .wx-select-search-input | 5 |
| `--wx-color-surface` | background | .wx-select-multi, .wx-select-dropdown, .wx-select-search, .wx-select-search-input | 4 |
| `--wx-color-text-light` | border-color, color | .wx-select-multi:hover, .wx-select-no-options | 2 |
| `--wx-color-text-muted` | color, border-right, border-bottom | .wx-select-arrow, .wx-select-arrow::after | 3 |
| `--wx-color-surface-hover` | background, background-color | .wx-select-option:hover, .wx-select:disabled, .wx-select-disabled | 2 |
| `--wx-color-primary` | background, border-color | .wx-select-all-option, .wx-select-search-input:focus | 2 |
| `--wx-color-primary-contrast` | color | .wx-select-all-option | 1 |
| `--wx-color-primary-hover` | background | .wx-select-all-option:hover | 1 |
| `--wx-color-text` | color | .wx-select-search-input | 1 |
| `--wx-color-primary-light` | background | .wx-select-option--selected | 1 |
| `--wx-color-error` | border-color, color | .wx-select-error .wx-select-multi, .wx-select-error-text | 2 |

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-family` | font-family | .wx-select-wrapper | 1 |
| `--wx-font-size-sm` | font-size | .wx-select, .wx-select-multi, .wx-select-option, .wx-select-no-options, .wx-select-search-input | 5 |
| `--wx-font-size-xs` | font-size | .wx-select-error-text | 1 |

### Radius

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-radius-md` | border-radius | .wx-select, .wx-select-multi, .wx-select-dropdown | 3 |
| `--wx-radius-sm` | border-radius | .wx-select-search-input | 1 |

### Shadows

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-shadow-md` | box-shadow | .wx-select-dropdown | 1 |

### Other

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-input-height` | height | .wx-select, .wx-select-multi | 2 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-select)

## When to Use

Use this component when you need to:

- Select department in employee management
- Select leave status or application status
- Select priority in project management

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Select department in employee management
- Select leave status or application status
- Select priority in project management

---

**Library:** `@waysnx/ui-core`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** dropdown, components, combo, option, choice

**Synonyms:** dropdown, option selector, combo box

**Semantic Category:** input

This component is indexed for AI agents, RAG pipelines, and documentation search.
