# CommandPalette

Enable quick access to commands and navigation via keyboard.

## Purpose

Enable quick access to commands and navigation via keyboard

## Installation

```bash
npm install @waysnx/ui-navigation
```

## Import

```typescript
import { CommandPalette } from '@waysnx/ui-navigation';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `commands` | `Command[]` | — | Yes | List of available commands |
| `onCommandSelect` | `(command: Command) => void` | — | No | Callback when command is selected |
| `isOpen` | `boolean` | — | No | Whether palette is open |
| `onOpen` | `() => void` | — | No | Callback when palette is opened |
| `onClose` | `() => void` | — | No | Callback when palette is closed |
| `searchPlaceholder` | `string` | — | No | Search input placeholder |
| `recentCount` | `number` | — | No | Number of recent commands to show |
| `showShortcuts` | `boolean` | — | No | Show keyboard shortcuts |
| `permissions` | `string[]` | — | No | User permissions for filtering |
| `roles` | `string[]` | — | No | User roles for filtering |
| `className` | `string` | — | No | Additional CSS class |
| `style` | `React.CSSProperties` | — | No | Additional styles |
| `default` | `Ctrl+K or Cmd+K)
   */
  openShortcut?: string[]` | — | Yes |  |
| `maxResults` | `number` | — | No | Max results to display |
| `ariaLabel` | `string` | — | No | Accessible label |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/navigation-commandpalette)

## When to Use

Use this component when you need to:

- Use CommandPalette for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use CommandPalette for general-purpose components functionality

---

**Library:** `@waysnx/ui-navigation`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, commandpalette

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
