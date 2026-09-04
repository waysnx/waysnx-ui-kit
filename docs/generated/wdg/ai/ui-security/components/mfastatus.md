# MFAStatus

MFAStatus - Display MFA configuration status

## Purpose

MFAStatus - Display MFA configuration status

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { MFAStatus } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `config` | `MFAConfiguration` | — | No | Current MFA configuration |
| `onEnable` | `() => void` | — | No | Callback to enable MFA |
| `onDisable` | `() => void` | — | No | Callback to disable MFA |
| `onChangeMethod` | `() => void` | — | No | Callback to change MFA method |
| `isLoading` | `boolean` | — | No | Whether operations are loading |
| `allowDisable` | `boolean` | — | No | Allow disabling MFA |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-mfa-mfastatus)

## Related Components

- **Badge** — MFAStatus depends on Badge
- **Button** — MFAStatus depends on Button
- **Stack** — MFAStatus depends on Stack

## When to Use

Use this component when you need to:

- Use MFAStatus for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use MFAStatus for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** mfastatus, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
