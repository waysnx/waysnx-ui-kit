# OTPInput

OTPInput Component One-Time Password input with: - Multiple digit fields (configurable, typically 6) - Auto-focus between fields - Keyboard navigation support - Paste support (auto-distribute digits) - Full accessibility - Does NOT use ui-core Input (custom numeric input)

## Purpose

OTPInput Component One-Time Password input with: - Multiple digit fields (configurable, typically 6) - Auto-focus between fields - Keyboard navigation support - Paste support (auto-distribute digits) - Full accessibility - Does NOT use ui-core Input (custom numeric input)

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { OTPInput } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `length` | `number` | — | No | Number of OTP digits |
| `onComplete` | `(otp: string) => void` | — | No | Callback when OTP is complete |
| `onChange` | `(value: string) => void` | — | No | Callback for value changes |
| `value` | `string` | — | No | Current OTP value |
| `disabled` | `boolean` | — | No | Disable input |
| `placeholder` | `string` | — | No | Input placeholder character |
| `label` | `string` | — | No | Label |
| `error` | `string` | — | No | Error message |
| `helperText` | `string` | — | No | Helper text |
| `className` | `string` | — | No | Custom CSS class |
| `testId` | `string` | — | No | Test ID |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-otp-otpinput)

## Related Components

- **ContextMenu** — OTPInput is an alternative to ContextMenu
- **SecureTextarea** — OTPInput is an alternative to SecureTextarea
- **SensitiveText** — OTPInput is an alternative to SensitiveText
- **SpeechToTextTextarea** — OTPInput is an alternative to SpeechToTextTextarea
- **Textarea** — OTPInput is an alternative to Textarea

## Used By

This component is used by:

- OTPVerificationCard
- PhoneVerificationCard

## When to Use

Use this component when you need to:

- Use OTPInput for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use OTPInput for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** otpinput, components, placeholder, value, label

**Synonyms:** text entry, form field

**Semantic Category:** input

This component is indexed for AI agents, RAG pipelines, and documentation search.
