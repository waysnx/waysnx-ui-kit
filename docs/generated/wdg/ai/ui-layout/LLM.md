# Ui Layout - AI Agent Guide

## Overview

**Package:** `@waysnx/ui-layout`
**Version:** `1.0.0`
**Description:** Comprehensive layout components from WaysNX - page structure, layout utilities, content organization, and navigation

---

## Quick Reference

- **Total Components:** 22
- **Installation:** `npm install @waysnx/ui-layout`
- **Latest Version:** `1.0.0`


## Installation & Setup

### NPM

```bash
npm install @waysnx/ui-layout
```

### Yarn

```bash
yarn add @waysnx/ui-layout
```


## Component Catalog

### Components

- **Accordion** - Display collapsible sections of content that expand or collapse
- **Breadcrumb** - Display the current navigation path and enable quick navigation to parent levels
- **Card** - Contain and organize related content in a bordered container
- **Collapsible** - Show or hide content with a click or interaction
- **Column** - Organize content in a vertical column within a layout grid
- **Container** - Constrain content width and provide consistent margins
- **Divider** - Create a visual separation between content sections
- **Grid** - Arrange content in a responsive grid layout
- **PageContent** - Organize main content area of a page layout
- **PageHeader** - Display header information and controls at the top of a page
- **PageLayout** - Define the overall structure and layout of a page
- **PageTabs** - Organize page sections using tab navigation
- **Panel** - Create a contained panel or section with consistent styling
- **Row** - Organize content in a horizontal row within a layout grid
- **Section** - Define a semantic content section with consistent spacing
- **SidebarLayout** - Create a layout with a sidebar and main content area
- **Spacer** - Add flexible spacing between layout elements
- **SplitLayout** - Create a two-panel layout with resizable divider
- **Stack** - Arrange elements in a single row or column with consistent spacing
- **Stepper** - Show progress through a multi-step process
- **Tabs** - Organize content into tabs that users can switch between
- **Wizard** - Guide users through a multi-step process or form


## Component Selection Guide

Choose components based on your needs:

### Layout

- `Grid` - Arrange content in a responsive grid layout
- `SidebarLayout` - Create a layout with a sidebar and main content area

### Navigation

- `Breadcrumb` - Display the current navigation path and enable quick navigation to parent levels
- `PageTabs` - Organize page sections using tab navigation
- `Tabs` - Organize content into tabs that users can switch between

### Utility

- `Accordion` - Display collapsible sections of content that expand or collapse
- `Card` - Contain and organize related content in a bordered container
- `Collapsible` - Show or hide content with a click or interaction
- `Column` - Organize content in a vertical column within a layout grid
- `Container` - Constrain content width and provide consistent margins
- `Divider` - Create a visual separation between content sections
- `PageContent` - Organize main content area of a page layout
- `PageHeader` - Display header information and controls at the top of a page
- `PageLayout` - Define the overall structure and layout of a page
- `Panel` - Create a contained panel or section with consistent styling
- `Row` - Organize content in a horizontal row within a layout grid
- `Section` - Define a semantic content section with consistent spacing
- `Spacer` - Add flexible spacing between layout elements
- `SplitLayout` - Create a two-panel layout with resizable divider
- `Stack` - Arrange elements in a single row or column with consistent spacing
- `Stepper` - Show progress through a multi-step process
- `Wizard` - Guide users through a multi-step process or form


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

- **Accordion** is often used with other input components
- **Breadcrumb** is often used with other input components
- **Card** is often used with other input components


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

**Accordion**
- Keywords: accordion, components

**Breadcrumb**
- Keywords: breadcrumb, components

**Card**
- Keywords: card, components

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

