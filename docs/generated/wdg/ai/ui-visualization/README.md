# @waysnx/ui-visualization

Enterprise-grade visualization components for React — OrgChart, Tree, Hierarchy, and more. Built on a high-performance engine with virtualization, zoom/pan, and full accessibility.

**Version:** `1.0.0`


## Installation

### NPM

```bash
npm install @waysnx/ui-visualization
```

### Yarn

```bash
yarn add @waysnx/ui-visualization
```

### PNPM

```bash
pnpm add @waysnx/ui-visualization
```


## Package Information

| Property | Value |
|----------|-------|
| **Package** | `@waysnx/ui-visualization` |
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

**Total Components:** 10

| Category | Count |
|----------|-------|
| components | 10 |


## Components

### components

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


## Quick Start

### Basic Usage

```typescript
import React from 'react';
import { Button } from '@waysnx/ui-visualization';

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

