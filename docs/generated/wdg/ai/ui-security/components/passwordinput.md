# PasswordInput

PasswordInput Component A secure password input component with: - Visibility toggle for showing/hiding password - Real-time strength validation with feedback - Policy compliance checking - Accessibility support (ARIA labels, keyboard navigation) - Dark/light theme support

## Purpose

PasswordInput Component A secure password input component with: - Visibility toggle for showing/hiding password - Real-time strength validation with feedback - Policy compliance checking - Accessibility support (ARIA labels, keyboard navigation) - Dark/light theme support

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { PasswordInput } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | `string` | — | Yes | Input value (controlled component) |
| `onChange` | `(value: string) => void` | — | Yes | Change handler |
| `policy` | `PasswordPolicy` | — | No | Password policy for validation |
| `showStrength` | `boolean` | — | No | Show strength meter |
| `showFeedback` | `boolean` | — | No | Show validation feedback |
| `placeholder` | `string` | — | No | Placeholder text |
| `label` | `string` | — | No | Input label |
| `error` | `string` | — | No | Error message |
| `helperText` | `string` | — | No | Help text |
| `disabled` | `boolean` | — | No | Disabled state |
| `required` | `boolean` | — | No | Required field |
| `autoFocus` | `boolean` | — | No | Auto-focus on mount |
| `className` | `string` | — | No | Custom CSS class |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-password-passwordinput)

## Related Components

- **ContextMenu** — PasswordInput is an alternative to ContextMenu
- **SecureTextarea** — PasswordInput is an alternative to SecureTextarea
- **SensitiveText** — PasswordInput is an alternative to SensitiveText
- **SpeechToTextTextarea** — PasswordInput is an alternative to SpeechToTextTextarea
- **Textarea** — PasswordInput is an alternative to Textarea

## Used By

This component is used by:

- LoginForm

## When to Use

Use this component when you need to:

- Use PasswordInput for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use PasswordInput for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** passwordinput, components, placeholder, value, label

**Synonyms:** text entry, form field

**Semantic Category:** input

This component is indexed for AI agents, RAG pipelines, and documentation search.
