# @waysnx/ui-docs

Enterprise-grade documentation framework for rendering documentation entirely from structured metadata — JSON driven, component based, and completely generic

**Version:** `1.0.0`


## Installation

### NPM

```bash
npm install @waysnx/ui-docs
```

### Yarn

```bash
yarn add @waysnx/ui-docs
```

### PNPM

```bash
pnpm add @waysnx/ui-docs
```


## Package Information

| Property | Value |
|----------|-------|
| **Package** | `@waysnx/ui-docs` |
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
- `prismjs` - ^1.29.0
- `react-markdown` - ^9.0.1
- `react-syntax-highlighter` - ^15.5.0


## Components Overview

**Total Components:** 12

| Category | Count |
|----------|-------|
| components | 12 |


## Components

### components

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


## Quick Start

### Basic Usage

```typescript
import React from 'react';
import { Button } from '@waysnx/ui-docs';

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

