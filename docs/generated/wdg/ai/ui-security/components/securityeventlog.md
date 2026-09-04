# SecurityEventLog

Security events to display

## Purpose

Security events to display

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { SecurityEventLog } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `events` | `SecurityEventLogType[]` | — | Yes | Security events to display |
| `enableExport` | `boolean` | — | No | Enable export |
| `onExport` | `(format: 'json' | 'csv') => void` | — | No | Callback for export |
| `maxInitialEvents` | `number` | — | No | Max events to show initially |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-panels-securityeventlog)

## Related Components

- **Badge** — SecurityEventLog depends on Badge
- **Button** — SecurityEventLog depends on Button
- **Stack** — SecurityEventLog depends on Stack

## When to Use

Use this component when you need to:

- Use SecurityEventLog for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use SecurityEventLog for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, securityeventlog

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
