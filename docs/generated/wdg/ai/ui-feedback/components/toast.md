# Toast

Display a temporary notification message that auto-dismisses.

## Purpose

Display a temporary notification message that auto-dismisses

## Installation

```bash
npm install @waysnx/ui-feedback
```

## Import

```typescript
import { useToast } from '@waysnx/ui-feedback';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `type` | `ToastType` | — | No |  |
| `message` | `string | React.ReactNode` | — | Yes |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-primary-contrast` | color | .wx-toast-success .wx-toast-icon, .wx-toast-error .wx-toast-icon, .wx-toast-info .wx-toast-icon, .wx-toast-warning .wx-toast-icon | 4 |
| `--wx-color-error-light` | background | .wx-toast-error | 1 |
| `--wx-color-error-hover` | color, background | .wx-toast-error, .wx-toast-error .wx-toast-icon | 2 |

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-family` | font-family | .wx-toast | 1 |

### Radius

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-radius-md` | border-radius | .wx-toast | 1 |
| `--wx-radius-sm` | border-radius | .wx-toast-close | 1 |

### Shadows

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-shadow-md` | box-shadow | .wx-toast | 1 |

### Other

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-info-info-bg` | background | .wx-toast-info | 1 |
| `--wx-info-info-text` | color, background | .wx-toast-info, .wx-toast-info .wx-toast-icon | 2 |
| `--wx-info-success-bg` | background | .wx-toast-success | 1 |
| `--wx-info-success-text` | color, background | .wx-toast-success, .wx-toast-success .wx-toast-icon | 2 |
| `--wx-info-warning-bg` | background | .wx-toast-warning | 1 |
| `--wx-info-warning-text` | color, background | .wx-toast-warning, .wx-toast-warning .wx-toast-icon | 2 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

View Interactive Storybook

## Related Components

- **NotificationBadge** — Toast is an alternative to NotificationBadge
- **NotificationCenter** — Toast is an alternative to NotificationCenter
- **NotificationList** — Toast is an alternative to NotificationList

## When to Use

Use this component when you need to:

- Use Toast for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Toast for general-purpose components functionality

---

**Library:** `@waysnx/ui-feedback`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** toast, components

**Semantic Category:** feedback

This component is indexed for AI agents, RAG pipelines, and documentation search.
