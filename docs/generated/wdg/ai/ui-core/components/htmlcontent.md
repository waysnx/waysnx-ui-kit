# HtmlContent

Display sanitized HTML content safely within the application interface.

## Purpose

Display sanitized HTML content safely within the application interface

## Installation

```bash
npm install @waysnx/ui-core
```

## Import

```typescript
import { HtmlContent } from '@waysnx/ui-core';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `content` | `string` | — | Yes |  |
| `className` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-text` | color | .wx-html-content | 1 |
| `--wx-color-primary` | color, border-left | .wx-html-content a, .wx-html-content blockquote | 2 |
| `--wx-color-surface-hover` | background-color | .wx-html-content code, .wx-html-content pre | 2 |
| `--wx-color-text-muted` | color | .wx-html-content blockquote | 1 |
| `--wx-color-border` | border, border-top | .wx-html-content table th, .wx-html-content table td, .wx-html-content hr | 2 |
| `--wx-color-surface-alt` | background-color | .wx-html-content table th | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-htmlcontent)

## When to Use

Use this component when you need to:

- Use HtmlContent for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use HtmlContent for general-purpose components functionality

---

**Library:** `@waysnx/ui-core`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** htmlcontent, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
