# SecurityAlert

SecurityAlert Component Card displaying individual security alert with actions.

## Purpose

SecurityAlert Component Card displaying individual security alert with actions

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { SecurityAlert } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `title` | `string` | — | Yes |  |
| `description` | `string` | — | Yes |  |
| `severity` | `AlertSeverity` | — | No |  |
| `status` | `AlertStatus` | — | No |  |
| `timestamp` | `Date` | — | No |  |
| `actionLabel` | `string` | — | No |  |
| `onAction` | `() => void` | — | No |  |
| `onDismiss` | `() => void` | — | No |  |
| `details` | `Record<string, string>` | — | No |  |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-status-securityalert)

## Related Components

- **Badge** — SecurityAlert depends on Badge
- **Button** — SecurityAlert depends on Button

## When to Use

Use this component when you need to:

- Use SecurityAlert for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use SecurityAlert for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** securityalert, components

**Semantic Category:** feedback

This component is indexed for AI agents, RAG pipelines, and documentation search.
