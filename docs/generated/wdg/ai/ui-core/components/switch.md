# Switch

Enable users to toggle a setting or feature on or off with a visual switch.

## Purpose

Enable users to toggle a setting or feature on or off with a visual switch

## Installation

```bash
npm install @waysnx/ui-core
```

## Import

```typescript
import { Switch } from '@waysnx/ui-core';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | — | No |  |
| `ariaLabel` | `string` | — | No |  |
| `ariaDescribedBy` | `string` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-border` | background | .wx-switch-slider | 1 |
| `--wx-color-surface` | background | .wx-switch-slider:after | 1 |
| `--wx-color-primary` | background | .wx-switch:checked+.wx-switch-slider | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-switch)

## When to Use

Use this component when you need to:

- Use Switch for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Switch for general-purpose components functionality

---

**Library:** `@waysnx/ui-core`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** label, components, switch

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
