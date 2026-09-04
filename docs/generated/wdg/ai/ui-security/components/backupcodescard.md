# BackupCodesCard

BackupCodesCard - Display backup codes for account recovery

## Purpose

BackupCodesCard - Display backup codes for account recovery

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { BackupCodesCard } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `codes` | `string[]` | — | Yes | Backup codes array |
| `initiallyRevealed` | `boolean` | — | No | Whether codes are initially revealed |
| `onDownload` | `() => void` | — | No | Callback to download codes |
| `onPrint` | `() => void` | — | No | Callback to print codes |
| `onCopyAll` | `() => void` | — | No | Callback to copy all codes |
| `isConfirmed` | `boolean` | — | No | Whether backup codes have been saved/confirmed |
| `onConfirm` | `() => void` | — | No | Callback when user confirms they saved codes |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-mfa-backupcodescard)

## Related Components

- **Badge** — BackupCodesCard depends on Badge
- **Button** — BackupCodesCard depends on Button
- **Stack** — BackupCodesCard depends on Stack

## When to Use

Use this component when you need to:

- Use BackupCodesCard for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use BackupCodesCard for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** backupcodescard, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
