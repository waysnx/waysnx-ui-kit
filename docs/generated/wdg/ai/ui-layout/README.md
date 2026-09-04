# @waysnx/ui-layout

Comprehensive layout components from WaysNX - page structure, layout utilities, content organization, and navigation

**Version:** `1.0.0`


## Installation

### NPM

```bash
npm install @waysnx/ui-layout
```

### Yarn

```bash
yarn add @waysnx/ui-layout
```

### PNPM

```bash
pnpm add @waysnx/ui-layout
```


## Package Information

| Property | Value |
|----------|-------|
| **Package** | `@waysnx/ui-layout` |
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

**Total Components:** 22

| Category | Count |
|----------|-------|
| components | 22 |


## Components

### components

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


## Quick Start

### Basic Usage

```typescript
import React from 'react';
import { Button } from '@waysnx/ui-layout';

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

