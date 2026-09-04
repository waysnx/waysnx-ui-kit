# PINInput

PINInput - Numeric code input with auto-advancing Features: - Auto-focus to next field - Masked digit display - Keyboard navigation (backspace to previous) - Paste support

## Purpose

PINInput - Numeric code input with auto-advancing Features: - Auto-focus to next field - Masked digit display - Keyboard navigation (backspace to previous) - Paste support

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { PINInput } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `length` | `number` | — | No |  |
| `onComplete` | `(pin: string) => void` | — | No | Callback when PIN is complete |
| `onChange` | `(value: string) => void` | — | No | Callback on value change |
| `masked` | `boolean` | — | No |  |
| `label` | `string` | — | No | Label text |
| `error` | `string` | — | No | Error message |
| `disabled` | `boolean` | — | No | Whether input is disabled |
| `autoComplete` | `boolean` | — | No |  |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-secure-inputs-pininput)

## Related Components

- **ContextMenu** — PINInput is an alternative to ContextMenu
- **SecureTextarea** — PINInput is an alternative to SecureTextarea
- **SensitiveText** — PINInput is an alternative to SensitiveText
- **SpeechToTextTextarea** — PINInput is an alternative to SpeechToTextTextarea
- **Stack** — PINInput depends on Stack
- **Textarea** — PINInput is an alternative to Textarea

## Used By

This component is used by:

- MFAVerificationDialog

## When to Use

Use this component when you need to:

- Use PINInput for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use PINInput for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** label, components, pininput

**Synonyms:** text entry, form field

**Semantic Category:** input

This component is indexed for AI agents, RAG pipelines, and documentation search.
