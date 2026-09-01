// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { BiometricButton } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Social Login/BiometricButton',
  component: BiometricButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Security" />
        <Story />
      </div>
    ),
  ],
  argTypes: {
    biometricType: { control: 'select', options: ['fingerprint', 'face', 'auto'], description: 'Biometric type' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Button size' },
    variant: { control: 'select', options: ['primary', 'secondary', 'outline', 'ghost'], description: 'Button style variant' },
    label: { control: 'text', description: 'Button label' },
  },
  args: {
    onAuthenticate: fn(),
    label: 'Authenticate',
    biometricType: 'fingerprint',
  },
} satisfies Meta<typeof BiometricButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FaceRecognition: Story = {
  args: { biometricType: 'face', label: 'Face ID' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

