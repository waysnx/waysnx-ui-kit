import type { Meta, StoryObj } from '@storybook/react';
import { PresenceIndicator } from '@waysnx/ui-communication';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Communication/PresenceIndicator',
  component: PresenceIndicator,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { status: { control: 'select', options: ['online', 'away', 'busy', 'offline'] }, size: { control: 'select', options: ['sm', 'md', 'lg'] }, showLabel: { control: 'boolean' } },
  decorators: [(Story) => (<div><TestBadge componentName="Communication" /><Story /></div>)],
} satisfies Meta<typeof PresenceIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Online: Story = { args: { status: 'online', showLabel: true } };
export const Away: Story = { args: { status: 'away', showLabel: true } };
export const Busy: Story = { args: { status: 'busy', showLabel: true } };
export const Offline: Story = { args: { status: 'offline', showLabel: true } };
export const Sizes: Story = { args: { status: 'online' }, render: () => <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}><PresenceIndicator status="online" size="sm" showLabel /><PresenceIndicator status="online" size="md" showLabel /><PresenceIndicator status="online" size="lg" showLabel /></div> };
export const AllStatuses: Story = { args: { status: 'online' }, render: () => <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}><PresenceIndicator status="online" size="md" showLabel /><PresenceIndicator status="away" size="md" showLabel /><PresenceIndicator status="busy" size="md" showLabel /><PresenceIndicator status="offline" size="md" showLabel /></div> };
