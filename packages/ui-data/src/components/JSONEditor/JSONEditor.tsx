import { useState, useMemo } from 'react';
import type { JSONEditorProps } from '../../types';

export function JSONEditor({
  value,
  onChange,
  mode = 'text',
  readOnly = false,
  indentSize = 2,
  height = 300,
  className = '',
}: JSONEditorProps) {
  const stringValue = useMemo(() => {
    if (typeof value === 'string') return value;
    try { return JSON.stringify(value, null, indentSize); }
    catch { return '{}'; }
  }, [value, indentSize]);

  const [localValue, setLocalValue] = useState(stringValue);
  const [error, setError] = useState<string | null>(null);

  const lineCount = localValue.split('\n').length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    setLocalValue(v);
    try {
      JSON.parse(v);
      setError(null);
      onChange?.(v);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className={`wx-adv-json-editor ${className}`}>
      <div className="wx-adv-json-editor__header">
        <span style={{ fontWeight: 500 }}>JSON Editor</span>
        <span style={{ fontSize: 12, color: error ? 'var(--wx-color-error, #ef4444)' : 'var(--wx-color-text-muted)' }}>
          {mode === 'tree' ? 'Tree' : 'Text'} {error && `• ${error.slice(0, 40)}`}
        </span>
      </div>
      <div className="wx-adv-json-editor__content" style={{ height }}>
        <div className="wx-adv-json-editor__line-numbers">
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <textarea
          className="wx-adv-json-editor__textarea"
          value={localValue}
          onChange={handleChange}
          readOnly={readOnly}
          spellCheck={false}
          style={{ height: '100%' }}
          aria-label="JSON editor"
        />
      </div>
      <div className="wx-adv-json-editor__status">
        <span>Ln {lineCount}, Col 1</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}
