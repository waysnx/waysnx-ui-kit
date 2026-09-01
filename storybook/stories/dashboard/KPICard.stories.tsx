import type { Meta } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { StatCard, MetricCard, ProgressCard, WidgetGrid } from '@waysnx/ui-dashboard';

const meta = {
  title: 'Dashboard/KPI Cards',
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Dashboard" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StatCard>;

export default meta;

export const StatCardBasic = {
  render: () => (
    <StatCard
      data={{
        label: 'Total Revenue',
        value: '$1.2M',
        trend: 'up',
        change: 15,
        status: 'success',
      }}
    />
  ),
};

export const StatCardDown = {
  render: () => (
    <StatCard
      data={{
        label: 'Churn Rate',
        value: '2.3%',
        trend: 'down',
        change: 0.5,
        status: 'warning',
      }}
    />
  ),
};

export const StatCardNeutral = {
  render: () => (
    <StatCard
      data={{
        label: 'Customers',
        value: '10,234',
        trend: 'neutral',
        change: 0,
        status: 'info',
      }}
    />
  ),
};

export const StatCardCustomTrendIcons = {
  render: () => (
    <WidgetGrid columns={{ xs: 1, md: 3 }} gap={16}>
      {/* Default — built-in SVG arrows */}
      <StatCard
        data={{ label: 'Default SVG', value: '$1.2M', trend: 'up', change: 15, status: 'success' }}
      />
      {/* Emoji override */}
      <StatCard
        data={{ label: 'Emoji Icons', value: '$340K', trend: 'down', change: 5, status: 'error' }}
        trendIcons={{ up: '📈', down: '📉', neutral: '→' }}
      />
      {/* Text symbol override */}
      <StatCard
        data={{ label: 'Text Symbols', value: '12.5%', trend: 'up', change: 2.3, status: 'info' }}
        trendIcons={{ up: '▲', down: '▼', neutral: '●' }}
      />
    </WidgetGrid>
  ),
};

export const MetricCardBasic = {
  render: () => (
    <MetricCard
      data={{
        label: 'Sales Target',
        actual: 850,
        target: 1000,
        progress: 85,
        status: 'success',
      }}
    />
  ),
};

export const MetricCardBelowTarget = {
  render: () => (
    <MetricCard
      data={{
        label: 'Conversion Rate',
        actual: 2.1,
        target: 3.5,
        unit: '%',
        progress: 60,
        status: 'warning',
      }}
    />
  ),
};

export const ProgressCardLinear = {
  render: () => (
    <ProgressCard
      label="Project Completion"
      progress={75}
      type="linear"
      status="success"
      showPercentage={true}
    />
  ),
};

export const ProgressCardCircular = {
  render: () => (
    <ProgressCard
      label="Task Progress"
      progress={60}
      type="circular"
      status="info"
      showPercentage={true}
    />
  ),
};

export const ProgressCardVariants = {
  render: () => (
    <WidgetGrid columns={{ lg: 2 }} gap={20}>
      <div>
        <ProgressCard
          label="Success"
          progress={100}
          type="circular"
          status="success"
        />
      </div>
      <div>
        <ProgressCard
          label="Warning"
          progress={50}
          type="circular"
          status="warning"
        />
      </div>
      <div>
        <ProgressCard
          label="Error"
          progress={25}
          type="circular"
          status="error"
        />
      </div>
      <div>
        <ProgressCard
          label="Pending"
          progress={75}
          type="circular"
          status="pending"
        />
      </div>
    </WidgetGrid>
  ),
};

export const KPIDashboard = {
  render: () => (
    <WidgetGrid columns={{ xs: 2, md: 4 }} gap={16}>
      <StatCard
        data={{
          label: 'Revenue',
          value: '$1.2M',
          trend: 'up',
          change: 12,
          status: 'success',
        }}
      />
      <StatCard
        data={{
          label: 'Orders',
          value: '2,456',
          trend: 'up',
          change: 8,
          status: 'success',
        }}
      />
      <StatCard
        data={{
          label: 'Customers',
          value: '10.2K',
          trend: 'up',
          change: 5,
          status: 'success',
        }}
      />
      <StatCard
        data={{
          label: 'Satisfaction',
          value: '4.8/5',
          status: 'success',
        }}
      />
    </WidgetGrid>
  ),
};
