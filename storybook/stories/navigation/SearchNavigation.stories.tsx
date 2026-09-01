/**
 * @file components/SearchNavigation/SearchNavigation.stories.tsx
 * Storybook stories for SearchNavigation component
 */

import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { useState } from 'react';
import { SearchNavigation, type SearchResult } from '@waysnx/ui-navigation';

const meta = {
  title: 'Navigation/SearchNavigation',
  component: SearchNavigation,
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
} satisfies Meta<typeof SearchNavigation>;

export default meta;
type Story = StoryObj<typeof SearchNavigation>;

const allResults: SearchResult[] = [
  { id: '1', title: 'Getting Started', category: 'docs', icon: '📖', description: 'Getting started guide' },
  { id: '2', title: 'API Reference', category: 'docs', icon: '📖', description: 'Complete API docs' },
  { id: '3', title: 'Jane Doe', category: 'users', icon: '👤', description: 'Product Manager' },
  { id: '4', title: 'John Smith', category: 'users', icon: '👤', description: 'Developer' },
  { id: '5', title: 'Dashboard', category: 'pages', icon: '📄', description: 'Main dashboard' },
  { id: '6', title: 'Settings', category: 'pages', icon: '📄', description: 'Application settings' },
];

const mockSearch = async (query: string): Promise<SearchResult[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return allResults.filter((r) =>
    r.title.toLowerCase().includes(query.toLowerCase()) ||
    r.description?.toLowerCase().includes(query.toLowerCase())
  );
};

/**
 * Default search navigation
 */
export const Default: Story = {
  render: () => (
    <SearchNavigation
      onSearch={mockSearch}
      onSelect={(result) => console.log('Selected:', result.title)}
    />
  ),
};

/**
 * With categories
 */
export const WithCategories: Story = {
  render: () => (
    <SearchNavigation
      onSearch={mockSearch}
      onSelect={(result) => console.log('Selected:', result.title)}
      categories={[
        { id: 'docs', label: 'Docs', icon: '📖' },
        { id: 'users', label: 'Users', icon: '👤' },
        { id: 'pages', label: 'Pages', icon: '📄' },
      ]}
    />
  ),
};

/**
 * With grouped results
 */
export const GroupedResults: Story = {
  render: () => {
    const [, setQuery] = useState('');
    const [, setResults] = useState<SearchResult[]>([]);

    const handleSearch = async (q: string): Promise<SearchResult[]> => {
      setQuery(q);
      if (q) {
        const res = await mockSearch(q);
        setResults(res);
        return res;
      } else {
        setResults([]);
        return [];
      }
    };

    return (
      <SearchNavigation
        onSearch={handleSearch}
        onSelect={(result) => console.log('Selected:', result.title)}
        groupByCategory={true}
      />
    );
  },
};

/**
 * With custom placeholder
 */
export const CustomPlaceholder: Story = {
  render: () => (
    <SearchNavigation
      onSearch={mockSearch}
      onSelect={(result) => console.log('Selected:', result.title)}
      placeholder="Search documentation, users, and pages..."
    />
  ),
};

/**
 * With limited results
 */
export const LimitedResults: Story = {
  render: () => (
    <SearchNavigation
      onSearch={mockSearch}
      onSelect={(result) => console.log('Selected:', result.title)}
      maxResults={3}
    />
  ),
};

/**
 * With custom debounce
 */
export const CustomDebounce: Story = {
  render: () => (
    <SearchNavigation
      onSearch={mockSearch}
      onSelect={(result) => console.log('Selected:', result.title)}
      debounceMs={500}
    />
  ),
};

/**
 * Without history
 */
export const NoHistory: Story = {
  render: () => (
    <SearchNavigation
      onSearch={mockSearch}
      onSelect={(result) => console.log('Selected:', result.title)}
      showHistory={false}
    />
  ),
};

/**
 * Without clear button
 */
export const NoClear: Story = {
  render: () => (
    <SearchNavigation
      onSearch={mockSearch}
      onSelect={(result) => console.log('Selected:', result.title)}
      showClear={false}
    />
  ),
};

/**
 * Dark mode
 */
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1a1a1a', padding: '2rem', borderRadius: '8px' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <SearchNavigation
      onSearch={mockSearch}
      onSelect={(result) => console.log('Selected:', result.title)}
      categories={[
        { id: 'docs', label: 'Docs' },
        { id: 'users', label: 'Users' },
      ]}
    />
  ),
};

/**
 * With custom search icon
 */
export const CustomIcon: Story = {
  render: () => (
    <SearchNavigation
      onSearch={mockSearch}
      onSelect={(result) => console.log('Selected:', result.title)}
      searchIcon="🔎"
    />
  ),
};

/**
 * Auto-focused
 */
export const AutoFocused: Story = {
  render: () => (
    <SearchNavigation
      onSearch={mockSearch}
      onSelect={(result) => console.log('Selected:', result.title)}
      autoFocus={true}
    />
  ),
};

/**
 * Empty results
 */
export const EmptyResults: Story = {
  render: () => {
    return (
      <SearchNavigation
        onSearch={async (query) => (query === 'test' ? [] : await mockSearch(query))}
        onSelect={(result) => console.log('Selected:', result.title)}
      />
    );
  },
};

/**
 * With callback handlers
 */
export const WithCallbacks: Story = {
  render: () => {
    const [status, setStatus] = useState<string>('');

    return (
      <div>
        <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
          <strong>Status:</strong> {status || 'Idle'}
        </div>
        <SearchNavigation
          onSearch={async (query) => {
            setStatus('Searching...');
            const results = await mockSearch(query);
            setStatus(`Found ${results.length} results`);
            return results;
          }}
          onSelect={(result) => setStatus(`Selected: ${result.title}`)}
        />
      </div>
    );
  },
};
