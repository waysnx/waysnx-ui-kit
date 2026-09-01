import { useCallback } from 'react';
import { useCommunication } from '../providers';
import type { Conversation } from '../types';

export interface UseConversationReturn {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  setActive: (conversation: Conversation | null) => void;
  create: (conversation: Conversation) => void;
  update: (id: string, updates: Partial<Conversation>) => void;
  remove: (id: string) => void;
  pin: (id: string) => void;
  mute: (id: string) => void;
  archive: (id: string) => void;
}

export function useConversation(): UseConversationReturn {
  const { conversations, activeConversation, setConversations, setActiveConversation, emit } = useCommunication();

  const setActive = useCallback((conversation: Conversation | null) => {
    setActiveConversation(conversation);
  }, [setActiveConversation]);

  const create = useCallback((conversation: Conversation) => {
    setConversations([conversation, ...conversations]);
    emit({ type: 'conversation.created', payload: conversation, timestamp: new Date() });
  }, [conversations, setConversations, emit]);

  const update = useCallback((id: string, updates: Partial<Conversation>) => {
    setConversations(conversations.map((c) => c.id === id ? { ...c, ...updates } : c));
    emit({ type: 'conversation.updated', payload: { id, ...updates }, timestamp: new Date() });
  }, [conversations, setConversations, emit]);

  const remove = useCallback((id: string) => {
    setConversations(conversations.filter((c) => c.id !== id));
    emit({ type: 'conversation.deleted', payload: { id }, timestamp: new Date() });
  }, [conversations, setConversations, emit]);

  const pin = useCallback((id: string) => {
    update(id, { pinned: !conversations.find((c) => c.id === id)?.pinned });
  }, [conversations, update]);

  const mute = useCallback((id: string) => {
    update(id, { muted: !conversations.find((c) => c.id === id)?.muted });
  }, [conversations, update]);

  const archive = useCallback((id: string) => {
    update(id, { archived: !conversations.find((c) => c.id === id)?.archived });
  }, [conversations, update]);

  return { conversations, activeConversation, setActive, create, update, remove, pin, mute, archive };
}
