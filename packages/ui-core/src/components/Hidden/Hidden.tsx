import React from 'react';

export interface HiddenProps {
  name: string;
  value?: string;
}

export function Hidden({ name, value }: HiddenProps) {
  return <input type="hidden" name={name} value={value || ''} />;
}
