/**
 * VerificationStatus Component
 * 
 * Display verification progress and status:
 * - Multiple verification steps
 * - Status indicators (pending, verified, failed)
 * - Progress bar
 * - Uses ui-layout Stack for layout
 */

import React, { useMemo } from 'react';

export type VerificationStep = 'email' | 'phone' | 'device' | 'mfa';
export type VerificationStepStatus = 'pending' | 'verified' | 'failed' | 'in-progress';

export interface VerificationStepInfo {
  id: VerificationStep;
  label: string;
  status: VerificationStepStatus;
  timestamp?: Date;
  description?: string;
}

export interface VerificationStatusProps {
  [key: string]: any;
  /**
   * Verification steps and their status
   */
  steps: VerificationStepInfo[];

  /**
   * Overall verification status
   */
  overallStatus?: VerificationStepStatus;

  /**
   * Show progress bar
   */
  showProgress?: boolean;

  /**
   * Show timeline view instead of list
   */
  timeline?: boolean;

  /**
   * Custom CSS class
   */
  className?: string;

  /**
   * Test ID
   */
  testId?: string;
}

interface StepDisplayInfo {
  [key: string]: any;
  icon: string;
  label: string;
  color: string;
  bgColor: string;
}

/**
 * VerificationStatus Component
 */
export const VerificationStatus: React.FC<VerificationStatusProps> = ({
  steps,
  overallStatus,
  showProgress = true,
  timeline = false,
  className = '',
  testId,
}) => {
  const getStepDisplay = (status: VerificationStepStatus): StepDisplayInfo => {
    switch (status) {
      case 'verified':
        return {
          icon: '✓',
          label: 'Verified',
          color: '#22c55e',
          bgColor: '#dcfce7',
        };
      case 'failed':
        return {
          icon: '✕',
          label: 'Failed',
          color: '#ef4444',
          bgColor: '#fee2e2',
        };
      case 'in-progress':
        return {
          icon: '⟳',
          label: 'In Progress',
          color: '#3b82f6',
          bgColor: '#dbeafe',
        };
      case 'pending':
      default:
        return {
          icon: '○',
          label: 'Pending',
          color: '#6b7280',
          bgColor: '#f3f4f6',
        };
    }
  };

  const verifiedCount = useMemo(() => {
    return steps.filter((s) => s.status === 'verified').length;
  }, [steps]);

  const progressPercentage = useMemo(() => {
    return steps.length > 0 ? (verifiedCount / steps.length) * 100 : 0;
  }, [steps, verifiedCount]);

  const formatDate = (date?: Date): string => {
    if (!date) return '';
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`waysnx-verification-status ${className}`} data-testid={testId}>
      {/* Overall Status */}
      {overallStatus && (
        <div className="waysnx-status-header">
          <h3 className="waysnx-status-title">Verification Status</h3>
          <div className={`waysnx-status-badge waysnx-status-badge-${overallStatus}`}>
            {overallStatus.charAt(0).toUpperCase() + overallStatus.slice(1)}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {showProgress && (
        <div className="waysnx-progress-section">
          <div className="waysnx-progress-stats">
            <span className="waysnx-progress-label">Progress</span>
            <span className="waysnx-progress-count">
              {verifiedCount} of {steps.length}
            </span>
          </div>
          <div className="waysnx-progress-bar-container" role="progressbar" aria-valuenow={progressPercentage} aria-valuemin={0} aria-valuemax={100}>
            <div
              className="waysnx-progress-bar"
              style={{
                width: `${progressPercentage}%`,
                backgroundColor: progressPercentage === 100 ? '#22c55e' : '#3b82f6',
                transition: 'width 0.3s ease, background-color 0.3s ease',
              }}
            />
          </div>
        </div>
      )}

      {/* Timeline View */}
      {timeline ? (
        <div className="waysnx-timeline-view">
          {steps.map((step, index) => {
            const display = getStepDisplay(step.status);
            const isLast = index === steps.length - 1;

            return (
              <div key={step.id} className="waysnx-timeline-item">
                <div className="waysnx-timeline-connector">
                  <div
                    className="waysnx-timeline-icon"
                    style={{
                      backgroundColor: display.bgColor,
                      color: display.color,
                    }}
                  >
                    {display.icon}
                  </div>
                  {!isLast && (
                    <div
                      className="waysnx-timeline-line"
                      style={{
                        backgroundColor:
                          step.status === 'verified' ? display.color : '#e5e7eb',
                      }}
                    />
                  )}
                </div>

                <div className="waysnx-timeline-content">
                  <div className="waysnx-timeline-header">
                    <h4 className="waysnx-timeline-title">{step.label}</h4>
                    <span
                      className="waysnx-timeline-status"
                      style={{ color: display.color }}
                    >
                      {display.label}
                    </span>
                  </div>

                  {step.description && (
                    <p className="waysnx-timeline-description">{step.description}</p>
                  )}

                  {step.timestamp && (
                    <p className="waysnx-timeline-timestamp">
                      {formatDate(step.timestamp)}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="waysnx-steps-list">
          {steps.map((step) => {
            const display = getStepDisplay(step.status);

            return (
              <div key={step.id} className="waysnx-step-item">
                <div className="waysnx-step-icon" style={{ color: display.color }}>
                  {display.icon}
                </div>

                <div className="waysnx-step-content">
                  <div className="waysnx-step-header">
                    <h4 className="waysnx-step-label">{step.label}</h4>
                    <span className="waysnx-step-status" style={{ color: display.color }}>
                      {display.label}
                    </span>
                  </div>

                  {step.description && (
                    <p className="waysnx-step-description">{step.description}</p>
                  )}

                  {step.timestamp && (
                    <p className="waysnx-step-timestamp">{formatDate(step.timestamp)}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        .waysnx-verification-status {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .waysnx-status-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .waysnx-status-title {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary, #1f2937);
        }

        .waysnx-status-badge {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.375rem 0.75rem;
          border-radius: 9999px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .waysnx-status-badge-verified {
          background-color: #dcfce7;
          color: #22c55e;
        }

        .waysnx-status-badge-failed {
          background-color: #fee2e2;
          color: #ef4444;
        }

        .waysnx-status-badge-in-progress,
        .waysnx-status-badge-pending {
          background-color: #dbeafe;
          color: #3b82f6;
        }

        .waysnx-progress-section {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .waysnx-progress-stats {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .waysnx-progress-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary, #6b7280);
        }

        .waysnx-progress-count {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary, #1f2937);
        }

        .waysnx-progress-bar-container {
          width: 100%;
          height: 8px;
          background-color: var(--bg-secondary, #f3f4f6);
          border-radius: 4px;
          overflow: hidden;
        }

        .waysnx-progress-bar {
          height: 100%;
          width: 0%;
          transition: width 0.3s ease, background-color 0.3s ease;
          border-radius: 4px;
        }

        .waysnx-timeline-view {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .waysnx-timeline-item {
          display: flex;
          gap: 1rem;
          padding: 1rem 0;
        }

        .waysnx-timeline-connector {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        .waysnx-timeline-icon {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.25rem;
          flex-shrink: 0;
        }

        .waysnx-timeline-line {
          width: 2px;
          flex: 1;
          min-height: 1rem;
        }

        .waysnx-timeline-content {
          flex: 1;
          padding-top: 0.5rem;
        }

        .waysnx-timeline-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .waysnx-timeline-title {
          margin: 0;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary, #1f2937);
        }

        .waysnx-timeline-status {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .waysnx-timeline-description {
          margin: 0.5rem 0 0;
          font-size: 0.75rem;
          color: var(--text-secondary, #6b7280);
          line-height: 1.4;
        }

        .waysnx-timeline-timestamp {
          margin: 0.25rem 0 0;
          font-size: 0.7rem;
          color: #9ca3af;
          font-style: italic;
        }

        .waysnx-steps-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .waysnx-step-item {
          display: flex;
          gap: 1rem;
          padding: 0.75rem;
          background-color: var(--bg-secondary, #f3f4f6);
          border-radius: 0.375rem;
        }

        .waysnx-step-icon {
          font-size: 1.25rem;
          font-weight: 700;
          min-width: 1.5rem;
          text-align: center;
        }

        .waysnx-step-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .waysnx-step-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .waysnx-step-label {
          margin: 0;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary, #1f2937);
        }

        .waysnx-step-status {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .waysnx-step-description {
          margin: 0;
          font-size: 0.75rem;
          color: var(--text-secondary, #6b7280);
          line-height: 1.4;
        }

        .waysnx-step-timestamp {
          margin: 0;
          font-size: 0.7rem;
          color: #9ca3af;
          font-style: italic;
        }

        /* Dark mode */
        @media (prefers-color-scheme: dark) {
          .waysnx-status-title {
            color: var(--text-primary-dark, #f3f4f6);
          }

          .waysnx-progress-label {
            color: var(--text-secondary-dark, #9ca3af);
          }

          .waysnx-progress-count {
            color: var(--text-primary-dark, #f3f4f6);
          }

          .waysnx-progress-bar-container {
            background-color: var(--bg-secondary-dark, #374151);
          }

          .waysnx-timeline-title {
            color: var(--text-primary-dark, #f3f4f6);
          }

          .waysnx-timeline-description {
            color: var(--text-secondary-dark, #9ca3af);
          }

          .waysnx-step-item {
            background-color: var(--bg-secondary-dark, #374151);
          }

          .waysnx-step-label {
            color: var(--text-primary-dark, #f3f4f6);
          }

          .waysnx-step-description {
            color: var(--text-secondary-dark, #9ca3af);
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .waysnx-progress-bar {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
};

VerificationStatus.displayName = 'VerificationStatus';

export default VerificationStatus;
