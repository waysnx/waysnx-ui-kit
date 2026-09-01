/**
 * @file components/StepNavigation/StepNavigation.tsx
 * StepNavigation component for multi-step processes and wizards
 */

import React, { forwardRef, useState, useCallback } from 'react';
import type { StepItem } from '../../types';
import './step-navigation.css';

/**
 * StepNavigation component props
 */
export interface StepNavigationProps {
  /**
   * Array of step definitions
   */
  steps: StepItem[];

  /**
   * Current active step index
   */
  currentStep: number;

  /**
   * Callback when step changes
   */
  onStepChange?: (stepIndex: number) => void | Promise<void>;

  /**
   * Callback to validate if step can be changed
   */
  onValidateStep?: (stepIndex: number) => boolean | Promise<boolean>;

  /**
   * Allow going back to previous steps
   */
  allowBacktrack?: boolean;

  /**
   * Display variant
   */
  variant?: 'horizontal' | 'vertical' | 'dots';

  /**
   * Show step descriptions
   */
  showDescriptions?: boolean;

  /**
   * Show progress percentage
   */
  showProgress?: boolean;

  /**
   * Disable next button on last step
   */
  disableNextOnLastStep?: boolean;

  /**
   * Custom previous button label
   */
  previousLabel?: string;

  /**
   * Custom next button label
   */
  nextLabel?: string;

  /**
   * Custom finish button label
   */
  finishLabel?: string;

  /**
   * Callback when process is finished
   */
  onFinish?: () => void | Promise<void>;

  /**
   * Show custom button labels at end of wizard
   */
  showFinishButton?: boolean;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Additional styles
   */
  style?: React.CSSProperties;

  /**
   * aria-label for accessibility
   */
  ariaLabel?: string;

  /**
   * Test ID
   */
  testId?: string;
}

/**
 * Helper to get step status
 */
const getStepStatus = (stepIndex: number, currentStep: number): 'completed' | 'active' | 'pending' => {
  if (stepIndex < currentStep) return 'completed';
  if (stepIndex === currentStep) return 'active';
  return 'pending';
};

/**
 * StepNavigation Component
 *
 * Guides users through multi-step processes with progress tracking,
 * validation, and flexible display options.
 *
 * @example
 * ```tsx
 * const steps = [
 *   { id: 'personal', label: 'Personal Info', description: 'Your details' },
 *   { id: 'address', label: 'Address', description: 'Where you live' },
 *   { id: 'confirm', label: 'Confirm', description: 'Review & confirm' },
 * ];
 *
 * <StepNavigation
 *   steps={steps}
 *   currentStep={currentStep}
 *   onStepChange={setCurrentStep}
 * />
 * ```
 */
export const StepNavigation = forwardRef<HTMLDivElement, StepNavigationProps>(
  (
    {
      steps,
      currentStep,
      onStepChange,
      onValidateStep,
      allowBacktrack = true,
      variant = 'horizontal',
      showDescriptions = false,
      showProgress = true,
      disableNextOnLastStep = false,
      previousLabel = 'Previous',
      nextLabel = 'Next',
      finishLabel = 'Finish',
      onFinish,
      showFinishButton = true,
      className = '',
      style,
      ariaLabel = 'Step navigation',
      testId,
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = useState(false);
    const isLastStep = currentStep === steps.length - 1;
    const isFirstStep = currentStep === 0;
    const progressPercent = ((currentStep + 1) / steps.length) * 100;

    const handleStepClick = useCallback(
      async (stepIndex: number) => {
        // Can only navigate to previous steps if backtrack is allowed
        if (stepIndex > currentStep && !allowBacktrack) {
          return;
        }

        // Can only go to previous steps directly
        if (stepIndex > currentStep) {
          return;
        }

        try {
          setIsLoading(true);

          // Validate current step before moving
          if (onValidateStep) {
            const isValid = await onValidateStep(currentStep);
            if (!isValid) {
              setIsLoading(false);
              return;
            }
          }

          await onStepChange?.(stepIndex);
        } finally {
          setIsLoading(false);
        }
      },
      [currentStep, allowBacktrack, onValidateStep, onStepChange]
    );

    const handlePrevious = useCallback(async () => {
      if (isFirstStep || isLoading) return;
      await handleStepClick(currentStep - 1);
    }, [isFirstStep, isLoading, currentStep, handleStepClick]);

    const handleNext = useCallback(async () => {
      if (isLoading) return;

      try {
        setIsLoading(true);

        // Validate current step
        if (onValidateStep) {
          const isValid = await onValidateStep(currentStep);
          if (!isValid) {
            setIsLoading(false);
            return;
          }
        }

        if (isLastStep) {
          await onFinish?.();
        } else {
          await onStepChange?.(currentStep + 1);
        }
      } finally {
        setIsLoading(false);
      }
    }, [currentStep, isLastStep, isLoading, onValidateStep, onStepChange, onFinish]);

    const variantClass = `wx-step-navigation--${variant}`;
    const combinedClassName = `wx-step-navigation ${variantClass} ${className}`.trim();

    const renderStepIndicator = () => {
      if (variant === 'dots') {
        return (
          <div className="wx-step-navigation__dots" role="tablist" aria-label="Steps">
            {steps.map((step, idx) => (
              <button
                key={step.id}
                className={`wx-step-navigation__dot wx-step-navigation__dot--${getStepStatus(idx, currentStep)}`}
                onClick={() => handleStepClick(idx)}
                disabled={idx > currentStep || isLoading}
                role="tab"
                aria-label={`${step.label}${getStepStatus(idx, currentStep) === 'completed' ? ' - completed' : ''}`}
                aria-selected={idx === currentStep}
                data-testid={`step-dot-${idx}`}
              />
            ))}
          </div>
        );
      }

      // Horizontal or vertical variant
      return (
        <div
          className={`wx-step-navigation__steps ${variant === 'vertical' ? 'wx-step-navigation__steps--vertical' : ''}`}
          role="tablist"
          aria-label="Steps"
        >
          {steps.map((step, idx) => {
            const status = getStepStatus(idx, currentStep);

            return (
              <React.Fragment key={step.id}>
                <button
                  className={`wx-step-navigation__step wx-step-navigation__step--${status}`}
                  onClick={() => handleStepClick(idx)}
                  disabled={idx > currentStep || isLoading}
                  role="tab"
                  aria-selected={idx === currentStep}
                  aria-label={step.label}
                  data-testid={`step-${idx}`}
                >
                  <div className="wx-step-navigation__step-number">
                    {status === 'completed' ? (
                      <span className="wx-step-navigation__checkmark">✓</span>
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>
                  <div className="wx-step-navigation__step-content">
                    <div className="wx-step-navigation__step-label">{step.label}</div>
                    {showDescriptions && step.description && (
                      <div className="wx-step-navigation__step-description">
                        {step.description}
                      </div>
                    )}
                  </div>
                </button>

                {/* Connector between steps */}
                {idx < steps.length - 1 && (
                  <div
                    className={`wx-step-navigation__connector wx-step-navigation__connector--${
                      idx < currentStep ? 'completed' : 'pending'
                    }`}
                    aria-hidden="true"
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={combinedClassName}
        style={style}
        data-testid={testId}
        aria-label={ariaLabel}
      >
        {/* Progress bar */}
        {showProgress && (
          <div className="wx-step-navigation__progress">
            <div
              className="wx-step-navigation__progress-bar"
              style={{ width: `${progressPercent}%` }}
              role="progressbar"
              aria-valuenow={currentStep + 1}
              aria-valuemin={1}
              aria-valuemax={steps.length}
            />
          </div>
        )}

        {/* Step indicator */}
        <div className="wx-step-navigation__indicator">
          {renderStepIndicator()}
        </div>

        {/* Current step info */}
        {variant !== 'dots' && (
          <div className="wx-step-navigation__current">
            <div className="wx-step-navigation__current-step">
              Step {currentStep + 1} of {steps.length}
            </div>
            <div className="wx-step-navigation__current-title">
              {steps[currentStep].label}
            </div>
            {showDescriptions && steps[currentStep].description && (
              <div className="wx-step-navigation__current-description">
                {steps[currentStep].description}
              </div>
            )}
          </div>
        )}

        {/* Navigation buttons */}
        <div className="wx-step-navigation__buttons">
          <button
            className="wx-step-navigation__button wx-step-navigation__button--previous"
            onClick={handlePrevious}
            disabled={isFirstStep || isLoading}
            data-testid="step-previous"
            aria-label={previousLabel}
          >
            {previousLabel}
          </button>

          {isLastStep && showFinishButton ? (
            <button
              className="wx-step-navigation__button wx-step-navigation__button--finish"
              onClick={handleNext}
              disabled={isLoading}
              data-testid="step-finish"
              aria-label={finishLabel}
            >
              {isLoading && <span className="wx-step-navigation__spinner" />}
              {finishLabel}
            </button>
          ) : (
            <button
              className="wx-step-navigation__button wx-step-navigation__button--next"
              onClick={handleNext}
              disabled={isLoading || (disableNextOnLastStep && isLastStep)}
              data-testid="step-next"
              aria-label={nextLabel}
            >
              {isLoading && <span className="wx-step-navigation__spinner" />}
              {nextLabel}
            </button>
          )}
        </div>
      </div>
    );
  }
);

StepNavigation.displayName = 'StepNavigation';
