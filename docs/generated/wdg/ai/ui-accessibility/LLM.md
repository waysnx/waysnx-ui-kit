# Ui Accessibility - AI Agent Guide

## Overview

**Package:** `@waysnx/ui-accessibility`
**Version:** `1.0.0`
**Description:** Enterprise-grade accessibility control center for WaysNX UI Kit — centralized settings management with real-time application across all components

---

## Quick Reference

- **Total Components:** 5
- **Installation:** `npm install @waysnx/ui-accessibility`
- **Latest Version:** `1.0.0`


## Installation & Setup

### NPM

```bash
npm install @waysnx/ui-accessibility
```

### Yarn

```bash
yarn add @waysnx/ui-accessibility
```


## Component Catalog

### Components

- **AccessibilityCenter** - AccessibilityCenter Component The main UI for accessibility settings
- **FloatingButton** - FloatingButton Component A floating button that triggers the accessibility center
- **Magnifier** - Magnifier Component Provides a magnified view of page content for users with low vision Follows curs
- **ReadingGuide** - ReadingGuide Component Displays a visual reading line to help users follow text Only renders when re
- **SkipLinks** - SkipLinks — renders visually hidden skip-navigation links


## Component Selection Guide

Choose components based on your needs:

### Display

- `FloatingButton` - FloatingButton Component A floating button that triggers the accessibility cente

### Utility

- `AccessibilityCenter` - AccessibilityCenter Component The main UI for accessibility settings
- `Magnifier` - Magnifier Component Provides a magnified view of page content for users with low
- `ReadingGuide` - ReadingGuide Component Displays a visual reading line to help users follow text 
- `SkipLinks` - SkipLinks — renders visually hidden skip-navigation links


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

- **AccessibilityCenter** is often used with other input components
- **FloatingButton** is often used with other input components
- **Magnifier** is often used with other input components


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

**AccessibilityCenter**
- Keywords: accessibilitycenter, components

**FloatingButton**
- Keywords: components, floatingbutton

**Magnifier**
- Keywords: components, magnifier

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

