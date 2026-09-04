# AccessDenied

AccessDenied - Screen for access denied errors

## Purpose

AccessDenied - Screen for access denied errors

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { AccessDenied } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `reason` | `string` | — | No | Access denied reason |
| `details` | `string` | — | No | Additional details |
| `backLabel` | `string` | — | No | Button label for going back |
| `onBack` | `() => void` | — | No | Callback when back button is clicked |
| `supportLabel` | `string` | — | No | Button label for contacting support |
| `onSupport` | `() => void` | — | No | Callback when support button is clicked |
| `className` | `string` | — | No | Additional CSS class |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-pages-accessdenied)

## Related Components

- **Button** — AccessDenied depends on Button
- **Stack** — AccessDenied depends on Stack

## When to Use

Use this component when you need to:

- Use AccessDenied for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use AccessDenied for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, accessdenied

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
