# SkipLinks

SkipLinks — renders visually hidden skip-navigation links. Links appear on keyboard focus, allowing keyboard/screen reader users to bypass repeated navigation blocks. Place as the very first child of or .

## Purpose

SkipLinks — renders visually hidden skip-navigation links

## Installation

```bash
npm install @waysnx/ui-accessibility
```

## Import

```typescript
import { SkipLinks } from '@waysnx/ui-accessibility';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `links` | `SkipLink[]` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-primary` | background | .wx-skip-link | 1 |
| `--wx-color-primary-contrast` | color, outline | .wx-skip-link, .wx-skip-link:focus-visible | 2 |

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-size-sm` | font-size | .wx-skip-link | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/accessibility-skiplinks)

## When to Use

Use this component when you need to:

- Use SkipLinks for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use SkipLinks for general-purpose components functionality

---

**Library:** `@waysnx/ui-accessibility`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** skiplinks, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
