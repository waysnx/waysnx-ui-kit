import type { Meta, StoryObj } from '@storybook/react';
import { AccessibilityProvider } from '../../context/AccessibilityProvider';
import { Magnifier } from './Magnifier';
import { TranslationProvider } from '@waysnx/ui-i18n';
import { defaultMessages } from '@waysnx/ui-i18n';
import { accessibilityEnMessages } from '../../locales';
import './Magnifier.css';

const meta = {
  title: 'AccessibilityCenter/Magnifier',
  component: Magnifier,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <AccessibilityProvider
        defaultSettings={{
          textSize: 'large',
        }}
      >
        <TranslationProvider locale="en" messages={{ ...defaultMessages, ...accessibilityEnMessages }}>
          <div style={{ padding: '20px', minHeight: '100vh', background: '#fff' }}>
            <h1>Magnifier Tool - Move your mouse to see magnified content</h1>
            <p>
              The magnifier tool provides a magnified view of the content under your cursor. This is helpful for users
              with low vision who need additional zoom to read text.
            </p>
            <h2>Features of the Magnifier</h2>
            <ul>
              <li>2x magnification of content under cursor</li>
              <li>Circular magnifying glass overlay</li>
              <li>Follows your mouse movement</li>
              <li>Automatically enabled for users with large text settings</li>
            </ul>
            <h2>Use Cases</h2>
            <p>
              The magnifier is particularly useful for:
            </p>
            <ul>
              <li>Users with low vision</li>
              <li>Users reading small print</li>
              <li>Users with age-related vision changes</li>
              <li>Users viewing high-resolution displays</li>
            </ul>
            <Story />
          </div>
        </TranslationProvider>
      </AccessibilityProvider>
    ),
  ],
} satisfies Meta<typeof Magnifier>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Story
export const Default: Story = {};

// Large Text Mode
export const LargeTextMode: Story = {
  decorators: [
    (Story) => (
      <AccessibilityProvider
        defaultSettings={{
          textSize: 'x-large',
        }}
      >
        <TranslationProvider locale="en" messages={{ ...defaultMessages, ...accessibilityEnMessages }}>
          <div style={{ padding: '20px', minHeight: '100vh', background: '#fff', fontSize: '18px' }}>
            <h1 style={{ fontSize: '32px' }}>Large Text with Magnifier</h1>
            <p>This content is displayed in large text mode with the magnifier enabled.</p>
            <p>Move your mouse around to see the magnified view of the content.</p>
            <Story />
          </div>
        </TranslationProvider>
      </AccessibilityProvider>
    ),
  ],
};

// High Contrast Mode
export const HighContrast: Story = {
  decorators: [
    (Story) => (
      <AccessibilityProvider
        defaultSettings={{
          contrast: 'high',
          textSize: 'large',
        }}
      >
        <TranslationProvider locale="en" messages={{ ...defaultMessages, ...accessibilityEnMessages }}>
          <div style={{ padding: '20px', minHeight: '100vh', background: '#000', color: '#fff' }}>
            <h1>High Contrast Mode with Magnifier</h1>
            <p>This content is displayed in high contrast mode to improve readability.</p>
            <p>The magnifier is also enabled for additional zoom capability.</p>
            <Story />
          </div>
        </TranslationProvider>
      </AccessibilityProvider>
    ),
  ],
};

// Mobile View
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};

// Tablet View
export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

// Desktop View
export const DesktopView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
