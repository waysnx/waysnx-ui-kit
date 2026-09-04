# KeepAliveButton

KeepAliveButton - Manually extend user session

## Purpose

KeepAliveButton - Manually extend user session

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { KeepAliveButton } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `onKeepAlive` | `() => Promise<void>` | — | No | Callback to keep session alive |
| `label` | `string` | — | No | Button label |
| `variant` | `'primary' | 'secondary' | 'outline' | 'ghost'` | — | No | Button variant |
| `size` | `'sm' | 'md' | 'lg'` | — | No | Button size |
| `disabled` | `boolean` | — | No | Whether button is disabled |
| `loadingLabel` | `string` | — | No | Custom loading message |
| `showFeedback` | `boolean` | — | No | Whether to show success feedback |
| `icon` | `React.ReactNode` | — | No | Icon to show before label |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-sessions-keepalivebutton)

## Related Components

- **Button** — KeepAliveButton depends on Button

## When to Use

Use this component when you need to:

- Use KeepAliveButton for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use KeepAliveButton for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** keepalivebutton, label, components

**Synonyms:** action control, clickable element

**Semantic Category:** display

This component is indexed for AI agents, RAG pipelines, and documentation search.
