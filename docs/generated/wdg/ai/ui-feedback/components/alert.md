# Alert

Display a contextual message that requires user attention.

## Purpose

Display a contextual message that requires user attention

## Installation

```bash
npm install @waysnx/ui-feedback
```

## Import

```typescript
import { Alert } from '@waysnx/ui-feedback';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `type` | `'info' | 'success' | 'warning' | 'error'` | — | No |  |
| `children` | `React.ReactNode` | — | Yes |  |
| `className` | `string` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-error-light` | background | .wx-alert-error | 1 |
| `--wx-color-error-hover` | color | .wx-alert-error | 1 |

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-size-sm` | font-size | .wx-alert | 1 |

### Other

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-info-info-bg` | background | .wx-alert-info | 1 |
| `--wx-info-info-text` | color | .wx-alert-info | 1 |
| `--wx-info-success-bg` | background | .wx-alert-success | 1 |
| `--wx-info-success-text` | color | .wx-alert-success | 1 |
| `--wx-info-warning-bg` | background | .wx-alert-warning | 1 |
| `--wx-info-warning-text` | color | .wx-alert-warning | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

View Interactive Storybook

## Used By

This component is used by:

- ChangePasswordForm
- DeviceVerificationDialog
- EmailVerificationCard
- ForgotPasswordForm
- OTPVerificationCard
- PhoneVerificationCard

## When to Use

Use this component when you need to:

- Use Alert for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Alert for general-purpose components functionality

---

**Library:** `@waysnx/ui-feedback`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** alert, components

**Semantic Category:** feedback

This component is indexed for AI agents, RAG pipelines, and documentation search.
