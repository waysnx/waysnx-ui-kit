# SecurityStatusCard

SecurityStatusCard - Individual security status card

## Purpose

SecurityStatusCard - Individual security status card

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { SecurityStatusCard } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `title` | `string` | — | Yes | Status title |
| `description` | `string` | — | No | Status description |
| `status` | `StatusType` | — | No | Current status |
| `value` | `string | number` | — | No | Status value/percentage |
| `label` | `string` | — | No | Status label |
| `actionLabel` | `string` | — | No | Action button label |
| `onAction` | `() => void` | — | No | Action button callback |
| `icon` | `React.ReactNode` | — | No | Card icon |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-status-securitystatuscard)

## Related Components

- **Badge** — SecurityStatusCard depends on Badge
- **Button** — SecurityStatusCard depends on Button

## When to Use

Use this component when you need to:

- Use SecurityStatusCard for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use SecurityStatusCard for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** label, securitystatuscard, components, value

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
