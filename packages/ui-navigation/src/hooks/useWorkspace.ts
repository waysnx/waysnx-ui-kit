/**
 * @file hooks/useWorkspace.ts
 * Hook for managing workspace switching
 */

import { useState, useCallback } from 'react';
import type { Workspace } from '../types';
import { getActiveWorkspace, saveActiveWorkspace } from '../utils/storage.utils';

interface UseWorkspaceReturn {
  workspaces: Workspace[];
  activeWorkspace?: Workspace;
  setWorkspaces: (workspaces: Workspace[]) => void;
  setActiveWorkspace: (workspace: Workspace) => void;
  addWorkspace: (workspace: Workspace) => void;
  removeWorkspace: (id: string) => void;
}

/**
 * Hook to manage workspace state
 *
 * @param initialWorkspaces - Initial workspaces
 * @returns Workspace state and operations
 *
 * @example
 * ```tsx
 * const { workspaces, activeWorkspace, setActiveWorkspace } = useWorkspace(workspaces);
 * ```
 */
export function useWorkspace(initialWorkspaces: Workspace[] = []): UseWorkspaceReturn {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(initialWorkspaces);
  const [activeWorkspace, setActiveWorkspaceState] = useState<Workspace | undefined>(
    getActiveWorkspace() || undefined
  );

  const setActiveWorkspace = useCallback((workspace: Workspace) => {
    setActiveWorkspaceState(workspace);
    saveActiveWorkspace(workspace);
  }, []);

  const addWorkspace = useCallback((workspace: Workspace) => {
    setWorkspaces((prev) => [...prev, workspace]);
  }, []);

  const removeWorkspace = useCallback((id: string) => {
    setWorkspaces((prev) => prev.filter((ws) => ws.id !== id));
    if (activeWorkspace?.id === id) {
      setActiveWorkspaceState(undefined);
    }
  }, [activeWorkspace]);

  return {
    workspaces,
    activeWorkspace,
    setWorkspaces,
    setActiveWorkspace,
    addWorkspace,
    removeWorkspace,
  };
}
