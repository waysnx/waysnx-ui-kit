# Tabs

Organize content into tabs that users can switch between.

## Purpose

Organize content into tabs that users can switch between

## Installation

```bash
npm install @waysnx/ui-layout
```

## Import

```typescript
import { TabList } from '@waysnx/ui-layout';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `React.ReactNode` | — | Yes |  |
| `defaultTab` | `string` | — | No |  |
| `className` | `string` | — | No |  |
| `label` | `string` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-border` | border-bottom | .wx-tab-list | 1 |
| `--wx-color-text-muted` | color | .wx-tab | 1 |
| `--wx-color-text` | color | .wx-tab:hover | 1 |
| `--wx-color-primary` | color, border-bottom-color | .wx-tab-active | 2 |

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-size-sm` | font-size | .wx-tab | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-tabs)

## When to Use

Use this component when you need to:

- Use Tabs for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Tabs for general-purpose components functionality

---

**Library:** `@waysnx/ui-layout`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** tabs, organize, navigation, components, panel

**Synonyms:** tabbed panel, tab navigation

**Semantic Category:** navigation

This component is indexed for AI agents, RAG pipelines, and documentation search.
