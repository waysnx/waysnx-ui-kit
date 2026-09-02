import React from 'react';
import DOMPurify from 'dompurify';
import './HtmlContent.css';

// Ensure any link opened in a new browsing context cannot control the opener
// window (reverse tabnabbing). Registered once at module scope so it is applied
// to every HtmlContent sanitization and is safe against duplicate registration.
let relHookRegistered = false;
function ensureSafeLinkTargetHook(): void {
  if (relHookRegistered) return;
  relHookRegistered = true;

  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if (node.nodeName !== 'A' || !(node instanceof Element)) return;

    // Only anchors that open in a new context are at risk. Preserve any other
    // legitimate target (e.g. named frames) untouched.
    if (node.getAttribute('target') !== '_blank') return;

    // Merge required safety tokens into any existing, legitimate rel value
    // rather than overwriting it.
    const existing = (node.getAttribute('rel') || '').split(/\s+/).filter(Boolean);
    for (const token of ['noopener', 'noreferrer']) {
      if (!existing.includes(token)) existing.push(token);
    }
    node.setAttribute('rel', existing.join(' '));
  });
}

export interface HtmlContentProps {
  content: string;
  className?: string;
}

export function HtmlContent({ content, className }: HtmlContentProps) {
  ensureSafeLinkTargetHook();

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
