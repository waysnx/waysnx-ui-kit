# ConcurrentSessionDialog

ConcurrentSessionDialog - Alert user about new concurrent session login

## Purpose

ConcurrentSessionDialog - Alert user about new concurrent session login

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { ConcurrentSessionDialog } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `isOpen` | `boolean` | — | Yes | Whether dialog is open |
| `newSession` | `SessionInfo` | — | No | New session attempting to login |
| `currentSession` | `SessionInfo` | — | No | Current/existing session |
| `onApprove` | `() => Promise<void>` | — | No | Callback to approve new session (and end current) |
| `onReject` | `() => Promise<void>` | — | No | Callback to reject new session |
| `isLoading` | `boolean` | — | No | Whether operation is in progress |
| `title` | `string` | — | No | Custom dialog title |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-sessions-concurrentsessiondialog)

## Related Components

- **Badge** — ConcurrentSessionDialog depends on Badge
- **Button** — ConcurrentSessionDialog depends on Button
- **Modal** — ConcurrentSessionDialog is an alternative to Modal
- **Stack** — ConcurrentSessionDialog depends on Stack

## When to Use

Use this component when you need to:

- Use ConcurrentSessionDialog for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use ConcurrentSessionDialog for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, concurrentsessiondialog

**Synonyms:** popup window, overlay panel

**Semantic Category:** overlay

This component is indexed for AI agents, RAG pipelines, and documentation search.
