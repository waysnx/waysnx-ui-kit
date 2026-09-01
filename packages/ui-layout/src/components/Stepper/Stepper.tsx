import React from 'react';
import './Stepper.css';

export interface StepItem {
  label: string;
  description?: string;
}

export interface StepperProps {
  steps: StepItem[];
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  label?: string;
  testId?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  orientation = 'horizontal',
  className = '',
  label = 'Progress',
  testId,
}) => {
  return (
    <div 
      className={`stepper stepper-${orientation} ${className}`}
      aria-label={label}
      role="progressbar"
      aria-valuenow={currentStep + 1}
      aria-valuemin={1}
      aria-valuemax={steps.length}
      data-testid={testId}
    >
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const status = isCompleted ? 'completed' : isCurrent ? 'current' : 'upcoming';

        return (
          <div 
            key={index} 
            className={`stepper-step stepper-step-${status}`}
            aria-current={isCurrent ? 'step' : undefined}
            aria-label={`Step ${stepNumber}: ${step.label}${isCompleted ? ' (completed)' : isCurrent ? ' (current)' : ''}`}
          >
            <div className="stepper-step-indicator">
              <div className="stepper-step-circle" aria-hidden="true">
                {isCompleted ? '✓' : stepNumber}
              </div>
              {index < steps.length - 1 && (
                <div className="stepper-step-line" aria-hidden="true" />
              )}
            </div>
            <div className="stepper-step-content">
              <div className="stepper-step-label">{step.label}</div>
              {step.description && (
                <div className="stepper-step-description">{step.description}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
