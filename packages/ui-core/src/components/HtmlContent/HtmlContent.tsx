import React from 'react';
import DOMPurify from 'dompurify';
import './HtmlContent.css';

export interface HtmlContentProps {
  content: string;
  className?: string;
}

export function HtmlContent({ content, className }: HtmlContentProps) {
  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre', 'span', 'div'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
  });

  return (
    <div
      className={`wx-html-content ${className || ''}`}
      role="region"
      aria-label="Content"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}
