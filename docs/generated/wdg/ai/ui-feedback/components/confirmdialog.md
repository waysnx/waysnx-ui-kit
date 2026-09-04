# ConfirmDialog

Request explicit user confirmation before performing a consequential action.

## Purpose

Request explicit user confirmation before performing a consequential action

## Installation

```bash
npm install @waysnx/ui-feedback
```

## Import

```typescript
import { ConfirmDialog } from '@waysnx/ui-feedback';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `open` | `boolean` | — | Yes |  |
| `title` | `string | React.ReactNode` | — | No |  |
| `message` | `string | React.ReactNode` | — | Yes |  |
| `variant` | `"default" | "danger" | "warning"` | — | No |  |
| `confirmLabel` | `string` | — | No |  |
| `cancelLabel` | `string` | — | No |  |
| `onConfirm` | `() => void` | — | Yes |  |
| `onCancel` | `() => void` | — | Yes |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-text-muted` | color | .wx-confirm-message | 1 |
| `--wx-color-surface-hover` | background | .wx-confirm-btn-cancel | 1 |
| `--wx-color-text` | color | .wx-confirm-btn-cancel | 1 |
| `--wx-color-border` | background | .wx-confirm-btn-cancel:hover | 1 |
| `--wx-color-primary` | background | .wx-confirm-btn-default | 1 |
| `--wx-color-primary-contrast` | color | .wx-confirm-btn-default, .wx-confirm-btn-danger, .wx-confirm-btn-warning | 3 |
| `--wx-color-primary-hover` | background | .wx-confirm-btn-default:hover | 1 |
| `--wx-color-error` | background | .wx-confirm-btn-danger | 1 |
| `--wx-color-error-hover` | background | .wx-confirm-btn-danger:hover | 1 |
| `--wx-color-warning` | background | .wx-confirm-btn-warning, .wx-confirm-btn-warning:hover | 2 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

View Interactive Storybook

## Related Components

- **Modal** — ConfirmDialog depends on Modal
- **Modal** — ConfirmDialog is an alternative to Modal

## When to Use

Use this component when you need to:

- Use ConfirmDialog for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use ConfirmDialog for general-purpose components functionality

---

**Library:** `@waysnx/ui-feedback`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** confirmdialog, components

**Synonyms:** popup window, overlay panel

**Semantic Category:** overlay

This component is indexed for AI agents, RAG pipelines, and documentation search.
