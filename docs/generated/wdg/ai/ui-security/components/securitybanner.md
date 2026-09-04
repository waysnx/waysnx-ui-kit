# SecurityBanner

SecurityBanner Component Prominent banner to display security alerts and status messages.

## Purpose

SecurityBanner Component Prominent banner to display security alerts and status messages

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { SecurityBanner } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `message` | `string` | — | Yes | Banner message |
| `severity` | `SecuritySeverity` | — | No | Severity level |
| `title` | `string` | — | No | Banner title |
| `dismissible` | `boolean` | — | No | Whether banner is dismissible |
| `onDismiss` | `() => void` | — | No | Callback when dismissed |
| `actionLabel` | `string` | — | No | Action button label |
| `onAction` | `() => void` | — | No | Action button callback |
| `icon` | `React.ReactNode` | — | No | Icon to display |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-status-securitybanner)

## Related Components

- **Button** — SecurityBanner depends on Button

## When to Use

Use this component when you need to:

- Use SecurityBanner for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use SecurityBanner for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** securitybanner, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
