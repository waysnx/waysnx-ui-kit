import type { CodeViewerProps } from '../../types';

export function CodeViewer({ code, language = 'text', showLineNumbers = true, highlightLines = [], className = '' }: CodeViewerProps) {
  const lines = code.split('\n');

  return (
    <div className={`wx-adv-code-viewer ${className}`}>
      <div className="wx-adv-code-viewer__header">
        <span>{language}</span>
        <button
          onClick={() => navigator.clipboard.writeText(code)}
          style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 12, color: 'var(--wx-color-text-muted)' }}
          type="button"
        >
          Copy
        </button>
      </div>
      <div className="wx-adv-code-viewer__body">
        {showLineNumbers && (
          <div className="wx-adv-code-viewer__lines">
            {lines.map((_, i) => <div key={i}>{i + 1}</div>)}
          </div>
        )}
        <div className="wx-adv-code-viewer__code">
          {lines.map((line, i) => (
            <span key={i} className={highlightLines.includes(i + 1) ? 'wx-adv-code-viewer__line--highlighted' : ''}>
              {line}{'\n'}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
