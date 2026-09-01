import React from 'react';
import './ErrorMessage.css';

export interface ErrorMessageProps {
  error?: string;
  show?: boolean;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, show = true }) => {
  if (!error || !show) return null;

  return (
    <span className="wx-error-message" role="alert" aria-live="assertive" aria-atomic="true">
      {error}
    </span>
  );
};
