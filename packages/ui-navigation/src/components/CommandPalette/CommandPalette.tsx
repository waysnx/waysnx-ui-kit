/**
 * @file components/CommandPalette/CommandPalette.tsx
 * CommandPalette component for command search and execution
 */

import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  forwardRef,
  useMemo,
} from 'react';
import { useTranslation } from '@waysnx/ui-i18n';
import './command-palette.css';

/**
 * Command item configuration
 */
export interface Command {
  id: string;
  title: string;
  description?: string;
  category?: string;
  shortcut?: string;
  icon?: React.ReactNode;
  action: () => void | Promise<void>;
  metadata?: Record<string, any>;
  permissions?: string[];
  roles?: string[];
}

/**
 * CommandPalette component props
 */
export interface CommandPaletteProps {
  /**
   * List of available commands
   */
  commands: Command[];

  /**
   * Callback when command is selected
   */
  onCommandSelect?: (command: Command) => void;

  /**
   * Whether palette is open
   */
  isOpen?: boolean;

  /**
   * Callback when palette is opened
   */
  onOpen?: () => void;

  /**
   * Callback when palette is closed
   */
  onClose?: () => void;

  /**
   * Search input placeholder
   */
  searchPlaceholder?: string;

  /**
   * Number of recent commands to show
   */
  recentCount?: number;

  /**
   * Show keyboard shortcuts
   */
  showShortcuts?: boolean;

  /**
   * User permissions for filtering
   */
  permissions?: string[];

  /**
   * User roles for filtering
   */
  roles?: string[];

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Additional styles
   */
  style?: React.CSSProperties;

  /**
   * Keyboard shortcut to open (default: Ctrl+K or Cmd+K)
   */
  openShortcut?: string[];

  /**
   * Max results to display
   */
  maxResults?: number;

  /**
   * Accessible label
   */
  ariaLabel?: string;
}

/**
 * Fuzzy search filter function
 */
function fuzzySearch(query: string, text: string): boolean {
  const searchStr = query.toLowerCase();
  const targetStr = text.toLowerCase();

  let searchIdx = 0;
  let targetIdx = 0;

  while (searchIdx < searchStr.length && targetIdx < targetStr.length) {
    if (searchStr[searchIdx] === targetStr[targetIdx]) {
      searchIdx++;
    }
    targetIdx++;
  }

  return searchIdx === searchStr.length;
}

/**
 * Calculate fuzzy search score (higher is better match)
 */
function calculateFuzzyScore(query: string, text: string): number {
  const searchStr = query.toLowerCase();
  const targetStr = text.toLowerCase();

  if (!fuzzySearch(query, text)) return 0;

  // Exact match
  if (targetStr === searchStr) return 1000;

  // Starts with
  if (targetStr.startsWith(searchStr)) return 500;

  // Contains word boundary
  if (targetStr.includes(` ${searchStr}`)) return 300;

  // Contains as substring
  if (targetStr.includes(searchStr)) return 200;

  // Fuzzy match
  let searchIdx = 0;
  let consecutiveMatches = 0;
  let totalScore = 0;

  for (let i = 0; i < targetStr.length && searchIdx < searchStr.length; i++) {
    if (searchStr[searchIdx] === targetStr[i]) {
      consecutiveMatches++;
      totalScore += consecutiveMatches;
      searchIdx++;
    } else {
      consecutiveMatches = 0;
    }
  }

  return totalScore;
}

/**
 * CommandPalette Component
 *
 * Command search and execution interface with keyboard-first design.
 * Press Ctrl+K (or Cmd+K on Mac) to open.
 *
 * @example
 * ```tsx
 * <CommandPalette
 *   commands={commandList}
 *   onCommandSelect={handleCommand}
 *   isOpen={isPaletteOpen}
 * />
 * ```
 */
export const CommandPalette = forwardRef<HTMLDivElement, CommandPaletteProps>(
  (
    {
      commands,
      onCommandSelect,
      isOpen: controlledIsOpen,
      onOpen,
      onClose,
      searchPlaceholder = 'Search commands...',
      recentCount = 5,
      showShortcuts = true,
      permissions,
      roles,
      className = '',
      style,
      openShortcut = ['ctrl+k', 'meta+k'],
      maxResults = 10,
      ariaLabel = 'Command palette',
    },
    ref
  ) => {
    const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [recentCommands, setRecentCommands] = useState<Command[]>([]);
    const { t } = useTranslation();

    const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : uncontrolledIsOpen;
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    // Load recent commands from localStorage
    useEffect(() => {
      try {
        const stored = localStorage.getItem('commandPaletteRecent');
        if (stored) {
          const recentIds = JSON.parse(stored) as string[];
          const recentCmds = recentIds
            .map((id) => commands.find((c) => c.id === id))
            .filter((c): c is Command => c !== undefined)
            .slice(0, recentCount);
          setRecentCommands(recentCmds);
        }
      } catch {
        // Ignore localStorage errors
      }
    }, [commands, recentCount]);

    // Filter commands by permissions
    const filteredAvailableCommands = useMemo(() => {
      return commands.filter((cmd) => {
        if (cmd.permissions && !cmd.permissions.some((p) => permissions?.includes(p))) {
          return false;
        }
        if (cmd.roles && !cmd.roles.some((r) => roles?.includes(r))) {
          return false;
        }
        return true;
      });
    }, [commands, permissions, roles]);

    // Search and filter commands
    const searchResults = useMemo(() => {
      if (!searchQuery.trim()) {
        return recentCommands.length > 0
          ? recentCommands
          : filteredAvailableCommands.slice(0, maxResults);
      }

      return filteredAvailableCommands
        .filter((cmd) => fuzzySearch(searchQuery, cmd.title + (cmd.description || '')))
        .sort((a, b) => {
          const scoreA = calculateFuzzyScore(searchQuery, a.title);
          const scoreB = calculateFuzzyScore(searchQuery, b.title);
          return scoreB - scoreA;
        })
        .slice(0, maxResults);
    }, [searchQuery, filteredAvailableCommands, recentCommands, maxResults]);

    const handleOpen = useCallback(() => {
      if (!isOpen) {
        setUncontrolledIsOpen(true);
        onOpen?.();
      }
    }, [isOpen, onOpen]);

    const handleClose = useCallback(() => {
      if (isOpen) {
        setUncontrolledIsOpen(false);
        setSearchQuery('');
        setSelectedIndex(0);
        onClose?.();
      }
    }, [isOpen, onClose]);

    // Handle keyboard shortcut to open
    useEffect(() => {
      const handleGlobalKeyDown = (e: KeyboardEvent) => {
        // Only trigger on modifier+key combos (Ctrl+K / Cmd+K)
        if (!(e.ctrlKey || e.metaKey)) return;
        const key = e.key.toLowerCase();
        const matchesShortcut = openShortcut.some((shortcut) => {
          const parts = shortcut.split('+');
          const shortcutKey = parts[parts.length - 1];
          return key === shortcutKey;
        });
        if (matchesShortcut) {
          e.preventDefault();
          if (isOpen) {
            handleClose();
          } else {
            handleOpen();
          }
        }
      };

      document.addEventListener('keydown', handleGlobalKeyDown);
      return () => document.removeEventListener('keydown', handleGlobalKeyDown);
    }, [openShortcut, isOpen, handleOpen, handleClose]);

    const handleSelectCommand = useCallback(
      (command: Command) => {
        command.action();
        onCommandSelect?.(command);

        // Save to recent
        const newRecent = [
          command,
          ...recentCommands.filter((c) => c.id !== command.id),
        ].slice(0, recentCount);
        setRecentCommands(newRecent);
        try {
          localStorage.setItem('commandPaletteRecent', JSON.stringify(newRecent.map((c) => c.id)));
        } catch {
          // Ignore localStorage errors
        }

        handleClose();
      },
      [recentCommands, recentCount, handleClose, onCommandSelect]
    );

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            setSelectedIndex((i) => (i + 1) % searchResults.length);
            break;
          case 'ArrowUp':
            e.preventDefault();
            setSelectedIndex((i) => (i - 1 + searchResults.length) % searchResults.length);
            break;
          case 'Enter':
            e.preventDefault();
            if (searchResults[selectedIndex]) {
              handleSelectCommand(searchResults[selectedIndex]);
            }
            break;
          case 'Escape':
            e.preventDefault();
            handleClose();
            break;
          default:
            break;
        }
      },
      [searchResults, selectedIndex, handleSelectCommand, handleClose]
    );

    // Focus selected item
    useEffect(() => {
      if (isOpen && listRef.current && searchResults.length > 0) {
        const items = listRef.current.querySelectorAll('[role="option"]');
        if (items[selectedIndex]) {
          items[selectedIndex].scrollIntoView({ block: 'nearest' });
        }
      }
    }, [selectedIndex, isOpen, searchResults]);

    // Focus input when opened
    useEffect(() => {
      if (isOpen) {
        inputRef.current?.focus();
      }
    }, [isOpen]);

    // Handle outside click
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (isOpen && containerRef.current && !containerRef.current.contains(e.target as Node)) {
          handleClose();
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen, handleClose]);

    if (!isOpen) {
      return null;
    }

    return (
      <div
        ref={ref || containerRef}
        className={`command-palette nav-component ${className}`}
        style={style}
        role="presentation"
      >
        {/* Backdrop */}
        <div className="command-palette__backdrop" onClick={handleClose} role="presentation" />

        {/* Modal */}
        <div className="command-palette__modal">
          {/* Search Input */}
          <div className="command-palette__search">
            <div className="command-palette__search-inner">
              <svg className="command-palette__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                className="command-palette__input"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                aria-label={ariaLabel}
                role="combobox"
                aria-expanded={isOpen}
                aria-autocomplete="list"
                aria-controls="command-palette-results"
              />
              <kbd className="command-palette__esc-badge" onClick={handleClose}>ESC</kbd>
            </div>
          </div>

          {/* Results */}
          {searchResults.length > 0 ? (
            <ul
              id="command-palette-results"
              ref={listRef}
              className="command-palette__results"
              role="listbox"
            >
              {(() => {
                // Group results by category
                const grouped: { category: string; items: typeof searchResults }[] = [];
                let flatIndex = 0;
                const indexMap: number[] = [];

                searchResults.forEach((command) => {
                  const cat = command.category || '';
                  let group = grouped.find((g) => g.category === cat);
                  if (!group) {
                    group = { category: cat, items: [] };
                    grouped.push(group);
                  }
                  group.items.push(command);
                  indexMap.push(flatIndex);
                  flatIndex++;
                });

                return grouped.map((group) => (
                  <li key={group.category || '__uncategorized'} className="command-palette__group" role="presentation">
                    {group.category && (
                      <div className="command-palette__category-header" role="presentation">
                        {group.category}
                      </div>
                    )}
                    <ul className="command-palette__group-items" role="group" aria-label={group.category || 'Commands'}>
                      {group.items.map((command) => {
                        const index = searchResults.indexOf(command);
                        return (
                          <li
                            key={command.id}
                            className={`command-palette__item ${
                              index === selectedIndex ? 'command-palette__item--selected' : ''
                            }`}
                            role="option"
                            aria-selected={index === selectedIndex}
                            onClick={() => handleSelectCommand(command)}
                            onMouseEnter={() => setSelectedIndex(index)}
                          >
                            {command.icon && <span className="command-palette__icon">{command.icon}</span>}
                            <div className="command-palette__content">
                              <div className="command-palette__title">{command.title}</div>
                              {command.description && (
                                <div className="command-palette__description">{command.description}</div>
                              )}
                            </div>
                            {showShortcuts && command.shortcut && (
                              <kbd className="command-palette__shortcut">{command.shortcut}</kbd>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ));
              })()}
            </ul>
          ) : (
            <div className="command-palette__empty">
              <p>{t('navigation.noCommands')}</p>
            </div>
          )}

          {/* Footer */}
          <div className="command-palette__footer">
            <span className="command-palette__count">
              {searchResults.length} of {filteredAvailableCommands.length}
            </span>
            <span className="command-palette__help">
              <kbd className="command-palette__hint-key">↑↓</kbd> navigate
              <kbd className="command-palette__hint-key">↵</kbd> select
              <kbd className="command-palette__hint-key">esc</kbd> close
            </span>
          </div>
        </div>
      </div>
    );
  }
);

CommandPalette.displayName = 'CommandPalette';

export default CommandPalette;
