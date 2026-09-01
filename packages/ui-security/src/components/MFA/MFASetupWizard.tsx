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
  [key: string]: any;
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
    <div maxWidth="600px" margin="0 auto" padding="lg">
      {/* Header */}
      <div marginBottom="lg">
        <span as="h2" fontSize="lg" fontWeight="bold" marginBottom="sm">
          Set Up Multi-Factor Authentication
        </span>
        <span fontSize="sm" color="muted">
          Step {activeStep + 1} of {displaySteps.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div
        height="4px"
        backgroundColor="border"
        borderRadius="full"
        marginBottom="lg"
        overflow="hidden"
      >
        <div
          height="100%"
          backgroundColor="primary"
          width={`${progress}%`}
          transition="width 0.3s ease"
        />
      </div>

      {/* Step Indicator */}
      <Stack gap="sm" direction="row" marginBottom="lg">
        {displaySteps.map((step, idx) => (
          <div
            key={step.id}
            flex={1}
            padding="sm"
            backgroundColor={idx <= activeStep ? 'primary' : 'border'}
            borderRadius="md"
            textAlign="center"
            color={idx <= activeStep ? 'white' : 'muted'}
            cursor={idx < activeStep ? 'pointer' : 'default'}
            onClick={() => idx < activeStep && setActiveStep(idx)}
          >
            <span fontSize="xs" fontWeight="bold">
              {idx + 1}
            </span>
          </div>
        ))}
      </Stack>

      {/* Current Step Content */}
      {currentStepData && (
        <div
          padding="lg"
          backgroundColor="background-alt"
          borderRadius="md"
          marginBottom="lg"
        >
          <span as="h3" fontSize="base" fontWeight="bold" marginBottom="sm">
            {currentStepData.title}
          </span>
          <span fontSize="sm" color="muted">
            {currentStepData.description}
          </span>

          {/* Placeholder for step-specific content */}
          <div marginTop="lg" minHeight="200px" backgroundColor="background">
            <span color="muted" textAlign="center">
              Step content goes here
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <Stack gap="md" direction="row" justifyContent="space-between">
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

      {/* Cancel */}
      <div textAlign="center" marginTop="lg">
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
