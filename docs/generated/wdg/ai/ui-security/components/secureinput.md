# SecureInput

SecureInput - Text input with enhanced security features Features: - Autocomplete disabled for sensitive inputs - Value clearing on blur - Input validation - Memory-safe handling - Accessibility compliant

## Purpose

SecureInput - Text input with enhanced security features Features: - Autocomplete disabled for sensitive inputs - Value clearing on blur - Input validation - Memory-safe handling - Accessibility compliant

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { SecureInput } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `type` | `'text' | 'email' | 'password' | 'url' | 'tel'` | — | No | Input type (password, email, text) |
| `placeholder` | `string` | — | No | Placeholder text |
| `label` | `string` | — | No | Label text |
| `disableAutocomplete` | `boolean` | — | No |  |
| `clearOnBlur` | `boolean` | — | No |  |
| `onChange` | `(value: string) => void` | — | No | Callback when value changes |
| `onClear` | `() => void` | — | No | Callback when input is cleared (for cleanup) |
| `validate` | `(value: string) => boolean | string` | — | No | Custom validation function |
| `error` | `string` | — | No | Error message to display |
| `maskInput` | `boolean` | — | No | Whether to mask sensitive characters while typing |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-secure-inputs-secureinput)

## Related Components

- **ContextMenu** — SecureInput is an alternative to ContextMenu
- **Input** — SecureInput depends on Input
- **SecureTextarea** — SecureInput is an alternative to SecureTextarea
- **SensitiveText** — SecureInput is an alternative to SensitiveText
- **SpeechToTextTextarea** — SecureInput is an alternative to SpeechToTextTextarea
- **Textarea** — SecureInput is an alternative to Textarea

## When to Use

Use this component when you need to:

- Use SecureInput for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use SecureInput for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** placeholder, secureinput, label, components

**Synonyms:** text entry, form field

**Semantic Category:** input

This component is indexed for AI agents, RAG pipelines, and documentation search.
