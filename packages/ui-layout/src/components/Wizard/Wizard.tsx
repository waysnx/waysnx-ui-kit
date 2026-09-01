import React, { useState, createContext, useContext, Children, isValidElement } from 'react';
import { useTranslation } from '@waysnx/ui-i18n';
import './Wizard.css';

interface WizardContextType {
  currentStep: number;
  totalSteps: number;
  goToStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLastStep: boolean;
  submitButtonText: string;
  saveProgress: boolean;
  onSaveProgress?: (stepIndex: number) => void;
  errorMessage?: string;
  setShowError: (show: boolean) => void;
  showError: boolean;
}

const WizardContext = createContext<WizardContextType | null>(null);

export interface WizardProps {
  children: React.ReactNode;
  onComplete?: () => void;
  onStepChange?: (step: number) => void;
  defaultStep?: number;
  showStepNumbers?: boolean;
  className?: string;
  /** Visual theme for the wizard. Default: 'default' */
  theme?: 'default' | 'minimal' | 'modern';
  /** Layout orientation. Default: 'horizontal' */
  layout?: 'horizontal' | 'vertical';
  /** Show a "Save & Continue Later" button. Default: false */
  saveProgress?: boolean;
  /** Callback when "Save & Continue Later" is clicked */
  onSaveProgress?: (stepIndex: number) => void;
  /** Text for the submit/finish button on the last step. Default: 'Finish' */
  submitButtonText?: string;
  /** Message shown after onComplete is called successfully */
  successMessage?: string;
  /** Message shown below step content when validation fails */
  errorMessage?: string;
  testId?: string;
}

export function Wizard({
  children,
  onComplete,
  onStepChange,
  defaultStep = 0,
  showStepNumbers = true,
  className = '',
  theme = 'default',
  layout = 'horizontal',
  saveProgress = false,
  onSaveProgress,
  submitButtonText,
  successMessage,
  errorMessage,
  testId,
}: WizardProps) {
  const [currentStep, setCurrentStep] = useState(defaultStep);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showError, setShowError] = useState(false);
  const { t } = useTranslation();

  const resolvedSubmitButtonText = submitButtonText || t('wizard.finish');

  const steps = Children.toArray(children).filter(child =>
    isValidElement(child) && child.type === WizardStep
  );
  const totalSteps = steps.length;

  const goToStep = (step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
      setShowError(false);
      onStepChange?.(step);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      goToStep(currentStep + 1);
    } else if (currentStep === totalSteps - 1) {
      onComplete?.();
      if (successMessage) {
        setIsCompleted(true);
      }
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  };

  const canGoNext = currentStep < totalSteps;
  const canGoPrevious = currentStep > 0;
  const isLastStep = currentStep === totalSteps - 1;

  const themeClass = `wx-wizard--${theme}`;
  const layoutClass = `wx-wizard--${layout}`;

  if (isCompleted && successMessage) {
    return (
      <div className={`wx-wizard ${themeClass} ${layoutClass} ${className}`} aria-label="Wizard" data-testid={testId}>
        <div className="wx-wizard-success" role="status" aria-live="polite">
          {successMessage}
        </div>
      </div>
    );
  }

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        totalSteps,
        goToStep,
        nextStep,
        previousStep,
        canGoNext,
        canGoPrevious,
        isLastStep,
        submitButtonText: resolvedSubmitButtonText,
        saveProgress,
        onSaveProgress,
        errorMessage,
        showError,
        setShowError,
      }}
    >
      <div className={`wx-wizard ${themeClass} ${layoutClass} ${className}`} aria-label="Wizard" data-testid={testId}>
        <div
          className="wx-wizard-steps"
          role="progressbar"
          aria-valuenow={currentStep + 1}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
        >
          {steps.map((step, index) => {
            if (!isValidElement(step)) return null;
            const { title, description } = step.props as WizardStepProps;
            const isActive = index === currentStep;
            const isStepCompleted = index < currentStep;
            const status = isStepCompleted ? 'completed' : isActive ? 'active' : 'upcoming';

            return (
              <div
                key={index}
                className={`wx-wizard-step-indicator wx-wizard-step-${status}`}
                onClick={() => isStepCompleted && goToStep(index)}
                style={{ cursor: isStepCompleted ? 'pointer' : 'default' }}
                aria-current={isActive ? 'step' : undefined}
                aria-label={`Step ${index + 1}: ${title}${isStepCompleted ? ' (completed)' : isActive ? ' (current)' : ''}`}
                role="button"
                tabIndex={isStepCompleted ? 0 : -1}
              >
                <div className="wx-wizard-step-circle" aria-hidden="true">
                  {isStepCompleted ? '✓' : showStepNumbers ? index + 1 : ''}
                </div>
                <div className="wx-wizard-step-info">
                  <div className="wx-wizard-step-title">{title}</div>
                  {description && (
                    <div className="wx-wizard-step-description">{description}</div>
                  )}
                </div>
                {index < totalSteps - 1 && <div className="wx-wizard-step-line" aria-hidden="true" />}
              </div>
            );
          })}
        </div>
        <div className="wx-wizard-content" role="region" aria-label={`Step ${currentStep + 1} content`}>
          {steps[currentStep]}
        </div>
      </div>
    </WizardContext.Provider>
  );
}

export interface WizardStepProps {
  id: string;
  title: string;
  description?: string;
  canSkip?: boolean;
  validate?: () => boolean | Promise<boolean>;
  children: React.ReactNode;
  className?: string;
  testId?: string;
}

export function WizardStep({
  children,
  canSkip = false,
  validate,
  className = '',
  testId,
}: WizardStepProps) {
  const context = useContext(WizardContext);
  if (!context) throw new Error('WizardStep must be used within Wizard');

  const {
    currentStep,
    nextStep,
    previousStep,
    canGoPrevious,
    isLastStep,
    submitButtonText,
    saveProgress,
    onSaveProgress,
    errorMessage,
    showError,
    setShowError,
  } = context;

  const [isValidating, setIsValidating] = useState(false);
  const { t } = useTranslation();

  const handleNext = async () => {
    if (validate) {
      setIsValidating(true);
      try {
        const isValid = await validate();
        if (isValid) {
          setShowError(false);
          nextStep();
        } else {
          setShowError(true);
        }
      } finally {
        setIsValidating(false);
      }
    } else {
      setShowError(false);
      nextStep();
    }
  };

  const handleSkip = () => {
    if (canSkip) {
      setShowError(false);
      nextStep();
    }
  };

  const handleSaveProgress = () => {
    onSaveProgress?.(currentStep);
  };

  return (
    <div className={`wx-wizard-step-content ${className}`} data-testid={testId}>
      <div className="wx-wizard-step-body">{children}</div>
      {showError && errorMessage && (
        <div className="wx-wizard-error" role="alert" aria-live="assertive">
          {errorMessage}
        </div>
      )}
      <div className="wx-wizard-step-actions">
        {canGoPrevious && (
          <button
            type="button"
            className="wx-wizard-button wx-wizard-button-secondary"
            onClick={previousStep}
            aria-label={t('wizard.previous')}
          >
            {t('wizard.previous')}
          </button>
        )}
        {saveProgress && (
          <button
            type="button"
            className="wx-wizard-button wx-wizard-button-secondary"
            onClick={handleSaveProgress}
            aria-label={t('wizard.saveContinueLater')}
          >
            {t('wizard.saveContinueLater')}
          </button>
        )}
        <div style={{ flex: 1 }} />
        {canSkip && !isLastStep && (
          <button
            type="button"
            className="wx-wizard-button wx-wizard-button-secondary"
            onClick={handleSkip}
            aria-label={t('wizard.skip')}
          >
            {t('wizard.skip')}
          </button>
        )}
        <button
          type="button"
          className="wx-wizard-button wx-wizard-button-primary"
          onClick={handleNext}
          disabled={isValidating}
          aria-label={isLastStep ? `${submitButtonText}` : t('wizard.next')}
        >
          {isValidating ? t('wizard.validating') : isLastStep ? submitButtonText : t('wizard.next')}
        </button>
      </div>
    </div>
  );
}
