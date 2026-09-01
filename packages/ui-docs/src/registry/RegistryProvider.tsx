/**
 * Registry Provider
 * 
 * Provides ComponentRegistry to all child components via React Context.
 * Allows live component rendering throughout the documentation.
 */

import React, { createContext, useContext, useMemo } from 'react';
import { ComponentRegistry } from './ComponentRegistry';
import { ComponentRegistryOptions } from '../types';

interface RegistryContextValue {
  registry: ComponentRegistry;
}

const RegistryContext = createContext<RegistryContextValue | undefined>(
  undefined
);

export interface RegistryProviderProps {
  children: React.ReactNode;
  options?: ComponentRegistryOptions;
  registry?: ComponentRegistry;
}

/**
 * RegistryProvider - Wrap your documentation with this to provide component registry
 */
export const RegistryProvider: React.FC<RegistryProviderProps> = ({
  children,
  options,
  registry: externalRegistry,
}) => {
  // Use external registry if provided, otherwise create a new one
  const registry = useMemo(() => {
    return externalRegistry || new ComponentRegistry(options);
  }, [externalRegistry, options]);

  const value: RegistryContextValue = { registry };

  return (
    <RegistryContext.Provider value={value}>
      {children}
    </RegistryContext.Provider>
  );
};

/**
 * useRegistry Hook - Access the ComponentRegistry
 */
export const useRegistry = (): ComponentRegistry => {
  const context = useContext(RegistryContext);

  if (!context) {
    throw new Error(
      'useRegistry must be used within a <RegistryProvider>. ' +
        'Wrap your documentation with <RegistryProvider> at the root.'
    );
  }

  return context.registry;
};
