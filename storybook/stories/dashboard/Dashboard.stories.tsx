import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { Dashboard, DashboardToolbar, Widget, WidgetGrid, DashboardSearch } from '@waysnx/ui-dashboard';

const meta = {
  title: 'Dashboard/Dashboard',
  component: Dashboard,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Dashboard" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Dashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Dashboard title="Analytics Dashboard">
      <Widget title="Widget 1">Content goes here</Widget>
    </Dashboard>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <Dashboard
      title="Sales Dashboard"
      description="Real-time sales metrics and analytics"
    >
      <WidgetGrid columns={{ lg: 2 }}>
        <Widget title="Revenue">$1.2M</Widget>
        <Widget title="Orders">2,456</Widget>
      </WidgetGrid>
    </Dashboard>
  ),
};

export const WithToolbar: Story = {
  render: () => (
    <Dashboard
      title="Analytics"
      toolbar={
        <DashboardToolbar
          left={<DashboardSearch placeholder="Search..." />}
          right={<button>Export</button>}
        />
      }
    >
      <Widget title="Chart Widget">Your chart here</Widget>
    </Dashboard>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <Dashboard
      title="Analytics Dashboard"
      config={{ theme: 'dark' }}
    >
      <WidgetGrid columns={{ lg: 2 }}>
        <Widget title="Widget 1">Content</Widget>
        <Widget title="Widget 2">Content</Widget>
      </WidgetGrid>
    </Dashboard>
  ),
};

export const Loading: Story = {
  render: () => (
    <Dashboard title="Loading Dashboard" loading={true}>
      <Widget title="Widget">Content</Widget>
    </Dashboard>
  ),
};

export const Complex: Story = {
  render: () => (
    <Dashboard
      title="Executive Dashboard"
      description="Real-time business metrics"
      config={{ theme: 'light' }}
      toolbar={
        <DashboardToolbar
          left={<DashboardSearch placeholder="Search dashboards..." />}
          right={
            <div style={{ display: 'flex', gap: '8px' }}>
              <button>Refresh</button>
              <button>Export</button>
            </div>
          }
        />
      }
      footer={<div>Last updated: {new Date().toLocaleString()}</div>}
    >
      <WidgetGrid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} gap={16}>
        <Widget title="Total Revenue" subtitle="Last 30 days">
          $1.2M
        </Widget>
        <Widget title="Total Orders" subtitle="This month">
          2,456
        </Widget>
        <Widget title="Growth Rate" subtitle="YoY">
          +15%
        </Widget>
        <Widget title="Customer Satisfaction" subtitle="Average">
          4.8/5
        </Widget>
      </WidgetGrid>
    </Dashboard>
  ),
};
