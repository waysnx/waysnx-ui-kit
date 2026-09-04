# SpeechToTextTextarea

Enable users to enter text through voice input combined with traditional text editing.

## Purpose

Enable users to enter text through voice input combined with traditional text editing

## Installation

```bash
npm install @waysnx/ui-core
```

## Import

```typescript
import { SpeechToTextTextarea } from '@waysnx/ui-core';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | — | No |  |
| `error` | `string` | — | No |  |
| `hint` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-text-muted` | color | .wx-speech-textarea-mic | 1 |
| `--wx-color-primary` | color | .wx-speech-textarea-mic:hover | 1 |
| `--wx-color-error` | color | .wx-speech-textarea-mic--active | 1 |
| `--wx-color-error-hover` | color | .wx-speech-textarea-mic--active:hover | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-speechtotexttextarea)

## Related Components

- **ChatInput** — SpeechToTextTextarea is an alternative to ChatInput
- **Input** — SpeechToTextTextarea is an alternative to Input
- **MaskedInput** — SpeechToTextTextarea is an alternative to MaskedInput
- **MentionInput** — SpeechToTextTextarea is an alternative to MentionInput
- **OTPInput** — SpeechToTextTextarea is an alternative to OTPInput
- **PINInput** — SpeechToTextTextarea is an alternative to PINInput
- **PasswordInput** — SpeechToTextTextarea is an alternative to PasswordInput
- **SecureInput** — SpeechToTextTextarea is an alternative to SecureInput

## When to Use

Use this component when you need to:

- Use SpeechToTextTextarea for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use SpeechToTextTextarea for general-purpose components functionality

---

**Library:** `@waysnx/ui-core`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** speechtotexttextarea, components, label

**Semantic Category:** input

This component is indexed for AI agents, RAG pipelines, and documentation search.
