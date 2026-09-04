# MegaMenu

Display large menu with multiple columns and rich content.

## Purpose

Display large menu with multiple columns and rich content

## Installation

```bash
npm install @waysnx/ui-navigation
```

## Import

```typescript
import { MegaMenu } from '@waysnx/ui-navigation';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `items` | `NavigationItem[]` | — | Yes | Items in this section |
| `onItemClick` | `(item: NavigationItem) => void` | — | No | Callback when item is clicked |
| `security` | `SecurityContext` | — | No | Security context for permission-based filtering |
| `density` | `'compact' | 'normal' | 'spacious'` | — | No | Component density |
| `variant` | `'default' | 'minimal' | 'elevated'` | — | No | Theme variant |
| `className` | `string` | — | No | Additional CSS class |
| `style` | `React.CSSProperties` | — | No | Additional styles |
| `showIcons` | `boolean` | — | No | Whether to show icons |
| `showBadges` | `boolean` | — | No | Whether to show badges |
| `keyboardNav` | `boolean` | — | No | Keyboard navigation enabled |
| `ariaLabel` | `string` | — | No | Accessible label for menu |
| `closeOnItemClick` | `boolean` | — | No | Close dropdown when item is clicked |
| `gridColumns` | `2 | 3 | 4` | — | No | Number of columns for mega menu grid |
| `gridGap` | `'sm' | 'md' | 'lg'` | — | No | Gap between grid items |
| `hoverToOpen` | `boolean` | — | No | Enable hover to open dropdowns |
| `hoverDelay` | `number` | — | No | Delay in ms before opening dropdown on hover |
| `onDropdownOpen` | `(itemId: string) => void` | — | No | Callback when dropdown is opened |
| `onDropdownClose` | `(itemId: string) => void` | — | No | Callback when dropdown is closed |
| `allowMultipleOpen` | `boolean` | — | No | Allow multiple dropdowns open simultaneously |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/navigation-megamenu)

## When to Use

Use this component when you need to:

- Use MegaMenu for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use MegaMenu for general-purpose components functionality

---

**Library:** `@waysnx/ui-navigation`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, megamenu

**Semantic Category:** navigation

This component is indexed for AI agents, RAG pipelines, and documentation search.
