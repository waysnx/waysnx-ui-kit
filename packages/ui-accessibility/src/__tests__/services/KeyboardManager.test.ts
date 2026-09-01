import { describe, it, expect, beforeEach, vi } from 'vitest';
import { keyboardManager, type KeyboardShortcut } from '../../services/KeyboardManager';

describe('KeyboardManager Service', () => {
  let mockHandler: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockHandler = vi.fn();
    keyboardManager.clearShortcuts();
    keyboardManager.setEnabled(true);
  });

  describe('registerShortcut()', () => {
    it('should register a simple shortcut', () => {
      const shortcut: KeyboardShortcut = {
        key: 'a',
        handler: mockHandler,
        description: 'Test shortcut',
      };

      keyboardManager.registerShortcut(shortcut);
      const shortcuts = keyboardManager.getShortcuts();

      expect(shortcuts).toHaveLength(1);
      expect(shortcuts[0].description).toBe('Test shortcut');
    });

    it('should register shortcut with modifiers', () => {
      const shortcut: KeyboardShortcut = {
        key: 's',
        modifiers: ['ctrl'],
        handler: mockHandler,
      };

      keyboardManager.registerShortcut(shortcut);
      const shortcuts = keyboardManager.getShortcuts();

      expect(shortcuts).toHaveLength(1);
      expect(shortcuts[0].modifiers).toContain('ctrl');
    });

    it('should register shortcut with multiple modifiers', () => {
      const shortcut: KeyboardShortcut = {
        key: 'p',
        modifiers: ['ctrl', 'shift'],
        handler: mockHandler,
      };

      keyboardManager.registerShortcut(shortcut);
      const shortcuts = keyboardManager.getShortcuts();

      expect(shortcuts).toHaveLength(1);
      expect(shortcuts[0].modifiers).toHaveLength(2);
    });

    it('should handle multiple shortcuts', () => {
      const shortcut1: KeyboardShortcut = { key: 'a', handler: vi.fn() };
      const shortcut2: KeyboardShortcut = { key: 'b', handler: vi.fn() };

      keyboardManager.registerShortcut(shortcut1);
      keyboardManager.registerShortcut(shortcut2);

      const shortcuts = keyboardManager.getShortcuts();
      expect(shortcuts).toHaveLength(2);
    });

    it('should override existing shortcut with same key', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      keyboardManager.registerShortcut({ key: 'a', handler: handler1 });
      keyboardManager.registerShortcut({ key: 'a', handler: handler2 });

      const shortcuts = keyboardManager.getShortcuts();
      expect(shortcuts).toHaveLength(1);
    });

    it('should not confuse shortcuts with different modifiers', () => {
      const shortcut1: KeyboardShortcut = {
        key: 'a',
        modifiers: ['ctrl'],
        handler: vi.fn(),
      };
      const shortcut2: KeyboardShortcut = {
        key: 'a',
        modifiers: ['alt'],
        handler: vi.fn(),
      };

      keyboardManager.registerShortcut(shortcut1);
      keyboardManager.registerShortcut(shortcut2);

      const shortcuts = keyboardManager.getShortcuts();
      expect(shortcuts).toHaveLength(2);
    });
  });

  describe('unregisterShortcut()', () => {
    it('should remove registered shortcut', () => {
      const shortcut: KeyboardShortcut = { key: 'a', handler: mockHandler };

      keyboardManager.registerShortcut(shortcut);
      expect(keyboardManager.getShortcuts()).toHaveLength(1);

      keyboardManager.unregisterShortcut(shortcut);
      expect(keyboardManager.getShortcuts()).toHaveLength(0);
    });

    it('should remove specific shortcut with modifiers', () => {
      const shortcut1: KeyboardShortcut = {
        key: 'a',
        modifiers: ['ctrl'],
        handler: vi.fn(),
      };
      const shortcut2: KeyboardShortcut = {
        key: 'a',
        modifiers: ['alt'],
        handler: vi.fn(),
      };

      keyboardManager.registerShortcut(shortcut1);
      keyboardManager.registerShortcut(shortcut2);

      keyboardManager.unregisterShortcut(shortcut1);

      const shortcuts = keyboardManager.getShortcuts();
      expect(shortcuts).toHaveLength(1);
      expect(shortcuts[0].modifiers).toContain('alt');
    });

    it('should handle unregistering non-existent shortcut', () => {
      const shortcut1: KeyboardShortcut = { key: 'a', handler: vi.fn() };
      const shortcut2: KeyboardShortcut = { key: 'b', handler: vi.fn() };

      keyboardManager.registerShortcut(shortcut1);
      keyboardManager.unregisterShortcut(shortcut2);

      expect(keyboardManager.getShortcuts()).toHaveLength(1);
    });
  });

  describe('clearShortcuts()', () => {
    it('should clear all shortcuts', () => {
      keyboardManager.registerShortcut({ key: 'a', handler: vi.fn() });
      keyboardManager.registerShortcut({ key: 'b', handler: vi.fn() });
      keyboardManager.registerShortcut({ key: 'c', handler: vi.fn() });

      expect(keyboardManager.getShortcuts()).toHaveLength(3);

      keyboardManager.clearShortcuts();
      expect(keyboardManager.getShortcuts()).toHaveLength(0);
    });
  });

  describe('setEnabled()', () => {
    it('should enable keyboard shortcuts', () => {
      keyboardManager.setEnabled(true);
      keyboardManager.registerShortcut({ key: 'a', handler: mockHandler });

      const event = new KeyboardEvent('keydown', { key: 'a' });
      keyboardManager.handleKeyDown(event);

      expect(mockHandler).toHaveBeenCalled();
    });

    it('should disable keyboard shortcuts', () => {
      keyboardManager.setEnabled(false);
      keyboardManager.registerShortcut({ key: 'a', handler: mockHandler });

      const event = new KeyboardEvent('keydown', { key: 'a' });
      keyboardManager.handleKeyDown(event);

      expect(mockHandler).not.toHaveBeenCalled();
    });
  });

  describe('handleKeyDown()', () => {
    it('should execute handler for matching shortcut', () => {
      keyboardManager.registerShortcut({ key: 'a', handler: mockHandler });

      const event = new KeyboardEvent('keydown', { key: 'a' });
      keyboardManager.handleKeyDown(event);

      expect(mockHandler).toHaveBeenCalled();
    });

    it('should not execute handler for non-matching shortcut', () => {
      keyboardManager.registerShortcut({ key: 'a', handler: mockHandler });

      const event = new KeyboardEvent('keydown', { key: 'b' });
      keyboardManager.handleKeyDown(event);

      expect(mockHandler).not.toHaveBeenCalled();
    });

    it('should handle ctrl+key shortcut', () => {
      keyboardManager.registerShortcut({
        key: 's',
        modifiers: ['ctrl'],
        handler: mockHandler,
      });

      const event = new KeyboardEvent('keydown', { key: 's', ctrlKey: true });
      keyboardManager.handleKeyDown(event);

      expect(mockHandler).toHaveBeenCalled();
    });

    it('should not trigger ctrl+key without ctrl pressed', () => {
      keyboardManager.registerShortcut({
        key: 's',
        modifiers: ['ctrl'],
        handler: mockHandler,
      });

      const event = new KeyboardEvent('keydown', { key: 's' });
      keyboardManager.handleKeyDown(event);

      expect(mockHandler).not.toHaveBeenCalled();
    });

    it('should handle multiple modifier keys', () => {
      keyboardManager.registerShortcut({
        key: 'p',
        modifiers: ['ctrl', 'shift'],
        handler: mockHandler,
      });

      const event = new KeyboardEvent('keydown', {
        key: 'p',
        ctrlKey: true,
        shiftKey: true,
      });
      keyboardManager.handleKeyDown(event);

      expect(mockHandler).toHaveBeenCalled();
    });

    it('should handle alt key modifier', () => {
      keyboardManager.registerShortcut({
        key: 't',
        modifiers: ['alt'],
        handler: mockHandler,
      });

      const event = new KeyboardEvent('keydown', { key: 't', altKey: true });
      keyboardManager.handleKeyDown(event);

      expect(mockHandler).toHaveBeenCalled();
    });

    it('should be case-insensitive for keys', () => {
      keyboardManager.registerShortcut({ key: 'a', handler: mockHandler });

      const event = new KeyboardEvent('keydown', { key: 'A' });
      keyboardManager.handleKeyDown(event);

      expect(mockHandler).toHaveBeenCalled();
    });

    it('should prevent default when shortcut matches', () => {
      keyboardManager.registerShortcut({ key: 'a', handler: mockHandler });

      const event = new KeyboardEvent('keydown', { key: 'a' });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      keyboardManager.handleKeyDown(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should not prevent default when shortcut does not match', () => {
      keyboardManager.registerShortcut({ key: 'a', handler: mockHandler });

      const event = new KeyboardEvent('keydown', { key: 'b' });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      keyboardManager.handleKeyDown(event);

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('should not call handler when disabled', () => {
      keyboardManager.registerShortcut({ key: 'a', handler: mockHandler });
      keyboardManager.setEnabled(false);

      const event = new KeyboardEvent('keydown', { key: 'a' });
      keyboardManager.handleKeyDown(event);

      expect(mockHandler).not.toHaveBeenCalled();
    });
  });

  describe('getShortcuts()', () => {
    it('should return all registered shortcuts', () => {
      const shortcut1: KeyboardShortcut = {
        key: 'a',
        handler: vi.fn(),
        description: 'First',
      };
      const shortcut2: KeyboardShortcut = {
        key: 'b',
        handler: vi.fn(),
        description: 'Second',
      };

      keyboardManager.registerShortcut(shortcut1);
      keyboardManager.registerShortcut(shortcut2);

      const shortcuts = keyboardManager.getShortcuts();

      expect(shortcuts).toHaveLength(2);
      expect(shortcuts.map(s => s.description)).toContain('First');
      expect(shortcuts.map(s => s.description)).toContain('Second');
    });

    it('should return empty array when no shortcuts registered', () => {
      const shortcuts = keyboardManager.getShortcuts();
      expect(shortcuts).toEqual([]);
    });
  });

  describe('Integration Tests', () => {
    it('should allow dynamic shortcut management', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      const shortcut1 = { key: 'a', handler: handler1 };

      keyboardManager.registerShortcut(shortcut1);
      keyboardManager.handleKeyDown(new KeyboardEvent('keydown', { key: 'a' }));
      expect(handler1).toHaveBeenCalledTimes(1);

      keyboardManager.unregisterShortcut(shortcut1);
      keyboardManager.registerShortcut({ key: 'a', handler: handler2 });

      keyboardManager.handleKeyDown(new KeyboardEvent('keydown', { key: 'a' }));
      expect(handler1).toHaveBeenCalledTimes(1); // Still 1, not called again
      expect(handler2).toHaveBeenCalledTimes(1);
    });
  });
});
