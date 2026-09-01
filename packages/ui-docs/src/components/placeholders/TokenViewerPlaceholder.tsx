import React from 'react';
import type { DesignToken } from '../../types/documentation';
import { PlaceholderWrapper } from './_PlaceholderWrapper';

export interface TokenViewerProps {
  tokens?: DesignToken[];
  category?: string;
  onTokenSelect?: (token: DesignToken) => void;
  className?: string;
}

export const TokenViewerPlaceholder: React.FC<TokenViewerProps> = ({ className = '' }) => (
  <PlaceholderWrapper title="Token Viewer" className={className}>
    <p>Browse and preview design system tokens.</p>
    <ul>
      <li>Token categorization</li>
      <li>Color preview swatches</li>
      <li>Copy token names</li>
      <li>Export token definitions</li>
    </ul>
  </PlaceholderWrapper>
);
TokenViewerPlaceholder.displayName = 'TokenViewerPlaceholder';
