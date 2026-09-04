# Ui Dashboard - AI Agent Guide

## Overview

**Package:** `@waysnx/ui-dashboard`
**Version:** `1.0.0`
**Description:** Enterprise-grade dashboard framework from WaysNX - widgets, layout system, and dashboard infrastructure without opinion on chart libraries

---

## Quick Reference

- **Total Components:** 13
- **Installation:** `npm install @waysnx/ui-dashboard`
- **Latest Version:** `1.0.0`


## Installation & Setup

### NPM

```bash
npm install @waysnx/ui-dashboard
```

### Yarn

```bash
yarn add @waysnx/ui-dashboard
```


## Component Catalog

### Components

- **ChartWidget** - ChartWidget component
- **Dashboard** - Provide the main container and layout structure for dashboard applications
- **DashboardFilterBar** - DashboardFilterBar component
- **DashboardFooter** - DashboardFooter component
- **DashboardHeader** - DashboardHeader component
- **DashboardSearch** - DashboardSearch component
- **DashboardSidebar** - DashboardSidebar component
- **DashboardToolbar** - DashboardToolbar component
- **HtmlWidget** - HtmlWidget component
- **KPICard** - KPICard component
- **MarkdownWidget** - MarkdownWidget component
- **Widget** - Display dashboard content in a contained, reusable panel with optional header and footer
- **WidgetGrid** - WidgetGrid component


## Component Selection Guide

Choose components based on your needs:

### Layout

- `DashboardSidebar` - DashboardSidebar component
- `WidgetGrid` - WidgetGrid component

### Utility

- `ChartWidget` - ChartWidget component
- `Dashboard` - Provide the main container and layout structure for dashboard applications
- `DashboardFilterBar` - DashboardFilterBar component
- `DashboardFooter` - DashboardFooter component
- `DashboardHeader` - DashboardHeader component
- `DashboardSearch` - DashboardSearch component
- `DashboardToolbar` - DashboardToolbar component
- `HtmlWidget` - HtmlWidget component
- `KPICard` - KPICard component
- `MarkdownWidget` - MarkdownWidget component
- `Widget` - Display dashboard content in a contained, reusable panel with optional header an


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

- **ChartWidget** is often used with other input components
- **Dashboard** is often used with other input components
- **DashboardFilterBar** is often used with other input components


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

**ChartWidget**
- Keywords: chartwidget, components

**Dashboard**
- Keywords: dashboard, components

**DashboardFilterBar**
- Keywords: components, dashboardfilterbar

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

