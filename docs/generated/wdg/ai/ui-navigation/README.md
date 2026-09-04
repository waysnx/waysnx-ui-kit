# @waysnx/ui-navigation

Enterprise-grade navigation framework from WaysNX - menus, sidebars, breadcrumbs, and advanced navigation patterns

**Version:** `1.0.0`


## Installation

### NPM

```bash
npm install @waysnx/ui-navigation
```

### Yarn

```bash
yarn add @waysnx/ui-navigation
```

### PNPM

```bash
pnpm add @waysnx/ui-navigation
```


## Package Information

| Property | Value |
|----------|-------|
| **Package** | `@waysnx/ui-navigation` |
| **Version** | `1.0.0` |
| **License** | Apache-2.0 |
| **Author** | WaysNX Technologies |


## Dependencies

### Peer Dependencies (Required)

Your project must provide these packages:

- `react` - >=18
- `react-dom` - >=18

### Runtime Dependencies

Automatically installed:

- `@waysnx/ui-i18n` - workspace:*


## Components Overview

**Total Components:** 20

| Category | Count |
|----------|-------|
| components | 20 |


## Components

### components

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


## Quick Start

### Basic Usage

```typescript
import React from 'react';
import { Button } from '@waysnx/ui-navigation';

export function App() {
  return (
    <div>
      <Button onClick={() => console.log('Clicked')}>
        Click Me
      </Button>
    </div>
  );
}
```

### With Props

```typescript
import { Input, Select } from '@waysnx/{library_name}';

export function Form() {
  const [value, setValue] = React.useState('');

  return (
    <>
      <Input
        placeholder='Enter text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Select>
        <option>Option 1</option>
        <option>Option 2</option>
      </Select>
    </>
  );
}
```


## Enterprise Context

This library is used in enterprise applications including:

- crm
- erp
- hrms


## Documentation

### Component Documentation

Each component includes:

- Full API documentation
- Props and TypeScript types
- Usage examples
- Accessibility features
- Design tokens applied

### Available Resources

- [Component Docs](./components/) - Individual component documentation
- [LLM Guide](./LLM.md) - AI agent guide for this library
- [Storybook](./storybook) - Interactive component explorer
- [Design System](./library.json) - Library metadata
- [Search Index](./search-index.json) - Full-text search
- [Relationships](./relationships.json) - Component dependency graph


## Support

### Getting Help

- Check component-specific documentation
- Review examples and demos
- Check for common issues

### Reporting Issues

If you encounter issues:

1. Check existing issues on GitHub
2. Provide reproduction steps
3. Include your environment details
4. Attach relevant code examples

### Contributing

Contributions are welcome! Please follow:

- Component design guidelines
- Accessibility standards (WCAG 2.1)
- TypeScript best practices
- Test coverage requirements

