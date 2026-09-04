# TreeMenu

Display hierarchical menu structure with collapsible tree nodes.

## Purpose

Display hierarchical menu structure with collapsible tree nodes

## Installation

```bash
npm install @waysnx/ui-navigation
```

## Import

```typescript
import { TreeMenu } from '@waysnx/ui-navigation';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `items` | `NavigationItem[]` | — | Yes | Root menu items for tree |
| `onItemClick` | `(item: NavigationItem) => void` | — | No | Callback when item is clicked |
| `onItemSelect` | `(item: NavigationItem | undefined) => void` | — | No | Callback when item is selected |
| `selectedItem` | `NavigationItem` | — | No | Currently selected item |
| `security` | `SecurityContext` | — | No | Security context for permission-based filtering |
| `density` | `'compact' | 'normal' | 'spacious'` | — | No | Component density |
| `variant` | `'default' | 'minimal' | 'elevated'` | — | No | Theme variant |
| `className` | `string` | — | No | Additional CSS class |
| `style` | `React.CSSProperties` | — | No | Additional styles |
| `showIcons` | `boolean` | — | No | Whether to show icons |
| `showBadges` | `boolean` | — | No | Whether to show badges |
| `maxDepth` | `number` | — | No | Maximum depth for nested items |
| `keyboardNav` | `boolean` | — | No | Keyboard navigation enabled |
| `ariaLabel` | `string` | — | No | Accessible label for tree |
| `multiSelect` | `boolean` | — | No | Allow multiple item selection (checkbox mode) |
| `selectedIds` | `Set<string>` | — | No | Selected item IDs (for multi-select mode) |
| `onSelectionChange` | `(selectedIds: Set<string>) => void` | — | No | Callback when selection changes (multi-select mode) |
| `expandAll` | `boolean` | — | No | Expand all items initially |
| `indentSize` | `number` | — | No | Indent size in pixels |
| `showExpandIcons` | `boolean` | — | No | Show expand/collapse icons |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/navigation-treemenu)

## When to Use

Use this component when you need to:

- Use TreeMenu for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use TreeMenu for general-purpose components functionality

---

**Library:** `@waysnx/ui-navigation`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, treemenu

**Semantic Category:** navigation

This component is indexed for AI agents, RAG pipelines, and documentation search.
