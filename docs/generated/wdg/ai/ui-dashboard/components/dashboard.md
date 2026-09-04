# Dashboard

Provide the main container and layout structure for dashboard applications.

## Purpose

Provide the main container and layout structure for dashboard applications

## Installation

```bash
npm install @waysnx/ui-dashboard
```

## Import

```typescript
import { Dashboard } from '@waysnx/ui-dashboard';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `title` | `string` | — | No | Dashboard title |
| `description` | `string` | — | No | Dashboard description |
| `children` | `ReactNode` | — | No | Content to render inside dashboard |
| `toolbar` | `ReactNode` | — | No | Toolbar content |
| `sidebar` | `ReactNode` | — | No | Sidebar content |
| `footer` | `ReactNode` | — | No | Footer content |
| `loading` | `boolean` | — | No | Is dashboard in loading state |
| `className` | `string` | — | No | Additional CSS class |
| `style` | `CSSProperties` | — | No | Additional CSS styles |
| `config` | `Partial<DashboardConfig>` | — | No | Dashboard configuration |
| `onThemeChange` | `(theme: DashboardTheme) => void` | — | No | Callback when theme changes |
| `onFiltersChange` | `(filters: Record<string, any>) => void` | — | No | Callback when filters change |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/dashboard-dashboard)

## Related Components

- **DashboardConfig** — Dashboard is related to DashboardConfig
- **DashboardProvider** — Dashboard is related to DashboardProvider
- **DashboardTheme** — Dashboard is related to DashboardTheme

## When to Use

Use this component when you need to:

- Use Dashboard for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Dashboard for general-purpose components functionality

---

**Library:** `@waysnx/ui-dashboard`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, dashboard

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
