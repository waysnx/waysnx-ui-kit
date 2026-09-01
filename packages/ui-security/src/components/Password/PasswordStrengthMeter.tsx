/**
 * PasswordStrengthMeter Component
 * 
 * A visual indicator showing password strength with:
 * - Animated strength bar
 * - Strength level label
 * - Color-coded feedback
 * - Accessibility support
 * - Theme support (light/dark)
 */

import React, { useMemo } from 'react';
import { calculatePasswordStrength } from '../../utils';
import type { PasswordStrengthScore } from '../../utils';

export interface PasswordStrengthMeterProps {
  [key: string]: any;
  /**
   * Password to evaluate
   */
  password: string;

  /**
   * Show strength label
   */
  showLabel?: boolean;

  /**
   * Show percentage
   */
  showPercentage?: boolean;

  /**
   * Bar height in pixels
   */
  barHeight?: number;

  /**
   * Display size variant
   */
  variant?: 'small' | 'medium' | 'large';

  /**
   * Custom CSS class
   */
  className?: string;

  /**
   * Animation duration in milliseconds
   */
  animationDuration?: number;

  /**
   * Custom label text
   */
  label?: string;
}

/**
 * PasswordStrengthMeter Component
 */
export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
  showLabel = true,
  showPercentage = false,
  barHeight = 8,
  variant = 'medium',
  className = '',
  animationDuration = 300,
  label,
}) => {
  const strength: PasswordStrengthScore = useMemo(
    () => calculatePasswordStrength(password),
    [password]
  );

  const getStrengthColor = (): string => {
    switch (strength.level) {
      case 'veryWeak':
        return '#ef4444'; // red-500
      case 'weak':
        return '#f97316'; // orange-500
      case 'fair':
        return '#eab308'; // yellow-500
      case 'good':
        return '#84cc16'; // lime-500
      case 'strong':
        return '#22c55e'; // green-500
      case 'veryStrong':
        return '#16a34a'; // green-600
      default:
        return '#d1d5db'; // gray-300
    }
  };

  const getStrengthLabel = (): string => {
    const labels: Record<string, string> = {
      veryWeak: 'Very Weak',
      weak: 'Weak',
      fair: 'Fair',
      good: 'Good',
      strong: 'Strong',
      veryStrong: 'Very Strong',
    };
    return labels[strength.level] || 'Unknown';
  };

  const getAriaLabel = (): string => {
    return `Password strength: ${getStrengthLabel()}, ${strength.score}%`;
  };

  const getFontSize = (): string => {
    switch (variant) {
      case 'small':
        return '0.75rem';
      case 'large':
        return '1rem';
      case 'medium':
      default:
        return '0.875rem';
    }
  };

  const getBarSize = (): number => {
    switch (variant) {
      case 'small':
        return 4;
      case 'large':
        return 12;
      case 'medium':
      default:
        return barHeight;
    }
  };

  const color = getStrengthColor();
  const strengthLabel = getStrengthLabel();
  const fontSize = getFontSize();
  const actualBarHeight = getBarSize();

  if (!password) {
    return (
      <div className={`waysnx-password-strength-meter ${className}`}>
        <div className="waysnx-strength-bar-container">
          <div
            className="waysnx-strength-bar waysnx-empty"
            style={{ height: `${actualBarHeight}px` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`waysnx-password-strength-meter ${className}`}>
      <div
        className="waysnx-strength-bar-container"
        role="progressbar"
        aria-valuenow={strength.score}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={getAriaLabel()}
      >
        <div
          className="waysnx-strength-bar"
          style={{
            width: `${strength.score}%`,
            height: `${actualBarHeight}px`,
            backgroundColor: color,
            transition: `width ${animationDuration}ms ease, background-color ${animationDuration}ms ease`,
          }}
        />
      </div>

      <div className="waysnx-strength-info">
        {showLabel && (
          <span
            className="waysnx-strength-label"
            style={{
              color,
              fontSize,
              fontWeight: 600,
            }}
          >
            {label || strengthLabel}
          </span>
        )}

        {showPercentage && (
          <span
            className="waysnx-strength-percentage"
            style={{
              color,
              fontSize: '0.75rem',
            }}
          >
            {strength.score}%
          </span>
        )}
      </div>

      <style>{`
        .waysnx-password-strength-meter {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
        }

        .waysnx-strength-bar-container {
          width: 100%;
          height: ${actualBarHeight}px;
          background-color: var(--bg-secondary, #f3f4f6);
          border-radius: 0.25rem;
          overflow: hidden;
          position: relative;
        }

        .waysnx-strength-bar {
          height: 100%;
          width: 0%;
          border-radius: 0.25rem;
          transition: width ${animationDuration}ms ease,
            background-color ${animationDuration}ms ease;
        }

        .waysnx-strength-bar.waysnx-empty {
          background-color: var(--bg-secondary, #f3f4f6);
        }

        .waysnx-strength-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .waysnx-strength-label {
          font-weight: 600;
          font-size: ${fontSize};
        }

        .waysnx-strength-percentage {
          font-size: 0.75rem;
          font-weight: 500;
        }

        /* Dark mode */
        @media (prefers-color-scheme: dark) {
          .waysnx-strength-bar-container {
            background-color: var(--bg-secondary-dark, #374151);
          }

          .waysnx-strength-bar.waysnx-empty {
            background-color: var(--bg-secondary-dark, #374151);
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .waysnx-strength-bar {
            transition: none;
          }
        }

        /* High contrast */
        @media (prefers-contrast: more) {
          .waysnx-strength-bar-container {
            border: 1px solid currentColor;
          }
        }
      `}</style>
    </div>
  );
};

PasswordStrengthMeter.displayName = 'PasswordStrengthMeter';

export default PasswordStrengthMeter;
