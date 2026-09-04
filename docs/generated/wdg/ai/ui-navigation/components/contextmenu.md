# ContextMenu

Display context-sensitive actions triggered by right-click or long-press.

## Purpose

Display context-sensitive actions triggered by right-click or long-press

## Installation

```bash
npm install @waysnx/ui-navigation
```

## Import

```typescript
import { ContextMenu } from '@waysnx/ui-navigation';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `items` | `NavigationItem[]` | — | Yes | Menu items to display |
| `onItemClick` | `(item: NavigationItem) => void` | — | No | Callback when item is clicked |
| `security` | `SecurityContext` | — | No | Security context for permission-based filtering |
| `density` | `'compact' | 'normal' | 'spacious'` | — | No | Component density |
| `variant` | `'default' | 'minimal' | 'elevated'` | — | No | Theme variant |
| `className` | `string` | — | No | Additional CSS class |
| `style` | `React.CSSProperties` | — | No | Additional styles |
| `showIcons` | `boolean` | — | No | Whether to show icons |
| `showBadges` | `boolean` | — | No | Whether to show badges |
| `maxDepth` | `number` | — | No | Maximum depth for nested items |
| `keyboardNav` | `boolean` | — | No | Keyboard navigation enabled |
| `ariaLabel` | `string` | — | No | Accessible label for menu |
| `onOpen` | `(position: ContextMenuPosition) => void` | — | No | Callback when context menu is opened |
| `onClose` | `() => void` | — | No | Callback when context menu is closed |
| `isOpen` | `boolean` | — | No | Whether menu is visible |
| `position` | `ContextMenuPosition` | — | No | Menu position |
| `offset` | `{ x: number` | — | No | Offset from mouse position |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/navigation-contextmenu)

## Related Components

- **ChatInput** — ContextMenu is an alternative to ChatInput
- **Input** — ContextMenu is an alternative to Input
- **MaskedInput** — ContextMenu is an alternative to MaskedInput
- **MentionInput** — ContextMenu is an alternative to MentionInput
- **MenuItem** — ContextMenu depends on MenuItem
- **OTPInput** — ContextMenu is an alternative to OTPInput
- **PINInput** — ContextMenu is an alternative to PINInput
- **PasswordInput** — ContextMenu is an alternative to PasswordInput
- **SecureInput** — ContextMenu is an alternative to SecureInput

## When to Use

Use this component when you need to:

- Use ContextMenu for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use ContextMenu for general-purpose components functionality

---

**Library:** `@waysnx/ui-navigation`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, contextmenu

**Semantic Category:** input

This component is indexed for AI agents, RAG pipelines, and documentation search.
