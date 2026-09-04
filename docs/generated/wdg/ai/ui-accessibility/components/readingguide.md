# ReadingGuide

ReadingGuide Component Displays a visual reading line to help users follow text Only renders when readingGuide is enabled in accessibility settings

## Purpose

ReadingGuide Component Displays a visual reading line to help users follow text Only renders when readingGuide is enabled in accessibility settings

## Installation

```bash
npm install @waysnx/ui-accessibility
```

## Import

```typescript
import { ReadingGuide } from '@waysnx/ui-accessibility';
```

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-reading-guide-color` | background | .wx-reading-guide, @media (prefers-contrast: more) | 2 |

### Other

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-reading-guide-height` | height | .wx-reading-guide | 1 |
| `--wx-reading-guide-outline` | box-shadow | .wx-reading-guide, @media (prefers-contrast: more) | 2 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/accessibility-readingguide)

## When to Use

Use this component when you need to:

- Use ReadingGuide for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use ReadingGuide for general-purpose components functionality

---

**Library:** `@waysnx/ui-accessibility`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** readingguide, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
