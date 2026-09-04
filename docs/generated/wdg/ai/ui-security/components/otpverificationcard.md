# OTPVerificationCard

OTPVerificationCard Component Complete OTP verification flow container: - OTPInput for entering digits - OTPResendButton for resending - Error/success messages - Status display - Uses @waysnx/ui-layout Card component as base

## Purpose

OTPVerificationCard Component Complete OTP verification flow container: - OTPInput for entering digits - OTPResendButton for resending - Error/success messages - Status display - Uses @waysnx/ui-layout Card component as base

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { OTPVerificationCard } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `title` | `string` | — | No | Title for the card |
| `description` | `string` | — | No | Description/instructions |
| `otpLength` | `number` | — | No | OTP length (default 6) |
| `onVerify` | `(otp: string) => void | Promise<void>` | — | Yes | Callback when OTP is complete |
| `onResend` | `() => void | Promise<void>` | — | Yes | Callback to resend OTP |
| `loading` | `boolean` | — | No | Loading state |
| `error` | `string` | — | No | Error message |
| `success` | `string` | — | No | Success message |
| `resendCountdown` | `number` | — | No | Countdown time for resend button |
| `maskedContact` | `string` | — | No | Email or phone for display (e.g., "****1234") |
| `className` | `string` | — | No | Custom CSS class |
| `testId` | `string` | — | No | Test ID |
| `placeholder` | `string` | — | No | Show password placeholder |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-otp-otpverificationcard)

## Related Components

- **Alert** — OTPVerificationCard depends on Alert
- **Card** — OTPVerificationCard depends on Card
- **OTPInput** — OTPVerificationCard depends on OTPInput
- **OTPResendButton** — OTPVerificationCard depends on OTPResendButton

## When to Use

Use this component when you need to:

- Use OTPVerificationCard for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use OTPVerificationCard for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** otpverificationcard, placeholder, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
