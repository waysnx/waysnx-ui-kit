# SearchNavigation

Enable users to search for content or pages and navigate quickly.

## Purpose

Enable users to search for content or pages and navigate quickly

## Installation

```bash
npm install @waysnx/ui-navigation
```

## Import

```typescript
import { SearchNavigation } from '@waysnx/ui-navigation';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `onSearch` | `(query: string) => Promise<SearchResult[]>` | — | Yes | Callback to perform search |
| `onSelect` | `(result: SearchResult) => void` | — | Yes | Callback when result is selected |
| `placeholder` | `string` | — | No | Search input placeholder |
| `categories` | `SearchCategory[]` | — | No | Available search categories |
| `maxResults` | `number` | — | No | Max results to display |
| `debounceMs` | `number` | — | No | Debounce delay in ms |
| `showHistory` | `boolean` | — | No | Show search history |
| `className` | `string` | — | No | Additional CSS class |
| `style` | `React.CSSProperties` | — | No | Additional styles |
| `isLoading` | `boolean` | — | No | Loading state |
| `searchIcon` | `React.ReactNode` | — | No | Search icon |
| `showClear` | `boolean` | — | No | Clear search button visible |
| `autoFocus` | `boolean` | — | No | Auto-focus on mount |
| `ariaLabel` | `string` | — | No | Accessible label |
| `recentCount` | `number` | — | No | Number of recent searches to show |
| `groupByCategory` | `boolean` | — | No | Group results by category |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/navigation-searchnavigation)

## When to Use

Use this component when you need to:

- Use SearchNavigation for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use SearchNavigation for general-purpose components functionality

---

**Library:** `@waysnx/ui-navigation`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** placeholder, searchnavigation, components

**Semantic Category:** navigation

This component is indexed for AI agents, RAG pipelines, and documentation search.
