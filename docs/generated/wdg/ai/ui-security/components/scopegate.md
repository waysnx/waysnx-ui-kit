# ScopeGate

Content to render if scope is granted

## Purpose

Content to render if scope is granted

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { ScopeGate } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `scope` | `string | string[]` | — | Yes | Scope(s) required |
| `grantedScopes` | `string[]` | — | Yes | User's granted scopes |
| `children` | `ReactNode` | — | Yes | Content to render if scope is granted |
| `fallback` | `ReactNode` | — | No | Content to render if scope is denied |
| `requireAll` | `boolean` | — | No | Require all scopes (and) or any scope (or) |
| `unmountOnDeny` | `boolean` | — | No | Whether to completely remove from DOM (vs just hiding) |
| `className` | `string` | — | No | Additional CSS class |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-authorization-scopegate)

## When to Use

Use this component when you need to:

- Use ScopeGate for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use ScopeGate for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** scopegate, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
