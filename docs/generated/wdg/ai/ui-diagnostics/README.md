# @waysnx/ui-diagnostics

Framework-agnostic client-side runtime diagnostics, UI error observability, and form diagnostics for the WaysNX UI Kit

**Version:** `0.1.0`


## Installation

### NPM

```bash
npm install @waysnx/ui-diagnostics
```

### Yarn

```bash
yarn add @waysnx/ui-diagnostics
```

### PNPM

```bash
pnpm add @waysnx/ui-diagnostics
```


## Package Information

| Property | Value |
|----------|-------|
| **Package** | `@waysnx/ui-diagnostics` |
| **Version** | `0.1.0` |
| **License** | Apache-2.0 |
| **Author** | WaysNX Technologies |


## Dependencies

### Peer Dependencies (Required)

Your project must provide these packages:

- `react` - >=18
- `react-dom` - >=18


## API Overview

This library provides runtime diagnostics and error observability for React applications.

### Core Functions
- `createDiagnostics()` - Initialize diagnostics system
- `classifyError()` - Classify runtime errors
- `classifyHttpStatus()` - Classify HTTP status codes
- `computeFingerprint()` - Generate error fingerprints for deduplication

### Reporters
- Console reporter for development
- HTTP reporter for remote error tracking
- Memory reporter for in-app diagnostics
- Composable reporter pipeline

### Form & Schema Diagnostics
- Form submission error capture
- Field validation error tracking
- Rule engine error diagnostics
- Schema validation error capture


## Quick Start

### Initialize Diagnostics

```typescript
import { createDiagnostics, createConsoleReporter, createHttpReporter } from '@waysnx/ui-diagnostics';

const diagnostics = createDiagnostics({
  reporters: [
    createConsoleReporter({ enabled: true }),
    createHttpReporter({ endpoint: 'https://api.example.com/errors' })
  ],
  sampling: { rate: 1.0 }
});
```

### Capture Errors

```typescript
import { captureFormValidationError, captureSchemaError } from '@waysnx/ui-diagnostics';

try {
  // Validate form
  validateForm(formData);
} catch (error) {
  captureFormValidationError('email', error as Error);
}

try {
  // Parse schema
  parseSchema(schemaData);
} catch (error) {
  captureSchemaError(error as Error, schemaData);
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

