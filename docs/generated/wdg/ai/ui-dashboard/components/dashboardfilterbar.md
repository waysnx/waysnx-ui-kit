# DashboardFilterBar

DashboardFilterBar component

## Purpose

DashboardFilterBar component

## Installation

```bash
npm install @waysnx/ui-dashboard
```

## Import

```typescript
import { DashboardFilterBar } from '@waysnx/ui-dashboard';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `filters` | `FilterConfig[]` | — | No | Filter configurations |
| `children` | `ReactNode` | — | No | Additional toolbar content |
| `sticky` | `boolean` | — | No | Is filter bar sticky |
| `showClearAll` | `boolean` | — | No | Show clear all button |
| `onFilterChange` | `(filterId: string, value: any) => void` | — | No | On filter change handler |
| `onClearAll` | `() => void` | — | No | On clear all handler |
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

- **FilterConfig** — DashboardFilterBar is related to FilterConfig

## When to Use

Use this component when you need to:

- Use DashboardFilterBar for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use DashboardFilterBar for general-purpose components functionality

---

**Library:** `@waysnx/ui-dashboard`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** dashboardfilterbar, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
