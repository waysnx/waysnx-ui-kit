# HtmlEditor

Enable users to create and format HTML content with a visual text editor toolbar.

## Purpose

Enable users to create and format HTML content with a visual text editor toolbar

## Installation

```bash
npm install @waysnx/ui-core
```

## Import

```typescript
import { HtmlEditor } from '@waysnx/ui-core';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | — | No |  |
| `value` | `string` | — | No |  |
| `onChange` | `(value: string) => void` | — | No |  |
| `placeholder` | `string` | — | No |  |
| `hint` | `string` | — | No |  |
| `error` | `string` | — | No |  |
| `disabled` | `boolean` | — | No |  |
| `minHeight` | `number` | — | No |  |
| `toolbar` | `('bold' | 'italic' | 'underline' | 'link' | 'ul' | 'ol' | 'h1' | 'h2')[]` | — | No |  |
| `className` | `string` | — | No |  |
| `ariaLabel` | `string` | — | No |  |
| `ariaDescribedBy` | `string` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-text` | color | .wx-htmleditor-label, .wx-htmleditor-toolbar-btn, .wx-htmleditor-content | 3 |
| `--wx-color-border` | border, border-bottom, background-color | .wx-htmleditor-container, .wx-htmleditor-toolbar, .wx-htmleditor-toolbar-btn, .wx-htmleditor-toolbar-btn:active:not(:disabled) | 4 |
| `--wx-color-surface` | background-color | .wx-htmleditor-container, .wx-htmleditor-toolbar-btn | 2 |
| `--wx-color-primary` | border-color, color | .wx-htmleditor-container-focused, .wx-htmleditor-toolbar-btn:hover:not(:disabled), .wx-htmleditor-content a | 3 |
| `--wx-color-error` | border-color, color | .wx-htmleditor-container-error, .wx-htmleditor-error-text | 2 |
| `--wx-color-surface-hover` | background-color | .wx-htmleditor-container-disabled, .wx-htmleditor-toolbar-btn:hover:not(:disabled) | 2 |
| `--wx-color-surface-alt` | background-color | .wx-htmleditor-toolbar | 1 |
| `--wx-color-text-light` | color | .wx-htmleditor-content:empty:before | 1 |
| `--wx-color-text-muted` | color | .wx-htmleditor-hint | 1 |

### Shadows

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-shadow-focus` | box-shadow | .wx-htmleditor-container-focused | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-htmleditor)

## When to Use

Use this component when you need to:

- Use HtmlEditor for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use HtmlEditor for general-purpose components functionality

---

**Library:** `@waysnx/ui-core`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** label, placeholder, value, htmleditor, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
