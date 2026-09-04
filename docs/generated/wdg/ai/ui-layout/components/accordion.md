# Accordion

Display collapsible sections of content that expand or collapse.

## Purpose

Display collapsible sections of content that expand or collapse

## Installation

```bash
npm install @waysnx/ui-layout
```

## Import

```typescript
import { Accordion } from '@waysnx/ui-layout';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `React.ReactNode` | — | Yes |  |
| `allowMultiple` | `boolean` | — | No |  |
| `defaultOpen` | `string[]` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-border` | border, border-bottom, border-top | .wx-accordion, .wx-accordion-item, .wx-accordion-content | 3 |
| `--wx-color-surface` | background | .wx-accordion-trigger | 1 |
| `--wx-color-surface-alt` | background | .wx-accordion-trigger:hover | 1 |

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-size-md` | font-size | .wx-accordion-trigger | 1 |
| `--wx-font-size-xs` | font-size | .wx-accordion-icon | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-accordion)

## When to Use

Use this component when you need to:

- Use Accordion for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Accordion for general-purpose components functionality

---

**Library:** `@waysnx/ui-layout`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** accordion, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
