# Checkbox

Allow users to select one or more options from a list of independent choices.

## Purpose

Allow users to select one or more options from a list of independent choices

## Installation

```bash
npm install @waysnx/ui-core
```

## Import

```typescript
import { Checkbox } from '@waysnx/ui-core';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | — | No |  |
| `checked` | `boolean` | — | No |  |
| `onChange` | `(checked: boolean | (string | number)[]) => void` | — | No |  |
| `disabled` | `boolean` | — | No |  |
| `ariaLabel` | `string` | — | No |  |
| `ariaDescribedBy` | `string` | — | No |  |
| `options` | `CheckboxOption[]` | — | No |  |
| `columns` | `number` | — | No |  |
| `groupLabel` | `string` | — | No |  |
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
| `--wx-color-text` | color | .wx-checkbox-group-label, .wx-checkbox-label | 2 |
| `--wx-color-text-muted` | color | .wx-checkbox-loading | 1 |
| `--wx-color-text-light` | color | .wx-checkbox-no-options | 1 |
| `--wx-color-error` | border, color | .wx-checkbox-group-error, .wx-checkbox-error-text | 2 |

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-family` | font-family | .wx-checkbox-group | 1 |
| `--wx-font-size-sm` | font-size | .wx-checkbox-group-label, .wx-checkbox-label, .wx-checkbox-loading, .wx-checkbox-no-options | 4 |
| `--wx-font-size-xs` | font-size | .wx-checkbox-error-text | 1 |

### Radius

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-radius-sm` | border-radius | .wx-checkbox-group-error | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-checkbox)

## Related Components

- **Radio** — Checkbox is an alternative to Radio

## Used By

This component is used by:

- PasswordPolicyPanel
- PrivacySettingsPanel
- SecurityAlertsPanel
- SessionPolicyPanel
- TrustedDeviceSelector

## When to Use

Use this component when you need to:

- Use Checkbox for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Checkbox for general-purpose components functionality

---

**Library:** `@waysnx/ui-core`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** checkbox, check, components, selection, toggle

**Synonyms:** check box, toggle option

**Semantic Category:** input

This component is indexed for AI agents, RAG pipelines, and documentation search.
