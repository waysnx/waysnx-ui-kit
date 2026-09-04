# MaskedInput

MaskedInput - Text input with pattern masking

## Purpose

MaskedInput - Text input with pattern masking

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { MaskedInput } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `mask` | `string` | — | Yes | Character used to display mask (default is space) |
| `maskChar` | `string` | — | No | Character used to display mask (default is space) |
| `label` | `string` | — | No | Label text |
| `onChange` | `(unmaskedValue: string) => void` | — | No | Callback with unmasked value |
| `onChangeFormatted` | `(maskedValue: string) => void` | — | No | Callback with masked value |
| `error` | `string` | — | No | Error message |
| `isComplete` | `boolean` | — | No | Whether input is complete |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-secure-inputs-maskedinput)

## Related Components

- **ContextMenu** — MaskedInput is an alternative to ContextMenu
- **Input** — MaskedInput depends on Input
- **SecureTextarea** — MaskedInput is an alternative to SecureTextarea
- **SensitiveText** — MaskedInput is an alternative to SensitiveText
- **SpeechToTextTextarea** — MaskedInput is an alternative to SpeechToTextTextarea
- **Textarea** — MaskedInput is an alternative to Textarea

## When to Use

Use this component when you need to:

- Use MaskedInput for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use MaskedInput for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** maskedinput, components, label

**Synonyms:** text entry, form field

**Semantic Category:** input

This component is indexed for AI agents, RAG pipelines, and documentation search.
