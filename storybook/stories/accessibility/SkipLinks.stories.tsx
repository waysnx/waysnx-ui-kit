import type { Meta, StoryObj } from '@storybook/react';
import { SkipLinks } from '@waysnx/ui-accessibility';
import { AccessibilityProvider } from '@waysnx/ui-accessibility';
import '@waysnx/ui-accessibility/dist/index.css';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Accessibility/SkipLinks',
  component: SkipLinks,
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
} satisfies Meta<typeof SkipLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const MultipleLinks: Story = {
  args: {
    links: [
      { targetId: 'main-content', label: 'Skip to main content' },
      { targetId: 'main-nav', label: 'Skip to navigation' },
      { targetId: 'search', label: 'Skip to search' },
    ],
  },
};

export const CustomLabel: Story = {
  args: {
    links: [{ targetId: 'content', label: 'Jump to content' }],
  },
};

export const Accessibility: Story = {
  args: {
    links: [
      { targetId: 'main-content', label: 'Skip to main content' },
      { targetId: 'main-nav', label: 'Skip to navigation' },
    ],
  },
  parameters: {
    a11y: { config: { rules: [{ id: 'link-name', enabled: true }] } },
  },
};
