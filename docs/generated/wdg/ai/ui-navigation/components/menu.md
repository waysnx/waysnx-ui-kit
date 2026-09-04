# Menu

Display a list of selectable menu items.

## Purpose

Display a list of selectable menu items

## Installation

```bash
npm install @waysnx/ui-navigation
```

## Import

```typescript
import { Menu } from '@waysnx/ui-navigation';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `items` | `NavigationItem[]` | — | Yes | Menu items to display |
| `activeItem` | `NavigationItem` | — | No | Currently active item |
| `onItemClick` | `(item: NavigationItem) => void` | — | No | Callback when item is clicked |
| `onActiveChange` | `(item?: NavigationItem) => void` | — | No | Callback when active item changes |
| `security` | `SecurityContext` | — | No | Security context for permission-based filtering |
| `orientation` | `'vertical' | 'horizontal'` | — | No | Menu orientation |
| `density` | `'compact' | 'normal' | 'spacious'` | — | No | Component density |
| `variant` | `'default' | 'minimal' | 'elevated'` | — | No | Theme variant |
| `className` | `string` | — | No | Additional CSS class |
| `style` | `React.CSSProperties` | — | No | Additional styles |
| `showIcons` | `boolean` | — | No | Whether to show icons |
| `showBadges` | `boolean` | — | No | Whether to show badges |
| `maxDepth` | `number` | — | No | Maximum depth for nested items |
| `keyboardNav` | `boolean` | — | No | Keyboard navigation enabled |
| `ariaLabel` | `string` | — | No | Accessible label for menu |
| `role` | `'menu' | 'menubar' | 'navigation' | 'none'` | — | No | Menu role |

## Design Tokens

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--nav-menu-font` | font-family | .nav-menu | 1 |
| `--wx-font-size-sm` | nav-menu-font-size | .nav-menu--compact | 1 |
| `--wx-font-size-md` | nav-menu-font-size, font-size | .nav-menu--normal, .nav-menu--spacious, .nav-menu-item__icon | 3 |
| `--nav-menu-font-size` | font-size | .nav-menu-item__link, .nav-menu-item .nav-menu-item__link | 2 |
| `--wx-font-size-xs` | font-size | .nav-menu-item__badge | 1 |

### Spacing

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--nav-menu-gap` | gap | .nav-menu--horizontal .nav-menu__list | 1 |
| `--nav-menu-item-padding` | padding, padding-left, padding-bottom | .nav-menu-item__link, .nav-menu-item--active .nav-menu-item__link, .nav-menu--horizontal .nav-menu-item--active .nav-menu-item__link, .nav-menu-item .nav-menu-item__link | 4 |

### Radius

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--nav-menu-radius` | border-radius | .nav-menu, .}


.nav-menu--horizontal .nav-menu-item__submenu | 2 |
| `--nav-menu-item-radius` | border-radius | .nav-menu-item__link | 1 |
| `--radius-full` | border-radius | .nav-menu-item__badge | 1 |
| `--wx-radius-sm` | border-radius | .nav-menu-item__chevron | 1 |

### Shadows

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--nav-menu-shadow` | box-shadow | .nav-menu--elevated, .}


.nav-menu--horizontal .nav-menu-item__submenu | 2 |

### Animations

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-nav-transition` | transition | .nav-menu-item__link, .nav-menu-item__chevron | 2 |

### Other

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--nav-menu-bg` | background-color | .nav-menu | 1 |
| `--nav-menu-bg-dark` | background-color | @media (prefers-color-scheme: dark) | 1 |
| `--nav-menu-border` | border | .nav-menu--default, .}


.nav-menu--horizontal .nav-menu-item__submenu | 2 |
| `--nav-menu-item-active-bg` | background-color | .nav-menu-item--active .nav-menu-item__link | 1 |
| `--nav-menu-item-active-border` | border-left, border-bottom | .nav-menu-item--active .nav-menu-item__link, .nav-menu--horizontal .nav-menu-item--active .nav-menu-item__link | 2 |
| `--nav-menu-item-active-text` | color | .nav-menu-item--active .nav-menu-item__link | 1 |
| `--nav-menu-item-badge-bg` | background-color | .nav-menu-item__badge | 1 |
| `--nav-menu-item-badge-text` | color | .nav-menu-item__badge | 1 |
| `--nav-menu-item-bg` | background-color | .nav-menu-item__link | 1 |
| `--nav-menu-item-chevron-hover-bg` | background-color | .nav-menu-item__chevron:hover | 1 |
| `--nav-menu-item-chevron-hover-bg-dark` | background-color | .nav-menu-item__chevron:hover | 1 |
| `--nav-menu-item-disabled-bg` | background-color | .nav-menu-item--disabled .nav-menu-item__link, .nav-menu-item--disabled .nav-menu-item__link:hover | 2 |
| `--nav-menu-item-disabled-text` | color | .nav-menu-item--disabled .nav-menu-item__link, .nav-menu-item--disabled .nav-menu-item__link:hover | 2 |
| `--nav-menu-item-focus-outline` | outline | .nav-menu-item--focused .nav-menu-item__link, .}


.nav-menu-item__link:focus-visible | 2 |
| `--nav-menu-item-height` | height | .nav-menu-item__link | 1 |
| `--nav-menu-item-hover-bg` | background-color | .nav-menu-item__link:hover:not([aria-disabled="true"]) | 1 |
| `--nav-menu-item-hover-bg-dark` | background-color | .nav-menu-item__link:hover:not([aria-disabled="true"]) | 1 |
| `--nav-menu-item-hover-text` | color | .nav-menu-item__link:hover:not([aria-disabled="true"]) | 1 |
| `--nav-menu-item-text` | color | .nav-menu-item__link | 1 |
| `--nav-menu-submenu-bg` | background-color | .}


.nav-menu--horizontal .nav-menu-item__submenu | 1 |
| `--nav-menu-submenu-indent` | padding-left | .nav-menu-item__submenu, .nav-menu--horizontal .nav-menu-item__submenu | 2 |
| `--nav-menu-text` | color | .nav-menu | 1 |
| `--nav-menu-text-dark` | color | @media (prefers-color-scheme: dark) | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/navigation-menu)

## Related Components

- **MenuItem** — Menu depends on MenuItem

## Used By

This component is used by:

- Navbar
- Sidebar

## When to Use

Use this component when you need to:

- Use Menu for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Menu for general-purpose components functionality

---

**Library:** `@waysnx/ui-navigation`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** menu, components

**Semantic Category:** navigation

This component is indexed for AI agents, RAG pipelines, and documentation search.
