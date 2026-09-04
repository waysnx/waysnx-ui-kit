# FavoritesMenu

Display user-selected favorite or bookmarked items for quick access.

## Purpose

Display user-selected favorite or bookmarked items for quick access

## Installation

```bash
npm install @waysnx/ui-navigation
```

## Import

```typescript
import { FavoritesMenu } from '@waysnx/ui-navigation';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `items` | `FavoriteItem[]` | — | Yes | Array of favorite items |
| `onItemSelect` | `(item: FavoriteItem) => void` | — | No | Callback when favorite item is selected |
| `onToggleFavorite` | `(item: FavoriteItem, isFavorite: boolean) => void` | — | No | Callback when favorite is toggled |
| `maxDisplayed` | `number` | — | No | Maximum number of favorites to display |
| `showBadge` | `boolean` | — | No | Show favorite count badge |
| `enableDragDrop` | `boolean` | — | No | Enable drag and drop reordering |
| `showCategories` | `boolean` | — | No | Show categories if available |
| `variant` | `'dropdown' | 'inline' | 'compact'` | — | No | Display variant |
| `size` | `'sm' | 'md' | 'lg'` | — | No | Size of component |
| `isFavorited` | `(itemId: string) => boolean` | — | No | Callback to check if item is favorited |
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

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/enterprise-favoritesmenu)

## When to Use

Use this component when you need to:

- Use FavoritesMenu for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use FavoritesMenu for general-purpose components functionality

---

**Library:** `@waysnx/ui-navigation`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** favoritesmenu, components

**Semantic Category:** navigation

This component is indexed for AI agents, RAG pipelines, and documentation search.
