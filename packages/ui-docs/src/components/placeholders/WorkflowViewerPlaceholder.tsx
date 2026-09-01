import React from 'react';
import { PlaceholderWrapper } from './_PlaceholderWrapper';

export interface WorkflowViewerProps {
  steps?: Array<{
    id: string;
    title: string;
    description?: string;
    details?: React.ReactNode;
  }>;
  onStepSelect?: (stepId: string) => void;
  className?: string;
}

export const WorkflowViewerPlaceholder: React.FC<WorkflowViewerProps> = ({ className = '' }) => (
  <PlaceholderWrapper title="Workflow Viewer" className={className}>
    <p>Visualize process flows and step-by-step guides.</p>
    <ul>
      <li>Step-by-step visualization</li>
      <li>Flow diagram rendering</li>
      <li>Interactive step navigation</li>
      <li>Learning path tracking</li>
    </ul>
  </PlaceholderWrapper>
);
WorkflowViewerPlaceholder.displayName = 'WorkflowViewerPlaceholder';
