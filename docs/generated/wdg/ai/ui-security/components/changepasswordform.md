# ChangePasswordForm

Password policy for validation

## Purpose

Password policy for validation

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { ChangePasswordForm } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `policy` | `PasswordPolicy` | — | Yes | Password policy for validation |
| `onSubmit` | `(data: ChangePassword) => void | Promise<void>` | — | Yes | Callback when form is submitted |
| `loading` | `boolean` | — | No | Loading state (shows spinner on button) |
| `error` | `string` | — | No | Error message to display |
| `success` | `string` | — | No | Success message (typically cleared after timeout) |
| `className` | `string` | — | No | Custom CSS class |
| `showStrength` | `boolean` | — | No | Show password strength feedback |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-authentication-changepasswordform)

## Related Components

- **Alert** — ChangePasswordForm depends on Alert
- **Button** — ChangePasswordForm depends on Button
- **Input** — ChangePasswordForm depends on Input

## When to Use

Use this component when you need to:

- Use ChangePasswordForm for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use ChangePasswordForm for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** changepasswordform, components

**Semantic Category:** form

This component is indexed for AI agents, RAG pipelines, and documentation search.
