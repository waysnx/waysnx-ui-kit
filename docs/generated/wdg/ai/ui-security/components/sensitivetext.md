# SensitiveText

SensitiveText - Display and reveal sensitive information Features: - Manual reveal/hide toggle - Auto-obscuring after delay - Customizable masking - Copy to clipboard option

## Purpose

SensitiveText - Display and reveal sensitive information Features: - Manual reveal/hide toggle - Auto-obscuring after delay - Customizable masking - Copy to clipboard option

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { SensitiveText } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `text` | `string` | — | Yes | The sensitive text to display/hide |
| `initiallyRevealed` | `boolean` | — | No | Whether text is initially revealed |
| `autoHideMs` | `number` | — | No |  |
| `maskCharacter` | `string` | — | No |  |
| `showLastCharacters` | `number` | — | No |  |
| `revealLabel` | `string` | — | No | Label for reveal button |
| `hideLabel` | `string` | — | No | Label for hide button |
| `fontSize` | `string` | — | No | Custom text styling |
| `color` | `string` | — | No | Custom text color |
| `allowCopy` | `boolean` | — | No | Allow copy to clipboard button |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-secure-inputs-sensitivetext)

## Related Components

- **Button** — SensitiveText depends on Button
- **ChatInput** — SensitiveText is an alternative to ChatInput
- **Input** — SensitiveText is an alternative to Input
- **MaskedInput** — SensitiveText is an alternative to MaskedInput
- **MentionInput** — SensitiveText is an alternative to MentionInput
- **OTPInput** — SensitiveText is an alternative to OTPInput
- **PINInput** — SensitiveText is an alternative to PINInput
- **PasswordInput** — SensitiveText is an alternative to PasswordInput
- **SecureInput** — SensitiveText is an alternative to SecureInput

## When to Use

Use this component when you need to:

- Use SensitiveText for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use SensitiveText for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, sensitivetext

**Semantic Category:** input

This component is indexed for AI agents, RAG pipelines, and documentation search.
