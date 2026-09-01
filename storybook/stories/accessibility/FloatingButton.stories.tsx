import type { Meta, StoryObj } from '@storybook/react';
import { FloatingButton } from '@waysnx/ui-accessibility';
import { AccessibilityProvider } from '@waysnx/ui-accessibility';
import '@waysnx/ui-accessibility/dist/index.css';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Accessibility/FloatingButton',
  component: FloatingButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <AccessibilityProvider persistSettings={false}>
        <div>
          <TestBadge componentName="Accessibility" />
          <Story />
        </div>
      </AccessibilityProvider>
    ),
  ],
} satisfies Meta<typeof FloatingButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { position: 'bottom-right', onClick: () => alert('Accessibility center opened') },
};

export const BottomLeft: Story = {
  args: { position: 'bottom-left', onClick: () => {} },
};

export const TopRight: Story = {
  args: { position: 'top-right', onClick: () => {} },
};

export const CustomAriaLabel: Story = {
  args: {
    position: 'bottom-right',
    ariaLabel: 'Open accessibility options',
    onClick: () => {},
  },
};

export const Accessibility: Story = {
  args: { position: 'bottom-right', ariaLabel: 'Open accessibility settings', onClick: () => {} },
  parameters: {
    a11y: { config: { rules: [{ id: 'button-name', enabled: true }] } },
  },
};
