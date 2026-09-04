# Ui Data - AI Agent Guide

## Overview

**Package:** `@waysnx/ui-data`
**Version:** `1.0.0`
**Description:** Data editing and viewing components from WaysNX - JSON, XML, code, and markdown editors/viewers

---

## Quick Reference

- **Total Components:** 6
- **Installation:** `npm install @waysnx/ui-data`
- **Latest Version:** `1.0.0`


## Installation & Setup

### NPM

```bash
npm install @waysnx/ui-data
```

### Yarn

```bash
yarn add @waysnx/ui-data
```


## Component Catalog

### Components

- **CodeEditor** - Enable editing and authoring of source code with syntax support
- **CodeViewer** - Display read-only source code with syntax highlighting
- **JSONEditor** - Enable editing and validation of JSON data
- **MarkdownEditor** - Enable authoring of markdown content with visual preview
- **MarkdownViewer** - Display formatted markdown content as rendered HTML
- **XMLViewer** - Display and navigate XML data with hierarchical tree view


## Component Selection Guide

Choose components based on your needs:

### Utility

- `CodeEditor` - Enable editing and authoring of source code with syntax support
- `CodeViewer` - Display read-only source code with syntax highlighting
- `JSONEditor` - Enable editing and validation of JSON data
- `MarkdownEditor` - Enable authoring of markdown content with visual preview
- `MarkdownViewer` - Display formatted markdown content as rendered HTML
- `XMLViewer` - Display and navigate XML data with hierarchical tree view


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

- **CodeEditor** is often used with other input components
- **CodeViewer** is often used with other input components
- **JSONEditor** is often used with other input components


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
- `dompurify` (`^3.3.1`)

### Peer Dependencies

Your project must provide:

- `react` (`>=18`)
- `react-dom` (`>=18`)


## AI Guidance

This library is optimized for AI code generation and documentation search.

### Component Metadata

**CodeEditor**
- Keywords: components, codeeditor

**CodeViewer**
- Keywords: components, codeviewer

**JSONEditor**
- Keywords: components, jsoneditor

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

