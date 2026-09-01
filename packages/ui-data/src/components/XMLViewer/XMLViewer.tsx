import type { XMLViewerProps } from '../../types';

export function XMLViewer({ content, showLineNumbers = true, className = '' }: XMLViewerProps) {
  const lines = content.split('\n');

  const colorize = (line: string) => {
    return line
      .replace(/(&lt;\/?)(\w[\w.-]*)/g, '<span style="color:#2563eb">$1$2</span>')
      .replace(/(\w+)=/g, '<span style="color:#7c3aed">$1</span>=')
      .replace(/(".*?")/g, '<span style="color:#16a34a">$1</span>')
      .replace(/(&lt;!--.*?--&gt;)/g, '<span style="color:#9ca3af;font-style:italic">$1</span>');
  };

  const escaped = content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const escapedLines = escaped.split('\n');

  return (
    <div className={`wx-adv-code-viewer ${className}`}>
      <div className="wx-adv-code-viewer__header">
        <span>XML</span>
        <button onClick={() => navigator.clipboard.writeText(content)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 12, color: 'var(--wx-color-text-muted)' }} type="button">Copy</button>
      </div>
      <div className="wx-adv-code-viewer__body">
        {showLineNumbers && (
          <div className="wx-adv-code-viewer__lines">
            {lines.map((_, i) => <div key={i}>{i + 1}</div>)}
          </div>
        )}
        <div className="wx-adv-code-viewer__code" style={{ overflowX: 'auto' }}>
          {escapedLines.map((line, i) => (
            <div key={i} dangerouslySetInnerHTML={{ __html: colorize(line) || '&nbsp;' }} />
          ))}
        </div>
      </div>
    </div>
  );
}
