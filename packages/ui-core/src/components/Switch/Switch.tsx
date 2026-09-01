import React, { InputHTMLAttributes } from 'react';
import './Switch.css';

export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  testId?: string;
}

export function Switch({ label, ariaLabel, ariaDescribedBy, testId, ...r }: SwitchProps) {
  return (
    <label className="wx-switch-wrapper" data-testid={testId}>
      <input
        type="checkbox"
        className="wx-switch"
        role="switch"
        aria-checked={r.checked}
        aria-label={ariaLabel || label}
        aria-describedby={ariaDescribedBy}
        {...r}
      />
      <span className="wx-switch-slider" aria-hidden="true"></span>
      {label && <span>{label}</span>}
    </label>
  );
}