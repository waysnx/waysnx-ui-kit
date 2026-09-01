import { useCallback } from 'react';
import { useAccessibility } from './useAccessibility';
import type { AccessibilityProfile } from '../types';

export interface UseAccessibilityProfileReturn {
  currentProfile: AccessibilityProfile | null;
  profiles: AccessibilityProfile[];
  applyProfile: (profile: AccessibilityProfile) => void;
  applyProfileById: (id: string) => void;
  resetProfile: () => void;
  isActive: (profileId: string) => boolean;
}

/**
 * useAccessibilityProfile — read and apply accessibility profiles.
 *
 * @example
 * const { profiles, applyProfileById } = useAccessibilityProfile();
 * applyProfileById('low-vision');
 */
export function useAccessibilityProfile(): UseAccessibilityProfileReturn {
  const { currentProfile, profiles, applyProfile, resetToDefaults } = useAccessibility();

  const applyProfileById = useCallback(
    (id: string) => {
      const profile = profiles.find((p) => p.id === id);
      if (profile) applyProfile(profile);
    },
    [profiles, applyProfile]
  );

  const isActive = useCallback(
    (profileId: string) => currentProfile?.id === profileId,
    [currentProfile]
  );

  return {
    currentProfile,
    profiles,
    applyProfile,
    applyProfileById,
    resetProfile: resetToDefaults,
    isActive,
  };
}
