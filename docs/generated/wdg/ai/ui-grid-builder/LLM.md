# Ui Grid Builder - AI Agent Guide

## Overview

**Package:** `@waysnx/ui-grid-builder`
**Version:** `1.0.0`
**Description:** Data grid component from WaysNX - sortable, filterable, paginated grid with column types and actions

---

## Quick Reference

- **Total Components:** 6
- **Installation:** `npm install @waysnx/ui-grid-builder`
- **Latest Version:** `1.0.0`


## Installation & Setup

### NPM

```bash
npm install @waysnx/ui-grid-builder
```

### Yarn

```bash
yarn add @waysnx/ui-grid-builder
```


## Component Catalog

### Components

- **Grid** - Build and configure responsive data grids with columns and rows
- **GridActions** - GridActions component
- **GridCell** - GridCell component
- **GridPagination** - GridPagination component
- **GridSelectionBar** - GridSelectionBar component
- **GridToolbar** - GridToolbar component


## Component Selection Guide

Choose components based on your needs:

### Input

- `GridSelectionBar` - GridSelectionBar component

### Layout

- `Grid` - Build and configure responsive data grids with columns and rows
- `GridActions` - GridActions component
- `GridCell` - GridCell component
- `GridPagination` - GridPagination component
- `GridToolbar` - GridToolbar component


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

- **Grid** is often used with other input components
- **GridActions** is often used with other input components
- **GridCell** is often used with other input components


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

- `@tanstack/react-table` (`^8.0.0`)
- `react` (`>=18`)
- `react-dom` (`>=18`)


## AI Guidance

This library is optimized for AI code generation and documentation search.

### Component Metadata

**Grid**
- Keywords: grid, components

**GridActions**
- Keywords: gridactions, components

**GridCell**
- Keywords: gridcell, components, value

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

