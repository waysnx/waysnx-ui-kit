# Stack

Arrange elements in a single row or column with consistent spacing.

## Purpose

Arrange elements in a single row or column with consistent spacing

## Installation

```bash
npm install @waysnx/ui-layout
```

## Import

```typescript
import { Stack } from '@waysnx/ui-layout';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `React.ReactNode` | — | Yes |  |
| `direction` | `'vertical' | 'horizontal'` | — | No |  |
| `gap` | `number | string` | — | No |  |
| `align` | `'start' | 'center' | 'end' | 'stretch'` | — | No |  |
| `className` | `string` | — | No |  |
| `label` | `string` | — | No |  |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-stack)

## Used By

This component is used by:

- AccessDenied
- ActiveSessions
- ActivityFeed
- BackupCodesCard
- ConcurrentSessionDialog
- LoginHistory
- MFASettingsPanel
- MFASetupWizard
- MFAStatus
- MFAVerificationDialog
- PINInput
- PasswordPolicyPanel
- PrivacySettingsPanel
- SecureUploader
- SecurityAlertsPanel
- SecurityEventLog
- SecurityLogsPanel
- SecuritySettingsPanel
- SessionPolicyPanel
- SessionTimeoutDialog
- TrustedDeviceSelector
- TrustedDevicesPanel
- UnauthorizedPage

## When to Use

Use this component when you need to:

- Use Stack for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Stack for general-purpose components functionality

---

**Library:** `@waysnx/ui-layout`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** label, components, stack

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
