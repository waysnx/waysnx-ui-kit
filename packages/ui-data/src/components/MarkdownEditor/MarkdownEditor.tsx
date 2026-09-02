import { useState, useMemo } from 'react';
import DOMPurify from 'dompurify';
import type { MarkdownEditorProps } from '../../types';

export function MarkdownEditor({
  value,
  onChange,
  showPreview = true,
  showToolbar = true,
  placeholder = 'Write markdown...',
  minHeight = 200,
  className = '',
}: MarkdownEditorProps) {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    setLocalValue(v);
    onChange?.(v);
  };

  const stats = useMemo(() => {
    const words = localValue.trim() ? localValue.trim().split(/\s+/).length : 0;
    const lines = localValue.split('\n').length;
    return { words, lines };
  }, [localValue]);

  const insertMarkdown = (prefix: string, suffix = '') => {
    const textarea = document.querySelector('.wx-adv-markdown-editor__input') as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = localValue.slice(start, end);
    const newValue = localValue.slice(0, start) + prefix + selected + suffix + localValue.slice(end);
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={`wx-adv-markdown-editor ${className}`}>
      {showToolbar && (
        <div className="wx-adv-toolbar">
          <button className="wx-adv-toolbar__btn" onClick={() => insertMarkdown('**', '**')} title="Bold" type="button"><b>B</b></button>
          <button className="wx-adv-toolbar__btn" onClick={() => insertMarkdown('*', '*')} title="Italic" type="button"><i>I</i></button>
          <span className="wx-adv-toolbar__separator" />
          <button className="wx-adv-toolbar__btn" onClick={() => insertMarkdown('# ')} title="Heading" type="button">H</button>
          <button className="wx-adv-toolbar__btn" onClick={() => insertMarkdown('- ')} title="List" type="button">☰</button>
          <button className="wx-adv-toolbar__btn" onClick={() => insertMarkdown('1. ')} title="Ordered List" type="button">1.</button>
          <span className="wx-adv-toolbar__separator" />
          <button className="wx-adv-toolbar__btn" onClick={() => insertMarkdown('[', '](url)')} title="Link" type="button">🔗</button>
          <button className="wx-adv-toolbar__btn" onClick={() => insertMarkdown('`', '`')} title="Code" type="button">{'{}'}</button>
          <button className="wx-adv-toolbar__btn" onClick={() => insertMarkdown('> ')} title="Quote" type="button">❝</button>
        </div>
      )}
      <div className="wx-adv-markdown-editor__body" style={{ minHeight }}>
        <textarea
          className="wx-adv-markdown-editor__input"
          value={localValue}
          onChange={handleChange}
          placeholder={placeholder}
          style={{ minHeight }}
          aria-label="Markdown editor"
        />
        {showPreview && (
          <div className="wx-adv-markdown-editor__preview">
            <div dangerouslySetInnerHTML={{ __html: renderMarkdownPreview(localValue) }} />
          </div>
        )}
      </div>
      <div className="wx-adv-markdown-editor__footer">
        <span>Words: {stats.words}</span>
        <span>Lines: {stats.lines}</span>
      </div>
    </div>
  );
}

/** Minimal markdown to HTML (preview only). */
function simpleMarkdownToHtml(md: string): string {
  return md
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    .replace(/\n/g, '<br>');
}

/**
 * Render the markdown preview as sanitized HTML.
 *
 * The minimal parser does not escape raw HTML in the editor input, so the
 * generated string must be sanitized before it reaches dangerouslySetInnerHTML
 * to prevent XSS. Uses DOMPurify with a tag allow-list matching the parser's
 * output (consistent with HtmlContent / HtmlWidget).
 */
function renderMarkdownPreview(md: string): string {
  return DOMPurify.sanitize(simpleMarkdownToHtml(md), {
    ALLOWED_TAGS: ['h1', 'h2', 'h3', 'strong', 'em', 'code', 'li', 'br'],
    ALLOWED_ATTR: [],
  });
}
