import type { Meta, StoryObj } from '@storybook/react';
import { AccessibilityCenter } from '@waysnx/ui-accessibility';
import { AccessibilityProvider } from '@waysnx/ui-accessibility';
import '@waysnx/ui-accessibility/dist/index.css';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Accessibility/AccessibilityCenter',
  component: AccessibilityCenter,
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
} satisfies Meta<typeof AccessibilityCenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FloatingButton: Story = {
  args: { position: 'bottom-right', variant: 'floating-button', showProfile: true, showQuickActions: true, showSettings: true },
};

export const Panel: Story = {
  args: { variant: 'panel', showProfile: true, showQuickActions: true, showSettings: true },
};

export const Modal: Story = {
  args: { position: 'bottom-right', variant: 'modal', showProfile: true, showSettings: true },
};

export const Drawer: Story = {
  args: { position: 'bottom-right', variant: 'drawer', showProfile: true, showSettings: true },
};

export const MinimalPanel: Story = {
  args: { variant: 'panel', showProfile: false, showAccessibilityScore: false, showQuickActions: true, showSettings: false },
};

export const BottomLeft: Story = {
  args: { position: 'bottom-left', variant: 'floating-button', showProfile: true, showSettings: true },
};

export const DarkTheme: Story = {
  args: { variant: 'panel', showProfile: true, showQuickActions: true, showSettings: true },
  decorators: [
    (Story) => (
      <AccessibilityProvider persistSettings={false} defaultSettings={{ contrast: 'high' }}>
        <Story />
      </AccessibilityProvider>
    ),
  ],
};

export const Accessibility: Story = {
  args: { variant: 'panel', showProfile: true, showQuickActions: true, showSettings: true },
  parameters: {
    a11y: { config: { rules: [{ id: 'button-name', enabled: true }, { id: 'label', enabled: true }] } },
  },
};

/**
 * Text spacing pre-applied to "loose". The sample paragraph below the panel
 * demonstrates the letter-spacing, word-spacing, and line-height applied via
 * the --wx-accessibility-* variables. Change the Text Spacing dropdown to
 * see it update live.
 */
export const TextSpacingLoose: Story = {
  args: { variant: 'panel', showProfile: false, showQuickActions: false, showSettings: true },
  decorators: [
    (Story) => (
      <AccessibilityProvider persistSettings={false} defaultSettings={{ textSpacing: 'loose' }}>
        <div style={{ maxWidth: 600 }}>
          <Story />
          <p style={{ marginTop: 24 }}>
            This sample paragraph shows the effect of the "loose" text spacing setting.
            Notice the increased letter spacing, word spacing, and line height applied
            to the document body. Switch the Text Spacing dropdown between Normal, Loose,
            and Extra Loose to see the difference.
          </p>
        </div>
      </AccessibilityProvider>
    ),
  ],
};
