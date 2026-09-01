/**
 * @file index.ts
 * Main barrel export for @waysnx/ui-media
 */

import './styles/index.css';

export * from './types';
export * from './components';
export { useSignature } from './hooks/useSignature';
export type { UseSignatureReturn } from './hooks/useSignature';
