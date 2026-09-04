# Widget

Display dashboard content in a contained, reusable panel with optional header and footer.

## Purpose

Display dashboard content in a contained, reusable panel with optional header and footer

## Installation

```bash
npm install @waysnx/ui-dashboard
```

## Import

```typescript
import { WidgetLoading } from '@waysnx/ui-dashboard';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `id` | `string` | — | No |  |
| `title` | `string` | — | No |  |
| `subtitle` | `string` | — | No |  |
| `icon` | `ReactNode` | — | No |  |
| `toolbar` | `ReactNode` | — | No |  |
| `footer` | `ReactNode` | — | No |  |
| `loading` | `boolean` | — | No |  |
| `error` | `Error | null` | — | No |  |
| `empty` | `boolean | ReactNode` | — | No |  |
| `children` | `ReactNode` | — | No |  |
| `height` | `number | string` | — | No |  |
| `width` | `number | string` | — | No |  |
| `variant` | `WidgetVariant` | — | No |  |
| `elevation` | `WidgetElevation` | — | No |  |
| `bordered` | `boolean` | — | No |  |
| `className` | `string` | — | No |  |
| `style` | `CSSProperties` | — | No |  |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/dashboard-widget)

## Related Components

- **WidgetElevation** — Widget is related to WidgetElevation
- **WidgetVariant** — Widget is related to WidgetVariant

## Used By

This component is used by:

- ChartWidget
- HtmlWidget
- MarkdownWidget

## When to Use

Use this component when you need to:

- Use Widget for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Widget for general-purpose components functionality

---

**Library:** `@waysnx/ui-dashboard`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** widget, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
