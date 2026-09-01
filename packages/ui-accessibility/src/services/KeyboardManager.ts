/**
 * KeyboardManager Service
 * Manages keyboard shortcuts and accessibility keyboard handling
 */

export type KeyboardShortcut = {
  key: string;
  modifiers?: ('ctrl' | 'alt' | 'shift')[];
  handler: () => void;
  description?: string;
};

class KeyboardManager {
  private shortcuts: Map<string, KeyboardShortcut> = new Map();
  private enabled: boolean = true;

  /**
   * Register a keyboard shortcut
   */
  registerShortcut(shortcut: KeyboardShortcut): void {
    const key = this.generateKey(shortcut);
    this.shortcuts.set(key, shortcut);
  }

  /**
   * Unregister a keyboard shortcut
   */
  unregisterShortcut(shortcut: KeyboardShortcut): void {
    const key = this.generateKey(shortcut);
    this.shortcuts.delete(key);
  }

  /**
   * Clear all shortcuts
   */
  clearShortcuts(): void {
    this.shortcuts.clear();
  }

  /**
   * Enable/disable keyboard shortcuts
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  /**
   * Handle keyboard events
   */
  handleKeyDown(event: KeyboardEvent): void {
    if (!this.enabled) return;

    const key = this.generateEventKey(event);
    const shortcut = this.shortcuts.get(key);

    if (shortcut) {
      event.preventDefault();
      shortcut.handler();
    }
  }

  /**
   * Generate unique key from shortcut object
   */
  private generateKey(shortcut: KeyboardShortcut): string {
    const modifiers = (shortcut.modifiers || []).sort().join('+');
    return modifiers ? `${modifiers}+${shortcut.key}` : shortcut.key;
  }

  /**
   * Generate key from keyboard event
   */
  private generateEventKey(event: KeyboardEvent): string {
    const modifiers: string[] = [];
    if (event.ctrlKey) modifiers.push('ctrl');
    if (event.altKey) modifiers.push('alt');
    if (event.shiftKey) modifiers.push('shift');

    const key = event.key.toLowerCase();
    return modifiers.length > 0 ? `${modifiers.join('+')}+${key}` : key;
  }

  /**
   * Get all registered shortcuts
   */
  getShortcuts(): KeyboardShortcut[] {
    return Array.from(this.shortcuts.values());
  }
}

// Export singleton instance
export const keyboardManager = new KeyboardManager();
