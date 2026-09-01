import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { useState } from 'react';
import { Widget, WidgetLoading, WidgetEmpty, WidgetError } from '@waysnx/ui-dashboard';

const meta = {
  title: 'Dashboard/Widget',
  component: Widget,
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
} satisfies Meta<typeof Widget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'Widget Title',
    children: <div>Widget content goes here</div>,
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Sales Chart',
    subtitle: 'Last 30 days',
    children: <div>Chart component here</div>,
  },
};

export const WithToolbar: Story = {
  args: {
    title: 'Widget with Toolbar',
    toolbar: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <button>↻</button>
        <button>⬇</button>
      </div>
    ),
    children: <div>Content</div>,
  },
};

export const WithFooter: Story = {
  args: {
    title: 'Widget with Footer',
    footer: <div>Last updated: Just now</div>,
    children: <div>Content</div>,
  },
};

export const Loading: Story = {
  args: {
    title: 'Loading Widget',
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    title: 'Empty Widget',
    empty: true,
  },
};

export const ErrorState: Story = {
  render: () => (
    <Widget
      title="Error Widget"
      error={new Error('Failed to load data')}
    />
  ),
};

export const Elevated: Story = {
  args: {
    title: 'Elevated Widget',
    elevation: 3,
    children: <div>Content</div>,
  },
};

export const Outlined: Story = {
  args: {
    title: 'Outlined Widget',
    variant: 'outlined',
    children: <div>Content</div>,
  },
};

export const Flat: Story = {
  args: {
    title: 'Flat Widget',
    variant: 'flat',
    children: <div>Content</div>,
  },
};

export const Resizable: Story = {
  render: () => {
    const [width, setWidth] = useState(400);
    const [height, setHeight] = useState(300);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div>
            <label>Width (px): </label>
            <input
              type="range"
              min="200"
              max="600"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              style={{ width: '200px' }}
            />
            <span>{width}px</span>
          </div>
          <div>
            <label>Height (px): </label>
            <input
              type="range"
              min="150"
              max="500"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              style={{ width: '200px' }}
            />
            <span>{height}px</span>
          </div>
        </div>
        <div style={{ border: '2px dashed #ccc', padding: '8px', display: 'inline-block' }}>
          <Widget
            title="Resizable Widget"
            subtitle="Adjust the sliders above"
            style={{
              width: `${width}px`,
              height: `${height}px`,
            }}
          >
            <div style={{ padding: '16px' }}>
              This widget can be resized using the sliders above.
              <br />
              Width: {width}px
              <br />
              Height: {height}px
            </div>
          </Widget>
        </div>
      </div>
    );
  },
};

export const WidgetLoadingState: Story = {
  render: () => <WidgetLoading />,
};

export const WidgetEmptyState: Story = {
  render: () => <WidgetEmpty message="No data available" />,
};

export const WidgetErrorState: Story = {
  render: () => <WidgetError error={new Error('Connection failed')} />,
};

