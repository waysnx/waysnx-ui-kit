/**
 * SecurityHealthIndicator Component
 * 
 * Visual health indicator for overall security posture.
 */

import React from 'react';

export interface HealthMetric {
  /**
   * Metric name
   */
  name: string;
  /**
   * Metric status (0-1)
   */
  health: number;
  /**
   * Whether this metric is critical
   */
  isCritical?: boolean;
}

export interface SecurityHealthIndicatorProps {
  /**
   * Overall health 0-100
   */
  overallHealth: number;
  /**
   * Individual metrics
   */
  metrics?: HealthMetric[];
  /**
   * Show detailed breakdown
   */
  showDetails?: boolean;
}

const getHealthColor = (health: number) => {
  if (health >= 80) return 'success';
  if (health >= 60) return 'warning';
  return 'danger';
};

const getHealthLabel = (health: number) => {
  if (health >= 80) return 'Healthy';
  if (health >= 60) return 'Fair';
  return 'Poor';
};

/**
 * SecurityHealthIndicator - Visual security health indicator
 */
export const SecurityHealthIndicator: React.FC<SecurityHealthIndicatorProps> = ({
  overallHealth,
  metrics,
  showDetails = true,
}) => {
  const color = getHealthColor(overallHealth);
  const label = getHealthLabel(overallHealth);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (overallHealth / 100) * circumference;

  return (
    <div>
      {/* Circular Health Indicator */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative', width: '120px', height: '120px' }}>
          <svg
            width="120"
            height="120"
            style={{ transform: 'rotate(-90deg)' }}
          >
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="var(--color-border, #ccc)"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke={`var(--color-${color}, #ccc)`}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.3s ease' }}
            />
          </svg>

          {/* Center text */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '1.125rem', fontWeight: 'bold', color: `var(--color-${color}, #333)` }}>
              {overallHealth}%
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-muted, #666)' }}>
              {label}
            </span>
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      {showDetails && metrics && metrics.length > 0 && (
        <div>
          <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Security Components:
          </span>

          <div>
            {metrics.map(metric => (
              <div key={metric.name} style={{ marginBottom: '1rem' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.25rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem' }}>{metric.name}</span>
                    {metric.isCritical && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-danger, red)' }}>
                        (Critical)
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
                    {Math.round(metric.health * 100)}%
                  </span>
                </div>

                {/* Health bar */}
                <div
                  style={{
                    height: '6px',
                    backgroundColor: 'var(--color-border, #ccc)',
                    borderRadius: '9999px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${metric.health * 100}%`,
                      backgroundColor: `var(--color-${getHealthColor(metric.health * 100)}, #ccc)`,
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

SecurityHealthIndicator.displayName = 'SecurityHealthIndicator';

export default SecurityHealthIndicator;
