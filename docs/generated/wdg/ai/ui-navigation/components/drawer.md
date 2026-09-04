# Drawer

Display navigation content in a side panel that slides in from the screen edge.

## Purpose

Display navigation content in a side panel that slides in from the screen edge

## Installation

```bash
npm install @waysnx/ui-navigation
```

## Import

```typescript
import { Drawer } from '@waysnx/ui-navigation';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `isOpen` | `boolean` | — | Yes | Whether drawer is open |
| `onClose` | `() => void` | — | No | Callback when drawer is requested to close |
| `children` | `ReactNode` | — | No | Drawer content |
| `position` | `'left' | 'right' | 'top' | 'bottom'` | — | No | Position of drawer |
| `width` | `string | number` | — | No | Width of drawer (for left/right) |
| `height` | `string | number` | — | No | Height of drawer (for top/bottom) |
| `showBackdrop` | `boolean` | — | No | Show backdrop overlay |
| `closeOnBackdropClick` | `boolean` | — | No | Close on backdrop click |
| `closeOnEscape` | `boolean` | — | No | Close on Escape key press |
| `animationDuration` | `number` | — | No | Animation duration in ms |
| `className` | `string` | — | No | Additional CSS class |
| `style` | `React.CSSProperties` | — | No | Additional styles |
| `title` | `string` | — | No | Drawer title |
| `showCloseButton` | `boolean` | — | No | Show close button |
| `backdropOpacity` | `number` | — | No | Backdrop opacity (0-1) |
| `lockScroll` | `boolean` | — | No | Lock body scroll when drawer is open |
| `zIndex` | `number` | — | No | Z-index for drawer |
| `resizable` | `boolean` | — | No | Allow drawer resizing |
| `header` | `ReactNode` | — | No | Drawer header content |
| `footer` | `ReactNode` | — | No | Drawer footer content |
| `ariaLabel` | `string` | — | No | Accessible label for drawer |
| `ariaDescription` | `string` | — | No | Drawer description for a11y |

## Design Tokens

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-size-lg` | font-size | .nav-drawer__title | 1 |
| `--wx-font-size-xl` | font-size | .nav-drawer__close-btn | 1 |

### Radius

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-radius-sm` | border-radius | .nav-drawer__close-btn | 1 |

### Shadows

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--nav-drawer-shadow` | box-shadow | .nav-drawer | 1 |

### Other

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--nav-drawer-bg` | background-color | .nav-drawer | 1 |
| `--nav-drawer-bg-dark` | background-color | @media (prefers-color-scheme: dark) | 1 |
| `--nav-drawer-border` | border-bottom, border-top | .nav-drawer__header, .nav-drawer__footer | 2 |
| `--nav-drawer-border-dark` | border-bottom-color, border-top-color | .nav-drawer__header, .nav-drawer__footer | 2 |
| `--nav-drawer-close-hover-bg` | background-color | .nav-drawer__close-btn:hover | 1 |
| `--nav-drawer-close-hover-bg-dark` | background-color | .nav-drawer__close-btn:hover | 1 |
| `--nav-drawer-focus-outline` | outline | .nav-drawer__close-btn:focus-visible | 1 |
| `--nav-drawer-footer-bg` | background-color | .nav-drawer__footer | 1 |
| `--nav-drawer-footer-bg-dark` | background-color | .nav-drawer__footer | 1 |
| `--nav-drawer-header-bg` | background-color | .nav-drawer__header | 1 |
| `--nav-drawer-text` | color | .nav-drawer, .nav-drawer__close-btn | 2 |
| `--nav-drawer-text-dark` | color | @media (prefers-color-scheme: dark) | 1 |
| `--nav-drawer-title-text` | color | .nav-drawer__title | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-drawer)

## When to Use

Use this component when you need to:

- Use Drawer for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Drawer for general-purpose components functionality

---

**Library:** `@waysnx/ui-navigation`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, drawer

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
