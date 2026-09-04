# Ui Feedback - AI Agent Guide

## Overview

**Package:** `@waysnx/ui-feedback`
**Version:** `1.0.0`
**Description:** Feedback and overlay components from WaysNX - Modal, Toast, Drawer, Tooltip, Skeleton, Progress, Badge, and more

---

## Quick Reference

- **Total Components:** 12
- **Installation:** `npm install @waysnx/ui-feedback`
- **Latest Version:** `1.0.0`


## Installation & Setup

### NPM

```bash
npm install @waysnx/ui-feedback
```

### Yarn

```bash
yarn add @waysnx/ui-feedback
```


## Component Catalog

### Components

- **Alert** - Display a contextual message that requires user attention
- **Badge** - Display a small numeric or dot indicator to convey status or count information
- **CircularProgress** - Visualize numeric progress in a circular format
- **ConfirmDialog** - Request explicit user confirmation before performing a consequential action
- **Drawer** - Display content in a side panel that slides in from the screen edge
- **EmptyState** - Show a clear message when no data is available to display
- **Modal** - Display important content in a focused dialog window
- **Progress** - Visualize numeric progress as a linear bar
- **Skeleton** - Display a placeholder while content is loading
- **Spinner** - Show indeterminate progress or loading activity
- **Toast** - Display a temporary notification message that auto-dismisses
- **Tooltip** - Display supplementary information when user hovers over an element


## Component Selection Guide

Choose components based on your needs:

### Display

- `Badge` - Display a small numeric or dot indicator to convey status or count information

### Feedback

- `Alert` - Display a contextual message that requires user attention
- `CircularProgress` - Visualize numeric progress in a circular format
- `Progress` - Visualize numeric progress as a linear bar
- `Skeleton` - Display a placeholder while content is loading
- `Spinner` - Show indeterminate progress or loading activity
- `Toast` - Display a temporary notification message that auto-dismisses

### Overlay

- `ConfirmDialog` - Request explicit user confirmation before performing a consequential action
- `Modal` - Display important content in a focused dialog window
- `Tooltip` - Display supplementary information when user hovers over an element

### Utility

- `Drawer` - Display content in a side panel that slides in from the screen edge
- `EmptyState` - Show a clear message when no data is available to display


## Common Usage Patterns

### Basic Usage

```typescript
import { Component } from '@waysnx/{library}';

export function MyComponent() {
  return <Component />;
}
```

### Composition

Common component combinations:

- **Alert** is often used with other input components
- **Badge** is often used with other input components
- **CircularProgress** is often used with other input components


## Common Mistakes & Anti-Patterns

Avoid these patterns when using components from this library:

- **Prop Drilling:** Use Context or composition instead of passing props deeply
- **Missing a11y:** Always include ARIA labels and semantic HTML
- **Hardcoded Values:** Use design tokens and theme values instead
- **Missing Error Handling:** Always handle loading and error states

See individual component documentation for specific anti-patterns.


## Package Dependencies

### Runtime Dependencies

- `@waysnx/ui-i18n` (`workspace:*`)

### Peer Dependencies

Your project must provide:

- `react` (`>=18`)


## AI Guidance

This library is optimized for AI code generation and documentation search.

### Component Metadata

**Alert**
- Keywords: alert, components

**Badge**
- Keywords: badge, components

**CircularProgress**
- Keywords: label, circularprogress, value

### Searchable Metadata

Components are indexed with:

- **Keywords:** For semantic search
- **Aliases:** Alternative names AI agents might search for
- **Semantic Categories:** Classification for AI recommendations
- **Use Cases:** AI understands when to suggest each component
- **Anti-patterns:** AI avoids suggesting incorrect usage

### Querying Components

AI agents can answer:

- 'Which component should I use for X?'
- 'What are the props for Component Y?'
- 'What components work with X?'
- 'Show me examples of Z'
- 'What are the accessibility features?'


## References & Documentation

- [Component Documentation](./components/) - Detailed component docs
- [Design System](./library.json) - Library metadata
- [Component Relationships](./relationships.json) - Dependency graph
- [Search Index](./search-index.json) - Full-text search data

## Support

For issues or questions:

- Check component-specific documentation
- Review examples in Storybook
- File issues on GitHub

