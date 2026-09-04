# SecureTextarea

SecureTextarea - Textarea input with enhanced security features

## Purpose

SecureTextarea - Textarea input with enhanced security features

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { SecureTextarea } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | — | No | Label text |
| `disableAutocomplete` | `boolean` | — | No |  |
| `clearOnBlur` | `boolean` | — | No |  |
| `onChange` | `(value: string) => void` | — | No | Callback when value changes |
| `onClear` | `() => void` | — | No | Callback when textarea is cleared |
| `validate` | `(value: string) => boolean | string` | — | No | Custom validation function |
| `error` | `string` | — | No | Error message to display |
| `maxCharacters` | `number` | — | No | Maximum character count with warning |
| `showCounter` | `boolean` | — | No | Show character counter |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-secure-inputs-securetextarea)

## Related Components

- **ChatInput** — SecureTextarea is an alternative to ChatInput
- **Input** — SecureTextarea is an alternative to Input
- **MaskedInput** — SecureTextarea is an alternative to MaskedInput
- **MentionInput** — SecureTextarea is an alternative to MentionInput
- **OTPInput** — SecureTextarea is an alternative to OTPInput
- **PINInput** — SecureTextarea is an alternative to PINInput
- **PasswordInput** — SecureTextarea is an alternative to PasswordInput
- **SecureInput** — SecureTextarea is an alternative to SecureInput

## When to Use

Use this component when you need to:

- Use SecureTextarea for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use SecureTextarea for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** label, securetextarea, components

**Semantic Category:** input

This component is indexed for AI agents, RAG pipelines, and documentation search.
