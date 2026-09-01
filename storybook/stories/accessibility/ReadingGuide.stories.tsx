import type { Meta, StoryObj } from '@storybook/react';
import { ReadingGuide, AccessibilityProvider } from '@waysnx/ui-accessibility';
import '@waysnx/ui-accessibility/dist/index.css';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Accessibility/ReadingGuide',
  component: ReadingGuide,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof ReadingGuide>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleContent = () => (
  <div style={{ padding: 32, maxWidth: 640, margin: '0 auto', lineHeight: 1.8 }}>
    <TestBadge componentName="Accessibility" />
    <h2>Reading Guide Demo</h2>
    <p>
      Move your mouse over this text. The reading guide bar follows the cursor
      to help you track the current line. It is now visible on both light and
      dark backgrounds using a solid accent color with a soft glow and a white
      outline.
    </p>
    <p>
      The guide replaces the previous faint yellow gradient (which used
      <code> mix-blend-mode: screen</code> and washed out on light themes).
    </p>
    <p>
      You can theme the bar with the <code>--wx-reading-guide-color</code>,
      <code> --wx-reading-guide-glow</code>, and
      <code> --wx-reading-guide-height</code> CSS variables.
    </p>
  </div>
);

/**
 * Reading guide on a LIGHT background — the scenario that was previously broken.
 * The bar should be clearly visible following the cursor.
 */
export const OnLightBackground: Story = {
  render: () => (
    <AccessibilityProvider persistSettings={false} defaultSettings={{ readingGuide: true }}>
      <div style={{ background: '#ffffff', minHeight: '100vh' }}>
        <SampleContent />
        <ReadingGuide />
      </div>
    </AccessibilityProvider>
  ),
};

/**
 * Reading guide on a DARK background — should also be clearly visible.
 */
export const OnDarkBackground: Story = {
  render: () => (
    <AccessibilityProvider persistSettings={false} defaultSettings={{ readingGuide: true }}>
      <div style={{ background: '#0f172a', color: '#e2e8f0', minHeight: '100vh' }}>
        <SampleContent />
        <ReadingGuide />
      </div>
    </AccessibilityProvider>
  ),
};

/**
 * Custom color via CSS variable.
 */
export const CustomColor: Story = {
  render: () => (
    <AccessibilityProvider persistSettings={false} defaultSettings={{ readingGuide: true }}>
      <div
        style={{
          background: '#ffffff',
          minHeight: '100vh',
          // @ts-expect-error CSS custom properties
          '--wx-reading-guide-color': 'rgba(220, 38, 38, 0.9)',
          '--wx-reading-guide-outline': 'rgba(255, 255, 255, 0.6)',
          '--wx-reading-guide-height': '3px',
        }}
      >
        <SampleContent />
        <ReadingGuide />
      </div>
    </AccessibilityProvider>
  ),
};
