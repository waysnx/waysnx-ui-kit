# Ui Navigation - AI Agent Guide

## Overview

**Package:** `@waysnx/ui-navigation`
**Version:** `1.0.0`
**Description:** Enterprise-grade navigation framework from WaysNX - menus, sidebars, breadcrumbs, and advanced navigation patterns

---

## Quick Reference

- **Total Components:** 20
- **Installation:** `npm install @waysnx/ui-navigation`
- **Latest Version:** `1.0.0`


## Installation & Setup

### NPM

```bash
npm install @waysnx/ui-navigation
```

### Yarn

```bash
yarn add @waysnx/ui-navigation
```


## Component Catalog

### Components

- **Breadcrumb** - Display the current navigation path and enable quick navigation to parent levels
- **CommandPalette** - Enable quick access to commands and navigation via keyboard
- **ContextMenu** - Display context-sensitive actions triggered by right-click or long-press
- **Drawer** - Display navigation content in a side panel that slides in from the screen edge
- **FavoritesMenu** - Display user-selected favorite or bookmarked items for quick access
- **Header** - Display application or site header with branding and navigation
- **MegaMenu** - Display large menu with multiple columns and rich content
- **Menu** - Display a list of selectable menu items
- **MenuItem** - MenuItem component
- **Navbar** - Display a horizontal navigation bar with multiple navigation links
- **NotificationCenter** - Display and manage system notifications in a centralized location
- **QuickActions** - Provide quick access to frequent actions in a compact menu
- **RecentItems** - Display recently accessed or used items for quick navigation
- **SearchNavigation** - Enable users to search for content or pages and navigate quickly
- **Sidebar** - Display persistent sidebar navigation alongside main content
- **StepNavigation** - Navigate between steps of a multi-step process or guide
- **Tabs** - Organize navigation into switchable tabs
- **TreeMenu** - Display hierarchical menu structure with collapsible tree nodes
- **UserMenu** - Display user profile and account-related options
- **WorkspaceSwitcher** - Enable users to switch between multiple workspaces or environments


## Component Selection Guide

Choose components based on your needs:

### Input

- `ContextMenu` - Display context-sensitive actions triggered by right-click or long-press

### Layout

- `Sidebar` - Display persistent sidebar navigation alongside main content

### Navigation

- `Breadcrumb` - Display the current navigation path and enable quick navigation to parent levels
- `FavoritesMenu` - Display user-selected favorite or bookmarked items for quick access
- `MegaMenu` - Display large menu with multiple columns and rich content
- `Menu` - Display a list of selectable menu items
- `MenuItem` - MenuItem component
- `Navbar` - Display a horizontal navigation bar with multiple navigation links
- `SearchNavigation` - Enable users to search for content or pages and navigate quickly
- `StepNavigation` - Navigate between steps of a multi-step process or guide
- `Tabs` - Organize navigation into switchable tabs
- `TreeMenu` - Display hierarchical menu structure with collapsible tree nodes
- `UserMenu` - Display user profile and account-related options

### Utility

- `CommandPalette` - Enable quick access to commands and navigation via keyboard
- `Drawer` - Display navigation content in a side panel that slides in from the screen edge
- `Header` - Display application or site header with branding and navigation
- `NotificationCenter` - Display and manage system notifications in a centralized location
- `QuickActions` - Provide quick access to frequent actions in a compact menu
- `RecentItems` - Display recently accessed or used items for quick navigation
- `WorkspaceSwitcher` - Enable users to switch between multiple workspaces or environments


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

- **Breadcrumb** is often used with other input components
- **CommandPalette** is often used with other input components
- **ContextMenu** is often used with other input components


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
- `react-dom` (`>=18`)


## AI Guidance

This library is optimized for AI code generation and documentation search.

### Component Metadata

**Breadcrumb**
- Keywords: components, breadcrumb

**CommandPalette**
- Keywords: components, commandpalette

**ContextMenu**
- Keywords: components, contextmenu

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

