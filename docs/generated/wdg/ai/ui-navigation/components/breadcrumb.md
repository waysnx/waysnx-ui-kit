# Breadcrumb

Display the current navigation path and enable quick navigation to parent levels.

## Purpose

Display the current navigation path and enable quick navigation to parent levels

## Installation

```bash
npm install @waysnx/ui-navigation
```

## Import

```typescript
import { Breadcrumb } from '@waysnx/ui-navigation';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `items` | `BreadcrumbItem[]` | — | Yes | Breadcrumb items to display |
| `separator` | `React.ReactNode` | — | No | Separator between items |
| `onItemClick` | `(item: BreadcrumbItem) => void` | — | No | Callback when breadcrumb item is clicked |
| `showActive` | `boolean` | — | No | Whether to show the last item as active |
| `maxItems` | `number` | — | No | Maximum items to show before truncation |
| `className` | `string` | — | No | Additional CSS class |
| `style` | `React.CSSProperties` | — | No | Additional styles |
| `ariaLabel` | `string` | — | No | Aria label for the breadcrumb nav |
| `size` | `'sm' | 'md' | 'lg'` | — | No | Size of breadcrumb |

## Design Tokens

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-size-sm` | font-size | .nav-breadcrumb--sm, .nav-breadcrumb--md, .}


@media (max-width: 640px) | 3 |
| `--wx-font-size-md` | font-size | .nav-breadcrumb--lg | 1 |

### Spacing

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--nav-breadcrumb-link-padding` | padding | .nav-breadcrumb__link, .nav-breadcrumb__text, .}


@media (prefers-contrast: more) | 3 |

### Radius

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--radius-sm` | border-radius | .nav-breadcrumb__link, .nav-breadcrumb__text | 1 |

### Other

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--nav-breadcrumb-active-text` | color, border-bottom | .nav-breadcrumb__link[aria-current="page"], .nav-breadcrumb__text[aria-current="page"] | 2 |
| `--nav-breadcrumb-active-text-dark` | color | .nav-breadcrumb__link[aria-current="page"], .nav-breadcrumb__text[aria-current="page"] | 1 |
| `--nav-breadcrumb-link-focus` | outline | .nav-breadcrumb__link:focus-visible | 1 |
| `--nav-breadcrumb-link-hover-bg` | background-color | .nav-breadcrumb__link:hover | 1 |
| `--nav-breadcrumb-link-hover-bg-dark` | background-color | .nav-breadcrumb__link:hover | 1 |
| `--nav-breadcrumb-link-hover-text` | color | .nav-breadcrumb__link:hover | 1 |
| `--nav-breadcrumb-link-hover-text-dark` | color | .nav-breadcrumb__link:hover | 1 |
| `--nav-breadcrumb-link-text` | color | .nav-breadcrumb__link, .nav-breadcrumb__text | 1 |
| `--nav-breadcrumb-link-text-dark` | color | .nav-breadcrumb__link | 1 |
| `--nav-breadcrumb-separator-text` | color | .nav-breadcrumb__separator, .nav-breadcrumb__ellipsis | 2 |
| `--nav-breadcrumb-text` | color | .nav-breadcrumb, .nav-breadcrumb__text | 2 |
| `--nav-breadcrumb-text-dark` | color | @media (prefers-color-scheme: dark) | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/navigation-breadcrumb)

## Used By

This component is used by:

- Header

## When to Use

Use this component when you need to:

- Use Breadcrumb for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Breadcrumb for general-purpose components functionality

---

**Library:** `@waysnx/ui-navigation`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** breadcrumb, components

**Semantic Category:** navigation

This component is indexed for AI agents, RAG pipelines, and documentation search.
