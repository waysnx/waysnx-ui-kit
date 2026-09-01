/**
 * FocusManager Service
 * Manages focus trapping, focus restoration, and focus visibility
 */

class FocusManager {
  private focusStack: HTMLElement[] = [];
  private previousActiveElement: HTMLElement | null = null;

  /**
   * Trap focus within an element
   * Useful for modals, drawers, and other modal components
   */
  trapFocus(container: HTMLElement): () => void {
    const focusableElements = this.getFocusableElements(container);

    if (focusableElements.length === 0) {
      return () => {};
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Store previous active element
    this.previousActiveElement = document.activeElement as HTMLElement;

    // Focus first element
    firstElement.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }

      if (e.key === 'Escape') {
        this.releaseFocus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Return cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      this.releaseFocus();
    };
  }

  /**
   * Release focus and restore to previous element
   */
  releaseFocus(): void {
    if (this.previousActiveElement && document.body.contains(this.previousActiveElement)) {
      this.previousActiveElement.focus();
    }
    this.previousActiveElement = null;
  }

  /**
   * Get all focusable elements within a container
   */
  private getFocusableElements(container: HTMLElement): HTMLElement[] {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    return Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[];
  }

  /**
   * Focus an element with visible indicator
   */
  focusElement(element: HTMLElement, options?: { smooth?: boolean }): void {
    element.focus({ preventScroll: !options?.smooth });

    if (options?.smooth) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  /**
   * Check if element is focusable
   */
  isFocusable(element: HTMLElement): boolean {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ];

    return focusableSelectors.some((selector) => element.matches(selector));
  }
}

// Export singleton instance
export const focusManager = new FocusManager();
