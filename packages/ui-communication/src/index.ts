/**
 * @file index.ts
 * Main barrel export for @waysnx/ui-communication
 */

// Styles
import './styles/index.css';

// Types
export * from './types';

// Providers
export { CommunicationProvider, useCommunication } from './providers';
export type { CommunicationProviderProps, CommunicationContextType } from './providers';

// Components
export * from './components';

// Hooks
export {
  useConversation,
  useMessages,
  useTyping,
  usePresence,
  useMentions,
} from './hooks';

export type {
  UseConversationReturn,
  UseMessagesReturn,
  UseTypingReturn,
  UsePresenceReturn,
  UseMentionsReturn,
} from './hooks';
