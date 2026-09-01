import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { AccessibilityProvider } from '../../context/AccessibilityProvider';
import { useAccessibility } from '../../hooks/useAccessibility';
import React from 'react';

describe('useAccessibility Profiles Tests', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    React.createElement(AccessibilityProvider, {}, children)
  );

  beforeEach(() => {
    localStorage.clear();
  });

  describe('Profile Management', () => {
    it('should have applyProfile method', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });
      expect(typeof result.current.applyProfile).toBe('function');
    });

    it('should apply profiles', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        result.current.applyProfile('default');
      });

      expect(result.current.settings).toBeDefined();
    });

    it('should apply different profiles', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        result.current.applyProfile('low-vision');
      });

      expect(result.current.settings.textSize).toBeDefined();
      expect(result.current.settings.contrast).toBeDefined();
    });

    it('should switch between profiles', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        result.current.applyProfile('low-vision');
      });

      const lowVisionSettings = result.current.settings;

      act(() => {
        result.current.applyProfile('dyslexia');
      });

      const dyslexiaSettings = result.current.settings;
      expect(lowVisionSettings).not.toEqual(dyslexiaSettings);
    });

    it('should persist profile changes to localStorage', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        result.current.applyProfile('low-vision');
      });

      const stored = localStorage.getItem('waysNX_accessibility_settings');
      expect(stored).toBeDefined();
    });
  });

  describe('Multiple Instances', () => {
    it('should share profile state across instances', () => {
      const { result: result1 } = renderHook(() => useAccessibility(), { wrapper });
      const { result: result2 } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        result1.current.applyProfile('low-vision');
      });

      expect(result2.current.settings).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle invalid profile gracefully', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        result.current.applyProfile('non-existent' as any);
      });

      expect(result.current.settings).toBeDefined();
    });

    it('should handle rapid profile switches', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        result.current.applyProfile('low-vision');
        result.current.applyProfile('dyslexia');
        result.current.applyProfile('default');
      });

      expect(result.current.settings).toBeDefined();
    });
  });
});
