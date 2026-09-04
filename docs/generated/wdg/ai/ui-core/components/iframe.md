# IFrame

Secure-by-default sandbox policy. Supports the documented use cases (embedded video, maps, forms, third-party widgets) while keeping the frame isolated. `allow-same-origin` is deliberately omitted because combining it with `allow-scripts` would let the framed document script its way out of the sandbox.

## Purpose

Secure-by-default sandbox policy

## Installation

```bash
npm install @waysnx/ui-core
```

## Import

```typescript
import { IFrame } from '@waysnx/ui-core';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `https` | `// */
  src: string` | — | Yes |  |
| `title` | `string` | — | Yes |  |
| `label` | `string` | — | No |  |
| `default` | `100%) */
  width?: string | number` | — | Yes |  |
| `default` | `400px) */
  height?: string | number` | — | Yes |  |
| `allowFullscreen` | `boolean` | — | No |  |
| `Note` | `intentionally does NOT combine `allow-scripts` with
   * `allow-same-origin` by default, since together they let framed content
   * remove its own sandbox.
   */
  sandbox?: string` | — | Yes |  |
| `hint` | `string` | — | No |  |
| `className` | `string` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-text` | color | .wx-iframe-label | 1 |
| `--wx-color-border` | border | .wx-iframe-container | 1 |
| `--wx-color-surface` | background | .wx-iframe-container | 1 |
| `--wx-color-text-muted` | color | .wx-iframe-hint | 1 |

### Radius

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-radius-md` | border-radius | .wx-iframe-container | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-iframe)

## When to Use

Use this component when you need to:

- Use IFrame for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use IFrame for general-purpose components functionality

---

**Library:** `@waysnx/ui-core`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, label, iframe

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
