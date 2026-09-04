# Header

Display application or site header with branding and navigation.

## Purpose

Display application or site header with branding and navigation

## Installation

```bash
npm install @waysnx/ui-navigation
```

## Import

```typescript
import { Header } from '@waysnx/ui-navigation';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `title` | `string` | — | No | Page title |
| `subtitle` | `string` | — | No | Page subtitle or description |
| `breadcrumbs` | `BreadcrumbItem[]` | — | No | Breadcrumb items |
| `icon` | `React.ReactNode` | — | No | Icon to display next to title |
| `left` | `React.ReactNode` | — | No | Left side content |
| `right` | `React.ReactNode` | — | No | Right side content (actions, buttons, etc.) |
| `variant` | `'default' | 'minimal' | 'elevated'` | — | No | Background variant |
| `size` | `'sm' | 'md' | 'lg'` | — | No | Size of header |
| `showBreadcrumb` | `boolean` | — | No | Whether to show breadcrumb |
| `className` | `string` | — | No | Additional CSS class |
| `style` | `React.CSSProperties` | — | No | Additional styles |
| `sticky` | `boolean` | — | No | Sticky header |
| `breadcrumbSeparator` | `React.ReactNode` | — | No | Breadcrumb separator |
| `onBreadcrumbClick` | `(item: BreadcrumbItem) => void` | — | No | Callback when breadcrumb item is clicked |

## Design Tokens

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-size-xl` | font-size | .nav-header__icon | 1 |
| `--nav-header-title-size` | font-size | .nav-header__title | 1 |
| `--nav-header-subtitle-size` | font-size | .nav-header__subtitle | 1 |

### Spacing

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--nav-header-gap` | gap | .nav-header__content, .nav-header__section | 2 |
| `--nav-header-padding` | padding | .nav-header__content | 1 |

### Radius

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-radius-md` | border-radius | .nav-header__icon | 1 |

### Shadows

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--nav-header-shadow` | box-shadow | .nav-header--sticky, .nav-header--elevated | 2 |

### Other

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--nav-header-bg` | background-color | .nav-header, .nav-header--default | 2 |
| `--nav-header-bg-dark` | background-color | @media (prefers-color-scheme: dark) | 1 |
| `--nav-header-border` | border-bottom | .nav-header, .nav-header__breadcrumb-wrapper | 2 |
| `--nav-header-breadcrumb-bg` | background-color | .nav-header__breadcrumb-wrapper | 1 |
| `--nav-header-breadcrumb-bg-dark` | background-color | .nav-header__breadcrumb-wrapper | 1 |
| `--nav-header-icon-bg` | background-color | .nav-header__icon | 1 |
| `--nav-header-icon-bg-dark` | background-color | .nav-header__icon | 1 |
| `--nav-header-icon-border` | border | .nav-header__icon | 1 |
| `--nav-header-icon-text` | color | .nav-header__icon | 1 |
| `--nav-header-subtitle-text` | color | .nav-header__subtitle | 1 |
| `--nav-header-text` | color | .nav-header | 1 |
| `--nav-header-text-dark` | color | @media (prefers-color-scheme: dark) | 1 |
| `--nav-header-title-text` | color | .nav-header__title | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/example-header)

## Related Components

- **Breadcrumb** — Header depends on Breadcrumb

## When to Use

Use this component when you need to:

- Use Header for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Header for general-purpose components functionality

---

**Library:** `@waysnx/ui-navigation`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** header, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
