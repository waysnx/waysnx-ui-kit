import React from 'react';
import { PlaceholderWrapper } from './_PlaceholderWrapper';

export interface PlaygroundProps {
  initialCode?: string;
  language?: string;
  onCodeChange?: (code: string) => void;
  className?: string;
}

export const PlaygroundPlaceholder: React.FC<PlaygroundProps> = ({ className = '' }) => (
  <PlaceholderWrapper title="Live Playground" className={className}>
    <p>Edit code and see live preview instantly.</p>
    <ul>
      <li>Syntax highlighted editor</li>
      <li>Live React preview</li>
      <li>Error boundaries</li>
      <li>Code sharing via URL</li>
    </ul>
  </PlaceholderWrapper>
);
PlaygroundPlaceholder.displayName = 'PlaygroundPlaceholder';
