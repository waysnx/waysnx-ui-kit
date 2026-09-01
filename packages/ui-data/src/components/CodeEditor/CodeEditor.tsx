import { useState, useMemo } from 'react';
import type { CodeEditorProps } from '../../types';

export function CodeEditor({ value, onChange, language = 'typescript', readOnly = false, showLineNumbers = true, minHeight = 200, className = '' }: CodeEditorProps) {
  const [localValue, setLocalValue] = useState(value);

  const lineCount = useMemo(() => localValue.split('\n').length, [localValue]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalValue(e.target.value);
    onChange?.(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newValue = localValue.slice(0, start) + '  ' + localValue.slice(end);
      setLocalValue(newValue);
      onChange?.(newValue);
    }
  };

  const lines = lineCount;
  const cols = localValue.split('\n').reduce((max, l) => Math.max(max, l.length), 0);

  return (
    <div className={`wx-adv-code-viewer ${className}`}>
      <div className="wx-adv-code-viewer__header">
        <span style={{ fontWeight: 500 }}>{language}</span>
        <span style={{ fontSize: 11 }}>Ln {lines}, Col {cols} · UTF-8</span>
      </div>
      <div className="wx-adv-code-viewer__body" style={{ minHeight }}>
        {showLineNumbers && (
          <div className="wx-adv-code-viewer__lines">
            {Array.from({ length: lineCount }, (_, i) => <div key={i}>{i + 1}</div>)}
          </div>
        )}
        <textarea
          value={localValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          spellCheck={false}
          style={{ flex: 1, border: 'none', padding: '12px 16px', fontFamily: 'var(--wx-adv-editor-font)', fontSize: 13, lineHeight: 1.7, resize: 'vertical', outline: 'none', background: 'var(--wx-adv-editor-bg)', color: 'var(--wx-color-text)', minHeight, width: '100%' }}
          aria-label={`${language} code editor`}
        />
      </div>
      <div className="wx-adv-json-editor__status">
        <span>Spaces: 2</span>
        <span>{language.charAt(0).toUpperCase() + language.slice(1)}</span>
      </div>
    </div>
  );
}
