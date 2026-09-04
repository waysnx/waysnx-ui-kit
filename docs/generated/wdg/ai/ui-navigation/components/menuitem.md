# MenuItem

MenuItem component

## Purpose

MenuItem component

## Installation

```bash
npm install @waysnx/ui-navigation
```

## Import

```typescript
import { MenuItem } from '@waysnx/ui-navigation';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `item` | `NavigationItem` | — | Yes | The navigation item to render |
| `isActive` | `boolean` | — | No | Whether this item is currently active |
| `isFocused` | `boolean` | — | No | Whether this item is focused via keyboard navigation |
| `isExpanded` | `boolean` | — | No | Whether this item's children are expanded |
| `onItemClick` | `(item: NavigationItem) => void` | — | No | Callback when item is clicked |
| `onToggleExpand` | `(itemId: string) => void` | — | No | Callback to toggle expansion |
| `onFocus` | `(itemId?: string) => void` | — | No | Callback when item receives focus |
| `showIcons` | `boolean` | — | No | Whether to show icons |
| `showBadges` | `boolean` | — | No | Whether to show badges |
| `depth` | `number` | — | No | Current nesting depth |
| `maxDepth` | `number` | — | No | Maximum nesting depth allowed |
| `security` | `SecurityContext` | — | No | Security context for permission checking |
| `canAccess` | `(item: NavigationItem) => boolean` | — | No | Function to check access for this item |
| `className` | `string` | — | No | Additional CSS class |
| `style` | `React.CSSProperties` | — | No | Additional styles |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

View Interactive Storybook

## Used By

This component is used by:

- ContextMenu
- Menu

## When to Use

Use this component when you need to:

- Use MenuItem for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use MenuItem for general-purpose components functionality

---

**Library:** `@waysnx/ui-navigation`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** menuitem, components

**Semantic Category:** navigation

This component is indexed for AI agents, RAG pipelines, and documentation search.
