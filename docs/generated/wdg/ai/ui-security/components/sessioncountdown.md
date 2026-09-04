# SessionCountdown

SessionCountdown - Session time countdown display

## Purpose

SessionCountdown - Session time countdown display

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { SessionCountdown } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `totalDuration` | `number` | — | Yes | Total session duration in milliseconds |
| `remainingTime` | `number` | — | Yes | Remaining time in milliseconds |
| `onTimeLow` | `() => void` | — | No | Callback when time is low (30% remaining) |
| `onTimeCritical` | `() => void` | — | No | Callback when time is critical (10% remaining) |
| `format` | `'compact' | 'detailed'` | — | No | Display format |
| `className` | `string` | — | No | Additional CSS class |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-sessions-sessioncountdown)

## When to Use

Use this component when you need to:

- Use SessionCountdown for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use SessionCountdown for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, sessioncountdown

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
