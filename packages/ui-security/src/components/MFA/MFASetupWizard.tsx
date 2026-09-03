/**
 * MFASetupWizard Component
 * 
 * Multi-step wizard for setting up MFA methods (TOTP, backup codes, etc).
 */

import React, { useState } from 'react';
import { Button } from '@waysnx/ui-core';
import { Stack } from '@waysnx/ui-layout';

export type MFAMethod = 'totp' | 'sms' | 'email' | 'backup-codes' | 'webauthn';

export interface MFASetupStep {
  id: MFAMethod;
  title: string;
  description: string;
}

export interface MFASetupWizardProps {
  /**
   * Available MFA methods to set up
   */
  methods?: MFAMethod[];
  /**
   * Step labels
   */
  steps?: MFASetupStep[];
  /**
   * Current step index
   */
  currentStep?: number;
  /**
   * Callback when step is completed
   */
  onStepComplete?: (method: MFAMethod, data: any) => Promise<void>;
  /**
   * Callback when wizard is completed
   */
  onComplete?: (backupMethods: MFAMethod[]) => void;
  /**
   * Callback when wizard is cancelled
   */
  onCancel?: () => void;
  /**
   * Whether setup is in progress
   */
  isLoading?: boolean;
}

/**
 * MFASetupWizard - Multi-step wizard for MFA setup
 */
export const MFASetupWizard: React.FC<MFASetupWizardProps> = ({
  methods = ['totp', 'backup-codes'],
  steps,
  currentStep = 0,
  onStepComplete,
  onComplete,
  onCancel,
  isLoading = false,
}) => {
  const [completed, setCompleted] = useState<MFAMethod[]>([]);
  const [activeStep, setActiveStep] = useState(currentStep);

  const defaultSteps: MFASetupStep[] = [
    {
      id: 'totp',
      title: 'Authenticator App',
      description: 'Use an authenticator app like Google Authenticator or Authy',
    },
    {
      id: 'sms',
      title: 'SMS Text Message',
      description: 'Receive codes via text message',
    },
    {
      id: 'email',
      title: 'Email',
      description: 'Receive codes via email',
    },
    {
      id: 'backup-codes',
      title: 'Backup Codes',
      description: 'Save secure backup codes',
    },
    {
      id: 'webauthn',
      title: 'Security Key',
      description: 'Use a hardware security key',
    },
  ];

  const displaySteps = steps || defaultSteps.filter(s => methods.includes(s.id));
  const currentStepData = displaySteps[activeStep];

  const handleStepComplete = async () => {
    try {
      await onStepComplete?.(currentStepData.id, {});
      setCompleted([...completed, currentStepData.id]);

      if (activeStep < displaySteps.length - 1) {
        setActiveStep(activeStep + 1);
      } else {
        onComplete?.([...completed, currentStepData.id]);
      }
    } catch (error) {
      console.error('Step completion failed:', error);
    }
  };

  const handleSkip = () => {
    if (activeStep < displaySteps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      onComplete?.(completed);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const progress = ((activeStep + 1) / displaySteps.length) * 100;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: 16 }}>
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: 8 }}>
          Set Up Multi-Factor Authentication
        </h2>
        <span style={{ fontSize: '0.875rem', color: 'var(--wx-color-text-muted, #717182)' }}>
          Step {activeStep + 1} of {displaySteps.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          height: '4px',
          background: 'var(--wx-color-border, #ccc)',
          borderRadius: 9999,
          marginBottom: 16,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            background: 'var(--wx-color-primary, #030213)',
            width: `${progress}%`,
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      {/* Step Indicator */}
      <div style={{ marginBottom: 16 }}>
        <Stack gap="sm" direction="horizontal">
          {displaySteps.map((step, idx) => (
            <div
              key={step.id}
              style={{
                flex: 1,
                padding: 8,
                background: idx <= activeStep ? 'var(--wx-color-primary, #030213)' : 'var(--wx-color-border, #ccc)',
                borderRadius: 8,
                textAlign: 'center',
                color: idx <= activeStep ? '#fff' : 'var(--wx-color-text-muted, #717182)',
                cursor: idx < activeStep ? 'pointer' : 'default',
              }}
              onClick={() => idx < activeStep && setActiveStep(idx)}
            >
              <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                {idx + 1}
              </span>
            </div>
          ))}
        </Stack>
      </div>

      {/* Current Step Content */}
      {currentStepData && (
        <div
          style={{
            padding: 16,
            background: 'var(--wx-color-background-alt, #f3f3f5)',
            borderRadius: 8,
            marginBottom: 16,
          }}
        >
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8 }}>
            {currentStepData.title}
          </h3>
          <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--wx-color-text-muted, #717182)' }}>
            {currentStepData.description}
          </span>

          {/* Placeholder for step-specific content */}
          <div style={{ marginTop: 16, minHeight: '200px', background: 'var(--wx-color-background, #ffffff)' }}>
            <span style={{ display: 'block', color: 'var(--wx-color-text-muted, #717182)', textAlign: 'center' }}>
              Step content goes here
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Stack gap="md" direction="horizontal">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={activeStep === 0 || isLoading}
          >
            Back
          </Button>

          <Button
            variant="ghost"
            onClick={handleSkip}
            disabled={isLoading}
          >
            Skip for Now
          </Button>

          <Button
            variant="primary"
            onClick={handleStepComplete}
            disabled={isLoading}
          >
            {activeStep === displaySteps.length - 1 ? 'Complete Setup' : 'Next'}
          </Button>
        </Stack>
      </div>

      {/* Cancel */}
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <Button
          variant="ghost"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel Setup
        </Button>
      </div>
    </div>
  );
};

MFASetupWizard.displayName = 'MFASetupWizard';

export default MFASetupWizard;
