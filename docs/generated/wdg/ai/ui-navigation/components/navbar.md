# Navbar

Display a horizontal navigation bar with multiple navigation links.

## Purpose

Display a horizontal navigation bar with multiple navigation links

## Installation

```bash
npm install @waysnx/ui-navigation
```

## Import

```typescript
import { Navbar } from '@waysnx/ui-navigation';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `logo` | `React.ReactNode` | — | No | Logo or brand element |
| `left` | `React.ReactNode` | — | No | Left content (after logo) |
| `right` | `React.ReactNode` | — | No | Right side content (e.g., user menu, settings) |
| `title` | `string` | — | No | Navbar title |
| `position` | `'static' | 'sticky' | 'fixed'` | — | No | Position of navbar |
| `sticky` | `boolean` | — | No | Whether navbar is sticky to top |
| `height` | `string | number` | — | No | Height of navbar |
| `showMobileMenu` | `boolean` | — | No | Show mobile menu button |
| `onMobileMenuToggle` | `(isOpen: boolean) => void` | — | No | Callback when mobile menu is toggled |
| `backgroundColor` | `string` | — | No | Custom background color |
| `shadow` | `'none' | 'sm' | 'md' | 'lg'` | — | No | Shadow effect |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-surface` | background-color | .nav-navbar, @media (prefers-color-scheme: dark) | 2 |
| `--wx-color-text` | color | .nav-navbar, .nav-navbar__mobile-menu-btn, @media (prefers-color-scheme: dark) | 3 |
| `--wx-color-border` | border-bottom | .nav-navbar, .nav-navbar__mobile-menu | 2 |
| `--wx-color-surface-hover` | background-color | .nav-navbar__mobile-menu-btn:hover | 1 |
| `--wx-color-primary` | outline | .nav-navbar__mobile-menu-btn:focus-visible | 1 |
| `--wx-color-surface-alt` | background-color | .nav-navbar__mobile-menu | 2 |

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-size-xl` | font-size | .nav-navbar__logo | 1 |
| `--wx-font-size-lg` | font-size | .nav-navbar__title | 1 |

### Radius

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-radius-md` | border-radius | .nav-navbar__mobile-menu-btn | 1 |

### Shadows

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-shadow-sm` | box-shadow | .nav-navbar--shadow-sm | 1 |
| `--wx-shadow-md` | box-shadow | .nav-navbar--shadow-md | 1 |
| `--wx-shadow-lg` | box-shadow | .nav-navbar--shadow-lg | 1 |

### Animations

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-nav-transition` | transition, animation | .nav-navbar__mobile-menu-btn, .nav-navbar__hamburger-line, .nav-navbar__mobile-menu | 3 |

### Other

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-nav-navbar-height` | height, max-height | .nav-navbar, .nav-navbar__logo, .nav-navbar__mobile-menu | 3 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/navigation-navbar)

## Related Components

- **Menu** — Navbar depends on Menu

## When to Use

Use this component when you need to:

- Use Navbar for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Navbar for general-purpose components functionality

---

**Library:** `@waysnx/ui-navigation`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** navbar, components

**Semantic Category:** navigation

This component is indexed for AI agents, RAG pipelines, and documentation search.
