import React from 'react';
import { PlaceholderWrapper } from './_PlaceholderWrapper';

export interface AISectionProps {
  content?: string;
  onAskQuestion?: (question: string) => Promise<string>;
  className?: string;
}

export const AISectionPlaceholder: React.FC<AISectionProps> = ({ className = '' }) => (
  <PlaceholderWrapper title="AI-Powered Insights" className={className}>
    <p>Get intelligent recommendations and contextual help.</p>
    <ul>
      <li>Semantic search</li>
      <li>Smart recommendations</li>
      <li>Natural language queries</li>
      <li>Code generation assistance</li>
    </ul>
  </PlaceholderWrapper>
);
AISectionPlaceholder.displayName = 'AISectionPlaceholder';
