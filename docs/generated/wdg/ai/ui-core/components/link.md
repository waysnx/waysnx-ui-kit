# Link

Navigate users to a different page or external resource via a clickable text link.

## Purpose

Navigate users to a different page or external resource via a clickable text link

## Installation

```bash
npm install @waysnx/ui-core
```

## Import

```typescript
import { Link } from '@waysnx/ui-core';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | — | Yes |  |
| `href` | `string` | — | No |  |
| `onClick` | `(e: React.MouseEvent<HTMLAnchorElement>) => void` | — | No |  |
| `prependText` | `string` | — | No |  |
| `appendText` | `string` | — | No |  |
| `target` | `'_blank' | '_self' | '_parent' | '_top'` | — | No |  |
| `className` | `string` | — | No |  |
| `disabled` | `boolean` | — | No |  |
| `ariaLabel` | `string` | — | No |  |
| `ariaDescribedBy` | `string` | — | No |  |
| `isActive` | `boolean` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-primary` | color | .wx-link | 1 |
| `--wx-color-text-light` | color | .wx-link-disabled | 1 |
| `--wx-color-text-muted` | color | .wx-link-prepend, .wx-link-append | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-link)

## When to Use

Use this component when you need to:

- Use Link for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Link for general-purpose components functionality

---

**Library:** `@waysnx/ui-core`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** link, components, label

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
