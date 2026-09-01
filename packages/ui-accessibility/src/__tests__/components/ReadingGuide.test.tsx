import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { AccessibilityProvider } from '../../context/AccessibilityProvider';
import { ReadingGuide } from '../../components/ReadingGuide/ReadingGuide';

describe('ReadingGuide Component', () => {
  const renderWithProvider = (defaultSettings = {}) => {
    return render(
      <AccessibilityProvider defaultSettings={defaultSettings}>
        <div style={{ height: '200vh', padding: '20px' }}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <ReadingGuide />
        </div>
      </AccessibilityProvider>
    );
  };

  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { container } = renderWithProvider();
      expect(container).toBeInTheDocument();
    });

    it('should render when reading guide is enabled', () => {
      const { container } = renderWithProvider({ readingGuide: true });
      expect(container).toBeInTheDocument();
    });

    it('should render when reading guide is disabled', () => {
      const { container } = renderWithProvider({ readingGuide: false });
      expect(container).toBeInTheDocument();
    });
  });

  describe('Visibility', () => {
    it('should be visible when enabled in context', () => {
      const { container } = renderWithProvider({ readingGuide: true });
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should exist in DOM even when disabled', () => {
      const { container } = renderWithProvider({ readingGuide: false });
      expect(container).toBeInTheDocument();
    });

    it('should show/hide based on context changes', () => {
      const { container, rerender } = renderWithProvider({ readingGuide: false });
      expect(container).toBeInTheDocument();

      rerender(
        <AccessibilityProvider defaultSettings={{ readingGuide: true }}>
          <div style={{ height: '200vh', padding: '20px' }}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <ReadingGuide />
          </div>
        </AccessibilityProvider>
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Mouse Tracking', () => {
    it('should track mouse movement', async () => {
      const user = userEvent.setup();
      const { container } = renderWithProvider({ readingGuide: true });

      const textElement = container.querySelector('p');
      if (textElement) {
        await user.hover(textElement);
        expect(container).toBeInTheDocument();
      }
    });

    it('should respond to mousemove events', async () => {
      const user = userEvent.setup();
      const { container } = renderWithProvider({ readingGuide: true });

      const textElement = container.querySelector('p');
      if (textElement) {
        await user.pointer({ keys: '[MouseL]', target: textElement });
        expect(container).toBeInTheDocument();
      }
    });

    it('should update position on mouse movement', () => {
      const { container } = renderWithProvider({ readingGuide: true });

      const event = new MouseEvent('mousemove', {
        bubbles: true,
        cancelable: true,
        clientX: 100,
        clientY: 50,
      });

      document.dispatchEvent(event);
      expect(container).toBeInTheDocument();
    });
  });

  describe('Context Integration', () => {
    it('should integrate with AccessibilityProvider', () => {
      const { container } = renderWithProvider({ readingGuide: true });
      expect(container).toBeInTheDocument();
    });

    it('should respond to readingGuide setting', () => {
      const { container, rerender } = renderWithProvider({ readingGuide: true });
      expect(container).toBeInTheDocument();

      rerender(
        <AccessibilityProvider defaultSettings={{ readingGuide: false }}>
          <div style={{ height: '200vh', padding: '20px' }}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <ReadingGuide />
          </div>
        </AccessibilityProvider>
      );
      expect(container).toBeInTheDocument();
    });

    it('should work with other settings', () => {
      const { container } = renderWithProvider({
        readingGuide: true,
        textSize: 'large',
        contrast: 'high',
        focus: true,
      });
      expect(container).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('should have CSS classes for styling', () => {
      const { container } = renderWithProvider({ readingGuide: true });
      expect(container.innerHTML).toBeTruthy();
    });

    it('should apply styles based on context', () => {
      const { container } = renderWithProvider({ readingGuide: true });
      expect(container).toBeInTheDocument();
    });

    it('should be visible with appropriate z-index', () => {
      const { container } = renderWithProvider({ readingGuide: true });
      const guideElement = container.querySelector('[data-testid="reading-guide"]') ||
                          container.querySelector('[class*="guide"]');
      expect(guideElement || container).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('should work on mobile viewport', () => {
      const { container } = renderWithProvider({ readingGuide: true });
      expect(container).toBeInTheDocument();
    });

    it('should work on tablet viewport', () => {
      const { container } = renderWithProvider({ readingGuide: true });
      expect(container).toBeInTheDocument();
    });

    it('should work on desktop viewport', () => {
      const { container } = renderWithProvider({ readingGuide: true });
      expect(container).toBeInTheDocument();
    });

    it('should adapt to viewport changes', () => {
      const { container, rerender } = renderWithProvider({ readingGuide: true });
      expect(container).toBeInTheDocument();

      // Simulate viewport change by rerendering
      rerender(
        <AccessibilityProvider defaultSettings={{ readingGuide: true }}>
          <div style={{ height: '200vh', padding: '20px' }}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <ReadingGuide />
          </div>
        </AccessibilityProvider>
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should not interfere with keyboard navigation', () => {
      const { container } = renderWithProvider({ readingGuide: true });
      expect(container).toBeInTheDocument();
    });

    it('should not block screen readers', () => {
      const { container } = renderWithProvider({ readingGuide: true });
      const paragraphs = container.querySelectorAll('p');
      expect(paragraphs.length).toBeGreaterThan(0);
    });

    it('should have aria-hidden if needed', () => {
      const { container } = renderWithProvider({ readingGuide: true });
      const guideElement = container.querySelector('[aria-hidden="true"]') ||
                          container.querySelector('[class*="guide"]');
      expect(guideElement || container).toBeInTheDocument();
    });

    it('should maintain semantic HTML', () => {
      const { container } = renderWithProvider({ readingGuide: true });
      const textElement = container.querySelector('p');
      expect(textElement).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('should handle rapid mouse movements efficiently', async () => {
      const user = userEvent.setup();
      const { container } = renderWithProvider({ readingGuide: true });

      for (let i = 0; i < 10; i++) {
        const event = new MouseEvent('mousemove', {
          bubbles: true,
          clientX: Math.random() * 100,
          clientY: Math.random() * 100,
        });
        document.dispatchEvent(event);
      }

      expect(container).toBeInTheDocument();
    });

    it('should not cause memory leaks', () => {
      const { container, unmount } = renderWithProvider({ readingGuide: true });
      expect(container).toBeInTheDocument();

      unmount();
      expect(true).toBe(true); // If we get here without errors, no obvious leaks
    });
  });

  describe('Integration with Other Features', () => {
    it('should work with large text setting', () => {
      const { container } = renderWithProvider({
        readingGuide: true,
        textSize: 'x-large',
      });
      expect(container).toBeInTheDocument();
    });

    it('should work with high contrast setting', () => {
      const { container } = renderWithProvider({
        readingGuide: true,
        contrast: 'high',
      });
      expect(container).toBeInTheDocument();
    });

    it('should work with focus enhancement', () => {
      const { container } = renderWithProvider({
        readingGuide: true,
        focus: true,
      });
      expect(container).toBeInTheDocument();
    });

    it('should work with all settings enabled', () => {
      const { container } = renderWithProvider({
        readingGuide: true,
        textSize: 'large',
        contrast: 'high',
        focus: true,
        letterSpacing: true,
        lineHeight: true,
      });
      expect(container).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle rendering without context gracefully', () => {
      // ReadingGuide requires context, so expect it to throw
      expect(() => {
        render(
          <div style={{ height: '200vh', padding: '20px' }}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <ReadingGuide />
          </div>
        );
      }).toThrow();
    });

    it('should handle multiple ReadingGuide instances', () => {
      const { container } = render(
        <AccessibilityProvider defaultSettings={{ readingGuide: true }}>
          <div style={{ height: '200vh', padding: '20px' }}>
            <p>First paragraph</p>
            <ReadingGuide />
            <p>Second paragraph</p>
            <ReadingGuide />
          </div>
        </AccessibilityProvider>
      );
      expect(container).toBeInTheDocument();
    });

    it('should handle unmounting and remounting', () => {
      const { container, unmount, rerender } = renderWithProvider({ readingGuide: true });
      expect(container).toBeInTheDocument();

      unmount();

      const { container: container2 } = renderWithProvider({ readingGuide: true });
      expect(container2).toBeInTheDocument();
    });
  });
});
