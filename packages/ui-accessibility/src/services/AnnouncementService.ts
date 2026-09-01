/**
 * AnnouncementService
 * Manages screen reader announcements and live region updates
 */

type AnnouncementLevel = 'polite' | 'assertive' | 'alert';

class AnnouncementService {
  private liveRegion: HTMLElement | null = null;

  /**
   * Initialize the announcement service
   * Creates a live region for announcements
   */
  initialize(): void {
    if (this.liveRegion) return;

    this.liveRegion = document.createElement('div');
    this.liveRegion.setAttribute('aria-live', 'polite');
    this.liveRegion.setAttribute('aria-atomic', 'true');
    this.liveRegion.className = 'wx-sr-announcements';
    this.liveRegion.style.position = 'absolute';
    this.liveRegion.style.left = '-10000px';
    this.liveRegion.style.width = '1px';
    this.liveRegion.style.height = '1px';
    this.liveRegion.style.overflow = 'hidden';

    document.body.appendChild(this.liveRegion);
  }

  /**
   * Announce a message to screen readers
   */
  announce(message: string, level: AnnouncementLevel = 'polite'): void {
    if (!this.liveRegion) {
      this.initialize();
    }

    if (!this.liveRegion) return;

    // Update ARIA live level
    this.liveRegion.setAttribute('aria-live', level);

    // Clear and set new message
    this.liveRegion.textContent = '';
    setTimeout(() => {
      if (this.liveRegion) {
        this.liveRegion.textContent = message;
      }
    }, 100);
  }

  /**
   * Announce a success message
   */
  announceSuccess(message: string): void {
    this.announce(`Success: ${message}`, 'polite');
  }

  /**
   * Announce an error message
   */
  announceError(message: string): void {
    this.announce(`Error: ${message}`, 'assertive');
  }

  /**
   * Announce a warning message
   */
  announceWarning(message: string): void {
    this.announce(`Warning: ${message}`, 'assertive');
  }

  /**
   * Announce an alert
   */
  announceAlert(message: string): void {
    this.announce(`Alert: ${message}`, 'alert');
  }

  /**
   * Clear all announcements
   */
  clear(): void {
    if (this.liveRegion) {
      this.liveRegion.textContent = '';
    }
  }

  /**
   * Destroy the announcement service
   */
  destroy(): void {
    if (this.liveRegion) {
      this.liveRegion.remove();
      this.liveRegion = null;
    }
  }
}

// Export singleton instance
export const announcementService = new AnnouncementService();

// Initialize on load
if (typeof window !== 'undefined') {
  announcementService.initialize();
}
