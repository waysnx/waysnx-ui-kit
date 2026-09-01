/**
 * RiskScoreBadge Component
 * 
 * Display account risk score with visual indicator.
 */

import React from 'react';
import { Badge } from '@waysnx/ui-feedback';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface RiskScoreBadgeProps {
  [key: string]: any;
  /**
   * Risk score 0-100
   */
  score?: number;
  /**
   * Risk level
   */
  level?: RiskLevel;
  /**
   * Risk factors
   */
  factors?: string[];
  /**
   * Show details
   */
  showDetails?: boolean;
}

const getScoreLevel = (score: number): RiskLevel => {
  if (score <= 25) return 'low';
  if (score <= 50) return 'medium';
  if (score <= 75) return 'high';
  return 'critical';
};

const getLevelColor = (level: RiskLevel) => {
  const colors = {
    low: 'success',
    medium: 'info',
    high: 'warning',
    critical: 'danger',
  };
  return colors[level];
};

const getLevelIcon = (level: RiskLevel) => {
  const icons = {
    low: '✓',
    medium: 'ℹ️',
    high: '⚠️',
    critical: '🚨',
  };
  return icons[level];
};

/**
 * RiskScoreBadge - Display account risk level
 */
export const RiskScoreBadge: React.FC<RiskScoreBadgeProps> = ({
  score = 0,
  level = getScoreLevel(score),
  factors,
  showDetails = false,
}) => {
  const color = getLevelColor(level);
  const icon = getLevelIcon(level);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Badge color={color}>
          {icon} {level.charAt(0).toUpperCase() + level.slice(1)} Risk
        </Badge>
        {score !== undefined && (
          <span style={{ fontSize: '0.875rem', color: 'var(--color-muted, #666)' }}>
            Score: {score}/100
          </span>
        )}
      </div>

      {showDetails && factors && factors.length > 0 && (
        <div
          style={{
            marginTop: '0.5rem',
            padding: '0.5rem',
            backgroundColor: 'var(--color-background-alt, #f9f9f9)',
            borderRadius: '0.375rem',
          }}
        >
          <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.25rem', color: 'var(--color-muted, #666)' }}>
            Risk Factors:
          </span>
          <ul style={{ paddingLeft: '1rem' }}>
            {factors.map((factor, idx) => (
              <li key={idx}>
                <span style={{ fontSize: '0.75rem' }}>{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

RiskScoreBadge.displayName = 'RiskScoreBadge';

export default RiskScoreBadge;
