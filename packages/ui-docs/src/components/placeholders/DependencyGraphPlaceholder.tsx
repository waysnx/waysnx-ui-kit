import React from 'react';
import type { Component } from '../../types/documentation';
import { PlaceholderWrapper } from './_PlaceholderWrapper';

export interface DependencyGraphProps {
  component: Component;
  dependencies?: Component[];
  className?: string;
  onComponentSelect?: (component: Component) => void;
}

export const DependencyGraphPlaceholder: React.FC<DependencyGraphProps> = ({ className = '' }) => (
  <PlaceholderWrapper title="Dependency Graph" className={className}>
    <p>Interactive visualization of component dependencies and relationships.</p>
    <ul>
      <li>Force-directed graph layout</li>
      <li>Zoom and pan interaction</li>
      <li>Hover tooltips</li>
      <li>Dependency highlighting</li>
    </ul>
  </PlaceholderWrapper>
);
DependencyGraphPlaceholder.displayName = 'DependencyGraphPlaceholder';
