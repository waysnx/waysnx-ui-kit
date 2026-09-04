# ForgotPasswordForm

Password policy for validation

## Purpose

Password policy for validation

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { ForgotPasswordForm } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `policy` | `PasswordPolicy` | — | Yes | Password policy for validation |
| `onSubmitEmail` | `(email: string) => void | Promise<void>` | — | No | Callback when email is submitted |
| `onSubmitReset` | `(data: PasswordResetFormData) => void | Promise<void>` | — | No | Callback when reset form is submitted |
| `loading` | `boolean` | — | No | Loading state |
| `error` | `string` | — | No | Error message |
| `success` | `string` | — | No | Success message |
| `onBackToLogin` | `() => void` | — | No | Callback to return to login |
| `className` | `string` | — | No | Custom CSS class |
| `showStrength` | `boolean` | — | No | Show password strength feedback |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-authentication-forgotpasswordform)

## Related Components

- **Alert** — ForgotPasswordForm depends on Alert
- **Button** — ForgotPasswordForm depends on Button
- **Input** — ForgotPasswordForm depends on Input

## When to Use

Use this component when you need to:

- Use ForgotPasswordForm for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use ForgotPasswordForm for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** forgotpasswordform, components

**Semantic Category:** form

This component is indexed for AI agents, RAG pipelines, and documentation search.
