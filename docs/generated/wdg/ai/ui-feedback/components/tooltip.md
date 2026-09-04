# Tooltip

Display supplementary information when user hovers over an element.

## Purpose

Display supplementary information when user hovers over an element

## Installation

```bash
npm install @waysnx/ui-feedback
```

## Import

```typescript
import { Tooltip } from '@waysnx/ui-feedback';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `content` | `string | React.ReactNode` | — | Yes |  |
| `position` | `"top" | "bottom" | "left" | "right"` | — | No |  |
| `children` | `React.ReactNode` | — | Yes |  |
| `className` | `string` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-text` | background | .wx-tooltip | 1 |
| `--wx-color-primary-contrast` | color | .wx-tooltip | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

View Interactive Storybook

## Related Components

- **Button** — Tooltip works well with Button
- **Link** — Tooltip works well with Link

## When to Use

Use this component when you need to:

- Use Tooltip for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Tooltip for general-purpose components functionality

---

**Library:** `@waysnx/ui-feedback`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** tooltip, components

**Semantic Category:** overlay

This component is indexed for AI agents, RAG pipelines, and documentation search.
