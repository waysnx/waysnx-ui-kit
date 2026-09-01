import { useState, useCallback, useRef } from 'react';
import { useCommunication } from '../providers';
import type { CommunicationUser } from '../types';

export interface UseTypingReturn {
  typingUsers: CommunicationUser[];
  startTyping: () => void;
  stopTyping: () => void;
  setTypingUsers: (users: CommunicationUser[]) => void;
}

export function useTyping(conversationId?: string): UseTypingReturn {
  const { currentUser, emit, config } = useCommunication();
  const [typingUsers, setTypingUsers] = useState<CommunicationUser[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startTyping = useCallback(() => {
    emit({
      type: 'typing.started',
      payload: { user: currentUser, conversationId },
      timestamp: new Date(),
      userId: currentUser.id,
      conversationId,
    });

    // Auto-stop after timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      stopTyping();
    }, config.typingTimeout || 3000);
  }, [currentUser, conversationId, emit, config.typingTimeout]);

  const stopTyping = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    emit({
      type: 'typing.stopped',
      payload: { user: currentUser, conversationId },
      timestamp: new Date(),
      userId: currentUser.id,
      conversationId,
    });
  }, [currentUser, conversationId, emit]);

  return { typingUsers, startTyping, stopTyping, setTypingUsers };
}
