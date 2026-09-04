# ChartWidget

ChartWidget component

## Purpose

ChartWidget component

## Installation

```bash
npm install @waysnx/ui-dashboard
```

## Import

```typescript
import { FormWidget } from '@waysnx/ui-dashboard';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `id` | `string` | — | Yes | Widget ID |
| `title` | `string` | — | No | Widget title |
| `subtitle` | `string` | — | No | Widget subtitle |
| `children` | `ReactNode` | — | Yes | Table content |
| `loading` | `boolean` | — | No | Is widget loading |
| `error` | `Error | null` | — | No | Widget error |
| `paginated` | `boolean` | — | No | Is table paginated |
| `currentPage` | `number` | — | No | Current page |
| `totalPages` | `number` | — | No | Total pages |
| `onPageChange` | `(page: number) => void` | — | No | On page change handler |
| `className` | `string` | — | No | Additional CSS class |
| `style` | `CSSProperties` | — | No | Additional CSS styles |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

View Interactive Storybook

## Related Components

- **ChartWidgetProps** — ChartWidget is related to ChartWidgetProps
- **Widget** — ChartWidget depends on Widget

## When to Use

Use this component when you need to:

- Use ChartWidget for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use ChartWidget for general-purpose components functionality

---

**Library:** `@waysnx/ui-dashboard`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** chartwidget, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
