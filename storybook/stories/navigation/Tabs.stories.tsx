/**
 * @file components/Tabs/Tabs.stories.tsx
 * Storybook stories for Tabs component
 */

import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { useState } from 'react';
import { Tabs } from '@waysnx/ui-navigation';
import type { TabConfig } from '@waysnx/ui-navigation';

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Navigation" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const tabItems: TabConfig[] = [
  {
    id: 'tab1',
    label: 'Tab 1',
    icon: '📄',
    content: <div>Content for Tab 1</div>,
  },
  {
    id: 'tab2',
    label: 'Tab 2',
    icon: '🔧',
    content: <div>Content for Tab 2</div>,
  },
  {
    id: 'tab3',
    label: 'Tab 3',
    icon: '⚙️',
    content: <div>Content for Tab 3</div>,
  },
];

const tabsWithBadges: TabConfig[] = [
  {
    id: 'messages',
    label: 'Messages',
    icon: '💬',
    badge: '5',
    content: <div>You have 5 messages</div>,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: '🔔',
    badge: '3',
    content: <div>You have 3 notifications</div>,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '⚙️',
    content: <div>Settings content</div>,
  },
];

const loremTabs: TabConfig[] = [
  {
    id: 'lorem1',
    label: 'Overview',
    content: <div><h3>Overview</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></div>,
  },
  {
    id: 'lorem2',
    label: 'Details',
    content: <div><h3>Details</h3><p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></div>,
  },
  {
    id: 'lorem3',
    label: 'Advanced',
    content: <div><h3>Advanced</h3><p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></div>,
  },
];

/**
 * Default tabs
 */
export const Default: Story = {
  args: {
    tabs: tabItems,
    activeTabId: 'tab1',
    density: 'normal',
    variant: 'default',
  },
  render: (args) => {
    const [active, setActive] = useState(args.activeTabId || 'tab1');
    return <Tabs {...args} activeTabId={active} onTabChange={setActive} />;
  },
};

/**
 * Compact density
 */
export const Compact: Story = {
  args: {
    tabs: tabItems,
    activeTabId: 'tab1',
    density: 'compact',
    variant: 'default',
  },
  render: Default.render,
};

/**
 * Spacious density
 */
export const Spacious: Story = {
  args: {
    tabs: tabItems,
    activeTabId: 'tab1',
    density: 'spacious',
    variant: 'default',
  },
  render: Default.render,
};

/**
 * With badges
 */
export const WithBadges: Story = {
  args: {
    tabs: tabsWithBadges,
    activeTabId: 'messages',
    density: 'normal',
    variant: 'default',
    showBadges: true,
  },
  render: (args) => {
    const [active, setActive] = useState(args.activeTabId || 'messages');
    return <Tabs {...args} activeTabId={active} onTabChange={setActive} />;
  },
};

/**
 * Without icons
 */
export const WithoutIcons: Story = {
  args: {
    tabs: tabItems,
    activeTabId: 'tab1',
    density: 'normal',
    variant: 'default',
    showIcons: false,
  },
  render: (args) => {
    const [active, setActive] = useState(args.activeTabId || 'tab1');
    return <Tabs {...args} activeTabId={active} onTabChange={setActive} />;
  },
};

/**
 * Minimal variant
 */
export const Minimal: Story = {
  args: {
    tabs: tabItems,
    activeTabId: 'tab1',
    density: 'normal',
    variant: 'minimal',
  },
  render: (args) => {
    const [active, setActive] = useState(args.activeTabId || 'tab1');
    return <Tabs {...args} activeTabId={active} onTabChange={setActive} />;
  },
};

/**
 * Elevated variant
 */
export const Elevated: Story = {
  args: {
    tabs: tabItems,
    activeTabId: 'tab1',
    density: 'normal',
    variant: 'elevated',
  },
  render: (args) => {
    const [active, setActive] = useState(args.activeTabId || 'tab1');
    return <Tabs {...args} activeTabId={active} onTabChange={setActive} />;
  },
};

/**
 * Closable tabs
 */
export const Closable: Story = {
  args: {
    tabs: tabItems,
    activeTabId: 'tab1',
    density: 'normal',
    variant: 'default',
    closable: true,
  },
  render: (args) => {
    const [active, setActive] = useState(args.activeTabId || 'tab1');
    const [tabs, setTabs] = useState(args.tabs);

    return (
      <Tabs
        {...args}
        tabs={tabs}
        activeTabId={active}
        onTabChange={setActive}
        onTabClose={(tabId) => {
          const newTabs = tabs.filter((t) => t.id !== tabId);
          setTabs(newTabs);
          if (active === tabId && newTabs.length > 0) {
            setActive(newTabs[0].id);
          }
        }}
      />
    );
  },
};

/**
 * Disabled tabs
 */
export const DisabledTabs: Story = {
  args: {
    tabs: [
      { id: 'tab1', label: 'Enabled Tab 1', content: <div>Content 1</div> },
      { id: 'tab2', label: 'Disabled Tab', disabled: true, content: <div>Content 2</div> },
      { id: 'tab3', label: 'Enabled Tab 3', content: <div>Content 3</div> },
    ],
    activeTabId: 'tab1',
    density: 'normal',
    variant: 'default',
  },
  render: (args) => {
    const [active, setActive] = useState(args.activeTabId || 'tab1');
    return <Tabs {...args} activeTabId={active} onTabChange={setActive} />;
  },
};

/**
 * Vertical tabs
 */
export const VerticalTabs: Story = {
  args: {
    tabs: loremTabs,
    activeTabId: 'lorem1',
    density: 'normal',
    variant: 'default',
    orientation: 'vertical',
  },
  render: (args) => {
    const [active, setActive] = useState(args.activeTabId || 'lorem1');
    return (
      <div style={{ minHeight: '300px' }}>
        <Tabs {...args} activeTabId={active} onTabChange={setActive} />
      </div>
    );
  },
};

/**
 * Keyboard navigation
 */
export const KeyboardNavigation: Story = {
  args: {
    tabs: tabItems,
    activeTabId: 'tab1',
    density: 'normal',
    variant: 'default',
    keyboardNav: true,
  },
  render: (args) => {
    const [active, setActive] = useState(args.activeTabId || 'tab1');
    return (
      <div>
        <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '0.5rem' }}>
          <strong>Keyboard Navigation:</strong>
          <ul style={{ margin: '0.5rem 0 0 1.5rem' }}>
            <li>Arrow Right/Down - Next tab</li>
            <li>Arrow Left/Up - Previous tab</li>
            <li>Home - First tab</li>
            <li>End - Last tab</li>
          </ul>
        </div>
        <Tabs {...args} activeTabId={active} onTabChange={setActive} />
      </div>
    );
  },
};

/**
 * Many tabs (scrollable)
 */
export const ManyTabs: Story = {
  args: {
    tabs: Array.from({ length: 15 }, (_, i) => ({
      id: `tab${i + 1}`,
      label: `Tab ${i + 1}`,
      icon: '📄',
      content: <div>Content for tab {i + 1}</div>,
    })),
    activeTabId: 'tab1',
    density: 'normal',
    variant: 'default',
    scrollable: true,
  },
  render: (args) => {
    const [active, setActive] = useState(args.activeTabId || 'tab1');
    return <Tabs {...args} activeTabId={active} onTabChange={setActive} />;
  },
};

/**
 * Dark mode
 */
export const DarkMode: Story = {
  args: {
    tabs: tabItems,
    activeTabId: 'tab1',
    density: 'normal',
    variant: 'elevated',
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1a1a1a', padding: '2rem', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => {
    const [active, setActive] = useState(args.activeTabId || 'tab1');
    return <Tabs {...args} activeTabId={active} onTabChange={setActive} />;
  },
};

/**
 * Interactive with content
 */
export const Interactive: Story = {
  args: {
    tabs: loremTabs,
    activeTabId: 'lorem1',
    density: 'normal',
    variant: 'default',
  },
  render: (args) => {
    const [active, setActive] = useState(args.activeTabId || 'lorem1');
    return <Tabs {...args} activeTabId={active} onTabChange={setActive} />;
  },
};
