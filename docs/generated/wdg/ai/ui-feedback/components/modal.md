# Modal

Display important content in a focused dialog window.

## Purpose

Display important content in a focused dialog window

## Installation

```bash
npm install @waysnx/ui-feedback
```

## Import

```typescript
import { Modal } from '@waysnx/ui-feedback';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `open` | `boolean` | — | Yes |  |
| `onClose` | `() => void` | — | Yes |  |
| `title` | `string | React.ReactNode` | — | No |  |
| `size` | `"sm" | "md" | "lg" | "fullscreen"` | — | No |  |
| `footer` | `React.ReactNode` | — | No |  |
| `closeOnBackdrop` | `boolean` | — | No |  |
| `closeOnEscape` | `boolean` | — | No |  |
| `showCloseButton` | `boolean` | — | No |  |
| `children` | `React.ReactNode` | — | Yes |  |
| `className` | `string` | — | No |  |
| `role` | `string` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-surface` | background | .}

.wx-modal | 1 |
| `--wx-color-text` | color | .}

.wx-modal, .wx-modal-close:hover | 2 |
| `--wx-color-border` | border-bottom, border-top | .wx-modal-header, .wx-modal-footer | 2 |
| `--wx-color-text-muted` | color | .wx-modal-close | 1 |
| `--wx-color-surface-hover` | background | .wx-modal-close:hover | 1 |

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-family` | font-family | .}

.wx-modal | 1 |

### Radius

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-radius-md` | border-radius | .}

.wx-modal | 1 |
| `--wx-radius-sm` | border-radius | .wx-modal-close | 1 |

### Shadows

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-shadow-xl` | box-shadow | .}

.wx-modal | 1 |

### Other

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-overlay-bg` | background | .wx-modal-backdrop | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

View Interactive Storybook

## Related Components

- **Button** — Modal works well with Button
- **Button** — Modal typically contains Button
- **ConcurrentSessionDialog** — Modal is an alternative to ConcurrentSessionDialog
- **ConfirmDialog** — Modal is an alternative to ConfirmDialog
- **DeviceVerificationDialog** — Modal is an alternative to DeviceVerificationDialog
- **Input** — Modal works well with Input
- **Input** — Modal typically contains Input
- **MFAVerificationDialog** — Modal is an alternative to MFAVerificationDialog
- **SessionTimeoutDialog** — Modal is an alternative to SessionTimeoutDialog

## Child Components

This component typically contains:

- Button
- Input

## Used By

This component is used by:

- ConfirmDialog
- MFAVerificationDialog
- SessionTimeoutDialog

## When to Use

Use this component when you need to:

- Confirm critical actions like delete or approval
- Collect data in a modal form

## When NOT to Use

Avoid using this component when:

- Modal without ESC to close
- Focus not trapped in modal

## Best Practices

**✓ Good use cases:**
- Confirm critical actions like delete or approval
- Collect data in a modal form

**✗ Avoid:**
- Modal without ESC to close
- Focus not trapped in modal

---

**Library:** `@waysnx/ui-feedback`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** modal, window, popup, dialog, overlay

**Synonyms:** dialog, popup window, modal dialog

**Semantic Category:** overlay

This component is indexed for AI agents, RAG pipelines, and documentation search.
