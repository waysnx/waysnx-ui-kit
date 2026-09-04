# RoleGate

Content to render if role matches

## Purpose

Content to render if role matches

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { RoleGate } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `role` | `string | string[]` | — | Yes | Role(s) required to view children |
| `userRoles` | `string[]` | — | Yes | User's current roles |
| `children` | `ReactNode` | — | Yes | Content to render if role matches |
| `fallback` | `ReactNode` | — | No | Content to render if role doesn't match |
| `requireAll` | `boolean` | — | No | Require all roles (and) or any role (or) |
| `unmountOnDeny` | `boolean` | — | No | Whether to completely remove from DOM (vs just hiding) |
| `className` | `string` | — | No | Additional CSS class |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-authorization-rolegate)

## When to Use

Use this component when you need to:

- Use RoleGate for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use RoleGate for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** rolegate, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
