# @waysnx/ui-communication

Enterprise-grade communication components from WaysNX - messaging, threads, presence, reactions, mentions, and realtime collaboration

**Version:** `1.0.0`


## Installation

### NPM

```bash
npm install @waysnx/ui-communication
```

### Yarn

```bash
yarn add @waysnx/ui-communication
```

### PNPM

```bash
pnpm add @waysnx/ui-communication
```


## Package Information

| Property | Value |
|----------|-------|
| **Package** | `@waysnx/ui-communication` |
| **Version** | `1.0.0` |
| **License** | Apache-2.0 |
| **Author** | WaysNX Technologies |


## Dependencies

### Peer Dependencies (Required)

Your project must provide these packages:

- `@waysnx/ui-core` - workspace:*
- `@waysnx/ui-feedback` - workspace:*
- `@waysnx/ui-layout` - workspace:*
- `react` - >=18
- `react-dom` - >=18

### Runtime Dependencies

Automatically installed:

- `@waysnx/ui-i18n` - workspace:*
- `dompurify` - ^3.3.1


## Components Overview

**Total Components:** 15

| Category | Count |
|----------|-------|
| components | 15 |


## Components

### components

- **ChatInput** - Provide user input for composing chat or message content
- **ChatWindow** - Display message history and enable real-time chat conversation
- **ConversationList** - Display a list of conversations for quick access
- **EmojiPicker** - Enable selection and insertion of emoji characters
- **MentionInput** - Enable mentioning users or entities within text input
- **MessageBubble** - Display a single message in a chat or messaging interface
- **NotificationBadge** - Display notification count or alert status on UI elements
- **NotificationList** - Display a list of notifications for review and management
- **PresenceIndicator** - Display user online status or availability
- **ReactionBar** - Enable quick reactions to messages through emoji selections
- **ReadReceipts** - Show message delivery and read status indicators
- **ThreadPanel** - Display threaded conversations branching from parent messages
- **TypingIndicator** - Show that another user is currently typing a message
- **UserPresenceList** - Display list of users with their presence or availability status
- **VoiceMessage** - Display and play audio/voice messages in chat or messaging


## Quick Start

### Basic Usage

```typescript
import React from 'react';
import { Button } from '@waysnx/ui-communication';

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

