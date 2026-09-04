# EmptyState

Show a clear message when no data is available to display.

## Purpose

Show a clear message when no data is available to display

## Installation

```bash
npm install @waysnx/ui-feedback
```

## Import

```typescript
import { EmptyState } from '@waysnx/ui-feedback';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `icon` | `React.ReactNode` | — | No |  |
| `title` | `string | React.ReactNode` | — | Yes |  |
| `description` | `string | React.ReactNode` | — | No |  |
| `action` | `React.ReactNode` | — | No |  |
| `className` | `string` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-text-light` | color | .wx-empty-icon | 1 |
| `--wx-color-text` | color | .wx-empty-title | 1 |
| `--wx-color-text-muted` | color | .wx-empty-description | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-emptystate)

## When to Use

Use this component when you need to:

- Use EmptyState for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use EmptyState for general-purpose components functionality

---

**Library:** `@waysnx/ui-feedback`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, emptystate

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
