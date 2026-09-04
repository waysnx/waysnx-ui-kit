# PolicyGate

Content to render if policy is met

## Purpose

Content to render if policy is met

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { PolicyGate } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `policyId` | `string` | — | Yes | Policy identifier |
| `isPolicyMet` | `boolean` | — | Yes | Whether policy evaluation passed |
| `policyDetails` | `{
    description?: string` | — | No | Policy evaluation details |
| `reason` | `string` | — | No |  |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-authorization-policygate)

## When to Use

Use this component when you need to:

- Use PolicyGate for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use PolicyGate for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, policygate

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
