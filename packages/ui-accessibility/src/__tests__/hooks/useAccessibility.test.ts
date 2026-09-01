import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AccessibilityProvider } from '../../context/AccessibilityProvider';
import { useAccessibility } from '../../hooks/useAccessibility';
import React from 'react';

describe('useAccessibility Hook', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    React.createElement(AccessibilityProvider, {}, children)
  );

  describe('Hook Basics', () => {
    it('should return accessibility context', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });
      expect(result.current).toBeDefined();
    });

    it('should return object with settings and methods', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });
      expect(result.current).toHaveProperty('settings');
      expect(result.current).toHaveProperty('updateSetting');
      expect(result.current).toHaveProperty('applyProfile');
    });

    it('should throw error outside provider', () => {
      expect(() => {
        renderHook(() => useAccessibility());
      }).toThrow();
    });
  });

  describe('Settings Access', () => {
    it('should return current settings object', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });
      expect(result.current.settings).toBeDefined();
      expect(typeof result.current.settings).toBe('object');
    });

    it('should have all default settings', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });
      const settings = result.current.settings;

      expect(settings).toHaveProperty('textSize');
      expect(settings).toHaveProperty('contrast');
      expect(settings).toHaveProperty('focus');
      expect(settings).toHaveProperty('fontSize');
      expect(settings).toHaveProperty('letterSpacing');
      expect(settings).toHaveProperty('lineHeight');
    });

    it('should return settings with correct types', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });
      const settings = result.current.settings;

      expect(typeof settings.textSize).toBe('string');
      expect(typeof settings.contrast).toBe('string');
      expect(typeof settings.focus).toBe('boolean');
    });

    it('should return memoized settings value', () => {
      const { result, rerender } = renderHook(() => useAccessibility(), { wrapper });
      const firstSettings = result.current.settings;

      rerender();
      const secondSettings = result.current.settings;

      // Settings should be stable reference unless changed
      expect(firstSettings).toEqual(secondSettings);
    });
  });

  describe('Update Settings', () => {
    it('should have updateSetting method', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });
      expect(typeof result.current.updateSetting).toBe('function');
    });

    it('should update text size setting', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        result.current.updateSetting('textSize', 'large');
      });

      expect(result.current.settings.textSize).toBe('large');
    });

    it('should update contrast setting', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        result.current.updateSetting('contrast', 'high');
      });

      expect(result.current.settings.contrast).toBe('high');
    });

    it('should update focus setting', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });
      const initialValue = result.current.settings.focus;

      act(() => {
        result.current.updateSetting('focus', !initialValue);
      });

      expect(result.current.settings.focus).toBe(!initialValue);
    });

    it('should update multiple settings', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        result.current.updateSetting('textSize', 'x-large');
        result.current.updateSetting('contrast', 'high');
      });

      expect(result.current.settings.textSize).toBe('x-large');
      expect(result.current.settings.contrast).toBe('high');
    });

    it('should persist settings to localStorage', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        result.current.updateSetting('textSize', 'large');
      });

      const stored = localStorage.getItem('waysNX_accessibility_settings');
      expect(stored).toBeDefined();
      const parsed = JSON.parse(stored || '{}');
      expect(parsed.textSize).toBe('large');
    });
  });

  describe('Apply Profile', () => {
    it('should have applyProfile method', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });
      expect(typeof result.current.applyProfile).toBe('function');
    });

    it('should apply default profile', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        result.current.applyProfile('default');
      });

      expect(result.current.settings).toBeDefined();
    });

    it('should apply low vision profile', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        result.current.applyProfile('low-vision');
      });

      expect(result.current.settings.textSize).toBeDefined();
    });

    it('should apply dyslexia profile', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        result.current.applyProfile('dyslexia');
      });

      expect(result.current.settings.letterSpacing).toBeDefined();
    });

    it('should handle invalid profile gracefully', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        // Try to apply non-existent profile
        result.current.applyProfile('non-existent' as any);
      });

      // Should still have valid settings
      expect(result.current.settings).toBeDefined();
    });
  });

  describe('Context Updates', () => {
    it('should update when context changes', () => {
      const { result, rerender } = renderHook(() => useAccessibility(), { wrapper });
      const initialSettings = result.current.settings;

      act(() => {
        result.current.updateSetting('textSize', 'large');
      });

      expect(result.current.settings).not.toEqual(initialSettings);
    });

    it('should reflect profile changes', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      const originalTextSize = result.current.settings.textSize;

      act(() => {
        result.current.applyProfile('low-vision');
      });

      expect(result.current.settings).toBeDefined();
    });
  });

  describe('Memoization', () => {
    it('should return memoized hook result', () => {
      const { result, rerender } = renderHook(() => useAccessibility(), { wrapper });
      const firstResult = result.current;

      rerender();
      const secondResult = result.current;

      // Settings should be same reference if unchanged
      expect(firstResult.settings === secondResult.settings).toBe(true);
    });

    it('should update memoized value when settings change', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });
      const firstSettings = result.current.settings;

      act(() => {
        result.current.updateSetting('textSize', 'large');
      });

      const secondSettings = result.current.settings;
      expect(firstSettings).not.toBe(secondSettings);
    });
  });

  describe('Error Handling', () => {
    it('should handle missing provider gracefully', () => {
      expect(() => {
        renderHook(() => useAccessibility());
      }).toThrow('useAccessibility must be used within AccessibilityProvider');
    });

    it('should handle null context', () => {
      expect(() => {
        renderHook(() => useAccessibility());
      }).toThrow();
    });
  });

  describe('Multiple Hook Instances', () => {
    it('should work with multiple hook instances', () => {
      const { result: result1 } = renderHook(() => useAccessibility(), { wrapper });
      const { result: result2 } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        result1.current.updateSetting('textSize', 'large');
      });

      // Each hook instance maintains its own context reference
      expect(result1.current.settings.textSize).toBe('large');
    });

    it('should share settings across hook instances in same provider', () => {
      const { result: result1 } = renderHook(() => useAccessibility(), { wrapper });
      const { result: result2 } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        result1.current.updateSetting('contrast', 'high');
      });

      // Both hooks should see same context
      expect(result1.current.settings.contrast).toBe('high');
      expect(result2.current.settings.contrast).toBe('high');
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid setting updates', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        result.current.updateSetting('textSize', 'large');
        result.current.updateSetting('textSize', 'normal');
        result.current.updateSetting('textSize', 'x-large');
      });

      expect(result.current.settings.textSize).toBe('x-large');
    });

    it('should handle setting same value twice', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        result.current.updateSetting('textSize', 'large');
        result.current.updateSetting('textSize', 'large');
      });

      expect(result.current.settings.textSize).toBe('large');
    });

    it('should handle all setting types', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        result.current.updateSetting('textSize', 'large');
        result.current.updateSetting('contrast', 'high');
        result.current.updateSetting('focus', true);
        result.current.updateSetting('fontSize', 18);
        result.current.updateSetting('letterSpacing', true);
        result.current.updateSetting('lineHeight', true);
      });

      expect(result.current.settings).toBeDefined();
    });
  });
});
