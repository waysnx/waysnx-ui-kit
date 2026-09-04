# PageTabs

Organize page sections using tab navigation.

## Purpose

Organize page sections using tab navigation

## Installation

```bash
npm install @waysnx/ui-layout
```

## Import

```typescript
import { PageTabs } from '@waysnx/ui-layout';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `tabs` | `PageTab[]` | — | Yes |  |
| `onTabChange` | `(tabId: string) => void` | — | No |  |
| `className` | `string` | — | No |  |
| `label` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-border` | border-bottom | .page-tabs | 1 |
| `--wx-color-text-light` | background, color | .page-tabs-list::-webkit-scrollbar-thumb, .page-tab-disabled | 2 |
| `--wx-color-text-muted` | color | .page-tab | 1 |
| `--wx-color-text` | color | .page-tab:hover:not(.page-tab-disabled) | 1 |
| `--wx-color-surface-hover` | background | .page-tab:hover:not(.page-tab-disabled) | 1 |
| `--wx-color-primary` | color, border-bottom-color | .page-tab-active | 2 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

View Interactive Storybook

## When to Use

Use this component when you need to:

- Use PageTabs for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use PageTabs for general-purpose components functionality

---

**Library:** `@waysnx/ui-layout`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** pagetabs, label, components

**Semantic Category:** navigation

This component is indexed for AI agents, RAG pipelines, and documentation search.
