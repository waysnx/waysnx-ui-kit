# UnauthorizedPage

UnauthorizedPage - Full page unauthorized error screen

## Purpose

UnauthorizedPage - Full page unauthorized error screen

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { UnauthorizedPage } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `title` | `string` | — | No | Page title |
| `message` | `string` | — | No | Error message |
| `statusCode` | `number | string` | — | No | Error code to display |
| `onLogin` | `() => void` | — | No | Callback for login button |
| `onHome` | `() => void` | — | No | Callback for home button |
| `className` | `string` | — | No | Additional CSS class |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-pages-unauthorizedpage)

## Related Components

- **Button** — UnauthorizedPage depends on Button
- **Stack** — UnauthorizedPage depends on Stack

## When to Use

Use this component when you need to:

- Use UnauthorizedPage for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use UnauthorizedPage for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, unauthorizedpage

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
