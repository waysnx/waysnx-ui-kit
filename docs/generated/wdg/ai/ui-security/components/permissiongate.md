# PermissionGate

Content to render if permission is granted

## Purpose

Content to render if permission is granted

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { PermissionGate } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `permission` | `string | string[]` | — | Yes | Permission required to view children |
| `hasPermission` | `boolean` | — | Yes | Whether user has the permission |
| `children` | `ReactNode` | — | Yes | Content to render if permission is granted |
| `fallback` | `ReactNode` | — | No | Content to render if permission is denied |
| `unmountOnDeny` | `boolean` | — | No | Whether to completely remove from DOM (vs just hiding) |
| `className` | `string` | — | No | Additional CSS class |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-authorization-permissiongate)

## When to Use

Use this component when you need to:

- Use PermissionGate for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use PermissionGate for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** permissiongate, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
