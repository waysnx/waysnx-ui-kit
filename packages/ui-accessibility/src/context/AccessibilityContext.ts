import React from 'react';
import { AccessibilityContextValue } from '../types';

/**
 * Accessibility Context
 * Provides accessibility settings and functions to all child components
 */
export const AccessibilityContext = React.createContext<AccessibilityContextValue | undefined>(
  undefined
);

AccessibilityContext.displayName = 'AccessibilityContext';
