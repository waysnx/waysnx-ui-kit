import { AccessibilitySettings } from '../types';
import { STORAGE_KEYS } from './constants';

/**
 * Load settings from localStorage
 */
export function loadSettings(storageKey: string = STORAGE_KEYS.SETTINGS): AccessibilitySettings | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(storageKey);
    if (!stored) return null;
    return JSON.parse(stored) as AccessibilitySettings;
  } catch (error) {
    console.error('Failed to load accessibility settings:', error);
    return null;
  }
}

/**
 * Save settings to localStorage
 */
export function saveSettings(
  settings: AccessibilitySettings,
  storageKey: string = STORAGE_KEYS.SETTINGS
): boolean {
  if (typeof window === 'undefined') return false;

  try {
    localStorage.setItem(storageKey, JSON.stringify(settings));
    return true;
  } catch (error) {
    console.error('Failed to save accessibility settings:', error);
    return false;
  }
}

/**
 * Clear settings from localStorage
 */
export function clearSettings(storageKey: string = STORAGE_KEYS.SETTINGS): boolean {
  if (typeof window === 'undefined') return false;

  try {
    localStorage.removeItem(storageKey);
    return true;
  } catch (error) {
    console.error('Failed to clear accessibility settings:', error);
    return false;
  }
}

/**
 * Generate or load session ID
 */
export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return '';

  try {
    let sessionId = sessionStorage.getItem(STORAGE_KEYS.SESSION_ID);
    if (!sessionId) {
      sessionId = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      sessionStorage.setItem(STORAGE_KEYS.SESSION_ID, sessionId);
    }
    return sessionId;
  } catch (error) {
    console.error('Failed to get session ID:', error);
    return '';
  }
}
