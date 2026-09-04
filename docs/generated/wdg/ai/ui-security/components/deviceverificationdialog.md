# DeviceVerificationDialog

Callback to close dialog

## Purpose

Callback to close dialog

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { DeviceVerificationDialog } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `open` | `boolean` | — | Yes | Whether dialog is open |
| `onClose` | `() => void` | — | Yes | Callback to close dialog |
| `device` | `DeviceInfo` | — | No | Device information to display |
| `onApprove` | `() => void | Promise<void>` | — | Yes | Callback when user approves device |
| `onReject` | `() => void | Promise<void>` | — | Yes | Callback when user rejects device |
| `loading` | `boolean` | — | No | Loading state |
| `error` | `string` | — | No | Error message |
| `title` | `string` | — | No | Title for the dialog |
| `description` | `string` | — | No | Description |
| `testId` | `string` | — | No | Test ID |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-verification-deviceverificationdialog)

## Related Components

- **Alert** — DeviceVerificationDialog depends on Alert
- **Button** — DeviceVerificationDialog depends on Button
- **Modal** — DeviceVerificationDialog is an alternative to Modal

## When to Use

Use this component when you need to:

- Use DeviceVerificationDialog for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use DeviceVerificationDialog for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, deviceverificationdialog

**Synonyms:** popup window, overlay panel

**Semantic Category:** overlay

This component is indexed for AI agents, RAG pipelines, and documentation search.
