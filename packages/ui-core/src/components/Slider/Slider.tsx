import React from 'react';
import './Slider.css';

export interface SliderProps {
  label?: string;
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  hint?: string;
  className?: string;
  showValue?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  id?: string;
  testId?: string;
}

export function Slider({
  label,
  value = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  hint,
  className,
  showValue = true,
  ariaLabel,
  ariaDescribedBy,
  id,
  testId,
}: SliderProps) {
  const sliderId = id || `wx-slider-${Math.random().toString(36).slice(2)}`;
  
  // Build aria-describedby with hint
  const descriptionIds = [];
  if (hint) descriptionIds.push(`${sliderId}-hint`);
  if (ariaDescribedBy) descriptionIds.push(ariaDescribedBy);
  const finalAriaDescribedBy = descriptionIds.length > 0 ? descriptionIds.join(' ') : undefined;

  return (
    <div className={`wx-slider-container ${className || ''}`} data-testid={testId}>
      {label && <label htmlFor={sliderId} className="wx-slider-label">{label}</label>}
      <div className="wx-slider-wrapper">
        <input
          id={sliderId}
          type="range"
          className="wx-slider"
          value={value}
          onChange={(e) => onChange?.(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          role="slider"
          aria-label={ariaLabel || label}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-describedby={finalAriaDescribedBy}
        />
        {showValue && (
          <div className="wx-slider-value" aria-live="polite" aria-atomic="true">
            {value.toLocaleString()}
          </div>
        )}
      </div>
      {hint && <div className="wx-slider-hint" id={`${sliderId}-hint`}>{hint}</div>}
    </div>
  );
}
