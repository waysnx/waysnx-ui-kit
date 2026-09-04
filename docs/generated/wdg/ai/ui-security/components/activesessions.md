# ActiveSessions

ActiveSessions Component Displays list of active sessions with device info and actions to revoke them.

## Purpose

ActiveSessions Component Displays list of active sessions with device info and actions to revoke them

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { ActiveSessions } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `sessions` | `SessionInfo[]` | — | Yes | List of active sessions |
| `currentSessionId` | `string` | — | No | Current session ID (to mark as current) |
| `onRevokeSession` | `(sessionId: string) => Promise<void>` | — | No | Callback to revoke a session |
| `isRevoking` | `boolean` | — | No | Whether currently revoking a session |
| `currentSessionLabel` | `string` | — | No | Custom label for current session |
| `onRevokeAll` | `() => Promise<void>` | — | No | Callback when all other sessions are revoked |
| `showRevokeAll` | `boolean` | — | No | Whether showing revoke all button |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-sessions-activesessions)

## Related Components

- **Badge** — ActiveSessions depends on Badge
- **Button** — ActiveSessions depends on Button
- **Stack** — ActiveSessions depends on Stack

## When to Use

Use this component when you need to:

- Use ActiveSessions for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use ActiveSessions for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, activesessions

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
