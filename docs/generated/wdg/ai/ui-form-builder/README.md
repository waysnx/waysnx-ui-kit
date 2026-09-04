# @waysnx/ui-form-builder

Schema-driven form builder from WaysNX - renders forms from JSON Schema using ui-core components

**Version:** `1.0.0`


## Installation

### NPM

```bash
npm install @waysnx/ui-form-builder
```

### Yarn

```bash
yarn add @waysnx/ui-form-builder
```

### PNPM

```bash
pnpm add @waysnx/ui-form-builder
```


## Package Information

| Property | Value |
|----------|-------|
| **Package** | `@waysnx/ui-form-builder` |
| **Version** | `1.0.0` |
| **License** | Apache-2.0 |
| **Author** | WaysNX Technologies |


## Dependencies

### Peer Dependencies (Required)

Your project must provide these packages:

- `@waysnx/ui-core` - workspace:*
- `react` - >=18
- `react-dom` - >=18


## API Overview

This library provides JSON Schema-powered dynamic form generation.

### Components
- `DynamicForm` - Auto-render forms from JSON Schema
- `FormArray` - Dynamic field arrays and repetition

### Schema Processing
- `schemaToFormFields()` - Convert JSON Schema to form configuration
- `resolveField()` - Process individual field definitions
- `evaluateCondition()` - Evaluate single conditional rules
- `evaluateConditions()` - Evaluate multiple conditions

### Field Logic
- `shouldShowField()` - Determine field visibility
- `shouldDisableField()` - Determine if field is disabled
- `shouldRequireField()` - Determine if field is required

### Features
- Grid-based layouts (CSS Grid)
- Conditional field visibility and validation
- Complex form arrays
- Field dependency resolution


## Quick Start

### Define Schema

```typescript
const schema = {
  type: 'object',
  properties: {
    name: { type: 'string', title: 'Full Name' },
    email: { type: 'string', format: 'email' },
    role: { type: 'string', enum: ['admin', 'user', 'guest'] }
  },
  required: ['name', 'email']
};
```

### Render Dynamic Form

```typescript
import { DynamicForm } from '@waysnx/ui-form-builder';
import { schemaToFormFields } from '@waysnx/ui-form-builder';

const formFields = schemaToFormFields(schema);

export function MyForm() {
  const [formData, setFormData] = React.useState({});

  return (
    <DynamicForm
      fields={formFields}
      values={formData}
      onChange={(field, value) => setFormData({...formData, [field]: value})}
    />
  );
}
```


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

