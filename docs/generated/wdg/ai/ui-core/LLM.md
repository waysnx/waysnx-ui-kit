# Ui Core - AI Agent Guide

## Overview

**Package:** `@waysnx/ui-core`
**Version:** `1.0.0`
**Description:** Core UI components from WaysNX - includes inputs, buttons, date pickers, and form controls

---

## Quick Reference

- **Total Components:** 24
- **Installation:** `npm install @waysnx/ui-core`
- **Latest Version:** `1.0.0`


## Installation & Setup

### NPM

```bash
npm install @waysnx/ui-core
```

### Yarn

```bash
yarn add @waysnx/ui-core
```


## Component Catalog

### Components

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


## Component Selection Guide

Choose components based on your needs:

### Display

- `Button` - Enable users to trigger actions by pressing a clickable element
- `Image` - Display images with responsive sizing, fallback handling, and accessibility supp

### Input

- `Checkbox` - Allow users to select one or more options from a list of independent choices
- `Currency` - Collect and display monetary amounts with automatic currency formatting
- `DatePicker` - Enable users to select a specific date through an interactive calendar interface
- `DateRangePicker` - Enable users to select a start and end date range through an interactive calenda
- `DateTimePicker` - Enable users to select a specific date and time through an interactive calendar 
- `FileUpload` - Enable users to upload files with drag-and-drop support and validation
- `Input` - Collect single-line text and numeric input from users with validation and format
- `Radio` - Enable users to select exactly one option from a list of mutually exclusive choi
- `Select` - Enable users to select one or more options from a dropdown list with optional se
- `SpeechToTextTextarea` - Enable users to enter text through voice input combined with traditional text ed
- `Textarea` - Collect multi-line text input from users with optional length limits and formatt
- `TimePicker` - Enable users to select a specific time through a time picker interface

### Utility

- `Autocomplete` - Enable users to search and select from a filtered list of options as they type
- `ErrorMessage` - Display error messages to users with prominent visual and semantic prominence
- `Hidden` - Store and submit form field values that should not be visible to users
- `HtmlContent` - Display sanitized HTML content safely within the application interface
- `HtmlEditor` - Enable users to create and format HTML content with a visual text editor toolbar
- `IFrame` - Secure-by-default sandbox policy
- `Link` - Navigate users to a different page or external resource via a clickable text lin
- `Slider` - Enable users to select a numeric value from a continuous range using a draggable
- `Switch` - Enable users to toggle a setting or feature on or off with a visual switch
- `Tree` - Display hierarchical data with expandable nodes and checkboxes for selection


## Common Usage Patterns

### Basic Usage

```typescript
import { Component } from '@waysnx/{library}';

export function MyComponent() {
  return <Component />;
}
```

### Composition

Common component combinations:

- **Autocomplete** is often used with other input components
- **Button** is often used with other input components
- **Checkbox** is often used with other input components


## Common Mistakes & Anti-Patterns

Avoid these patterns when using components from this library:

- **Prop Drilling:** Use Context or composition instead of passing props deeply
- **Missing a11y:** Always include ARIA labels and semantic HTML
- **Hardcoded Values:** Use design tokens and theme values instead
- **Missing Error Handling:** Always handle loading and error states

See individual component documentation for specific anti-patterns.


## Package Dependencies

### Runtime Dependencies

- `@waysnx/ui-i18n` (`workspace:*`)
- `dompurify` (`^3.3.1`)
- `react-imask` (`^7.6.1`)
- `react-number-format` (`^5.4.4`)

### Peer Dependencies

Your project must provide:

- `react` (`>=18`)
- `react-datepicker` (`^8.0.0`)
- `react-dom` (`>=18`)


## AI Guidance

This library is optimized for AI code generation and documentation search.

### Component Metadata

**Autocomplete**
- Keywords: label, placeholder, autocomplete

**Button**
- Keywords: cta, trigger, action

**Checkbox**
- Keywords: checkbox, selection, label

### Searchable Metadata

Components are indexed with:

- **Keywords:** For semantic search
- **Aliases:** Alternative names AI agents might search for
- **Semantic Categories:** Classification for AI recommendations
- **Use Cases:** AI understands when to suggest each component
- **Anti-patterns:** AI avoids suggesting incorrect usage

### Querying Components

AI agents can answer:

- 'Which component should I use for X?'
- 'What are the props for Component Y?'
- 'What components work with X?'
- 'Show me examples of Z'
- 'What are the accessibility features?'


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

