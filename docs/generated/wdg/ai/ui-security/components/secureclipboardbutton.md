# SecureClipboardButton

SecureClipboardButton - Copy sensitive content to clipboard securely Features: - Uses Clipboard API for secure copying - Auto-clear clipboard after configured delay - Fallback to legacy approach if Clipboard API unavailable - Feedback on success - Error handling

## Purpose

SecureClipboardButton - Copy sensitive content to clipboard securely Features: - Uses Clipboard API for secure copying - Auto-clear clipboard after configured delay - Fallback to legacy approach if Clipboard API unavailable - Feedback on success - Error handling

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { SecureClipboardButton } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `content` | `string | (() => string)` | — | Yes | Text or function that returns text to copy |
| `label` | `string` | — | No | Button label |
| `successLabel` | `string` | — | No | Label shown after successful copy |
| `variant` | `'primary' | 'secondary' | 'outline' | 'ghost'` | — | No | Button variant |
| `size` | `'sm' | 'md' | 'lg'` | — | No | Button size |
| `autoClearMs` | `number` | — | No |  |
| `disabled` | `boolean` | — | No | Whether button is disabled |
| `onCopySuccess` | `() => void` | — | No | Callback on successful copy |
| `onCopyError` | `(error: Error) => void` | — | No | Callback on copy error |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-secure-inputs-secureclipboardbutton)

## Related Components

- **Button** — SecureClipboardButton depends on Button

## When to Use

Use this component when you need to:

- Use SecureClipboardButton for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use SecureClipboardButton for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** label, secureclipboardbutton, components

**Synonyms:** action control, clickable element

**Semantic Category:** display

This component is indexed for AI agents, RAG pipelines, and documentation search.
