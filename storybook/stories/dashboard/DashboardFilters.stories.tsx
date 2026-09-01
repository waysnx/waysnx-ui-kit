import type { Meta } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { DashboardFilterBar, FilterChip, DashboardSearch, DashboardProvider } from '@waysnx/ui-dashboard';

const meta = {
  title: 'Dashboard/Filters & Search',
  decorators: [
    (Story) => (
      <DashboardProvider>
        <div>
          <TestBadge componentName="Dashboard" />
          <Story />
        </div>
      </DashboardProvider>
    ),
  ],
} satisfies Meta<typeof DashboardFilterBar>;

export default meta;

export const FilterBarBasic = {
  render: () => (
    <DashboardFilterBar
      filters={[
        {
          id: 'status',
          label: 'Status',
          type: 'select',
          options: [
            { label: 'All', value: '' },
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
          ],
        },
      ]}
    />
  ),
};

export const FilterBarMultiple = {
  render: () => (
    <DashboardFilterBar
      filters={[
        {
          id: 'status',
          label: 'Status',
          type: 'select',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
          ],
        },
        {
          id: 'category',
          label: 'Category',
          type: 'select',
          options: [
            { label: 'All', value: '' },
            { label: 'Product', value: 'product' },
            { label: 'Service', value: 'service' },
          ],
        },
        {
          id: 'search',
          label: 'Search',
          type: 'search',
        },
      ]}
      sticky
      showClearAll
    />
  ),
};

export const FilterChipBasic = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <FilterChip
        label="Active"
        removable
        onRemove={() => console.log('Removed')}
      />
      <FilterChip
        label="Last 30 Days"
        removable
        onRemove={() => console.log('Removed')}
      />
      <FilterChip
        label="High Priority"
        removable
        onRemove={() => console.log('Removed')}
      />
    </div>
  ),
};

export const SearchBasic = {
  render: () => (
    <DashboardSearch
      placeholder="Search dashboards..."
      onChange={(value) => console.log('Search:', value)}
      onSubmit={(value) => console.log('Submit:', value)}
    />
  ),
};

export const SearchWithSuggestions = {
  render: () => (
    <DashboardSearch
      placeholder="Search..."
      showSuggestions
      suggestions={[
        { label: 'Sales Dashboard', value: 'sales' },
        { label: 'Analytics Dashboard', value: 'analytics' },
        { label: 'Performance Dashboard', value: 'performance' },
      ]}
      onChange={(value) => console.log('Search:', value)}
      onSuggestionSelect={(suggestion) => console.log('Selected:', suggestion)}
    />
  ),
};

export const CompleteFilterBar = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <DashboardFilterBar
        filters={[
          {
            id: 'status',
            label: 'Status',
            type: 'select',
            options: [
              { label: 'All', value: '' },
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
            ],
          },
          {
            id: 'category',
            label: 'Category',
            type: 'select',
            options: [
              { label: 'All', value: '' },
              { label: 'Product', value: 'product' },
              { label: 'Service', value: 'service' },
            ],
          },
          {
            id: 'date',
            label: 'Date',
            type: 'daterange',
          },
        ]}
        sticky
        showClearAll
      />

      <div style={{ display: 'flex', gap: '8px' }}>
        <FilterChip label="Active" removable />
        <FilterChip label="Product" removable />
        <FilterChip label="Jan 1 - Jan 31" removable />
      </div>
    </div>
  ),
};
