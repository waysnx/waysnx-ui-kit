/**
 * Markdown Renderer
 * Renders markdown content with syntax highlighting using --wx-* tokens.
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = '',
}) => {
  return (
    <div
      className={className}
      style={{
        color: 'var(--wx-color-text)',
        fontSize: 'var(--wx-font-size-md)',
        lineHeight: 1.7,
      }}
    >
      <ReactMarkdown
        components={{
          code: (props: any) => {
            const { inline, className: codeClassName, children, ...rest } = props;
            const match = /language-(\w+)/.exec(codeClassName || '');
            const language = match ? match[1] : 'text';

            if (inline) {
              return (
                <code
                  style={{
                    background: 'var(--wx-color-surface-alt)',
                    border: '1px solid var(--wx-color-border)',
                    padding: '2px 6px',
                    borderRadius: 'var(--wx-radius-sm)',
                    fontFamily: 'monospace',
                    fontSize: '0.875em',
                    color: 'var(--wx-color-primary)',
                  }}
                  {...rest}
                >
                  {children}
                </code>
              );
            }

            return (
              <SyntaxHighlighter
                language={language}
                style={dracula as any}
                customStyle={{ borderRadius: 'var(--wx-radius-md)', marginBottom: '1.25rem' }}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            );
          },
          h1: ({ children, ...props }: any) => (
            <h1 style={{ fontSize: 'var(--wx-font-size-xl)', fontWeight: 700, marginBottom: '1rem', marginTop: '2rem', color: 'var(--wx-color-text)' }} {...props}>{children}</h1>
          ),
          h2: ({ children, ...props }: any) => (
            <h2 style={{ fontSize: 'var(--wx-font-size-lg)', fontWeight: 700, marginBottom: '0.75rem', marginTop: '1.5rem', color: 'var(--wx-color-text)' }} {...props}>{children}</h2>
          ),
          h3: ({ children, ...props }: any) => (
            <h3 style={{ fontSize: 'var(--wx-font-size-md)', fontWeight: 600, marginBottom: '0.5rem', marginTop: '1.25rem', color: 'var(--wx-color-text)' }} {...props}>{children}</h3>
          ),
          h4: ({ children, ...props }: any) => (
            <h4 style={{ fontSize: 'var(--wx-font-size-sm)', fontWeight: 600, marginBottom: '0.5rem', marginTop: '1rem', color: 'var(--wx-color-text)' }} {...props}>{children}</h4>
          ),
          p: ({ children, ...props }: any) => (
            <p style={{ marginBottom: '1rem', color: 'var(--wx-color-text)', lineHeight: 1.7 }} {...props}>{children}</p>
          ),
          ul: ({ children, ...props }: any) => (
            <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem', listStyleType: 'disc' }} {...props}>{children}</ul>
          ),
          ol: ({ children, ...props }: any) => (
            <ol style={{ marginBottom: '1rem', paddingLeft: '1.5rem', listStyleType: 'decimal' }} {...props}>{children}</ol>
          ),
          li: ({ children, ...props }: any) => (
            <li style={{ marginBottom: '0.375rem', color: 'var(--wx-color-text)', lineHeight: 1.6 }} {...props}>{children}</li>
          ),
          blockquote: ({ children, ...props }: any) => (
            <blockquote style={{
              borderLeft: '4px solid var(--wx-color-primary)',
              paddingLeft: '1rem',
              fontStyle: 'italic',
              margin: '1rem 0',
              color: 'var(--wx-color-text-muted)',
            }} {...props}>{children}</blockquote>
          ),
          a: ({ children, ...props }: any) => (
            <a style={{ color: 'var(--wx-color-primary)', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
          ),
          table: ({ children, ...props }: any) => (
            <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--wx-font-size-sm)' }} {...props}>{children}</table>
            </div>
          ),
          thead: ({ children, ...props }: any) => (
            <thead style={{ background: 'var(--wx-color-surface-alt)' }} {...props}>{children}</thead>
          ),
          td: ({ children, ...props }: any) => (
            <td style={{ border: '1px solid var(--wx-color-border)', padding: '8px 12px', color: 'var(--wx-color-text)' }} {...props}>{children}</td>
          ),
          th: ({ children, ...props }: any) => (
            <th style={{ border: '1px solid var(--wx-color-border)', padding: '8px 12px', textAlign: 'left', fontWeight: 600, color: 'var(--wx-color-text)' }} {...props}>{children}</th>
          ),
          hr: (props: any) => (
            <hr style={{ border: 'none', borderTop: '1px solid var(--wx-color-border)', margin: '1.5rem 0' }} {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

MarkdownRenderer.displayName = 'MarkdownRenderer';
