# Textarea

Collect multi-line text input from users with optional length limits and formatting.

## Purpose

Collect multi-line text input from users with optional length limits and formatting

## Installation

```bash
npm install @waysnx/ui-core
```

## Import

```typescript
import { Textarea } from '@waysnx/ui-core';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | — | No |  |
| `error` | `string` | — | No |  |
| `hint` | `string` | — | No |  |
| `ariaLabel` | `string` | — | No |  |
| `ariaDescribedBy` | `string` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-family` | font-family | .wx-textarea-wrapper | 1 |
| `--wx-font-size-sm` | font-size | .wx-textarea | 1 |
| `--wx-font-size-xs` | font-size | .wx-textarea-hint, .wx-textarea-error-text | 2 |

### Radius

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-radius-md` | border-radius | .wx-textarea | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-textarea)

## Related Components

- **ChatInput** — Textarea is an alternative to ChatInput
- **Input** — Textarea is an alternative to Input
- **MaskedInput** — Textarea is an alternative to MaskedInput
- **MentionInput** — Textarea is an alternative to MentionInput
- **OTPInput** — Textarea is an alternative to OTPInput
- **PINInput** — Textarea is an alternative to PINInput
- **PasswordInput** — Textarea is an alternative to PasswordInput
- **SecureInput** — Textarea is an alternative to SecureInput

## When to Use

Use this component when you need to:

- Use Textarea for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Textarea for general-purpose components functionality

---

**Library:** `@waysnx/ui-core`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** label, components, textarea

**Semantic Category:** input

This component is indexed for AI agents, RAG pipelines, and documentation search.
