# MFAVerificationDialog

MFAVerificationDialog - Enter MFA verification code

## Purpose

MFAVerificationDialog - Enter MFA verification code

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { MFAVerificationDialog } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `isOpen` | `boolean` | — | Yes | Whether dialog is open |
| `method` | `MFAMethod` | — | No | MFA method being used |
| `onVerify` | `(code: string) => Promise<void>` | — | No | Callback to verify code |
| `onUseBackupCode` | `() => void` | — | No | Callback to use backup code instead |
| `onCancel` | `() => void` | — | No | Callback to cancel verification |
| `isLoading` | `boolean` | — | No | Whether verification is in progress |
| `error` | `string` | — | No | Error message |
| `title` | `string` | — | No | Custom title |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-mfa-mfaverificationdialog)

## Related Components

- **Button** — MFAVerificationDialog depends on Button
- **Modal** — MFAVerificationDialog depends on Modal
- **Modal** — MFAVerificationDialog is an alternative to Modal
- **PINInput** — MFAVerificationDialog depends on PINInput
- **Stack** — MFAVerificationDialog depends on Stack

## When to Use

Use this component when you need to:

- Use MFAVerificationDialog for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use MFAVerificationDialog for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, mfaverificationdialog

**Synonyms:** popup window, overlay panel

**Semantic Category:** overlay

This component is indexed for AI agents, RAG pipelines, and documentation search.
