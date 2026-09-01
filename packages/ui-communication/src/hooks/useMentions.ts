import { useState, useCallback } from 'react';
import type { CommunicationUser } from '../types';

export interface UseMentionsReturn {
  query: string;
  suggestions: CommunicationUser[];
  isOpen: boolean;
  search: (query: string, users: CommunicationUser[]) => void;
  select: (user: CommunicationUser) => void;
  close: () => void;
}

export function useMentions(): UseMentionsReturn {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<CommunicationUser[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const search = useCallback((q: string, users: CommunicationUser[]) => {
    setQuery(q);
    if (q.length > 0) {
      const filtered = users.filter((u) =>
        u.name.toLowerCase().includes(q.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 10));
      setIsOpen(filtered.length > 0);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, []);

  const select = useCallback((_user: CommunicationUser) => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setSuggestions([]);
  }, []);

  return { query, suggestions, isOpen, search, select, close };
}
