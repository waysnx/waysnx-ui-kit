# Drawer

Display content in a side panel that slides in from the screen edge.

## Purpose

Display content in a side panel that slides in from the screen edge

## Installation

```bash
npm install @waysnx/ui-feedback
```

## Import

```typescript
import { Drawer } from '@waysnx/ui-feedback';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `open` | `boolean` | — | Yes |  |
| `onClose` | `() => void` | — | Yes |  |
| `title` | `string | React.ReactNode` | — | No |  |
| `position` | `"left" | "right"` | — | No |  |
| `size` | `"sm" | "md" | "lg"` | — | No |  |
| `showCloseButton` | `boolean` | — | No |  |
| `closeOnBackdrop` | `boolean` | — | No |  |
| `children` | `React.ReactNode` | — | Yes |  |
| `className` | `string` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-surface` | background | .wx-drawer | 1 |
| `--wx-color-text` | color | .wx-drawer, .wx-drawer-close:hover | 2 |
| `--wx-color-border` | border-bottom | .}

.wx-drawer-header | 1 |
| `--wx-color-text-muted` | color | .wx-drawer-close | 1 |
| `--wx-color-surface-hover` | background | .wx-drawer-close:hover | 1 |

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-family` | font-family | .wx-drawer | 1 |

### Radius

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-radius-sm` | border-radius | .wx-drawer-close | 1 |

### Shadows

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-shadow-lg` | box-shadow | .wx-drawer | 1 |

### Other

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-overlay-bg` | background | .wx-drawer-backdrop | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/navigation-drawer)

## When to Use

Use this component when you need to:

- Use Drawer for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Drawer for general-purpose components functionality

---

**Library:** `@waysnx/ui-feedback`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, drawer

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
