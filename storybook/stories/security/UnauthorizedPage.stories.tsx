// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { UnauthorizedPage } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Pages/UnauthorizedPage',
  component: UnauthorizedPage,
  parameters: { layout: 'padded' },
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
    message: { control: 'text', description: 'Unauthorized message' },
    loginUrl: { control: 'text', description: 'Login page URL' },
  },
  args: {
    message: 'Please sign in to continue.',
    loginUrl: '/login',
  },
} satisfies Meta<typeof UnauthorizedPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomMessage: Story = {
  args: { message: 'Your session has expired. Please log in again.' },
};

