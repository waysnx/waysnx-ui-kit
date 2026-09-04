# @waysnx/ui-feedback

Feedback and overlay components from WaysNX - Modal, Toast, Drawer, Tooltip, Skeleton, Progress, Badge, and more

**Version:** `1.0.0`


## Installation

### NPM

```bash
npm install @waysnx/ui-feedback
```

### Yarn

```bash
yarn add @waysnx/ui-feedback
```

### PNPM

```bash
pnpm add @waysnx/ui-feedback
```


## Package Information

| Property | Value |
|----------|-------|
| **Package** | `@waysnx/ui-feedback` |
| **Version** | `1.0.0` |
| **License** | Apache-2.0 |
| **Author** | WaysNX Technologies |


## Dependencies

### Peer Dependencies (Required)

Your project must provide these packages:

- `react` - >=18

### Runtime Dependencies

Automatically installed:

- `@waysnx/ui-i18n` - workspace:*


## Components Overview

**Total Components:** 12

| Category | Count |
|----------|-------|
| components | 12 |


## Components

### components

- **Alert** - Display a contextual message that requires user attention
- **Badge** - Display a small numeric or dot indicator to convey status or count information
- **CircularProgress** - Visualize numeric progress in a circular format
- **ConfirmDialog** - Request explicit user confirmation before performing a consequential action
- **Drawer** - Display content in a side panel that slides in from the screen edge
- **EmptyState** - Show a clear message when no data is available to display
- **Modal** - Display important content in a focused dialog window
- **Progress** - Visualize numeric progress as a linear bar
- **Skeleton** - Display a placeholder while content is loading
- **Spinner** - Show indeterminate progress or loading activity
- **Toast** - Display a temporary notification message that auto-dismisses
- **Tooltip** - Display supplementary information when user hovers over an element


## Quick Start

### Basic Usage

```typescript
import React from 'react';
import { Button } from '@waysnx/ui-feedback';

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

