import type { Meta, StoryObj } from '@storybook/react';
import { FloatingButton } from './FloatingButton';
import { TranslationProvider } from '@waysnx/ui-i18n';
import { defaultMessages } from '@waysnx/ui-i18n';
import { accessibilityEnMessages } from '../../locales';
import './FloatingButton.css';

const meta = {
  title: 'AccessibilityCenter/FloatingButton',
  component: FloatingButton,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <TranslationProvider locale="en" messages={{ ...defaultMessages, ...accessibilityEnMessages }}>
        <div style={{ padding: '20px', minHeight: '100vh', background: '#f5f5f5' }}>
          <h1>Floating Button Demonstrations</h1>
          <p>Scroll around to see the floating button in different positions</p>
          <Story />
        </div>
      </TranslationProvider>
    ),
  ],
} satisfies Meta<typeof FloatingButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Bottom Right
export const BottomRight: Story = {
  args: {
    position: 'bottom-right',
    onClick: () => console.log('Floating button clicked'),
  },
};

// Bottom Left
export const BottomLeft: Story = {
  args: {
    position: 'bottom-left',
    onClick: () => console.log('Floating button clicked'),
  },
};

// Top Right
export const TopRight: Story = {
  args: {
    position: 'top-right',
    onClick: () => console.log('Floating button clicked'),
  },
};

// Top Left
export const TopLeft: Story = {
  args: {
    position: 'top-left',
    onClick: () => console.log('Floating button clicked'),
  },
};

// With Custom Class
export const CustomClass: Story = {
  args: {
    position: 'bottom-right',
    className: 'custom-floating-button',
    onClick: () => console.log('Floating button clicked'),
  },
};

// With Custom Aria Label
export const CustomAriaLabel: Story = {
  args: {
    position: 'bottom-right',
    ariaLabel: 'Open accessibility options',
    onClick: () => console.log('Floating button clicked'),
  },
};

// With Custom Styling
export const CustomStyle: Story = {
  args: {
    position: 'bottom-right',
    style: {
      backgroundColor: '#007bff',
      color: 'white',
    },
    onClick: () => console.log('Floating button clicked'),
  },
};

// Interactive Click Handler
export const Interactive: Story = {
  args: {
    position: 'bottom-right',
    onClick: () => alert('Accessibility Center would open here!'),
  },
};
