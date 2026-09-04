# MFASetupWizard

MFASetupWizard - Multi-step wizard for MFA setup

## Purpose

MFASetupWizard - Multi-step wizard for MFA setup

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { MFASetupWizard } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `methods` | `MFAMethod[]` | — | No | Available MFA methods to set up |
| `steps` | `MFASetupStep[]` | — | No | Step labels |
| `currentStep` | `number` | — | No | Current step index |
| `onStepComplete` | `(method: MFAMethod, data: any) => Promise<void>` | — | No | Callback when step is completed |
| `onComplete` | `(backupMethods: MFAMethod[]) => void` | — | No | Callback when wizard is completed |
| `onCancel` | `() => void` | — | No | Callback when wizard is cancelled |
| `isLoading` | `boolean` | — | No | Whether setup is in progress |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-mfa-mfasetupwizard)

## Related Components

- **Button** — MFASetupWizard depends on Button
- **Stack** — MFASetupWizard depends on Stack

## When to Use

Use this component when you need to:

- Use MFASetupWizard for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use MFASetupWizard for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, mfasetupwizard

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
