/**
 * SecurityScore Component
 * 
 * Display overall security score with breakdown by category.
 */

import React from 'react';

export interface ScoreCategory {
  /**
   * Category name
   */
  name: string;
  /**
   * Score 0-100
   */
  score: number;
  /**
   * Category weight
   */
  weight?: number;
}

export interface SecurityScoreProps {
  /**
   * Overall score 0-100
   */
  score: number;
  /**
   * Score breakdown by category
   */
  categories?: ScoreCategory[];
  /**
   * Custom title
   */
  title?: string;
  /**
   * Show percentage
   */
  showPercentage?: boolean;
}

const getScoreColor = (score: number) => {
  if (score >= 80) return 'success';
  if (score >= 60) return 'warning';
  return 'danger';
};

const getScoreLabel = (score: number) => {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Poor';
};

/**
 * SecurityScore - Display security score and breakdown
 */
export const SecurityScore: React.FC<SecurityScoreProps> = ({
  score,
  categories,
  title = 'Security Score',
  showPercentage = true,
}) => {
  const color = getScoreColor(score);
  const label = getScoreLabel(score);

  return (
    <div>
      {/* Main Score Display */}
      <div
        style={{
          padding: '1.5rem',
          backgroundColor: 'var(--color-background-alt, #f9f9f9)',
          borderRadius: '0.375rem',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}
      >
        <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--color-muted, #666)', marginBottom: '1rem' }}>
          {title}
        </span>

        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-background, #fff)',
            margin: '0 auto',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `4px solid var(--color-${color}, #ccc)`,
            position: 'relative',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold', color: `var(--color-${color}, #333)` }}>
              {score}
            </span>
            {showPercentage && (
              <span style={{ fontSize: '0.75rem', color: 'var(--color-muted, #666)' }}>
                %
              </span>
            )}
          </div>
        </div>

        <span style={{ display: 'block', fontSize: '1rem', fontWeight: 'bold', color: `var(--color-${color}, #333)` }}>
          {label}
        </span>
      </div>

      {/* Category Breakdown */}
      {categories && categories.length > 0 && (
        <div>
          <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Score Breakdown:
          </span>

          <div>
            {categories.map(category => (
              <div key={category.name} style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.875rem' }}>{category.name}</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: `var(--color-${getScoreColor(category.score)}, #333)` }}>
                    {category.score}%
                  </span>
                </div>

                {/* Score Bar */}
                <div
                  style={{
                    height: '8px',
                    backgroundColor: 'var(--color-border, #ccc)',
                    borderRadius: '9999px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${category.score}%`,
                      backgroundColor: `var(--color-${getScoreColor(category.score)}, #ccc)`,
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

SecurityScore.displayName = 'SecurityScore';

export default SecurityScore;
