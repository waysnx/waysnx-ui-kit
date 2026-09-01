import React from 'react';
import './CircularProgress.css';

export type CircularProgressSize = 'sm' | 'md' | 'lg' | 'xl';

export interface CircularProgressProps {
  /** Current progress value (0 to max) */
  value: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Size preset — sm: 48px, md: 80px, lg: 120px, xl: 160px */
  size?: CircularProgressSize;
  /** Show percentage text in the center (default: true) */
  showValue?: boolean;
  /** Custom text shown in center instead of the percentage (e.g. "Done") */
  valueLabel?: string;
  /** Label displayed below the circle */
  label?: string;
  /** Arc stroke color (defaults to --wx-color-primary) */
  color?: string;
  /** Background track color (defaults to --wx-color-border) */
  trackColor?: string;
  /** Arc stroke thickness in px (auto-scales with size if omitted) */
  strokeWidth?: number;
  /** Additional CSS class name */
  className?: string;
  /** Test ID for automated testing */
  testId?: string;
}

const SIZE_MAP: Record<CircularProgressSize, number> = {
  sm: 48,
  md: 80,
  lg: 120,
  xl: 160,
};

const STROKE_MAP: Record<CircularProgressSize, number> = {
  sm: 4,
  md: 6,
  lg: 9,
  xl: 12,
};

const FONT_SIZE_MAP: Record<CircularProgressSize, number> = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 30,
};

export function CircularProgress({
  value,
  max = 100,
  size = 'md',
  showValue = true,
  valueLabel,
  label,
  color,
  trackColor,
  strokeWidth,
  className = '',
  testId,
}: CircularProgressProps) {
  const diameter = SIZE_MAP[size];
  const stroke = strokeWidth ?? STROKE_MAP[size];
  const fontSize = FONT_SIZE_MAP[size];

  const radius = (diameter - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const offset = circumference - (percent / 100) * circumference;

  const cx = diameter / 2;
  const cy = diameter / 2;

  const centerText = valueLabel ?? (showValue ? `${Math.round(percent)}%` : undefined);

  return (
    <div
      className={`wx-circular-progress ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label || `Progress: ${Math.round(percent)}%`}
      data-testid={testId}
    >
      <svg
        className="wx-circular-progress-svg"
        width={diameter}
        height={diameter}
        viewBox={`0 0 ${diameter} ${diameter}`}
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          className="wx-circular-progress-track"
          cx={cx}
          cy={cy}
          r={radius}
          strokeWidth={stroke}
          style={trackColor ? { stroke: trackColor } : undefined}
        />
        {/* Fill */}
        <circle
          className="wx-circular-progress-fill"
          cx={cx}
          cy={cy}
          r={radius}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={color ? { stroke: color } : undefined}
        />
        {/* Center text — rendered in SVG so it stays centered regardless of size */}
        {centerText && (
          <text
            x={cx}
            y={cy}
            textAnchor="middle"
            dominantBaseline="central"
            transform={`rotate(90, ${cx}, ${cy})`}
            style={{
              fontSize: `${fontSize}px`,
              fontWeight: 600,
              fill: 'var(--wx-color-text, #1e293b)',
              fontFamily: 'inherit',
            }}
          >
            {centerText}
          </text>
        )}
      </svg>

      {label && (
        <span className="wx-circular-progress-label">{label}</span>
      )}
    </div>
  );
}
