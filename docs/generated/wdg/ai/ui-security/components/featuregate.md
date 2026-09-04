# FeatureGate

Content to render if feature is enabled

## Purpose

Content to render if feature is enabled

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { FeatureGate } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `featureId` | `string` | — | Yes | Feature flag identifier |
| `isEnabled` | `boolean` | — | Yes | Whether feature is enabled |
| `children` | `ReactNode` | — | Yes | Content to render if feature is enabled |
| `fallback` | `ReactNode` | — | No | Content to render if feature is disabled |
| `unmountOnDisable` | `boolean` | — | No | Whether to completely remove from DOM (vs just hiding) |
| `className` | `string` | — | No | Additional CSS class |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-authorization-featuregate)

## When to Use

Use this component when you need to:

- Use FeatureGate for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use FeatureGate for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, featuregate

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
