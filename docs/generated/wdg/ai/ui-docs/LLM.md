# Ui Docs - AI Agent Guide

## Overview

**Package:** `@waysnx/ui-docs`
**Version:** `1.0.0`
**Description:** Enterprise-grade documentation framework for rendering documentation entirely from structured metadata — JSON driven, component based, and completely generic

---

## Quick Reference

- **Total Components:** 12
- **Installation:** `npm install @waysnx/ui-docs`
- **Latest Version:** `1.0.0`


## Installation & Setup

### NPM

```bash
npm install @waysnx/ui-docs
```

### Yarn

```bash
yarn add @waysnx/ui-docs
```


## Component Catalog

### Components

- **AISectionPlaceholder** - AISectionPlaceholder component
- **ComponentHero** - Component Hero Section Displays component name, description, and metadata
- **DependencyGraphPlaceholder** - DependencyGraphPlaceholder component
- **DocumentationDemoViewer** - DocumentationDemoViewer Renders demo categories and examples from component
- **LiveComponentRenderer** - LiveComponentRenderer Dynamically renders a component from the registry with provided props
- **MarkdownRenderer** - Markdown Renderer Renders markdown content with syntax highlighting using --wx- tokens
- **PlaygroundPlaceholder** - PlaygroundPlaceholder component
- **PropsTable** - Props Table Component Renders component props in a formatted table using --wx- tokens
- **ThemeExplorerPlaceholder** - ThemeExplorerPlaceholder component
- **TokenViewerPlaceholder** - TokenViewerPlaceholder component
- **WorkflowViewerPlaceholder** - WorkflowViewerPlaceholder component
- **_PlaceholderWrapper** - _PlaceholderWrapper component


## Component Selection Guide

Choose components based on your needs:

### Table

- `PropsTable` - Props Table Component Renders component props in a formatted table using --wx- t

### Utility

- `AISectionPlaceholder` - AISectionPlaceholder component
- `ComponentHero` - Component Hero Section Displays component name, description, and metadata
- `DependencyGraphPlaceholder` - DependencyGraphPlaceholder component
- `DocumentationDemoViewer` - DocumentationDemoViewer Renders demo categories and examples from component
- `LiveComponentRenderer` - LiveComponentRenderer Dynamically renders a component from the registry with pro
- `MarkdownRenderer` - Markdown Renderer Renders markdown content with syntax highlighting using --wx- 
- `PlaygroundPlaceholder` - PlaygroundPlaceholder component
- `ThemeExplorerPlaceholder` - ThemeExplorerPlaceholder component
- `TokenViewerPlaceholder` - TokenViewerPlaceholder component
- `WorkflowViewerPlaceholder` - WorkflowViewerPlaceholder component
- `_PlaceholderWrapper` - _PlaceholderWrapper component


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

- **AISectionPlaceholder** is often used with other input components
- **ComponentHero** is often used with other input components
- **DependencyGraphPlaceholder** is often used with other input components


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
- `prismjs` (`^1.29.0`)
- `react-markdown` (`^9.0.1`)
- `react-syntax-highlighter` (`^15.5.0`)

### Peer Dependencies

Your project must provide:

- `react` (`>=18`)
- `react-dom` (`>=18`)


## AI Guidance

This library is optimized for AI code generation and documentation search.

### Component Metadata

**AISectionPlaceholder**
- Keywords: aisectionplaceholder, components

**ComponentHero**
- Keywords: componenthero, components

**DependencyGraphPlaceholder**
- Keywords: dependencygraphplaceholder, components

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

