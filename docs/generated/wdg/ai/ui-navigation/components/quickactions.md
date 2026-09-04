# QuickActions

Provide quick access to frequent actions in a compact menu.

## Purpose

Provide quick access to frequent actions in a compact menu

## Installation

```bash
npm install @waysnx/ui-navigation
```

## Import

```typescript
import { QuickActions } from '@waysnx/ui-navigation';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `actions` | `(QuickAction | QuickActionGroup)[]` | — | Yes | Array of quick action groups or individual actions |
| `onActionClick` | `(action: QuickAction) => void | Promise<void>` | — | No | Callback when action is triggered |
| `orientation` | `'horizontal' | 'vertical'` | — | No | Display orientation |
| `variant` | `'bar' | 'grid' | 'compact'` | — | No | Display variant |
| `size` | `'sm' | 'md' | 'lg'` | — | No | Size of actions |
| `showLabels` | `boolean` | — | No | Show action labels |
| `showIcons` | `boolean` | — | No | Show action icons |
| `enableKeyboardShortcuts` | `boolean` | — | No | Enable keyboard shortcuts |
| `maxVisible` | `number` | — | No | Maximum number of visible actions (rest go to "More") |
| `permissions` | `string[]` | — | No | User permissions for filtering |
| `className` | `string` | — | No | Custom class name |
| `style` | `React.CSSProperties` | — | No | Custom styles |
| `ariaLabel` | `string` | — | No | aria-label for accessibility |
| `testId` | `string` | — | No | Test ID |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/enterprise-quickactions)

## When to Use

Use this component when you need to:

- Use QuickActions for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use QuickActions for general-purpose components functionality

---

**Library:** `@waysnx/ui-navigation`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** quickactions, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
