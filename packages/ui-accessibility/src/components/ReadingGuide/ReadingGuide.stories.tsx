import type { Meta, StoryObj } from '@storybook/react';
import { AccessibilityProvider } from '../../context/AccessibilityProvider';
import { ReadingGuide } from './ReadingGuide';
import { TranslationProvider } from '@waysnx/ui-i18n';
import { defaultMessages } from '@waysnx/ui-i18n';
import { accessibilityEnMessages } from '../../locales';
import './ReadingGuide.css';

const meta = {
  title: 'AccessibilityCenter/ReadingGuide',
  component: ReadingGuide,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <AccessibilityProvider
        defaultSettings={{
          readingGuide: true,
        }}
      >
        <TranslationProvider locale="en" messages={{ ...defaultMessages, ...accessibilityEnMessages }}>
          <div style={{ padding: '20px', minHeight: '100vh', background: '#fff' }}>
            <h1>Reading Guide - Hover over text to see the guide</h1>
            <p>
              The reading guide is a helpful tool that displays a horizontal line following your mouse to help you track
              your reading position. This is particularly useful for people with dyslexia or low vision who may have
              difficulty tracking text on a page.
            </p>
            <h2>What is a Reading Guide?</h2>
            <p>
              A reading guide is a visual tool that helps readers follow along with text. It can be as simple as a
              highlighter or as complex as a magnifying glass. The reading guide feature in this accessibility library
              provides a horizontal line that follows your cursor, helping you track your reading position on the page.
            </p>
            <h2>Benefits</h2>
            <ul>
              <li>Helps with tracking text for people with dyslexia</li>
              <li>Reduces eye strain for extended reading</li>
              <li>Improves reading speed and comprehension</li>
              <li>Provides visual focus on current reading position</li>
            </ul>
            <h2>How to Use</h2>
            <p>
              Simply move your mouse over the text. The reading guide will appear as a horizontal line following your
              cursor. The guide will help you maintain your position in the text and make it easier to read long
              paragraphs or documents.
            </p>
            <Story />
          </div>
        </TranslationProvider>
      </AccessibilityProvider>
    ),
  ],
} satisfies Meta<typeof ReadingGuide>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Story
export const Default: Story = {};

// With Long Text Content
export const LongContent: Story = {
  decorators: [
    (Story) => (
      <AccessibilityProvider
        defaultSettings={{
          readingGuide: true,
        }}
      >
        <TranslationProvider locale="en" messages={{ ...defaultMessages, ...accessibilityEnMessages }}>
          <div style={{ padding: '20px', minHeight: '100vh', background: '#fff', lineHeight: '1.8' }}>
            <h1>Extended Reading Material</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
              rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
              explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
              dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora
              incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
            </p>
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
