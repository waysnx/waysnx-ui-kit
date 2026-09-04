# Sidebar

Display persistent sidebar navigation alongside main content.

## Purpose

Display persistent sidebar navigation alongside main content

## Installation

```bash
npm install @waysnx/ui-navigation
```

## Import

```typescript
import { Sidebar } from '@waysnx/ui-navigation';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `logo` | `React.ReactNode` | — | No | Logo or brand content |
| `isCollapsed` | `boolean` | — | No | Whether sidebar is collapsed |
| `onCollapseChange` | `(isCollapsed: boolean) => void` | — | No | Callback when collapse state changes |
| `collapsible` | `boolean` | — | No | Whether sidebar is collapsible |
| `expandedWidth` | `string | number` | — | No | Width of sidebar when expanded |
| `collapsedWidth` | `string | number` | — | No | Width of sidebar when collapsed |
| `footer` | `React.ReactNode` | — | No | Footer content |
| `header` | `React.ReactNode` | — | No | Header content (above logo) |
| `position` | `'left' | 'right'` | — | No | Position of sidebar |
| `overlay` | `boolean` | — | No | Whether to show overlay on mobile |
| `mobileBreakpoint` | `string` | — | No | Mobile breakpoint for responsive behavior |
| `persistState` | `boolean` | — | No | Persist collapsed state to localStorage |
| `storageKey` | `string` | — | No | Storage key for persistence |
| `showDivider` | `boolean` | — | No | Whether to show divider after menu |
| `colorScheme` | `'light' | 'dark'` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-surface` | background-color | .nav-sidebar, @media (prefers-color-scheme: dark) | 2 |
| `--wx-color-text` | color | .nav-sidebar, .nav-sidebar__toggle, @media (prefers-color-scheme: dark) | 3 |
| `--wx-color-border` | border-right, border-left, border-bottom, border, background-color, border-top | .nav-sidebar, .nav-sidebar--right, .nav-sidebar__header, .nav-sidebar__toggle, .nav-sidebar__divider, .nav-sidebar__footer | 6 |
| `--wx-color-surface-alt` | background-color | .nav-sidebar__toggle, .nav-sidebar::-webkit-scrollbar-thumb | 3 |
| `--wx-color-surface-hover` | background-color | .nav-sidebar__toggle:hover | 2 |
| `--wx-color-primary` | border-color, outline | .nav-sidebar__toggle:hover, .nav-sidebar__toggle:focus-visible, .nav-sidebar[data-color-scheme="dark"] .nav-sidebar__toggle:hover | 3 |
| `--wx-color-text-muted` | background-color | .nav-sidebar::-webkit-scrollbar-thumb:hover | 1 |

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-size-xl` | font-size | .nav-sidebar__logo | 1 |
| `--wx-font-size-sm` | font-size | .nav-sidebar__footer | 1 |
| `--wx-font-size-md` | font-size | .nav-sidebar--collapsed .nav-sidebar__logo, .nav-sidebar--collapsed .nav-sidebar__header-content | 1 |

### Shadows

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-shadow-lg` | box-shadow | .}


@media (max-width: 768px) | 1 |

### Animations

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-nav-transition` | transition | .nav-sidebar, .nav-sidebar__toggle, .}


@media (max-width: 768px) | 3 |

### Other

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-nav-sidebar-width` | width | .nav-sidebar | 1 |
| `--wx-nav-sidebar-width-collapsed` | width | .nav-sidebar--collapsed | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/navigation-sidebar)

## Related Components

- **Menu** — Sidebar depends on Menu

## When to Use

Use this component when you need to:

- Use Sidebar for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Sidebar for general-purpose components functionality

---

**Library:** `@waysnx/ui-navigation`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, sidebar

**Semantic Category:** layout

This component is indexed for AI agents, RAG pipelines, and documentation search.
