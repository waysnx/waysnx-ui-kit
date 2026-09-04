# Tabs

Organize navigation into switchable tabs.

## Purpose

Organize navigation into switchable tabs

## Installation

```bash
npm install @waysnx/ui-navigation
```

## Import

```typescript
import { Tabs } from '@waysnx/ui-navigation';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `tabs` | `TabConfig[]` | — | Yes | Tab items |
| `activeTabId` | `string` | — | No | Currently active tab ID |
| `onTabChange` | `(tabId: string) => void` | — | No | Callback when tab is changed |
| `density` | `'compact' | 'normal' | 'spacious'` | — | No | Component density |
| `variant` | `'default' | 'minimal' | 'elevated'` | — | No | Tab position |
| `className` | `string` | — | No | Additional CSS class |
| `style` | `React.CSSProperties` | — | No | Additional styles |
| `showIcons` | `boolean` | — | No | Show tab icons |
| `showBadges` | `boolean` | — | No | Show tab badges |
| `keyboardNav` | `boolean` | — | No | Keyboard navigation enabled |
| `ariaLabel` | `string` | — | No | Accessible label for tabs |
| `orientation` | `'horizontal' | 'vertical'` | — | No | Tab orientation |
| `scrollable` | `boolean` | — | No | Scroll tabs when overflow |
| `closable` | `boolean` | — | No | Show tab close buttons |
| `onTabClose` | `(tabId: string) => void` | — | No | Callback when tab is closed |
| `lazyLoad` | `boolean` | — | No | Enable lazy loading |

## Design Tokens

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--nav-tabs-font` | font-family | .nav-tabs | 1 |
| `--wx-font-size-sm` | nav-tabs-font-size, font-size | .nav-tabs--compact, .nav-tabs--normal, .nav-tabs__tab-close | 3 |
| `--wx-font-size-md` | nav-tabs-font-size, font-size | .nav-tabs--spacious, .nav-tabs__tab-icon | 2 |
| `--nav-tabs-font-size` | font-size | .nav-tabs__tab, .}


.nav-tabs__loading | 2 |
| `--wx-font-size-xs` | font-size | .nav-tabs__tab-badge | 1 |

### Spacing

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--nav-tabs-tab-padding` | padding | .nav-tabs__tab | 1 |

### Radius

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--nav-tabs-radius` | border-radius | .nav-tabs | 1 |
| `--radius-full` | border-radius | .nav-tabs__tab-badge | 1 |
| `--wx-radius-sm` | border-radius | .nav-tabs__tab-close | 1 |

### Shadows

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--nav-tabs-shadow` | box-shadow | .nav-tabs--elevated | 1 |

### Other

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--nav-tabs-bg` | background-color | .nav-tabs | 1 |
| `--nav-tabs-bg-dark` | background-color | @media (prefers-color-scheme: dark) | 1 |
| `--nav-tabs-border` | border-bottom, border-right, border, border-bottom-color | .nav-tabs__list, .nav-tabs--vertical .nav-tabs__list, .nav-tabs--default, .nav-tabs--elevated .nav-tabs__list | 4 |
| `--nav-tabs-border-dark` | border-bottom-color, border-right-color | .nav-tabs__list, .nav-tabs--vertical .nav-tabs__list | 2 |
| `--nav-tabs-content-bg` | background-color | .nav-tabs__content | 1 |
| `--nav-tabs-list-bg` | background-color | .nav-tabs__list | 1 |
| `--nav-tabs-tab-active-bg` | background-color | .nav-tabs__tab--active | 1 |
| `--nav-tabs-tab-active-border` | border-bottom-color, border-right-color | .nav-tabs__tab--active, .nav-tabs--vertical .nav-tabs__tab--active | 2 |
| `--nav-tabs-tab-active-text` | color | .nav-tabs__tab--active | 1 |
| `--nav-tabs-tab-badge-bg` | background-color | .nav-tabs__tab-badge | 1 |
| `--nav-tabs-tab-badge-text` | color | .nav-tabs__tab-badge | 1 |
| `--nav-tabs-tab-bg` | background-color | .nav-tabs__tab | 1 |
| `--nav-tabs-tab-disabled-text` | color | .nav-tabs__tab--disabled, .nav-tabs__tab[disabled], .nav-tabs__tab[aria-disabled="true"], .nav-tabs__tab--disabled:hover, .nav-tabs__tab[disabled]:hover, .nav-tabs__tab[aria-disabled="true"]:hover | 2 |
| `--nav-tabs-tab-focus-outline` | outline | .nav-tabs__tab--focused, .nav-tabs__tab--focused:focus-visible, .nav-tabs__tab-close:focus-visible, .}


.nav-tabs__tab:focus-visible | 4 |
| `--nav-tabs-tab-height` | height | .nav-tabs__tab | 1 |
| `--nav-tabs-tab-hover-bg` | background-color | .nav-tabs__tab:hover:not([aria-disabled="true"]):not([disabled]) | 1 |
| `--nav-tabs-tab-hover-bg-dark` | background-color | .nav-tabs__tab:hover:not([aria-disabled="true"]):not([disabled]) | 1 |
| `--nav-tabs-tab-hover-text` | color | .nav-tabs__tab:hover:not([aria-disabled="true"]):not([disabled]) | 1 |
| `--nav-tabs-tab-text` | color | .nav-tabs__tab | 1 |
| `--nav-tabs-text` | color | .nav-tabs, .}


.nav-tabs__loading | 2 |
| `--nav-tabs-text-dark` | color | @media (prefers-color-scheme: dark) | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/navigation-tabs)

## When to Use

Use this component when you need to:

- Use Tabs for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Tabs for general-purpose components functionality

---

**Library:** `@waysnx/ui-navigation`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** organize, panel, navigation, tab, components

**Synonyms:** tabbed panel, tab navigation

**Semantic Category:** navigation

This component is indexed for AI agents, RAG pipelines, and documentation search.
