import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  AccessibilitySettings,
  AccessibilityProfile,
  AccessibilityProviderProps,
  AccessibilityEvent,
} from '../types';
import { AccessibilityContext } from './AccessibilityContext';
import { 
  DEFAULT_SETTINGS, 
  PRESET_PROFILES, 
  CSS_VARIABLE_MAP,
  PROFILE_LOW_VISION,
  PROFILE_DYSLEXIA,
  PROFILE_ADHD,
  PROFILE_MOTOR_DISABILITIES,
  PROFILE_BLIND,
  PROFILE_DEUTERANOPIA,
  PROFILE_PROTANOPIA,
  PROFILE_TRITANOPIA,
  PROFILE_ELDERLY,
  PROFILE_SEIZURE_SAFE,
} from '../utils/constants';
import { loadSettings, saveSettings, getOrCreateSessionId } from '../utils/storage';
import { updateCSSVariables, clearCSSVariables } from '../utils/cssVariables';

/**
 * AccessibilityProvider Component
 * Provides accessibility context to all child components
 */
export function AccessibilityProvider({
  children,
  defaultSettings,
  storageKey = 'waysnx-accessibility-settings',
  onSettingsChange,
  onEvent,
  customProfiles = [],
  persistSettings = true,
}: AccessibilityProviderProps) {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    // Try to load from storage first
    if (persistSettings) {
      const stored = loadSettings(storageKey);
      if (stored) return stored;
    }

    // Use provided defaults
    if (defaultSettings) {
      return { ...DEFAULT_SETTINGS, ...defaultSettings };
    }

    return DEFAULT_SETTINGS;
  });

  const [currentProfile, setCurrentProfile] = useState<AccessibilityProfile | null>(null);

  // All available profiles (presets + custom)
  const allProfiles = useMemo(() => [...PRESET_PROFILES, ...customProfiles], [customProfiles]);

  // Update CSS variables whenever settings change
  useEffect(() => {
    updateCSSVariables(settings);
  }, [settings]);

  // Call onSettingsChange callback
  useEffect(() => {
    onSettingsChange?.(settings);
  }, [settings, onSettingsChange]);

  /**
   * Update a single setting
   */
  const updateSetting = useCallback(
    (key: keyof AccessibilitySettings, value: AccessibilitySettings[keyof AccessibilitySettings]) => {
      setSettings((prev) => {
        const updated = { ...prev, [key]: value };

        // Persist to storage
        if (persistSettings) {
          saveSettings(updated, storageKey);
        }

        // Emit analytics event
        if (onEvent) {
          const event: Omit<AccessibilityEvent, 'timestamp'> = {
            eventType: 'setting_changed',
            setting: key,
            previousValue: prev[key],
            newValue: value,
            sessionId: getOrCreateSessionId(),
          };
          onEvent({
            ...event,
            timestamp: Date.now(),
          });
        }

        return updated;
      });

      // Clear current profile since settings changed manually
      setCurrentProfile(null);
    },
    [persistSettings, storageKey, onEvent]
  );

  /**
   * Update multiple settings at once
   */
  const updateSettings = useCallback(
    (updates: Partial<AccessibilitySettings>) => {
      setSettings((prev) => {
        const updated = { ...prev, ...updates };

        // Persist to storage
        if (persistSettings) {
          saveSettings(updated, storageKey);
        }

        // Emit analytics event for each changed setting
        if (onEvent) {
          Object.entries(updates).forEach(([key, value]) => {
            const event: Omit<AccessibilityEvent, 'timestamp'> = {
              eventType: 'setting_changed',
              setting: key as keyof AccessibilitySettings,
              previousValue: prev[key as keyof AccessibilitySettings],
              newValue: value,
              sessionId: getOrCreateSessionId(),
            };
            onEvent({
              ...event,
              timestamp: Date.now(),
            });
          });
        }

        return updated;
      });

      setCurrentProfile(null);
    },
    [persistSettings, storageKey, onEvent]
  );

  /**
   * Apply a preset profile
   */
  const applyProfile = useCallback(
    (profile: AccessibilityProfile) => {
      updateSettings(profile.settings);
      setCurrentProfile(profile);

      // Emit analytics event
      if (onEvent) {
        const event: Omit<AccessibilityEvent, 'timestamp'> = {
          eventType: 'profile_changed',
          profile: profile.id,
          newValue: profile.name,
          sessionId: getOrCreateSessionId(),
        };
        onEvent({
          ...event,
          timestamp: Date.now(),
        });
      }
    },
    [updateSettings, onEvent]
  );

  /**
   * Reset to default settings
   */
  const resetToDefaults = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    setCurrentProfile(null);

    if (persistSettings) {
      saveSettings(DEFAULT_SETTINGS, storageKey);
    }

    clearCSSVariables();

    // Emit analytics event
    if (onEvent) {
      const event: Omit<AccessibilityEvent, 'timestamp'> = {
        eventType: 'profile_changed',
        newValue: 'default',
        sessionId: getOrCreateSessionId(),
      };
      onEvent({
        ...event,
        timestamp: Date.now(),
      });
    }
  }, [persistSettings, storageKey, onEvent]);

  /**
   * Get CSS variable for a setting
   */
  const getCSSVariable = useCallback(
    (setting: keyof AccessibilitySettings): string => {
      return CSS_VARIABLE_MAP[setting] || '';
    },
    []
  );

  /**
   * Check if a feature is enabled
   */
  const isEnabled = useCallback(
    (feature: keyof AccessibilitySettings): boolean => {
      const value = settings[feature];
      if (typeof value === 'boolean') return value;
      return value !== 'none' && value !== 'normal' && value !== 'default';
    },
    [settings]
  );

  /**
   * Emit an analytics event
   */
  const emitEvent = useCallback(
    (eventData: Omit<AccessibilityEvent, 'timestamp'>) => {
      if (onEvent) {
        onEvent({
          ...eventData,
          timestamp: Date.now(),
          sessionId: eventData.sessionId || getOrCreateSessionId(),
        });
      }
    },
    [onEvent]
  );

  const value = useMemo(
    () => ({
      settings,
      currentProfile,
      profiles: allProfiles,
      updateSetting,
      updateSettings,
      applyProfile,
      resetToDefaults,
      getCSSVariable,
      isEnabled,
      emitEvent,
    }),
    [settings, currentProfile, allProfiles, updateSetting, updateSettings, applyProfile, resetToDefaults, getCSSVariable, isEnabled, emitEvent]
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}
