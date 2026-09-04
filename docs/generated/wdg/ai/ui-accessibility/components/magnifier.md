# Magnifier

Magnifier Component Provides a magnified view of page content for users with low vision Follows cursor/scroll position

## Purpose

Magnifier Component Provides a magnified view of page content for users with low vision Follows cursor/scroll position

## Installation

```bash
npm install @waysnx/ui-accessibility
```

## Import

```typescript
import { Magnifier } from '@waysnx/ui-accessibility';
```

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-primary` | border, background, background-color | .wx-magnifier, .wx-magnifier-crosshair, .wx-magnifier-crosshair::before, .wx-magnifier-crosshair::after | 5 |
| `--wx-color-surface` | background-color | .wx-magnifier | 1 |
| `--wx-color-text` | border, box-shadow, background-color | @media (prefers-contrast: more), .wx-magnifier-crosshair, .wx-magnifier-crosshair::before, .wx-magnifier-crosshair::after | 4 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/accessibilitycenter-magnifier)

## When to Use

Use this component when you need to:

- Use Magnifier for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Magnifier for general-purpose components functionality

---

**Library:** `@waysnx/ui-accessibility`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** magnifier, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
