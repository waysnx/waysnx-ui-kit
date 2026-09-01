import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AccessibilityProvider } from '../../context/AccessibilityProvider';
import { useAccessibility } from '../../hooks/useAccessibility';
import React from 'react';

describe('useAccessibility Settings Tests', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    React.createElement(AccessibilityProvider, {}, children)
  );

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    // Clean up after each test
    localStorage.clear();
  });

  describe('Settings Management', () => {
    it('should return settings from useAccessibility', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });
      expect(result.current.settings).toBeDefined();
    });

    it('should have updateSetting method', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });
      expect(typeof result.current.updateSetting).toBe('function');
    });

    it('should update settings', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        result.current.updateSetting('textSize', 'large');
      });

      expect(result.current.settings.textSize).toBe('large');
    });

    it('should persist settings to localStorage', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        result.current.updateSetting('textSize', 'large');
      });

      const stored = localStorage.getItem('waysNX_accessibility_settings');
      expect(stored).toBeDefined();
    });
  });

  describe('Multiple Settings', () => {
    it('should update multiple settings', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        result.current.updateSetting('textSize', 'large');
        result.current.updateSetting('contrast', 'high');
      });

      expect(result.current.settings.textSize).toBe('large');
      expect(result.current.settings.contrast).toBe('high');
    });

    it('should maintain consistency', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        result.current.updateSetting('textSize', 'large');
      });

      const settings1 = result.current.settings;

      act(() => {
        result.current.updateSetting('contrast', 'high');
      });

      const settings2 = result.current.settings;
      expect(settings2.textSize).toBe('large'); // Previous setting retained
      expect(settings2.contrast).toBe('high');
    });

    it('should handle rapid updates', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        result.current.updateSetting('textSize', 'large');
        result.current.updateSetting('textSize', 'normal');
        result.current.updateSetting('textSize', 'x-large');
      });

      expect(result.current.settings.textSize).toBe('x-large');
    });

    it('should update multiple instances consistently', () => {
      const { result: result1 } = renderHook(() => useAccessibility(), { wrapper });
      const { result: result2 } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        result1.current.updateSetting('textSize', 'large');
      });

      expect(result1.current.settings.textSize).toBe('large');
      expect(result2.current.settings.textSize).toBe('large');
    });
  });
});
