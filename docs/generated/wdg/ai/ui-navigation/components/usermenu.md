# UserMenu

Display user profile and account-related options.

## Purpose

Display user profile and account-related options

## Installation

```bash
npm install @waysnx/ui-navigation
```

## Import

```typescript
import { UserMenu } from '@waysnx/ui-navigation';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `user` | `UserInfo` | — | Yes | User information |
| `items` | `UserMenuItem[]` | — | No | Menu items |
| `trigger` | `'hover' | 'click'` | — | No | Trigger button trigger ('hover' or 'click') |
| `position` | `'left' | 'right'` | — | No | Menu position relative to trigger |
| `showStatus` | `boolean` | — | No | Show status indicator |
| `showTrigger` | `boolean` | — | No | Show trigger button |
| `customTrigger` | `React.ReactNode` | — | No | Custom trigger element |
| `className` | `string` | — | No | Additional CSS class |
| `style` | `React.CSSProperties` | — | No | Additional styles |
| `onOpen` | `() => void` | — | No | Callback when menu opens |
| `onClose` | `() => void` | — | No | Callback when menu closes |
| `menuWidth` | `string | number` | — | No | Menu width |
| `showUserInfo` | `boolean` | — | No | Show user info header |
| `headerContent` | `React.ReactNode` | — | No | Custom header content |
| `ariaLabel` | `string` | — | No | Accessible label |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/navigation-usermenu)

## When to Use

Use this component when you need to:

- Use UserMenu for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use UserMenu for general-purpose components functionality

---

**Library:** `@waysnx/ui-navigation`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** usermenu, components

**Semantic Category:** navigation

This component is indexed for AI agents, RAG pipelines, and documentation search.
