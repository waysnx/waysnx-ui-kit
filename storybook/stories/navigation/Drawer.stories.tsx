/**
 * @file components/Drawer/Drawer.stories.tsx
 * Storybook stories for Drawer component
 */

import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { useState } from 'react';
import { Drawer } from '@waysnx/ui-navigation';

const meta = {
  title: 'Navigation/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
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
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof Drawer>;

/**
 * Default drawer (left position)
 */
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button onClick={() => setIsOpen(true)} style={{ padding: '0.75rem 1.5rem', cursor: 'pointer' }}>
          Open Drawer
        </button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title="Drawer Title">
          <div>
            <p>This is the drawer content.</p>
            <p>You can close it by clicking the X button or clicking outside.</p>
          </div>
        </Drawer>
      </div>
    );
  },
};

/**
 * Right position drawer
 */
export const RightPosition: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button onClick={() => setIsOpen(true)} style={{ padding: '0.75rem 1.5rem', cursor: 'pointer' }}>
          Open Right Drawer
        </button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} position="right" title="Right Drawer">
          <p>Drawer on the right side</p>
        </Drawer>
      </div>
    );
  },
};

/**
 * Top position drawer
 */
export const TopPosition: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button onClick={() => setIsOpen(true)} style={{ padding: '0.75rem 1.5rem', cursor: 'pointer' }}>
          Open Top Drawer
        </button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} position="top" title="Top Drawer">
          <p>Drawer at the top</p>
        </Drawer>
      </div>
    );
  },
};

/**
 * Bottom position drawer
 */
export const BottomPosition: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button onClick={() => setIsOpen(true)} style={{ padding: '0.75rem 1.5rem', cursor: 'pointer' }}>
          Open Bottom Drawer
        </button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} position="bottom" title="Bottom Drawer">
          <p>Drawer at the bottom</p>
        </Drawer>
      </div>
    );
  },
};

/**
 * Custom width drawer
 */
export const CustomWidth: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button onClick={() => setIsOpen(true)} style={{ padding: '0.75rem 1.5rem', cursor: 'pointer' }}>
          Open Custom Width Drawer
        </button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} width={500} title="Wide Drawer">
          <p>This drawer is 500px wide</p>
        </Drawer>
      </div>
    );
  },
};

/**
 * Without backdrop
 */
export const WithoutBackdrop: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button onClick={() => setIsOpen(true)} style={{ padding: '0.75rem 1.5rem', cursor: 'pointer' }}>
          Open No Backdrop
        </button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} showBackdrop={false} title="No Backdrop">
          <p>This drawer has no backdrop</p>
        </Drawer>
      </div>
    );
  },
};

/**
 * Without close button
 */
export const WithoutCloseButton: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button onClick={() => setIsOpen(true)} style={{ padding: '0.75rem 1.5rem', cursor: 'pointer' }}>
          Open (Click Outside to Close)
        </button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} showCloseButton={false} title="No Close Button">
          <p>Close this drawer by clicking outside or pressing Escape</p>
        </Drawer>
      </div>
    );
  },
};

/**
 * With footer
 */
export const WithFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button onClick={() => setIsOpen(true)} style={{ padding: '0.75rem 1.5rem', cursor: 'pointer' }}>
          Open With Footer
        </button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Form Drawer"
          footer={
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setIsOpen(false)} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={() => setIsOpen(false)} style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '0.25rem' }}>
                Save
              </button>
            </div>
          }
        >
          <div>
            <label>Input field:</label>
            <input type="text" placeholder="Enter something" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
          </div>
        </Drawer>
      </div>
    );
  },
};

/**
 * With custom header
 */
export const WithCustomHeader: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button onClick={() => setIsOpen(true)} style={{ padding: '0.75rem 1.5rem', cursor: 'pointer' }}>
          Open Custom Header
        </button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header={
            <div style={{ padding: '1rem', backgroundColor: '#007bff', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0 }}>Custom Header</h2>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.25rem', cursor: 'pointer' }}>
                ✕
              </button>
            </div>
          }
        >
          <p>Drawer with custom header</p>
        </Drawer>
      </div>
    );
  },
};

/**
 * Prevent backdrop click close
 */
export const PreventBackdropClose: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button onClick={() => setIsOpen(true)} style={{ padding: '0.75rem 1.5rem', cursor: 'pointer' }}>
          Open (Only X Closes)
        </button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          closeOnBackdropClick={false}
          title="Click X to Close"
        >
          <p>Click the X button to close. Clicking outside won't work.</p>
        </Drawer>
      </div>
    );
  },
};

/**
 * Keyboard navigation
 */
export const KeyboardNavigation: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button onClick={() => setIsOpen(true)} style={{ padding: '0.75rem 1.5rem', cursor: 'pointer' }}>
          Open (Press Escape to Close)
        </button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          closeOnEscape={true}
          title="Press Escape"
        >
          <p>Press the Escape key to close this drawer.</p>
        </Drawer>
      </div>
    );
  },
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
      <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button onClick={() => setIsOpen(true)} style={{ padding: '0.75rem 1.5rem', cursor: 'pointer' }}>
          Open Drawer
        </button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title="Dark Mode Drawer">
          <p>This drawer appears in dark mode</p>
        </Drawer>
      </div>
    );
  },
};
