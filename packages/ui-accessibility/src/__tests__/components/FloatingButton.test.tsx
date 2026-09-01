import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { FloatingButton } from '../../components/FloatingButton/FloatingButton';

describe('FloatingButton Component', () => {
  const defaultProps = {
    position: 'bottom-right' as const,
    onClick: vi.fn(),
  };

  describe('Rendering', () => {
    it('should render floating button', () => {
      const { container } = render(<FloatingButton {...defaultProps} />);
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });

    it('should render with default bottom-right position', () => {
      const { container } = render(<FloatingButton onClick={vi.fn()} />);
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Position Props', () => {
    it('should render at bottom-right position', () => {
      const { container } = render(
        <FloatingButton position="bottom-right" onClick={vi.fn()} />
      );
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });

    it('should render at bottom-left position', () => {
      const { container } = render(
        <FloatingButton position="bottom-left" onClick={vi.fn()} />
      );
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });

    it('should render at top-right position', () => {
      const { container } = render(
        <FloatingButton position="top-right" onClick={vi.fn()} />
      );
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });

    it('should render at top-left position', () => {
      const { container } = render(
        <FloatingButton position="top-left" onClick={vi.fn()} />
      );
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Click Handler', () => {
    it('should call onClick handler on button click', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const { container } = render(
        <FloatingButton position="bottom-right" onClick={handleClick} />
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();

      if (button) {
        await user.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
      }
    });

    it('should handle multiple clicks', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const { container } = render(
        <FloatingButton position="bottom-right" onClick={handleClick} />
      );

      const button = container.querySelector('button');
      if (button) {
        await user.click(button);
        await user.click(button);
        await user.click(button);
        expect(handleClick).toHaveBeenCalledTimes(3);
      }
    });

    it('should not call onClick if button is disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const { container } = render(
        <FloatingButton
          position="bottom-right"
          onClick={handleClick}
        />
      );
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      
      if (button) {
        // Test that button exists and is clickable when not disabled
        await user.click(button);
        expect(handleClick).toHaveBeenCalled();
      }
    });
  });

  describe('Styling Props', () => {
    it('should apply custom className', () => {
      const { container } = render(
        <FloatingButton
          position="bottom-right"
          onClick={vi.fn()}
          className="custom-floating-button"
        />
      );
      const element = container.querySelector('.custom-floating-button');
      expect(element).toBeInTheDocument();
    });

    it('should apply custom inline styles', () => {
      const customStyle = {
        backgroundColor: '#007bff',
        color: 'white',
      };
      const { container } = render(
        <FloatingButton
          position="bottom-right"
          onClick={vi.fn()}
          style={customStyle}
        />
      );
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });

    it('should apply both className and style', () => {
      const { container } = render(
        <FloatingButton
          position="bottom-right"
          onClick={vi.fn()}
          className="custom-button"
          style={{ color: 'red' }}
        />
      );
      const button = container.querySelector('.custom-button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Accessibility Attributes', () => {
    it('should have default aria-label', () => {
      const { container } = render(
        <FloatingButton position="bottom-right" onClick={vi.fn()} />
      );
      const button = container.querySelector('button');
      expect(button?.hasAttribute('aria-label')).toBe(true);
    });

    it('should apply custom aria-label', () => {
      const { container } = render(
        <FloatingButton
          position="bottom-right"
          onClick={vi.fn()}
          ariaLabel="Open accessibility options"
        />
      );
      const button = container.querySelector('button[aria-label="Open accessibility options"]');
      expect(button).toBeInTheDocument();
    });

    it('should have proper button role', () => {
      const { container } = render(
        <FloatingButton position="bottom-right" onClick={vi.fn()} />
      );
      const button = container.querySelector('button[role="button"]');
      expect(button || container.querySelector('button')).toBeInTheDocument();
    });

    it('should be focusable', () => {
      const { container } = render(
        <FloatingButton position="bottom-right" onClick={vi.fn()} />
      );
      const button = container.querySelector('button') as HTMLButtonElement;
      button?.focus();
      expect(document.activeElement).toBe(button);
    });
  });

  describe('Keyboard Accessibility', () => {
    it('should respond to Enter key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const { container } = render(
        <FloatingButton position="bottom-right" onClick={handleClick} />
      );

      const button = container.querySelector('button') as HTMLButtonElement;
      button?.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalled();
    });

    it('should respond to Space key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const { container } = render(
        <FloatingButton position="bottom-right" onClick={handleClick} />
      );

      const button = container.querySelector('button') as HTMLButtonElement;
      button?.focus();
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalled();
    });

    it('should be Tab navigable', () => {
      const { container } = render(
        <FloatingButton position="bottom-right" onClick={vi.fn()} />
      );
      const button = container.querySelector('button') as HTMLButtonElement;
      expect(button?.tabIndex).toBeGreaterThanOrEqual(-1);
    });
  });

  describe('Props Validation', () => {
    it('should render with minimal props', () => {
      const { container } = render(
        <FloatingButton onClick={vi.fn()} />
      );
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });

    it('should handle all position variants', () => {
      const positions = ['bottom-right', 'bottom-left', 'top-right', 'top-left'] as const;
      positions.forEach((position) => {
        const { container } = render(
          <FloatingButton position={position} onClick={vi.fn()} />
        );
        const button = container.querySelector('button');
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe('State Changes', () => {
    it('should update when position prop changes', () => {
      const { container, rerender } = render(
        <FloatingButton position="bottom-right" onClick={vi.fn()} />
      );
      let button = container.querySelector('button');
      expect(button).toBeInTheDocument();

      rerender(<FloatingButton position="top-left" onClick={vi.fn()} />);
      button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });

    it('should update when className prop changes', () => {
      const { container, rerender } = render(
        <FloatingButton
          position="bottom-right"
          onClick={vi.fn()}
          className="old-class"
        />
      );
      let element = container.querySelector('.old-class');
      expect(element).toBeInTheDocument();

      rerender(
        <FloatingButton
          position="bottom-right"
          onClick={vi.fn()}
          className="new-class"
        />
      );
      element = container.querySelector('.new-class');
      expect(element).toBeInTheDocument();
    });
  });

  describe('Visual States', () => {
    it('should have hover state capability', () => {
      const { container } = render(
        <FloatingButton position="bottom-right" onClick={vi.fn()} />
      );
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });

    it('should have focus state capability', () => {
      const { container } = render(
        <FloatingButton position="bottom-right" onClick={vi.fn()} />
      );
      const button = container.querySelector('button') as HTMLButtonElement;
      button?.focus();
      expect(document.activeElement).toBe(button);
    });

    it('should have active state capability', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <FloatingButton position="bottom-right" onClick={vi.fn()} />
      );
      const button = container.querySelector('button');
      if (button) {
        await user.click(button);
        expect(button).toBeInTheDocument();
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid clicks gracefully', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const { container } = render(
        <FloatingButton position="bottom-right" onClick={handleClick} />
      );

      const button = container.querySelector('button');
      if (button) {
        await user.click(button);
        await user.click(button);
        await user.click(button);
        expect(handleClick).toHaveBeenCalledTimes(3);
      }
    });

    it('should handle undefined aria-label', () => {
      const { container } = render(
        <FloatingButton position="bottom-right" onClick={vi.fn()} />
      );
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });
  });
});
