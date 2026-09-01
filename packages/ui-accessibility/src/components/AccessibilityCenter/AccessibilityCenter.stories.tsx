import type { Meta, StoryObj } from '@storybook/react';
import { AccessibilityProvider } from '../../context/AccessibilityProvider';
import { AccessibilityCenter } from './AccessibilityCenter';
import { TranslationProvider, defaultMessages, esMessages, frMessages, arMessages } from '@waysnx/ui-i18n';
import { accessibilityEnMessages, accessibilityEsMessages, accessibilityFrMessages, accessibilityArMessages } from '../../locales';
import './AccessibilityCenter.css';

const meta = {
  title: 'AccessibilityCenter/Main',
  component: AccessibilityCenter,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <AccessibilityProvider>
        <TranslationProvider locale="en" messages={{ ...defaultMessages, ...accessibilityEnMessages }}>
          <div style={{ padding: '20px', minHeight: '100vh', background: '#f5f5f5' }}>
            <h1>Accessibility Center Demo</h1>
            <p>This is a demo page to test the accessibility center</p>
            <Story />
          </div>
        </TranslationProvider>
      </AccessibilityProvider>
    ),
  ],
} satisfies Meta<typeof AccessibilityCenter>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Story
export const FloatingButton: Story = {
  args: {
    variant: 'floating-button',
    position: 'bottom-right',
    showProfile: true,
    showSettings: true,
    showAccessibilityScore: true,
    showQuickActions: true,
  },
};

// Drawer Variant
export const Drawer: Story = {
  args: {
    variant: 'drawer',
    position: 'bottom-right',
    showProfile: true,
    showSettings: true,
    showAccessibilityScore: true,
    showQuickActions: true,
  },
};

// Modal Variant
export const Modal: Story = {
  args: {
    variant: 'modal',
    position: 'bottom-right',
    showProfile: true,
    showSettings: true,
    showAccessibilityScore: true,
    showQuickActions: true,
  },
};

// Panel Variant
export const Panel: Story = {
  args: {
    variant: 'panel',
    position: 'bottom-right',
    showProfile: true,
    showSettings: true,
    showAccessibilityScore: true,
    showQuickActions: true,
  },
};

// All Positions
export const BottomLeft: Story = {
  args: {
    variant: 'floating-button',
    position: 'bottom-left',
    showProfile: true,
    showSettings: true,
  },
};

export const TopRight: Story = {
  args: {
    variant: 'floating-button',
    position: 'top-right',
    showProfile: true,
    showSettings: true,
  },
};

export const TopLeft: Story = {
  args: {
    variant: 'floating-button',
    position: 'top-left',
    showProfile: true,
    showSettings: true,
  },
};

// Minimal Configuration
export const MinimalSettings: Story = {
  args: {
    variant: 'floating-button',
    position: 'bottom-right',
    showProfile: false,
    showSettings: true,
    showAccessibilityScore: false,
    showQuickActions: false,
  },
};

// Full Configuration
export const FullFeatured: Story = {
  args: {
    variant: 'modal',
    position: 'bottom-right',
    showProfile: true,
    showSettings: true,
    showAccessibilityScore: true,
    showQuickActions: true,
  },
};

// With Custom Styling
export const CustomStyle: Story = {
  args: {
    variant: 'floating-button',
    position: 'bottom-right',
    className: 'custom-accessibility-center',
    style: {
      '--primary-color': '#007bff',
    } as React.CSSProperties,
  },
};

// Spanish Language
export const Spanish: Story = {
  decorators: [
    (Story) => (
      <AccessibilityProvider>
        <TranslationProvider locale="es" messages={{ ...esMessages, ...accessibilityEsMessages }}>
          <div style={{ padding: '20px', minHeight: '100vh', background: '#f5f5f5' }}>
            <h1>Centro de Accesibilidad</h1>
            <p>Esta es una página de demostración</p>
            <Story />
          </div>
        </TranslationProvider>
      </AccessibilityProvider>
    ),
  ],
  args: {
    variant: 'floating-button',
    position: 'bottom-right',
  },
};

// French Language
export const French: Story = {
  decorators: [
    (Story) => (
      <AccessibilityProvider>
        <TranslationProvider locale="fr" messages={{ ...frMessages, ...accessibilityFrMessages }}>
          <div style={{ padding: '20px', minHeight: '100vh', background: '#f5f5f5' }}>
            <h1>Centre d'Accessibilité</h1>
            <p>Ceci est une page de démonstration</p>
            <Story />
          </div>
        </TranslationProvider>
      </AccessibilityProvider>
    ),
  ],
  args: {
    variant: 'floating-button',
    position: 'bottom-right',
  },
};

// Arabic Language (RTL)
export const Arabic: Story = {
  decorators: [
    (Story) => (
      <AccessibilityProvider>
        <TranslationProvider locale="ar" direction="rtl" messages={{ ...arMessages, ...accessibilityArMessages }}>
          <div style={{ padding: '20px', minHeight: '100vh', background: '#f5f5f5', direction: 'rtl' }}>
            <h1>مركز إمكانية الوصول</h1>
            <p>هذه صفحة تجريبية</p>
            <Story />
          </div>
        </TranslationProvider>
      </AccessibilityProvider>
    ),
  ],
  args: {
    variant: 'floating-button',
    position: 'bottom-left',
  },
};

