# TrustedDeviceSelector

TrustedDeviceSelector - Mark device as trusted

## Purpose

TrustedDeviceSelector - Mark device as trusted

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { TrustedDeviceSelector } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `deviceName` | `string` | — | No | Current device name |
| `trustDurationDays` | `number` | — | No | How long to trust device (in days) |
| `isTrusted` | `boolean` | — | No | Whether device is selected as trusted |
| `onTrustChange` | `(isTrusted: boolean, durationDays?: number) => void` | — | No | Callback when trust state changes |
| `disabled` | `boolean` | — | No | Whether selection is disabled |
| `message` | `string` | — | No | Custom message |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-devices-trusteddeviceselector)

## Related Components

- **Checkbox** — TrustedDeviceSelector depends on Checkbox
- **Stack** — TrustedDeviceSelector depends on Stack

## When to Use

Use this component when you need to:

- Use TrustedDeviceSelector for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use TrustedDeviceSelector for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** trusteddeviceselector, components

**Synonyms:** option selector, choice control

**Semantic Category:** input

This component is indexed for AI agents, RAG pipelines, and documentation search.
