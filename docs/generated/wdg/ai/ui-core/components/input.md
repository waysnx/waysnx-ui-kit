# Input

Collect single-line text and numeric input from users with validation and formatting support.

## Purpose

Collect single-line text and numeric input from users with validation and formatting support

## Installation

```bash
npm install @waysnx/ui-core
```

## Import

```typescript
import { Input } from '@waysnx/ui-core';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | — | No |  |
| `error` | `string` | — | No |  |
| `hint` | `string` | — | No |  |
| `showPasswordToggle` | `boolean` | — | No |  |
| `validateOnChange` | `boolean` | — | No |  |
| `validateOnBlur` | `boolean` | — | No |  |
| `onValidation` | `(isValid: boolean, error?: string) => void` | — | No |  |
| `errorMessage` | `string` | — | No |  |
| `ariaLabel` | `string` | — | No |  |
| `ariaDescribedBy` | `string` | — | No |  |
| `mask` | `boolean | string` | — | No |  |
| `thousandSeparator` | `string` | — | No |  |
| `decimalSeparator` | `string` | — | No |  |
| `decimalScale` | `number` | — | No |  |
| `allowNegative` | `boolean` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-text` | color | .wx-input-wrapper label | 1 |
| `--wx-color-error` | color, border-color | .wx-required, .wx-input-error, .wx-input-error-text | 3 |
| `--wx-color-border` | border | .wx-input | 1 |
| `--wx-color-primary` | border-color | .wx-input:focus | 1 |
| `--wx-color-text-muted` | color | .wx-input-hint | 1 |

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-family` | font-family | .wx-input-wrapper, .wx-input | 2 |
| `--wx-font-size-sm` | font-size | .wx-input-wrapper label | 1 |
| `--wx-font-size-md` | font-size | .wx-input | 1 |
| `--wx-font-size-xs` | font-size | .wx-input-hint, .wx-input-error-text | 2 |

### Radius

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-radius-md` | border-radius | .wx-input | 1 |

### Shadows

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-shadow-sm` | box-shadow | .wx-input | 1 |
| `--wx-shadow-focus` | box-shadow | .wx-input:focus | 1 |

### Other

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-input-height` | height | .wx-input | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-input)

## Related Components

- **ContextMenu** — Input is an alternative to ContextMenu
- **ErrorMessage** — Input works well with ErrorMessage
- **SecureTextarea** — Input is an alternative to SecureTextarea
- **SensitiveText** — Input is an alternative to SensitiveText
- **SpeechToTextTextarea** — Input is an alternative to SpeechToTextTextarea
- **Textarea** — Input is an alternative to Textarea

## Used By

This component is used by:

- ChangePasswordForm
- EmailVerificationCard
- ForgotPasswordForm
- MaskedInput
- PhoneVerificationCard
- SecureInput

## When to Use

Use this component when you need to:

- Collect employee name, email, and contact information during registration
- Capture leave reason and comments in leave management
- Collect client information in CRM

## When NOT to Use

Avoid using this component when:

- Accepting any text without validation
- Input without helpful placeholder text

## Best Practices

**✓ Good use cases:**
- Collect employee name, email, and contact information during registration
- Capture leave reason and comments in leave management
- Collect client information in CRM

**✗ Avoid:**
- Accepting any text without validation
- Input without helpful placeholder text

---

**Library:** `@waysnx/ui-core`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** form-control, label, entry, field, form

**Synonyms:** text input, textbox, entry field, form field

**Semantic Category:** input

This component is indexed for AI agents, RAG pipelines, and documentation search.
