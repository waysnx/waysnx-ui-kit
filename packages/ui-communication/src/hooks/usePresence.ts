import { useState, useCallback } from 'react';
import { useCommunication } from '../providers';
import type { PresenceStatus, PresenceInfo } from '../types';

export interface UsePresenceReturn {
  myStatus: PresenceStatus;
  setMyStatus: (status: PresenceStatus) => void;
  getPresence: (userId: string) => PresenceInfo | undefined;
  presenceMap: Map<string, PresenceInfo>;
  setPresenceMap: (map: Map<string, PresenceInfo>) => void;
}

export function usePresence(): UsePresenceReturn {
  const { currentUser, emit, presence } = useCommunication();
  const [myStatus, setMyStatusState] = useState<PresenceStatus>(currentUser.status || 'online');

  const setMyStatus = useCallback((status: PresenceStatus) => {
    setMyStatusState(status);
    emit({
      type: 'presence.changed',
      payload: { userId: currentUser.id, status, lastSeen: new Date() },
      timestamp: new Date(),
      userId: currentUser.id,
    });
  }, [currentUser.id, emit]);

  const getPresence = useCallback((userId: string) => {
    return presence.get(userId);
  }, [presence]);

  const setPresenceMap = useCallback((_map: Map<string, PresenceInfo>) => {
    // In real usage, adapter would update this
  }, []);

  return { myStatus, setMyStatus, getPresence, presenceMap: presence, setPresenceMap };
}
