# @waysnx/ui-i18n

Internationalization (i18n) provider for WaysNX UI Kit - shared translation context across all packages

**Version:** `1.0.0`


## Installation

### NPM

```bash
npm install @waysnx/ui-i18n
```

### Yarn

```bash
yarn add @waysnx/ui-i18n
```

### PNPM

```bash
pnpm add @waysnx/ui-i18n
```


## Package Information

| Property | Value |
|----------|-------|
| **Package** | `@waysnx/ui-i18n` |
| **Version** | `1.0.0` |
| **License** | Apache-2.0 |
| **Author** | WaysNX Technologies |


## Dependencies

### Peer Dependencies (Required)

Your project must provide these packages:

- `react` - >=18


## API Overview

This library provides React-based internationalization (i18n) and localization (l10n).

### Core Components
- `TranslationProvider` - Root context provider for translations

### Hooks
- `useTranslation()` - Access translations in functional components
  Returns: `{ t: (key: string) => string, language: string }`

### Higher-Order Components
- `withTranslation()` - Inject translations into class components

### Message Sets
- `defaultMessages` - English translations
- `esMessages` - Spanish translations
- `frMessages` - French translations
- `arMessages` - Arabic translations

### Features
- React Context-based translation system
- Runtime language switching
- Component-specific message definitions
- Default messages with fallback support
- Library-wide consistent translations


## Quick Start

### Wrap Application

```typescript
import { TranslationProvider } from '@waysnx/ui-i18n';
import { defaultMessages } from '@waysnx/ui-i18n';

export function App() {
  return (
    <TranslationProvider messages={defaultMessages} language='en'>
      <YourApp />
    </TranslationProvider>
  );
}
```

### Use Translations

```typescript
import { useTranslation } from '@waysnx/ui-i18n';

export function MyComponent() {
  const { t, language } = useTranslation();

  return (
    <div>
      <h1>{t('common.title')}</h1>
      <p>Current language: {language}</p>
    </div>
  );
}
```

### Class Component Support

```typescript
import { withTranslation } from '@waysnx/ui-i18n';

class MyComponent extends React.Component {
  render() {
    const { t } = this.props;
    return <h1>{t('common.title')}</h1>;
  }
}

export default withTranslation(MyComponent);
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

