import React from 'react';
import { PlaceholderWrapper } from './_PlaceholderWrapper';

export interface ThemeExplorerProps {
  currentTheme?: string;
  onThemeChange?: (theme: string) => void;
  onCustomize?: (customTheme: Record<string, unknown>) => void;
  className?: string;
}

export const ThemeExplorerPlaceholder: React.FC<ThemeExplorerProps> = ({ className = '' }) => (
  <PlaceholderWrapper title="Theme Explorer" className={className}>
    <p>Preview and customize design themes.</p>
    <ul>
      <li>Built-in theme templates</li>
      <li>Real-time preview</li>
      <li>Color picker integration</li>
      <li>Export custom themes</li>
    </ul>
  </PlaceholderWrapper>
);
ThemeExplorerPlaceholder.displayName = 'ThemeExplorerPlaceholder';
