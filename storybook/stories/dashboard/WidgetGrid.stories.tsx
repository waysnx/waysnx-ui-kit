import type { Meta } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { WidgetGrid, WidgetRow, WidgetColumn, Widget } from '@waysnx/ui-dashboard';

const meta = {
  title: 'Dashboard/Layout',
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
} satisfies Meta<typeof WidgetGrid>;

export default meta;

export const GridBasic = {
  render: () => (
    <WidgetGrid columns={{ lg: 3 }} gap={16}>
      <Widget title="Widget 1">Content 1</Widget>
      <Widget title="Widget 2">Content 2</Widget>
      <Widget title="Widget 3">Content 3</Widget>
    </WidgetGrid>
  ),
};

export const GridResponsive = {
  render: () => (
    <WidgetGrid
      columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      gap={16}
    >
      <Widget title="Widget 1">Content</Widget>
      <Widget title="Widget 2">Content</Widget>
      <Widget title="Widget 3">Content</Widget>
      <Widget title="Widget 4">Content</Widget>
    </WidgetGrid>
  ),
};

export const GridAutoFit = {
  render: () => (
    <WidgetGrid autoFit minWidth={250} gap={16}>
      <Widget title="Widget 1">Content</Widget>
      <Widget title="Widget 2">Content</Widget>
      <Widget title="Widget 3">Content</Widget>
      <Widget title="Widget 4">Content</Widget>
      <Widget title="Widget 5">Content</Widget>
    </WidgetGrid>
  ),
};

export const GridAllBreakpoints = {
  render: () => (
    <div style={{ padding: '16px' }}>
      <p style={{ marginBottom: '16px', color: 'var(--wx-color-text-muted)' }}>
        Resize the window to see columns adjust: 1 (mobile) → 2 (sm ≥576px) → 3 (md ≥768px) → 4 (lg ≥1024px) → 6 (xl ≥1280px)
      </p>
      <WidgetGrid columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 6 }} gap={16}>
        {Array.from({ length: 6 }, (_, i) => (
          <Widget key={i} title={`Widget ${i + 1}`}>Content {i + 1}</Widget>
        ))}
      </WidgetGrid>
    </div>
  ),
};

export const ColumnSpanGrid = {
  render: () => (
    <div style={{ padding: '16px' }}>
      <p style={{ marginBottom: '16px', color: 'var(--wx-color-text-muted)' }}>
        12-column grid using WidgetColumn <code>span</code> prop. Row 1: three span={'{4}'} columns. Row 2: span={'{8}'} + span={'{4}'}.
      </p>
      <WidgetGrid columns={{ lg: 12 }} gap={16}>
        <WidgetColumn span={4}><Widget title="Span 4">33% width</Widget></WidgetColumn>
        <WidgetColumn span={4}><Widget title="Span 4">33% width</Widget></WidgetColumn>
        <WidgetColumn span={4}><Widget title="Span 4">33% width</Widget></WidgetColumn>
        <WidgetColumn span={8}><Widget title="Span 8">67% width</Widget></WidgetColumn>
        <WidgetColumn span={4}><Widget title="Span 4">33% width</Widget></WidgetColumn>
      </WidgetGrid>
    </div>
  ),
};

export const RowLayout = {
  render: () => (
    <WidgetRow gap={16}>
      <Widget title="Widget 1">Content</Widget>
      <Widget title="Widget 2">Content</Widget>
      <Widget title="Widget 3">Content</Widget>
    </WidgetRow>
  ),
};

export const ColumnFlexLayout = {
  render: () => (
    <WidgetRow gap={16}>
      <WidgetColumn flex={2}><Widget title="Flex 2">2x wider</Widget></WidgetColumn>
      <WidgetColumn flex={1}><Widget title="Flex 1">Normal</Widget></WidgetColumn>
      <WidgetColumn flex={1}><Widget title="Flex 1">Normal</Widget></WidgetColumn>
    </WidgetRow>
  ),
};

export const ColumnLayout = {
  render: () => (
    <WidgetColumn gap={16}>
      <Widget title="Widget 1">Content 1</Widget>
      <Widget title="Widget 2">Content 2</Widget>
      <Widget title="Widget 3">Content 3</Widget>
    </WidgetColumn>
  ),
};

export const MixedLayout = {
  render: () => (
    <WidgetColumn gap={16}>
      <WidgetRow gap={16}>
        <Widget title="Widget 1" style={{ flex: 2 }}>Content</Widget>
        <Widget title="Widget 2">Content</Widget>
      </WidgetRow>
      <WidgetGrid columns={{ lg: 3 }} gap={16}>
        <Widget title="Widget 3">Content</Widget>
        <Widget title="Widget 4">Content</Widget>
        <Widget title="Widget 5">Content</Widget>
      </WidgetGrid>
    </WidgetColumn>
  ),
};

export const DashboardLayout = {
  render: () => (
    <WidgetColumn gap={16} style={{ padding: '16px' }}>
      {/* Header row - KPIs */}
      <WidgetGrid columns={{ xs: 2, md: 4 }} gap={16}>
        <Widget title="Revenue">$1.2M</Widget>
        <Widget title="Orders">2,456</Widget>
        <Widget title="Customers">10.2K</Widget>
        <Widget title="Growth">+12%</Widget>
      </WidgetGrid>

      {/* Charts row */}
      <WidgetGrid columns={{ lg: 2 }} gap={16}>
        <Widget title="Revenue Trend" style={{ minHeight: '300px' }}>
          Chart placeholder
        </Widget>
        <Widget title="Category Breakdown" style={{ minHeight: '300px' }}>
          Chart placeholder
        </Widget>
      </WidgetGrid>

      {/* Tables row */}
      <WidgetGrid columns={{ lg: 2 }} gap={16}>
        <Widget title="Top Products" style={{ minHeight: '250px' }}>
          Table placeholder
        </Widget>
        <Widget title="Recent Orders" style={{ minHeight: '250px' }}>
          Table placeholder
        </Widget>
      </WidgetGrid>
    </WidgetColumn>
  ),
};
