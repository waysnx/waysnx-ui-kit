/**
 * SensitiveText Component
 * 
 * Display sensitive text with reveal/hide toggle and auto-obscuring.
 */

import React, { useState } from 'react';
import { Button } from '@waysnx/ui-core';

export interface SensitiveTextProps {
  /**
   * The sensitive text to display/hide
   */
  text: string;
  /**
   * Whether text is initially revealed
   */
  initiallyRevealed?: boolean;
  /**
   * Auto-hide after ms
   * @default 0 (disabled)
   */
  autoHideMs?: number;
  /**
   * Character to use for masking
   * @default '•'
   */
  maskCharacter?: string;
  /**
   * Show last N characters unmasked
   * @default 0
   */
  showLastCharacters?: number;
  /**
   * Label for reveal button
   */
  revealLabel?: string;
  /**
   * Label for hide button
   */
  hideLabel?: string;
  /**
   * Custom text styling
   */
  fontSize?: string;
  /**
   * Custom text color
   */
  color?: string;
  /**
   * Allow copy to clipboard button
   */
  allowCopy?: boolean;
}

const FONT_SIZE_MAP: Record<string, string> = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
};

/**
 * SensitiveText - Display and reveal sensitive information
 * 
 * Features:
 * - Manual reveal/hide toggle
 * - Auto-obscuring after delay
 * - Customizable masking
 * - Copy to clipboard option
 */
export const SensitiveText: React.FC<SensitiveTextProps> = ({
  text,
  initiallyRevealed = false,
  autoHideMs = 0,
  maskCharacter = '•',
  showLastCharacters = 0,
  revealLabel = 'Reveal',
  hideLabel = 'Hide',
  fontSize = 'base',
  color,
  allowCopy = true,
}) => {
  const [isRevealed, setIsRevealed] = useState(initiallyRevealed);
  const autoHideTimeoutRef = React.useRef<NodeJS.Timeout>(undefined);

  const handleReveal = () => {
    setIsRevealed(true);

    // Auto-hide after delay
    if (autoHideMs > 0) {
      if (autoHideTimeoutRef.current) {
        clearTimeout(autoHideTimeoutRef.current);
      }

      autoHideTimeoutRef.current = setTimeout(() => {
        setIsRevealed(false);
      }, autoHideMs);
    }
  };

  const handleHide = () => {
    setIsRevealed(false);
    if (autoHideTimeoutRef.current) {
      clearTimeout(autoHideTimeoutRef.current);
    }
  };

  // Generate masked text
  const getMaskedText = () => {
    if (showLastCharacters > 0 && text.length > showLastCharacters) {
      const maskedPart = maskCharacter.repeat(text.length - showLastCharacters);
      const visiblePart = text.slice(-showLastCharacters);
      return maskedPart + visiblePart;
    }
    return maskCharacter.repeat(text.length);
  };

  const displayText = isRevealed ? text : getMaskedText();
  const resolvedFontSize = FONT_SIZE_MAP[fontSize] || fontSize;

  React.useEffect(() => {
    return () => {
      if (autoHideTimeoutRef.current) {
        clearTimeout(autoHideTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {/* Text Display */}
      <div
        style={{
          padding: 8,
          background: 'var(--wx-color-background-alt, #f3f3f5)',
          borderRadius: 8,
          fontFamily: 'monospace',
          flex: 1,
          minWidth: '200px',
        }}
      >
        <span style={{ fontSize: resolvedFontSize, color, wordBreak: 'break-all' }}>
          {displayText}
        </span>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8 }}>
        {isRevealed ? (
          <Button
            variant="outline"
            onClick={handleHide}
            title="Hide sensitive information"
          >
            {hideLabel}
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={handleReveal}
            title="Reveal sensitive information"
          >
            {revealLabel}
          </Button>
        )}

        {allowCopy && (
          <Button
            variant="outline"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(text);
              } catch (error) {
                console.error('Failed to copy:', error);
              }
            }}
            title="Copy to clipboard"
          >
            Copy
          </Button>
        )}
      </div>
    </div>
  );
};

SensitiveText.displayName = 'SensitiveText';

export default SensitiveText;
