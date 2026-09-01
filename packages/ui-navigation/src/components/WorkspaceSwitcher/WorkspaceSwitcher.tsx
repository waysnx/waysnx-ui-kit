/**
 * @file components/WorkspaceSwitcher/WorkspaceSwitcher.tsx
 * WorkspaceSwitcher component for switching between workspaces
 */

import React, { forwardRef, useRef, useEffect, useState } from 'react';
import type { Workspace } from '../../types';
import './workspace-switcher.css';

/**
 * WorkspaceSwitcher component props
 */
export interface WorkspaceSwitcherProps {
  /**
   * List of available workspaces
   */
  workspaces: Workspace[];

  /**
   * Currently active workspace
   */
  activeWorkspace?: Workspace;

  /**
   * Callback when workspace is selected
   */
  onWorkspaceChange?: (workspace: Workspace) => void;

  /**
   * Display variant
   */
  variant?: 'dropdown' | 'pills' | 'minimal';

  /**
   * Size of the switcher
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Show workspace icons
   */
  showIcons?: boolean;

  /**
   * Show workspace descriptions
   */
  showDescriptions?: boolean;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Additional styles
   */
  style?: React.CSSProperties;

  /**
   * Enable keyboard navigation
   */
  enableKeyboardNav?: boolean;

  /**
   * aria-label for accessibility
   */
  ariaLabel?: string;

  /**
   * Test ID for testing
   */
  testId?: string;
}

/**
 * WorkspaceSwitcher Component
 *
 * Provides a UI control for switching between different workspaces.
 * Supports multiple display variants (dropdown, pills, minimal) and 
 * integrates with the workspace management system.
 *
 * @example
 * ```tsx
 * import { useWorkspace } from '../../hooks/useWorkspace';
 * import { WorkspaceSwitcher } from './WorkspaceSwitcher';
 *
 * function App() {
 *   const { workspaces, activeWorkspace, setActiveWorkspace } = useWorkspace();
 *
 *   return (
 *     <WorkspaceSwitcher
 *       workspaces={workspaces}
 *       activeWorkspace={activeWorkspace}
 *       onWorkspaceChange={setActiveWorkspace}
 *       variant="dropdown"
 *     />
 *   );
 * }
 * ```
 */
export const WorkspaceSwitcher = forwardRef<HTMLDivElement, WorkspaceSwitcherProps>(
  (
    {
      workspaces,
      activeWorkspace,
      onWorkspaceChange,
      variant = 'dropdown',
      size = 'md',
      showIcons = true,
      showDescriptions = false,
      className = '',
      style,
      enableKeyboardNav = true,
      ariaLabel = 'Switch workspace',
      testId,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Handle click outside to close dropdown
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    // Handle keyboard navigation
    useEffect(() => {
      if (!enableKeyboardNav || !isOpen) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
          triggerRef.current?.focus();
          return;
        }

        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [enableKeyboardNav, isOpen]);

    const handleWorkspaceSelect = (workspace: Workspace) => {
      onWorkspaceChange?.(workspace);
      setIsOpen(false);
    };

    const variantClass = `wx-workspace-switcher--${variant}`;
    const sizeClass = `wx-workspace-switcher--${size}`;
    const combinedClassName = `wx-workspace-switcher ${variantClass} ${sizeClass} ${className}`.trim();

    // Render dropdown variant
    if (variant === 'dropdown') {
      return (
        <div
          ref={(node) => {
            containerRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          className={combinedClassName}
          style={style}
          data-testid={testId}
        >
          <button
            ref={triggerRef}
            className="wx-workspace-switcher__trigger"
            onClick={() => setIsOpen(!isOpen)}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-label={ariaLabel}
          >
            <div className="wx-workspace-switcher__trigger-content">
              {showIcons && activeWorkspace?.icon && (
                <span className="wx-workspace-switcher__trigger-icon">
                  {activeWorkspace.icon}
                </span>
              )}
              <span className="wx-workspace-switcher__trigger-name">
                {activeWorkspace?.name || 'Select workspace'}
              </span>
            </div>
            <span className="wx-workspace-switcher__trigger-chevron" aria-hidden="true">
              ▼
            </span>
          </button>

          {isOpen && (
            <div
              ref={menuRef}
              className="wx-workspace-switcher__menu"
              role="listbox"
            >
              {workspaces.map((workspace) => (
                <button
                  key={workspace.id}
                  className="wx-workspace-switcher__menu-item"
                  onClick={() => handleWorkspaceSelect(workspace)}
                  role="option"
                  aria-selected={activeWorkspace?.id === workspace.id}
                  data-testid={`workspace-option-${workspace.id}`}
                >
                  <div className="wx-workspace-switcher__menu-item-content">
                    {showIcons && workspace.icon && (
                      <span className="wx-workspace-switcher__menu-icon">
                        {workspace.icon}
                      </span>
                    )}
                    <div className="wx-workspace-switcher__menu-text">
                      <div className="wx-workspace-switcher__menu-name">
                        {workspace.name}
                      </div>
                      {showDescriptions && workspace.description && (
                        <div className="wx-workspace-switcher__menu-description">
                          {workspace.description}
                        </div>
                      )}
                    </div>
                  </div>
                  {activeWorkspace?.id === workspace.id && (
                    <span
                      className="wx-workspace-switcher__menu-checkmark"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Render pills variant
    if (variant === 'pills') {
      return (
        <div
          ref={(node) => {
            containerRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          className={combinedClassName}
          style={style}
          data-testid={testId}
          role="group"
          aria-label={ariaLabel}
        >
          {workspaces.map((workspace) => (
            <button
              key={workspace.id}
              className={`wx-workspace-switcher__pill ${
                activeWorkspace?.id === workspace.id
                  ? 'wx-workspace-switcher__pill--active'
                  : ''
              }`}
              onClick={() => handleWorkspaceSelect(workspace)}
              aria-pressed={activeWorkspace?.id === workspace.id}
              data-testid={`workspace-pill-${workspace.id}`}
            >
              {showIcons && workspace.icon && (
                <span className="wx-workspace-switcher__pill-icon">
                  {workspace.icon}
                </span>
              )}
              <span className="wx-workspace-switcher__pill-name">
                {workspace.name}
              </span>
            </button>
          ))}
        </div>
      );
    }

    // Render minimal variant (simple list)
    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={combinedClassName}
        style={style}
        data-testid={testId}
        role="group"
        aria-label={ariaLabel}
      >
        {workspaces.map((workspace) => (
          <button
            key={workspace.id}
            className={`wx-workspace-switcher__item ${
              activeWorkspace?.id === workspace.id
                ? 'wx-workspace-switcher__item--active'
                : ''
            }`}
            onClick={() => handleWorkspaceSelect(workspace)}
            aria-pressed={activeWorkspace?.id === workspace.id}
            data-testid={`workspace-item-${workspace.id}`}
          >
            {showIcons && workspace.icon && (
              <span className="wx-workspace-switcher__item-icon">
                {workspace.icon}
              </span>
            )}
            <span className="wx-workspace-switcher__item-name">
              {workspace.name}
            </span>
          </button>
        ))}
      </div>
    );
  }
);

WorkspaceSwitcher.displayName = 'WorkspaceSwitcher';
