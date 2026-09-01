import type { Meta } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { ChartWidget, TableWidget, FormWidget } from '@waysnx/ui-dashboard';

const meta = {
  title: 'Dashboard/Specialized Widgets',
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
} satisfies Meta<typeof ChartWidget>;

export default meta;

export const ChartWidgetBasic = {
  render: () => (
    <ChartWidget
      id="sales-chart"
      title="Sales Trend"
      subtitle="Last 30 days"
    >
      <div style={{
        width: '100%',
        height: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
      }}>
        Chart Component Here (e.g., Recharts, Chart.js)
      </div>
    </ChartWidget>
  ),
};

export const ChartWidgetWithActions = {
  render: () => (
    <ChartWidget
      id="revenue-chart"
      title="Revenue"
      loading={false}
      onRefresh={() => console.log('Refresh clicked')}
      onExport={() => console.log('Export clicked')}
      onFullscreen={() => console.log('Fullscreen clicked')}
    >
      <div style={{
        width: '100%',
        height: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
      }}>
        Chart Component
      </div>
    </ChartWidget>
  ),
};

export const ChartWidgetLoading = {
  render: () => (
    <ChartWidget
      id="loading-chart"
      title="Loading Chart"
      loading={true}
    />
  ),
};

export const ChartWidgetError = {
  render: () => (
    <ChartWidget
      id="error-chart"
      title="Chart Error"
      error={new Error('Failed to load chart data')}
    />
  ),
};

export const TableWidgetBasic = {
  render: () => (
    <TableWidget
      id="users-table"
      title="Users"
      subtitle="Active users"
    >
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Email</th>
            <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>John Doe</td>
            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>john@example.com</td>
            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Active</td>
          </tr>
          <tr>
            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Jane Smith</td>
            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>jane@example.com</td>
            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Active</td>
          </tr>
        </tbody>
      </table>
    </TableWidget>
  ),
};

export const TableWidgetWithPagination = {
  render: () => (
    <TableWidget
      id="paginated-table"
      title="Paginated Data"
      paginated
      currentPage={1}
      totalPages={5}
      onPageChange={(page) => console.log('Page changed to', page)}
    >
      <div>Table content here</div>
    </TableWidget>
  ),
};

export const FormWidgetBasic = {
  render: () => (
    <FormWidget
      id="settings-form"
      title="Settings"
      onSubmit={(data) => console.log('Form submitted', data)}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label>Name</label>
          <input type="text" placeholder="Enter name" style={{ width: '100%', padding: '8px', marginTop: '4px' }} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" placeholder="Enter email" style={{ width: '100%', padding: '8px', marginTop: '4px' }} />
        </div>
        <button type="submit">Submit</button>
      </div>
    </FormWidget>
  ),
};
