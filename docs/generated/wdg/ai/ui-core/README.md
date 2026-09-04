# @waysnx/ui-core

Core UI components from WaysNX - includes inputs, buttons, date pickers, and form controls

**Version:** `1.0.0`


## Installation

### NPM

```bash
npm install @waysnx/ui-core
```

### Yarn

```bash
yarn add @waysnx/ui-core
```

### PNPM

```bash
pnpm add @waysnx/ui-core
```


## Package Information

| Property | Value |
|----------|-------|
| **Package** | `@waysnx/ui-core` |
| **Version** | `1.0.0` |
| **License** | Apache-2.0 |
| **Author** | WaysNX Technologies |


## Dependencies

### Peer Dependencies (Required)

Your project must provide these packages:

- `react` - >=18
- `react-datepicker` - ^8.0.0
- `react-dom` - >=18

### Runtime Dependencies

Automatically installed:

- `@waysnx/ui-i18n` - workspace:*
- `dompurify` - ^3.3.1
- `react-imask` - ^7.6.1
- `react-number-format` - ^5.4.4


## Components Overview

**Total Components:** 24

| Category | Count |
|----------|-------|
| components | 24 |


## Components

### components

- **Autocomplete** - Enable users to search and select from a filtered list of options as they type
- **Button** - Enable users to trigger actions by pressing a clickable element
- **Checkbox** - Allow users to select one or more options from a list of independent choices
- **Currency** - Collect and display monetary amounts with automatic currency formatting
- **DatePicker** - Enable users to select a specific date through an interactive calendar interface
- **DateRangePicker** - Enable users to select a start and end date range through an interactive calendar
- **DateTimePicker** - Enable users to select a specific date and time through an interactive calendar interface
- **ErrorMessage** - Display error messages to users with prominent visual and semantic prominence
- **FileUpload** - Enable users to upload files with drag-and-drop support and validation
- **Hidden** - Store and submit form field values that should not be visible to users
- **HtmlContent** - Display sanitized HTML content safely within the application interface
- **HtmlEditor** - Enable users to create and format HTML content with a visual text editor toolbar
- **IFrame** - Secure-by-default sandbox policy
- **Image** - Display images with responsive sizing, fallback handling, and accessibility support
- **Input** - Collect single-line text and numeric input from users with validation and formatting support
- **Link** - Navigate users to a different page or external resource via a clickable text link
- **Radio** - Enable users to select exactly one option from a list of mutually exclusive choices
- **Select** - Enable users to select one or more options from a dropdown list with optional search
- **Slider** - Enable users to select a numeric value from a continuous range using a draggable control
- **SpeechToTextTextarea** - Enable users to enter text through voice input combined with traditional text editing
- **Switch** - Enable users to toggle a setting or feature on or off with a visual switch
- **Textarea** - Collect multi-line text input from users with optional length limits and formatting
- **TimePicker** - Enable users to select a specific time through a time picker interface
- **Tree** - Display hierarchical data with expandable nodes and checkboxes for selection


## Quick Start

### Basic Usage

```typescript
import React from 'react';
import { Button } from '@waysnx/ui-core';

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

- accounting
- crm
- erp
- hrms
- project_management


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

