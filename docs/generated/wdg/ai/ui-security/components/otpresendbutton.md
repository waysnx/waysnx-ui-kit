# OTPResendButton

Callback when button is clicked to resend OTP

## Purpose

Callback when button is clicked to resend OTP

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { OTPResendButton } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `initialCountdown` | `number` | — | No | Initial countdown time in seconds |
| `onResend` | `() => void | Promise<void>` | — | Yes | Callback when button is clicked to resend OTP |
| `loading` | `boolean` | — | No | Loading state while resending |
| `disabled` | `boolean` | — | No | Disabled state |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-otp-otpresendbutton)

## Related Components

- **Button** — OTPResendButton depends on Button

## Used By

This component is used by:

- EmailVerificationCard
- OTPVerificationCard
- PhoneVerificationCard

## When to Use

Use this component when you need to:

- Use OTPResendButton for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use OTPResendButton for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** otpresendbutton, components

**Synonyms:** action control, clickable element

**Semantic Category:** display

This component is indexed for AI agents, RAG pipelines, and documentation search.
