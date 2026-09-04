# PhoneVerificationCard

Callback to resend verification code

## Purpose

Callback to resend verification code

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { PhoneVerificationCard } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `title` | `string` | — | No | Title for the card |
| `description` | `string` | — | No | Description/instructions |
| `flow` | `'phone' or 'otp'
   */
  step?: 'phone' | 'otp'` | — | Yes |  |
| `onSubmitPhone` | `(phone: string) => void | Promise<void>` | — | Yes | Callback when phone number is submitted |
| `onVerifyOTP` | `(otp: string) => void | Promise<void>` | — | Yes | Callback when OTP is verified |
| `onResendCode` | `() => void | Promise<void>` | — | Yes | Callback to resend verification code |
| `loading` | `boolean` | — | No | Loading state |
| `error` | `string` | — | No | Error message |
| `success` | `string` | — | No | Success message |
| `phoneNumber` | `string` | — | No | Phone number (for step 2) |
| `otpLength` | `number` | — | No | OTP length |
| `resendCountdown` | `number` | — | No | Countdown time for resend |
| `className` | `string` | — | No | Custom CSS class |
| `testId` | `string` | — | No | Test ID |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-verification-phoneverificationcard)

## Related Components

- **Alert** — PhoneVerificationCard depends on Alert
- **Button** — PhoneVerificationCard depends on Button
- **Card** — PhoneVerificationCard depends on Card
- **Input** — PhoneVerificationCard depends on Input
- **OTPInput** — PhoneVerificationCard depends on OTPInput
- **OTPResendButton** — PhoneVerificationCard depends on OTPResendButton

## When to Use

Use this component when you need to:

- Use PhoneVerificationCard for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use PhoneVerificationCard for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** phoneverificationcard, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
