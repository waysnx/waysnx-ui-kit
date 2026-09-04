# Image

Display images with responsive sizing, fallback handling, and accessibility support.

## Purpose

Display images with responsive sizing, fallback handling, and accessibility support

## Installation

```bash
npm install @waysnx/ui-core
```

## Import

```typescript
import { Image } from '@waysnx/ui-core';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `src` | `string` | — | Yes |  |
| `alt` | `string` | — | Yes |  |
| `caption` | `string` | — | No |  |
| `width` | `string | number` | — | No |  |
| `height` | `string | number` | — | No |  |
| `fit` | `'cover' | 'contain' | 'fill' | 'none'` | — | No |  |
| `rounded` | `boolean | 'full'` | — | No |  |
| `fallback` | `string` | — | No |  |
| `className` | `string` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-text` | color | .wx-image-label | 1 |
| `--wx-color-text-muted` | color | .wx-image-caption | 1 |

### Radius

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-radius-md` | border-radius | .wx-image--rounded | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

View Interactive Storybook

## When to Use

Use this component when you need to:

- Use Image for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Image for general-purpose components functionality

---

**Library:** `@waysnx/ui-core`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, image

**Semantic Category:** display

This component is indexed for AI agents, RAG pipelines, and documentation search.
