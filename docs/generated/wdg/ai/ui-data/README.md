# @waysnx/ui-data

Data editing and viewing components from WaysNX - JSON, XML, code, and markdown editors/viewers

**Version:** `1.0.0`


## Installation

### NPM

```bash
npm install @waysnx/ui-data
```

### Yarn

```bash
yarn add @waysnx/ui-data
```

### PNPM

```bash
pnpm add @waysnx/ui-data
```


## Package Information

| Property | Value |
|----------|-------|
| **Package** | `@waysnx/ui-data` |
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
- `dompurify` - ^3.3.1


## Components Overview

**Total Components:** 6

| Category | Count |
|----------|-------|
| components | 6 |


## Components

### components

- **CodeEditor** - Enable editing and authoring of source code with syntax support
- **CodeViewer** - Display read-only source code with syntax highlighting
- **JSONEditor** - Enable editing and validation of JSON data
- **MarkdownEditor** - Enable authoring of markdown content with visual preview
- **MarkdownViewer** - Display formatted markdown content as rendered HTML
- **XMLViewer** - Display and navigate XML data with hierarchical tree view


## Quick Start

### Basic Usage

```typescript
import React from 'react';
import { Button } from '@waysnx/ui-data';

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

