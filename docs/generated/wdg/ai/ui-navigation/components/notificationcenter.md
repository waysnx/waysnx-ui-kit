# NotificationCenter

Display and manage system notifications in a centralized location.

## Purpose

Display and manage system notifications in a centralized location

## Installation

```bash
npm install @waysnx/ui-navigation
```

## Import

```typescript
import { NotificationCenter } from '@waysnx/ui-navigation';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `notifications` | `Notification[]` | — | No | List of notifications |
| `onMarkAsRead` | `(notificationId: string) => void` | — | No | Callback when notification is read |
| `onDelete` | `(notificationId: string) => void` | — | No | Callback when notification is deleted |
| `onMarkAllAsRead` | `() => void` | — | No | Callback when all notifications are marked as read |
| `onClearAll` | `() => void` | — | No | Callback when all notifications are cleared |
| `showBadge` | `boolean` | — | No | Show unread count badge |
| `trigger` | `'hover' | 'click'` | — | No | Trigger button trigger ('hover' or 'click') |
| `maxNotifications` | `number` | — | No | Max notifications to display |
| `showCategories` | `boolean` | — | No | Show notification categories |
| `categories` | `Array<{ id: string` | — | No | Available categories for filtering |
| `label` | `string` | — | Yes |  |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/navigation-notificationcenter)

## Related Components

- **Toast** — NotificationCenter is an alternative to Toast

## When to Use

Use this component when you need to:

- Use NotificationCenter for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use NotificationCenter for general-purpose components functionality

---

**Library:** `@waysnx/ui-navigation`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** label, notificationcenter, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
