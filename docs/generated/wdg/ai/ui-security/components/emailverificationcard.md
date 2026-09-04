# EmailVerificationCard

Callback to resend verification email

## Purpose

Callback to resend verification email

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { EmailVerificationCard } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `email` | `string` | — | Yes | Email address to verify |
| `title` | `string` | — | No | Title for the card |
| `description` | `string` | — | No | Description/instructions |
| `onVerify` | `(code: string) => void | Promise<void>` | — | Yes | Callback when verification code is submitted |
| `onResend` | `() => void | Promise<void>` | — | Yes | Callback to resend verification email |
| `loading` | `boolean` | — | No | Loading state |
| `error` | `string` | — | No | Error message |
| `success` | `string` | — | No | Success message |
| `resendCountdown` | `number` | — | No | Countdown time for resend button |
| `className` | `string` | — | No | Custom CSS class |
| `testId` | `string` | — | No | Test ID |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-verification-emailverificationcard)

## Related Components

- **Alert** — EmailVerificationCard depends on Alert
- **Button** — EmailVerificationCard depends on Button
- **Card** — EmailVerificationCard depends on Card
- **Input** — EmailVerificationCard depends on Input
- **OTPResendButton** — EmailVerificationCard depends on OTPResendButton

## When to Use

Use this component when you need to:

- Use EmailVerificationCard for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use EmailVerificationCard for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, emailverificationcard

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
