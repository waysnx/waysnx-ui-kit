import { useState, useCallback } from 'react';
import { useCommunication } from '../providers';
import type { Message, Attachment } from '../types';

export interface UseMessagesReturn {
  messages: Message[];
  loading: boolean;
  hasMore: boolean;
  sendMessage: (content: string, attachments?: Attachment[]) => void;
  editMessage: (id: string, content: string) => void;
  deleteMessage: (id: string) => void;
  reactToMessage: (id: string, emoji: string) => void;
  loadMore: () => void;
  setMessages: (messages: Message[]) => void;
}

export function useMessages(conversationId?: string): UseMessagesReturn {
  const { currentUser, emit } = useCommunication();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const sendMessage = useCallback((content: string, attachments?: Attachment[]) => {
    if (!content.trim() && (!attachments || attachments.length === 0)) return;

    const message: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      conversationId: conversationId || '',
      type: 'text',
      author: currentUser,
      content,
      attachments,
      reactions: [],
      mentions: [],
      status: 'sent',
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, message]);
    emit({ type: 'message.sent', payload: message, timestamp: new Date(), conversationId });
  }, [conversationId, currentUser, emit]);

  const editMessage = useCallback((id: string, content: string) => {
    setMessages((prev) =>
      prev.map((m) => m.id === id ? { ...m, content, edited: true, editedAt: new Date() } : m)
    );
    emit({ type: 'message.updated', payload: { id, content }, timestamp: new Date(), conversationId });
  }, [conversationId, emit]);

  const deleteMessage = useCallback((id: string) => {
    setMessages((prev) =>
      prev.map((m) => m.id === id ? { ...m, deletedAt: new Date() } : m)
    );
    emit({ type: 'message.deleted', payload: { id }, timestamp: new Date(), conversationId });
  }, [conversationId, emit]);

  const reactToMessage = useCallback((id: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        const reactions = [...(m.reactions || [])];
        const existing = reactions.find((r) => r.emoji === emoji);
        if (existing) {
          const hasReacted = existing.users.some((u) => u.id === currentUser.id);
          if (hasReacted) {
            existing.users = existing.users.filter((u) => u.id !== currentUser.id);
            existing.count--;
            if (existing.count === 0) {
              return { ...m, reactions: reactions.filter((r) => r.emoji !== emoji) };
            }
          } else {
            existing.users.push(currentUser);
            existing.count++;
          }
        } else {
          reactions.push({ emoji, users: [currentUser], count: 1 });
        }
        return { ...m, reactions };
      })
    );
    emit({ type: 'message.reacted', payload: { id, emoji }, timestamp: new Date(), conversationId });
  }, [conversationId, currentUser, emit]);

  const loadMore = useCallback(() => {
    setLoading(true);
    // Simulated — in real usage, the adapter fetches more
    setTimeout(() => {
      setLoading(false);
      setHasMore(false);
    }, 500);
  }, []);

  return { messages, loading, hasMore, sendMessage, editMessage, deleteMessage, reactToMessage, loadMore, setMessages };
}
