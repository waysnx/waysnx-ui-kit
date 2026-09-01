/**
 * @file hooks/useCommandPalette.ts
 * Hook for managing command palette state
 */

import { useState, useCallback } from 'react';
import type { CommandItem } from '../types';

interface UseCommandPaletteReturn {
  isOpen: boolean;
  searchQuery: string;
  commands: CommandItem[];
  filteredCommands: CommandItem[];
  open: () => void;
  close: () => void;
  toggle: () => void;
  setSearchQuery: (query: string) => void;
  setCommands: (commands: CommandItem[]) => void;
  executeCommand: (id: string) => Promise<void>;
}

/**
 * Hook to manage command palette state
 *
 * @param initialCommands - Initial commands
 * @returns Command palette state and operations
 *
 * @example
 * ```tsx
 * const { isOpen, toggle, filteredCommands } = useCommandPalette(commands);
 * ```
 */
export function useCommandPalette(
  initialCommands: CommandItem[] = []
): UseCommandPaletteReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [commands, setCommands] = useState<CommandItem[]>(initialCommands);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setSearchQuery('');
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const filteredCommands = searchQuery
    ? commands.filter(
        (cmd) =>
          cmd.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cmd.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cmd.category?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : commands;

  const executeCommand = useCallback(
    async (id: string) => {
      const command = commands.find((cmd) => cmd.id === id);
      if (command) {
        await command.action();
        close();
      }
    },
    [commands, close]
  );

  return {
    isOpen,
    searchQuery,
    commands,
    filteredCommands,
    open,
    close,
    toggle,
    setSearchQuery,
    setCommands,
    executeCommand,
  };
}
