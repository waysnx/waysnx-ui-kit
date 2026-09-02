import DOMPurify from 'dompurify';
import type { MarkdownViewerProps } from '../../types';

function simpleMarkdownToHtml(md: string): string {
  return md
    .replace(/^### (.*$)/gm, '<h3 style="margin:12px 0 6px">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 style="margin:16px 0 8px">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 style="margin:20px 0 10px">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code style="background:var(--wx-color-surface-alt);padding:1px 5px;border-radius:3px;font-family:monospace">$1</code>')
    .replace(/^- (.*$)/gm, '<li style="margin:2px 0">$1</li>')
    .replace(/^> (.*$)/gm, '<blockquote style="border-left:3px solid var(--wx-color-primary);margin:8px 0;padding-left:12px;color:var(--wx-color-text-muted)">$1</blockquote>')
    .replace(/\n/g, '<br>');
}

export function MarkdownViewer({ content, className = '' }: MarkdownViewerProps) {
  // The minimal parser does not escape raw HTML in the content, so the
  // generated markup is sanitized before rendering to prevent XSS. The parser
  // emits presentational inline styles, so `style` is allowed while scriptable
  // vectors (script/event handlers/iframe/etc.) are stripped by DOMPurify.
  const sanitizedHtml = DOMPurify.sanitize(simpleMarkdownToHtml(content), {
    ALLOWED_TAGS: ['h1', 'h2', 'h3', 'strong', 'em', 'code', 'li', 'blockquote', 'br'],
    ALLOWED_ATTR: ['style'],
  });

  return (
    <div
      className={`wx-adv-markdown-viewer ${className}`}
      style={{ padding: 16, fontSize: 14, lineHeight: 1.7, color: 'var(--wx-color-text)' }}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      role="document"
      aria-label="Markdown content"
    />
  );
}
