import { createContext, useContext, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import type {
  CommunicationConfig,
  CommunicationEvent,
  CommunicationUser,
  Conversation,
  PresenceInfo,
  RealtimeAdapter,
  TypingIndicatorData,
} from '../types';

export interface CommunicationContextType {
  currentUser: CommunicationUser;
  adapter: RealtimeAdapter | null;
  connected: boolean;
  conversations: Conversation[];
  activeConversation: Conversation | null;
  typingUsers: Map<string, TypingIndicatorData[]>;
  presence: Map<string, PresenceInfo>;
  setConversations: (conversations: Conversation[]) => void;
  setActiveConversation: (conversation: Conversation | null) => void;
  emit: (event: CommunicationEvent) => void;
  subscribe: (type: string, handler: (event: CommunicationEvent) => void) => () => void;
  config: CommunicationConfig;
}

const CommunicationContext = createContext<CommunicationContextType | null>(null);

export interface CommunicationProviderProps {
  config: CommunicationConfig;
  children: ReactNode;
}

export function CommunicationProvider({ config, children }: CommunicationProviderProps) {
  const [connected, setConnected] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [typingUsers] = useState<Map<string, TypingIndicatorData[]>>(new Map());
  const [presence] = useState<Map<string, PresenceInfo>>(new Map());
  const listenersRef = useRef<Map<string, Set<(event: CommunicationEvent) => void>>>(new Map());

  // Connect adapter on mount
  useEffect(() => {
    if (config.adapter && config.adapterConfig) {
      config.adapter.connect(config.adapterConfig).then(() => {
        setConnected(true);
      }).catch(() => {
        setConnected(false);
      });

      const cleanup = config.adapter.onConnectionChange?.((isConnected) => {
        setConnected(isConnected);
      });

      return () => {
        cleanup?.();
        config.adapter?.disconnect();
      };
    }
  }, [config.adapter, config.adapterConfig]);

  const emit = useCallback((event: CommunicationEvent) => {
    // Notify local listeners
    const handlers = listenersRef.current.get(event.type);
    if (handlers) {
      handlers.forEach((handler) => handler(event));
    }
    // Notify global handler
    config.onEvent?.(event);
    // Publish via adapter
    if (config.adapter && connected) {
      config.adapter.publish(event.conversationId || 'global', event);
    }
  }, [config, connected]);

  const subscribe = useCallback((type: string, handler: (event: CommunicationEvent) => void) => {
    if (!listenersRef.current.has(type)) {
      listenersRef.current.set(type, new Set());
    }
    listenersRef.current.get(type)!.add(handler);
    return () => {
      listenersRef.current.get(type)?.delete(handler);
    };
  }, []);

  const value: CommunicationContextType = {
    currentUser: config.currentUser,
    adapter: config.adapter || null,
    connected,
    conversations,
    activeConversation,
    typingUsers,
    presence,
    setConversations,
    setActiveConversation,
    emit,
    subscribe,
    config,
  };

  return (
    <CommunicationContext.Provider value={value}>
      {children}
    </CommunicationContext.Provider>
  );
}

export function useCommunication(): CommunicationContextType {
  const context = useContext(CommunicationContext);
  if (!context) {
    throw new Error('useCommunication must be used within a CommunicationProvider');
  }
  return context;
}

export { CommunicationContext };
