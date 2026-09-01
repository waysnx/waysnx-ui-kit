import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import {
  loadSettings,
  saveSettings,
  clearSettings,
  getOrCreateSessionId,
} from '../../utils/storage';
import { AccessibilitySettings } from '../../types';

describe('Storage Utility Functions', () => {
  const mockSettings: AccessibilitySettings = {
    textSize: 'large',
    textSpacing: 'loose',
    font: 'dyslexiaFriendly',
    contrast: 'high',
    colorFilters: 'none',
    focusMode: 'standard',
    readingGuide: false,
    highlightLinks: true,
    reducedMotion: false,
    screenReaderOptimization: true,
    keyboardShortcuts: true,
    customProfile: null,
  };

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  describe('saveSettings()', () => {
    it('should save settings to localStorage', () => {
      const result = saveSettings(mockSettings);
      expect(result).toBe(true);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        expect.any(String),
        JSON.stringify(mockSettings)
      );
    });

    it('should save with custom storage key', () => {
      const customKey = 'custom-settings';
      const result = saveSettings(mockSettings, customKey);
      expect(result).toBe(true);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        customKey,
        JSON.stringify(mockSettings)
      );
    });

    it('should handle JSON stringify error gracefully', () => {
      // Create a circular reference to trigger stringify error
      const circularSettings = { ...mockSettings } as any;
      circularSettings.self = circularSettings;

      const result = saveSettings(circularSettings);
      expect(result).toBe(false);
    });

    it('should handle localStorage.setItem errors', () => {
      vi.mocked(localStorage.setItem).mockImplementation(() => {
        throw new Error('QuotaExceededError');
      });

      const result = saveSettings(mockSettings);
      expect(result).toBe(false);
    });

    it('should return false when window is undefined', () => {
      const originalWindow = global.window;
      // @ts-ignore
      global.window = undefined;

      const result = saveSettings(mockSettings);
      expect(result).toBe(false);

      global.window = originalWindow;
    });
  });

  describe('loadSettings()', () => {
    it('should load settings from localStorage', () => {
      localStorage.setItem('settings', JSON.stringify(mockSettings));

      const result = loadSettings('settings');
      expect(result).toEqual(mockSettings);
    });

    it('should load with default storage key', () => {
      const defaultKey = 'accessibility-settings';
      localStorage.setItem(defaultKey, JSON.stringify(mockSettings));

      const result = loadSettings(defaultKey);
      expect(result).toEqual(mockSettings);
    });

    it('should return null if settings not found', () => {
      const result = loadSettings('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle invalid JSON gracefully', () => {
      localStorage.setItem('settings', 'invalid json {');

      const result = loadSettings('settings');
      expect(result).toBeNull();
    });

    it('should handle localStorage.getItem errors', () => {
      vi.mocked(localStorage.getItem).mockImplementation(() => {
        throw new Error('Access denied');
      });

      const result = loadSettings('settings');
      expect(result).toBeNull();
    });

    it('should return null when window is undefined', () => {
      const originalWindow = global.window;
      // @ts-ignore
      global.window = undefined;

      const result = loadSettings('settings');
      expect(result).toBeNull();

      global.window = originalWindow;
    });
  });

  describe('clearSettings()', () => {
    it('should remove settings from localStorage', () => {
      localStorage.setItem('settings', JSON.stringify(mockSettings));

      const result = clearSettings('settings');
      expect(result).toBe(true);
      expect(localStorage.removeItem).toHaveBeenCalledWith('settings');
    });

    it('should clear with default storage key', () => {
      const defaultKey = 'accessibility-settings';
      localStorage.setItem(defaultKey, JSON.stringify(mockSettings));

      const result = clearSettings(defaultKey);
      expect(result).toBe(true);
      expect(localStorage.removeItem).toHaveBeenCalledWith(defaultKey);
    });

    it('should return true even if key does not exist', () => {
      const result = clearSettings('nonexistent');
      expect(result).toBe(true);
      expect(localStorage.removeItem).toHaveBeenCalledWith('nonexistent');
    });

    it('should handle localStorage.removeItem errors', () => {
      vi.mocked(localStorage.removeItem).mockImplementation(() => {
        throw new Error('Access denied');
      });

      const result = clearSettings('settings');
      expect(result).toBe(false);
    });

    it('should return false when window is undefined', () => {
      const originalWindow = global.window;
      // @ts-ignore
      global.window = undefined;

      const result = clearSettings('settings');
      expect(result).toBe(false);

      global.window = originalWindow;
    });
  });

  describe('getOrCreateSessionId()', () => {
    it('should create a new session ID if none exists', () => {
      const sessionId = getOrCreateSessionId();

      expect(sessionId).toBeTruthy();
      expect(sessionId).toMatch(/^session-\d+-[a-z0-9]+$/);
      expect(sessionStorage.setItem).toHaveBeenCalledWith(
        expect.any(String),
        sessionId
      );
    });

    it('should return existing session ID if already created', () => {
      const firstCall = getOrCreateSessionId();
      const secondCall = getOrCreateSessionId();

      expect(firstCall).toBe(secondCall);
      expect(sessionStorage.getItem).toHaveBeenCalledTimes(2);
    });

    it('should use unique session IDs for different sessions', () => {
      const sessionId1 = getOrCreateSessionId();

      // Simulate new session by clearing
      sessionStorage.clear();

      const sessionId2 = getOrCreateSessionId();

      expect(sessionId1).not.toBe(sessionId2);
    });

    it('should handle sessionStorage.getItem errors', () => {
      vi.mocked(sessionStorage.getItem).mockImplementation(() => {
        throw new Error('Access denied');
      });

      const result = getOrCreateSessionId();
      expect(result).toBe('');
    });

    it('should handle sessionStorage.setItem errors', () => {
      vi.mocked(sessionStorage.getItem).mockReturnValue(null);
      vi.mocked(sessionStorage.setItem).mockImplementation(() => {
        throw new Error('QuotaExceededError');
      });

      const result = getOrCreateSessionId();
      expect(result).toBe('');
    });

    it('should return empty string when window is undefined', () => {
      const originalWindow = global.window;
      // @ts-ignore
      global.window = undefined;

      const result = getOrCreateSessionId();
      expect(result).toBe('');

      global.window = originalWindow;
    });

    it('should include timestamp in session ID', () => {
      const beforeTime = Date.now();
      const sessionId = getOrCreateSessionId();
      const afterTime = Date.now();

      // Extract timestamp from session ID (format: session-TIMESTAMP-RANDOM)
      const timestampMatch = sessionId.match(/^session-(\d+)-/);
      expect(timestampMatch).toBeTruthy();

      if (timestampMatch) {
        const timestamp = parseInt(timestampMatch[1], 10);
        expect(timestamp).toBeGreaterThanOrEqual(beforeTime);
        expect(timestamp).toBeLessThanOrEqual(afterTime);
      }
    });
  });

  describe('Integration Tests', () => {
    it('should save and load settings correctly', () => {
      saveSettings(mockSettings);
      const loaded = loadSettings();

      expect(loaded).toEqual(mockSettings);
    });

    it('should clear settings and return null on load', () => {
      saveSettings(mockSettings);
      clearSettings();

      const loaded = loadSettings();
      expect(loaded).toBeNull();
    });

    it('should handle multiple save operations', () => {
      const settings1 = { ...mockSettings, textSize: 'normal' as const };
      const settings2 = { ...mockSettings, textSize: 'large' as const };

      saveSettings(settings1);
      let loaded = loadSettings();
      expect(loaded?.textSize).toBe('normal');

      saveSettings(settings2);
      loaded = loadSettings();
      expect(loaded?.textSize).toBe('large');
    });

    it('should maintain session ID across multiple calls', () => {
      const id1 = getOrCreateSessionId();
      const id2 = getOrCreateSessionId();
      const id3 = getOrCreateSessionId();

      expect(id1).toBe(id2);
      expect(id2).toBe(id3);
    });
  });
});
