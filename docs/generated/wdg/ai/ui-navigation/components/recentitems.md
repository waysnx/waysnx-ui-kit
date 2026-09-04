# RecentItems

Display recently accessed or used items for quick navigation.

## Purpose

Display recently accessed or used items for quick navigation

## Installation

```bash
npm install @waysnx/ui-navigation
```

## Import

```typescript
import { RecentItems } from '@waysnx/ui-navigation';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `items` | `RecentItem[]` | — | Yes | Array of recent items |
| `onItemSelect` | `(item: RecentItem) => void` | — | No | Callback when recent item is selected |
| `onClear` | `() => void` | — | No | Callback to clear history |
| `maxItems` | `number` | — | No | Maximum number of items to display |
| `showClearButton` | `boolean` | — | No | Show clear button |
| `showTimestamps` | `boolean` | — | No | Show timestamps |
| `showTypes` | `boolean` | — | No | Show item types/categories |
| `groupByType` | `boolean` | — | No | Group items by type |
| `variant` | `'dropdown' | 'list' | 'compact'` | — | No | Display variant |
| `size` | `'sm' | 'md' | 'lg'` | — | No | Size of component |
| `className` | `string` | — | No | Custom class name |
| `style` | `React.CSSProperties` | — | No | Custom styles |
| `ariaLabel` | `string` | — | No | aria-label for accessibility |
| `testId` | `string` | — | No | Test ID |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/enterprise-recentitems)

## When to Use

Use this component when you need to:

- Use RecentItems for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use RecentItems for general-purpose components functionality

---

**Library:** `@waysnx/ui-navigation`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** recentitems, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
