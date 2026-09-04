# Card

Contain and organize related content in a bordered container.

## Purpose

Contain and organize related content in a bordered container

## Installation

```bash
npm install @waysnx/ui-layout
```

## Import

```typescript
import { Card } from '@waysnx/ui-layout';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `React.ReactNode` | — | Yes |  |
| `className` | `string` | — | No |  |
| `title` | `string` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-surface` | background | .wx-card | 1 |
| `--wx-color-border` | border | .wx-card | 1 |
| `--wx-color-text` | color | .wx-card, .wx-card-title | 2 |

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-size-sm` | font-size | .wx-card | 1 |
| `--wx-font-size-md` | font-size | .wx-card-title | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

View Interactive Storybook

## Used By

This component is used by:

- EmailVerificationCard
- OTPVerificationCard
- PhoneVerificationCard

## When to Use

Use this component when you need to:

- Use Card for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Card for general-purpose components functionality

---

**Library:** `@waysnx/ui-layout`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** card, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
