# @waysnx/ui-grid-builder

Data grid component from WaysNX - sortable, filterable, paginated grid with column types and actions

**Version:** `1.0.0`


## Installation

### NPM

```bash
npm install @waysnx/ui-grid-builder
```

### Yarn

```bash
yarn add @waysnx/ui-grid-builder
```

### PNPM

```bash
pnpm add @waysnx/ui-grid-builder
```


## Package Information

| Property | Value |
|----------|-------|
| **Package** | `@waysnx/ui-grid-builder` |
| **Version** | `1.0.0` |
| **License** | Apache-2.0 |
| **Author** | WaysNX Technologies |


## Dependencies

### Peer Dependencies (Required)

Your project must provide these packages:

- `@tanstack/react-table` - ^8.0.0
- `react` - >=18
- `react-dom` - >=18

### Runtime Dependencies

Automatically installed:

- `@waysnx/ui-i18n` - workspace:*


## Components Overview

**Total Components:** 6

| Category | Count |
|----------|-------|
| components | 6 |


## Components

### components

- **Grid** - Build and configure responsive data grids with columns and rows
- **GridActions** - GridActions component
- **GridCell** - GridCell component
- **GridPagination** - GridPagination component
- **GridSelectionBar** - GridSelectionBar component
- **GridToolbar** - GridToolbar component


## Quick Start

### Basic Usage

```typescript
import React from 'react';
import { Button } from '@waysnx/ui-grid-builder';

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

