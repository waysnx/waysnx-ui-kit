# AuthenticatorQRCode

AuthenticatorQRCode Component Displays a real, scannable QR code for TOTP authenticator app setup. The QR encodes a standard `otpauth://totp/...` URI and is rendered by the shared @waysnx/ui-media QRCode component (backed by the `qrcode` library), so there is a single, real QR implementation across the kit.

## Purpose

AuthenticatorQRCode Component Displays a real, scannable QR code for TOTP authenticator app setup

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { AuthenticatorQRCode } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `secret` | `string` | — | Yes | TOTP secret key |
| `accountName` | `string` | — | Yes | Account email/username |
| `issuer` | `string` | — | No | Issuer name (e.g., 'MyApp') |
| `size` | `number` | — | No | QR code size in pixels |
| `onCopySecret` | `() => void` | — | No | Callback to copy secret |
| `isLoading` | `boolean` | — | No | Whether QR code generation is loading |
| `instructions` | `string` | — | No | Custom instructions text |
| `className` | `string` | — | No | Optional class name applied to the root element |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-mfa-authenticatorqrcode)

## Related Components

- **Button** — AuthenticatorQRCode depends on Button
- **QRCode** — AuthenticatorQRCode depends on QRCode

## When to Use

Use this component when you need to:

- Use AuthenticatorQRCode for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use AuthenticatorQRCode for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, authenticatorqrcode

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
