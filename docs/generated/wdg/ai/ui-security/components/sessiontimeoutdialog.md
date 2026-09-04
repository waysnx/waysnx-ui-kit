# SessionTimeoutDialog

SessionTimeoutDialog - Warning dialog for session timeout

## Purpose

SessionTimeoutDialog - Warning dialog for session timeout

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { SessionTimeoutDialog } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `isOpen` | `boolean` | — | Yes | Whether dialog is open |
| `minutesRemaining` | `number` | — | No | Minutes until session timeout |
| `onExtend` | `() => void` | — | No | Callback to extend session |
| `onLogout` | `() => void` | — | No | Callback to logout |
| `title` | `string` | — | No | Warning title |
| `message` | `string` | — | No | Warning message |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-sessions-sessiontimeoutdialog)

## Related Components

- **Button** — SessionTimeoutDialog depends on Button
- **DatePicker** — SessionTimeoutDialog is an alternative to DatePicker
- **DateRangePicker** — SessionTimeoutDialog is an alternative to DateRangePicker
- **DateTimePicker** — SessionTimeoutDialog is an alternative to DateTimePicker
- **Modal** — SessionTimeoutDialog depends on Modal
- **Modal** — SessionTimeoutDialog is an alternative to Modal
- **Stack** — SessionTimeoutDialog depends on Stack

## When to Use

Use this component when you need to:

- Use SessionTimeoutDialog for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use SessionTimeoutDialog for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** sessiontimeoutdialog, components

**Synonyms:** popup window, overlay panel

**Semantic Category:** input

This component is indexed for AI agents, RAG pipelines, and documentation search.
