/**
 * PasswordRequirements Component
 * 
 * Displays password policy requirements with:
 * - Requirement checklist
 * - Real-time validation against policy
 * - Visual indicators (met/unmet)
 * - Accessibility support
 * - Theme support
 */

import React, { useMemo } from 'react';
import type { PasswordPolicy } from '../../types';

export interface PasswordRequirementsProps {
  /**
   * Password to validate
   */
  password: string;

  /**
   * Password policy
   */
  policy: PasswordPolicy;

  /**
   * Show title
   */
  showTitle?: boolean;

  /**
   * Title text
   */
  title?: string;

  /**
   * Compact mode (fewer details)
   */
  compact?: boolean;

  /**
   * Custom CSS class
   */
  className?: string;

  /**
   * Show met requirements
   */
  showMet?: boolean;

  /**
   * Animated transitions
   */
  animated?: boolean;
}

interface Requirement {
  [key: string]: any;
  key: string;
  label: string;
  met: boolean;
  optional?: boolean;
}

/**
 * PasswordRequirements Component
 */
export const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({
  password,
  policy,
  showTitle = true,
  title = 'Password Requirements',
  compact = false,
  className = '',
  showMet = true,
  animated = true,
}) => {
  const requirements: Requirement[] = useMemo(() => {
    const reqs: Requirement[] = [];

    // Minimum length
    reqs.push({
      key: 'minLength',
      label: `At least ${policy.minLength} characters`,
      met: password.length >= policy.minLength,
    });

    // Maximum length
    if (policy.maxLength) {
      reqs.push({
        key: 'maxLength',
        label: `No more than ${policy.maxLength} characters`,
        met: password.length <= policy.maxLength,
      });
    }

    // Uppercase
    if (policy.requireUppercase) {
      reqs.push({
        key: 'uppercase',
        label: 'At least one uppercase letter (A-Z)',
        met: /[A-Z]/.test(password),
      });
    }

    // Lowercase
    if (policy.requireLowercase) {
      reqs.push({
        key: 'lowercase',
        label: 'At least one lowercase letter (a-z)',
        met: /[a-z]/.test(password),
      });
    }

    // Numbers
    if (policy.requireNumbers) {
      reqs.push({
        key: 'numbers',
        label: 'At least one number (0-9)',
        met: /\d/.test(password),
      });
    }

    // Special characters
    if (policy.requireSpecialChars) {
      reqs.push({
        key: 'special',
        label: 'At least one special character (!@#$%^&*)',
        met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      });
    }

    return reqs;
  }, [password, policy]);

  const metCount = requirements.filter((r) => r.met).length;
  const allMet = requirements.every((r) => r.met);

  const getStatusIcon = (met: boolean) => {
    if (met) {
      return (
        <svg
          className="waysnx-requirement-icon waysnx-met"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
        </svg>
      );
    }
    return (
      <svg
        className="waysnx-requirement-icon waysnx-unmet"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <circle cx="12" cy="12" r="1" />
      </svg>
    );
  };

  const displayRequirements = showMet
    ? requirements
    : requirements.filter((r) => !r.met);

  if (displayRequirements.length === 0 && !showTitle) {
    return null;
  }

  return (
    <div className={`waysnx-password-requirements ${className}`}>
      {showTitle && (
        <div className="waysnx-requirements-header">
          <h3 className="waysnx-requirements-title">{title}</h3>
          {!compact && password && (
            <span className="waysnx-requirements-count">
              {metCount} / {requirements.length}
            </span>
          )}
        </div>
      )}

      {!compact && password && requirements.length > 0 && (
        <div
          className="waysnx-requirements-progress"
          role="progressbar"
          aria-valuenow={metCount}
          aria-valuemin={0}
          aria-valuemax={requirements.length}
        >
          <div
            className="waysnx-progress-bar"
            style={{
              width: `${(metCount / requirements.length) * 100}%`,
              backgroundColor: allMet ? '#22c55e' : '#f97316',
              transition: animated ? 'width 0.3s ease' : 'none',
            }}
          />
        </div>
      )}

      <ul className="waysnx-requirements-list" role="list">
        {displayRequirements.map((req) => (
          <li
            key={req.key}
            className={`waysnx-requirement-item ${req.met ? 'waysnx-met' : 'waysnx-unmet'}`}
            role="listitem"
            aria-label={`${req.label} - ${req.met ? 'met' : 'not met'}`}
          >
            <span className="waysnx-requirement-icon-wrapper">
              {getStatusIcon(req.met)}
            </span>
            <span className="waysnx-requirement-text">{req.label}</span>
          </li>
        ))}
      </ul>

      {!password && compact && (
        <p className="waysnx-requirements-empty">Enter a password to see requirements</p>
      )}

      <style>{`
        .waysnx-password-requirements {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding: 1rem;
          background-color: var(--bg-primary, #ffffff);
          border: 1px solid var(--border-color, #e5e7eb);
          border-radius: 0.375rem;
        }

        .waysnx-requirements-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .waysnx-requirements-title {
          margin: 0;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary, #1f2937);
        }

        .waysnx-requirements-count {
          font-size: 0.75rem;
          color: var(--text-secondary, #6b7280);
          background-color: var(--bg-secondary, #f3f4f6);
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
        }

        .waysnx-requirements-progress {
          width: 100%;
          height: 0.375rem;
          background-color: var(--bg-secondary, #f3f4f6);
          border-radius: 0.25rem;
          overflow: hidden;
        }

        .waysnx-progress-bar {
          height: 100%;
          width: 0%;
          transition: width 0.3s ease, background-color 0.3s ease;
        }

        .waysnx-requirements-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .waysnx-requirement-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.875rem;
          color: var(--text-primary, #1f2937);
          transition: opacity 0.2s;
        }

        .waysnx-requirement-item.waysnx-unmet:not(:first-child) {
          display: flex;
        }

        .waysnx-requirement-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 1.25rem;
          height: 1.25rem;
        }

        .waysnx-requirement-icon {
          width: 100%;
          height: 100%;
          stroke-width: 2;
        }

        .waysnx-requirement-icon.waysnx-met {
          color: #22c55e;
        }

        .waysnx-requirement-icon.waysnx-unmet {
          color: #d1d5db;
        }

        .waysnx-requirement-text {
          flex: 1;
        }

        .waysnx-requirements-empty {
          margin: 0;
          font-size: 0.875rem;
          color: var(--text-secondary, #6b7280);
          font-style: italic;
          text-align: center;
          padding: 0.5rem 0;
        }

        /* Dark mode */
        @media (prefers-color-scheme: dark) {
          .waysnx-password-requirements {
            background-color: var(--bg-primary-dark, #1f2937);
            border-color: var(--border-color-dark, #374151);
          }

          .waysnx-requirements-title {
            color: var(--text-primary-dark, #f3f4f6);
          }

          .waysnx-requirements-count {
            background-color: var(--bg-secondary-dark, #374151);
            color: var(--text-secondary-dark, #9ca3af);
          }

          .waysnx-requirements-progress {
            background-color: var(--bg-secondary-dark, #374151);
          }

          .waysnx-requirement-item {
            color: var(--text-primary-dark, #f3f4f6);
          }

          .waysnx-requirement-icon.waysnx-unmet {
            color: var(--border-color-dark, #374151);
          }

          .waysnx-requirements-empty {
            color: var(--text-secondary-dark, #9ca3af);
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .waysnx-requirement-item,
          .waysnx-progress-bar {
            transition: none;
          }
        }

        /* High contrast */
        @media (prefers-contrast: more) {
          .waysnx-password-requirements {
            border-width: 2px;
          }

          .waysnx-requirement-icon {
            stroke-width: 3;
          }
        }
      `}</style>
    </div>
  );
};

PasswordRequirements.displayName = 'PasswordRequirements';

export default PasswordRequirements;
