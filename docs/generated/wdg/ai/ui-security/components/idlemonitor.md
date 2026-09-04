# IdleMonitor

IdleMonitor - Invisible component that tracks user activity and inactivity Detects idle state using: - Mouse/keyboard events - Page visibility changes - requestAnimationFrame for efficient idle timeout checking

## Purpose

IdleMonitor - Invisible component that tracks user activity and inactivity Detects idle state using: - Mouse/keyboard events - Page visibility changes - requestAnimationFrame for efficient idle timeout checking

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { IdleMonitor } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `idleTimeoutMs` | `number` | — | No |  |
| `warningTimeoutMs` | `number` | — | No |  |
| `onIdle` | `() => void` | — | No | Callback when user becomes idle |
| `onIdleWarning` | `() => void` | — | No | Callback when idle warning is triggered |
| `onActive` | `() => void` | — | No | Callback when user returns from idle |
| `monitorPageVisibility` | `boolean` | — | No |  |
| `monitorUserInput` | `boolean` | — | No |  |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-sessions-idlemonitor)

## When to Use

Use this component when you need to:

- Use IdleMonitor for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use IdleMonitor for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** idlemonitor, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
