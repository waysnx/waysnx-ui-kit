# Breadcrumb

Display the current navigation path and enable quick navigation to parent levels.

## Purpose

Display the current navigation path and enable quick navigation to parent levels

## Installation

```bash
npm install @waysnx/ui-layout
```

## Import

```typescript
import { Breadcrumb } from '@waysnx/ui-layout';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `items` | `BreadcrumbItem[]` | — | Yes |  |
| `className` | `string` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-primary` | color | .breadcrumb-link, .breadcrumb-button | 1 |
| `--wx-color-primary-hover` | color | .breadcrumb-link:hover, .breadcrumb-button:hover | 1 |
| `--wx-color-text` | color | .breadcrumb-current | 1 |
| `--wx-color-text-muted` | color | .breadcrumb-separator | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-breadcrumb)

## When to Use

Use this component when you need to:

- Use Breadcrumb for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Breadcrumb for general-purpose components functionality

---

**Library:** `@waysnx/ui-layout`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, breadcrumb

**Semantic Category:** navigation

This component is indexed for AI agents, RAG pipelines, and documentation search.
