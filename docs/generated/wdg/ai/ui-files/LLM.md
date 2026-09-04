# Ui Files - AI Agent Guide

## Overview

**Package:** `@waysnx/ui-files`
**Version:** `1.0.0`
**Description:** File and document viewing components from WaysNX - PDF viewer and document preview

---

## Quick Reference

- **Total Components:** 2
- **Installation:** `npm install @waysnx/ui-files`
- **Latest Version:** `1.0.0`


## Installation & Setup

### NPM

```bash
npm install @waysnx/ui-files
```

### Yarn

```bash
yarn add @waysnx/ui-files
```


## Component Catalog

### Components

- **DocumentPreview** - Display documents and files with automatic type detection and appropriate viewers
- **PDFViewer** - PDFViewer — SHELL / ADAPTER (not a functional PDF renderer in 1


## Component Selection Guide

Choose components based on your needs:

### Utility

- `DocumentPreview` - Display documents and files with automatic type detection and appropriate viewer
- `PDFViewer` - PDFViewer — SHELL / ADAPTER (not a functional PDF renderer in 1


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

- **DocumentPreview** is often used with other input components
- **PDFViewer** is often used with other input components


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

**DocumentPreview**
- Keywords: documentpreview, components

**PDFViewer**
- Keywords: pdfviewer, components

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

