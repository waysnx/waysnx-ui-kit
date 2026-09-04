# SearchBox

Enable searching and filtering within visualizations.

## Purpose

Enable searching and filtering within visualizations

## Installation

```bash
npm install @waysnx/ui-visualization
```

## Import

```typescript
import { SearchBox } from '@waysnx/ui-visualization';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `searchState` | `SearchState` | — | Yes |  |
| `onSearch` | `(query: string) => void` | — | Yes |  |
| `onNext` | `() => void` | — | Yes |  |
| `onPrev` | `() => void` | — | Yes |  |
| `onClear` | `() => void` | — | Yes |  |
| `placeholder` | `string` | — | No |  |
| `className` | `string` | — | No |  |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

View Interactive Storybook

## Used By

This component is used by:

- OrgChart

## When to Use

Use this component when you need to:

- Use SearchBox for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use SearchBox for general-purpose components functionality

---

**Library:** `@waysnx/ui-visualization`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, placeholder, searchbox

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
