# Ui Communication - AI Agent Guide

## Overview

**Package:** `@waysnx/ui-communication`
**Version:** `1.0.0`
**Description:** Enterprise-grade communication components from WaysNX - messaging, threads, presence, reactions, mentions, and realtime collaboration

---

## Quick Reference

- **Total Components:** 15
- **Installation:** `npm install @waysnx/ui-communication`
- **Latest Version:** `1.0.0`


## Installation & Setup

### NPM

```bash
npm install @waysnx/ui-communication
```

### Yarn

```bash
yarn add @waysnx/ui-communication
```


## Component Catalog

### Components

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


## Component Selection Guide

Choose components based on your needs:

### Display

- `NotificationBadge` - Display notification count or alert status on UI elements

### Input

- `ChatInput` - Provide user input for composing chat or message content
- `MentionInput` - Enable mentioning users or entities within text input

### Utility

- `ChatWindow` - Display message history and enable real-time chat conversation
- `ConversationList` - Display a list of conversations for quick access
- `EmojiPicker` - Enable selection and insertion of emoji characters
- `MessageBubble` - Display a single message in a chat or messaging interface
- `NotificationList` - Display a list of notifications for review and management
- `PresenceIndicator` - Display user online status or availability
- `ReactionBar` - Enable quick reactions to messages through emoji selections
- `ReadReceipts` - Show message delivery and read status indicators
- `ThreadPanel` - Display threaded conversations branching from parent messages
- `TypingIndicator` - Show that another user is currently typing a message
- `UserPresenceList` - Display list of users with their presence or availability status
- `VoiceMessage` - Display and play audio/voice messages in chat or messaging


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

- **ChatInput** is often used with other input components
- **ChatWindow** is often used with other input components
- **ConversationList** is often used with other input components


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

### Peer Dependencies

Your project must provide:

- `@waysnx/ui-core` (`workspace:*`)
- `@waysnx/ui-feedback` (`workspace:*`)
- `@waysnx/ui-layout` (`workspace:*`)
- `react` (`>=18`)
- `react-dom` (`>=18`)


## AI Guidance

This library is optimized for AI code generation and documentation search.

### Component Metadata

**ChatInput**
- Keywords: chatinput, components

**ChatWindow**
- Keywords: chatwindow, components

**ConversationList**
- Keywords: conversationlist, components

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

