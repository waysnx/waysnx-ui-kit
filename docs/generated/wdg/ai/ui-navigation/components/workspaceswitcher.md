# WorkspaceSwitcher

Enable users to switch between multiple workspaces or environments.

## Purpose

Enable users to switch between multiple workspaces or environments

## Installation

```bash
npm install @waysnx/ui-navigation
```

## Import

```typescript
import { WorkspaceSwitcher } from '@waysnx/ui-navigation';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `workspaces` | `Workspace[]` | — | Yes | List of available workspaces |
| `activeWorkspace` | `Workspace` | — | No | Currently active workspace |
| `onWorkspaceChange` | `(workspace: Workspace) => void` | — | No | Callback when workspace is selected |
| `variant` | `'dropdown' | 'pills' | 'minimal'` | — | No | Display variant |
| `size` | `'sm' | 'md' | 'lg'` | — | No | Size of the switcher |
| `showIcons` | `boolean` | — | No | Show workspace icons |
| `showDescriptions` | `boolean` | — | No | Show workspace descriptions |
| `className` | `string` | — | No | Additional CSS class |
| `style` | `React.CSSProperties` | — | No | Additional styles |
| `enableKeyboardNav` | `boolean` | — | No | Enable keyboard navigation |
| `ariaLabel` | `string` | — | No | aria-label for accessibility |
| `testId` | `string` | — | No | Test ID for testing |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/navigation-workspaceswitcher)

## Related Components

- **WorkspaceSwitcher** — WorkspaceSwitcher depends on WorkspaceSwitcher

## When to Use

Use this component when you need to:

- Use WorkspaceSwitcher for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use WorkspaceSwitcher for general-purpose components functionality

---

**Library:** `@waysnx/ui-navigation`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, workspaceswitcher

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
