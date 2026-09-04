# Ui Form Builder - AI Agent Guide

## Overview

**Package:** `@waysnx/ui-form-builder`
**Version:** `1.0.0`
**Description:** Schema-driven form builder from WaysNX - renders forms from JSON Schema using ui-core components

---

## Quick Reference

- **Type:** Functional Library (API/Utilities)
- **Installation:** `npm install @waysnx/ui-form-builder`
- **Latest Version:** `1.0.0`


## Installation & Setup

### NPM

```bash
npm install @waysnx/ui-form-builder
```

### Yarn

```bash
yarn add @waysnx/ui-form-builder
```


## API Catalog

### Components

- `DynamicForm` - Render forms from JSON Schema
- `FormArray` - Dynamic field arrays

### Schema Processing

- `schemaToFormFields(schema: JSONSchema): FormFieldConfig[]`
- `resolveField(schema: JSONSchemaProperty): FormFieldConfig`
- `evaluateCondition(condition: ControlCondition, formValues: any): boolean`
- `evaluateConditions(conditions: ControlCondition[], formValues: any): boolean`

### Field Logic

- `shouldShowField(field: FormFieldConfig, formValues: any): boolean`
- `shouldDisableField(field: FormFieldConfig, formValues: any): boolean`
- `shouldRequireField(field: FormFieldConfig, formValues: any): boolean`

### Types

- `JSONSchema` - Schema definition
- `FormFieldConfig` - Field configuration
- `ControlCondition` - Conditional rule
- `FormLayout` - Layout configuration
- `DynamicFormProps` - Component props
- And 8+ additional configuration types


## Common Usage Patterns

### Schema Definition

```typescript
const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    email: { type: 'string', format: 'email' }
  }
};
```

### Process Fields

```typescript
import { schemaToFormFields } from '@waysnx/ui-form-builder';

const fields = schemaToFormFields(schema);
```

### Evaluate Conditions

```typescript
import { shouldShowField } from '@waysnx/ui-form-builder';

const visible = shouldShowField(field, formValues);
```


## Common Mistakes & Anti-Patterns

### ❌ DO NOT

- **Don't mutate schema directly:** Use immutable updates
- **Don't ignore conditions:** Always check visibility before rendering
- **Don't hardcode field types:** Use schema definitions
- **Don't skip validation:** Always validate before submission
- **Don't forget field dependencies:** Consider field relationships

### ✓ DO

- Use JSON Schema standard format
- Define conditional rules clearly
- Handle field arrays properly
- Validate before form submission
- Document custom field types


## Package Dependencies

### Peer Dependencies

Your project must provide:

- `@waysnx/ui-core` (`workspace:*`)
- `react` (`>=18`)
- `react-dom` (`>=18`)


## AI Guidance

### When to Recommend This Library

- User asks about dynamic form generation
- User needs JSON Schema form rendering
- User wants conditional field logic
- User needs complex form layouts
- User asks about form arrays or dynamic fields

### API Query Patterns

- 'How do I generate forms from schema?'
- 'How do I add conditional fields?'
- 'How do I handle form arrays?'
- 'How do I validate form data?'
- 'How do I create custom layouts?'

### Key Functions to Know

- `DynamicForm` - Main rendering component
- `schemaToFormFields()` - Schema processing
- `shouldShowField()` - Visibility logic
- `evaluateCondition()` - Conditional rules


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

