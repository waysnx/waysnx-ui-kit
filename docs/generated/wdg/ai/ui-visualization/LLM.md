# Ui Visualization - AI Agent Guide

## Overview

**Package:** `@waysnx/ui-visualization`
**Version:** `1.0.0`
**Description:** Enterprise-grade visualization components for React — OrgChart, Tree, Hierarchy, and more. Built on a high-performance engine with virtualization, zoom/pan, and full accessibility.

---

## Quick Reference

- **Total Components:** 10
- **Installation:** `npm install @waysnx/ui-visualization`
- **Latest Version:** `1.0.0`


## Installation & Setup

### NPM

```bash
npm install @waysnx/ui-visualization
```

### Yarn

```bash
yarn add @waysnx/ui-visualization
```


## Component Catalog

### Components

- **Connector** - Draw connections between elements to show relationships
- **Hierarchy** - Visualize organizational or hierarchical relationships
- **Legend** - Explain chart symbols, colors, and data categories
- **MiniMap** - Display a zoomed-out overview of large visualizations
- **OrgChart** - Display organizational structure and reporting relationships
- **SearchBox** - Enable searching and filtering within visualizations
- **Toolbar** - Display tool or action buttons for interactive visualizations
- **Tree** - Display hierarchical tree structure with expandable nodes
- **TreeNode** - Represent a single node within a hierarchical tree structure
- **ZoomControls** - Provide zoom in/out controls for interactive visualizations


## Component Selection Guide

Choose components based on your needs:

### Utility

- `Connector` - Draw connections between elements to show relationships
- `Hierarchy` - Visualize organizational or hierarchical relationships
- `Legend` - Explain chart symbols, colors, and data categories
- `MiniMap` - Display a zoomed-out overview of large visualizations
- `OrgChart` - Display organizational structure and reporting relationships
- `SearchBox` - Enable searching and filtering within visualizations
- `Toolbar` - Display tool or action buttons for interactive visualizations
- `Tree` - Display hierarchical tree structure with expandable nodes
- `TreeNode` - Represent a single node within a hierarchical tree structure
- `ZoomControls` - Provide zoom in/out controls for interactive visualizations


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

- **Connector** is often used with other input components
- **Hierarchy** is often used with other input components
- **Legend** is often used with other input components


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

**Connector**
- Keywords: connector, components

**Hierarchy**
- Keywords: hierarchy, components

**Legend**
- Keywords: legend, components

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

