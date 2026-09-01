/**
 * @file StepNavigation.stories.tsx
 * Storybook stories for StepNavigation component
 */

import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { StepNavigation } from '@waysnx/ui-navigation';
import type { StepItem } from '@waysnx/ui-navigation';
import { useState } from 'react';

const EXAMPLE_STEPS: StepItem[] = [
  {
    id: 'personal',
    label: 'Personal Info',
    description: 'Your personal details',
  },
  {
    id: 'address',
    label: 'Address',
    description: 'Where you live',
  },
  {
    id: 'payment',
    label: 'Payment',
    description: 'Payment method',
  },
  {
    id: 'confirm',
    label: 'Confirm',
    description: 'Review & confirm',
  },
];

const meta: Meta<typeof StepNavigation> = {
  title: 'Enterprise/StepNavigation',
  component: StepNavigation,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['horizontal', 'vertical', 'dots'],
    },
    showDescriptions: {
      control: 'boolean',
    },
    showProgress: {
      control: 'boolean',
    },
    allowBacktrack: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Navigation" />
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default horizontal variant
export const Default: Story = {
  render: (args) => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <StepNavigation
          {...args}
          steps={EXAMPLE_STEPS}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
      </div>
    );
  },
  args: {
    variant: 'horizontal',
    showDescriptions: false,
    showProgress: true,
    allowBacktrack: true,
  },
};

// Horizontal with descriptions
export const HorizontalWithDescriptions: Story = {
  render: (args) => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <StepNavigation
          {...args}
          steps={EXAMPLE_STEPS}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
      </div>
    );
  },
  args: {
    variant: 'horizontal',
    showDescriptions: true,
    showProgress: true,
    allowBacktrack: true,
  },
};

// Vertical variant
export const Vertical: Story = {
  render: (args) => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <StepNavigation
          {...args}
          steps={EXAMPLE_STEPS}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
      </div>
    );
  },
  args: {
    variant: 'vertical',
    showDescriptions: true,
    showProgress: true,
    allowBacktrack: true,
  },
};

// Dots variant
export const Dots: Story = {
  render: (args) => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <StepNavigation
          {...args}
          steps={EXAMPLE_STEPS}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
      </div>
    );
  },
  args: {
    variant: 'dots',
    showDescriptions: true,
    showProgress: true,
    allowBacktrack: true,
  },
};

// No backtrack - only forward navigation
export const NoBacktrack: Story = {
  render: (args) => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <StepNavigation
          {...args}
          steps={EXAMPLE_STEPS}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
      </div>
    );
  },
  args: {
    variant: 'horizontal',
    showDescriptions: false,
    showProgress: true,
    allowBacktrack: false,
  },
};

// Without progress bar
export const WithoutProgress: Story = {
  render: (args) => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <StepNavigation
          {...args}
          steps={EXAMPLE_STEPS}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
      </div>
    );
  },
  args: {
    variant: 'horizontal',
    showDescriptions: true,
    showProgress: false,
    allowBacktrack: true,
  },
};

// With custom button labels
export const CustomLabels: Story = {
  render: (args) => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <StepNavigation
          {...args}
          steps={EXAMPLE_STEPS}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          previousLabel="← Go Back"
          nextLabel="Continue →"
          finishLabel="Complete Setup"
        />
      </div>
    );
  },
  args: {
    variant: 'horizontal',
    showDescriptions: true,
    showProgress: true,
    allowBacktrack: true,
  },
};

// With validation
export const WithValidation: Story = {
  render: (args) => {
    const [currentStep, setCurrentStep] = useState(0);

    const handleValidate = (stepIndex: number) => {
      // Simulate validation - require at least one step to be valid
      if (stepIndex < 3) {
        alert(`Please complete step ${stepIndex + 1} before proceeding`);
        return false;
      }
      return true;
    };

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <StepNavigation
          {...args}
          steps={EXAMPLE_STEPS}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          onValidateStep={handleValidate}
        />
      </div>
    );
  },
  args: {
    variant: 'horizontal',
    showDescriptions: true,
    showProgress: true,
    allowBacktrack: true,
  },
};

// Interactive with all features
export const Interactive: Story = {
  render: (args) => {
    const [currentStep, setCurrentStep] = useState(0);

    const handleFinish = () => {
      alert('Wizard completed!');
    };

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <StepNavigation
          {...args}
          steps={EXAMPLE_STEPS}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          onFinish={handleFinish}
          showFinishButton={true}
        />
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <h3>Step Content Placeholder</h3>
          <p>Current step: {EXAMPLE_STEPS[currentStep].label}</p>
          <p>{EXAMPLE_STEPS[currentStep].description}</p>
          <textarea
            placeholder="Enter your information here..."
            style={{
              width: '100%',
              height: '120px',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              fontFamily: 'inherit',
            }}
          />
        </div>
      </div>
    );
  },
  args: {
    variant: 'horizontal',
    showDescriptions: true,
    showProgress: true,
    allowBacktrack: true,
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => {
    const SimpleExample = ({ variant }: { variant: 'horizontal' | 'vertical' | 'dots' }) => {
      const [currentStep, setCurrentStep] = useState(0);

      return (
        <div style={{ marginBottom: '48px' }}>
          <h3 style={{ marginBottom: '16px' }}>{variant.charAt(0).toUpperCase() + variant.slice(1)} Variant</h3>
          <StepNavigation
            variant={variant}
            steps={EXAMPLE_STEPS}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            showDescriptions={true}
            showProgress={true}
          />
        </div>
      );
    };

    return (
      <div>
        <SimpleExample variant="horizontal" />
        <SimpleExample variant="vertical" />
        <SimpleExample variant="dots" />
      </div>
    );
  },
};

// Short wizard (2 steps)
export const ShortWizard: Story = {
  render: (args) => {
    const shortSteps: StepItem[] = [
      { id: 'agree', label: 'Agree to Terms', description: 'Read and accept our terms' },
      { id: 'confirm', label: 'Confirm', description: 'Final confirmation' },
    ];

    const [currentStep, setCurrentStep] = useState(0);

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <StepNavigation
          {...args}
          steps={shortSteps}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
      </div>
    );
  },
  args: {
    variant: 'horizontal',
    showDescriptions: true,
    showProgress: true,
    allowBacktrack: true,
  },
};

// Long wizard (many steps)
export const LongWizard: Story = {
  render: (args) => {
    const longSteps: StepItem[] = Array.from({ length: 10 }, (_, i) => ({
      id: `step-${i + 1}`,
      label: `Step ${i + 1}`,
      description: `This is step ${i + 1} of the process`,
    }));

    const [currentStep, setCurrentStep] = useState(0);

    return (
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <StepNavigation
          {...args}
          steps={longSteps}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
      </div>
    );
  },
  args: {
    variant: 'vertical',
    showDescriptions: true,
    showProgress: true,
    allowBacktrack: true,
  },
};
