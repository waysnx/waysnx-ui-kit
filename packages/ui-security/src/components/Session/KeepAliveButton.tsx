/**
 * KeepAliveButton Component
 * 
 * Button to manually extend session and reset idle timeout.
 */

import React, { useState } from 'react';
import { Button } from '@waysnx/ui-core';

export interface KeepAliveButtonProps {
  [key: string]: any;
  /**
   * Callback to keep session alive
   */
  onKeepAlive?: () => Promise<void>;
  /**
   * Button label
   */
  label?: string;
  /**
   * Button variant
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /**
   * Button size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether button is disabled
   */
  disabled?: boolean;
  /**
   * Custom loading message
   */
  loadingLabel?: string;
  /**
   * Whether to show success feedback
   */
  showFeedback?: boolean;
  /**
   * Icon to show before label
   */
  icon?: React.ReactNode;
}

/**
 * KeepAliveButton - Manually extend user session
 */
export const KeepAliveButton: React.FC<KeepAliveButtonProps> = ({
  onKeepAlive,
  label = 'Keep Session Active',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loadingLabel = 'Extending...',
  showFeedback = true,
  icon,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClick = async () => {
    if (!onKeepAlive || disabled || isLoading) return;

    setIsLoading(true);
    try {
      await onKeepAlive();

      if (showFeedback) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      }
    } catch (error) {
      console.error('Failed to keep session alive:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonLabel = isLoading ? loadingLabel : showSuccess ? 'Session Extended' : label;

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      disabled={disabled || isLoading}
     
      color={showSuccess ? 'success' : undefined}
    >
      {icon && <span style={{ marginRight: '8px' }}>{icon}</span>}
      {buttonLabel}
    </Button>
  );
};

KeepAliveButton.displayName = 'KeepAliveButton';

export default KeepAliveButton;
