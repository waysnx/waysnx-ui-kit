import React, { useState, useRef, useEffect, useId } from 'react';
import DOMPurify from 'dompurify';
import './HtmlEditor.css';
import { warn } from '../../dev';

export interface HtmlEditorProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  minHeight?: number;
  toolbar?: ('bold' | 'italic' | 'underline' | 'link' | 'ul' | 'ol' | 'h1' | 'h2')[];
  id?: string;
  className?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  testId?: string;
}

export function HtmlEditor({
  label,
  value = '',
  onChange,
  placeholder = 'Start typing...',
  hint,
  error,
  disabled = false,
  minHeight = 150,
  toolbar = ['bold', 'italic', 'underline', 'link', 'ul', 'ol', 'h1', 'h2'],
  id,
  className,
  ariaLabel,
  ariaDescribedBy,
  testId,
}: HtmlEditorProps) {
  warn(Boolean(label || ariaLabel), 'HtmlEditor needs label');

  const [isFocused, setIsFocused] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const generatedId = id || `wx-htmleditor-${reactId}`;
  
  // Build aria-describedby with error and hint
  const descriptionIds = [];
  if (error) descriptionIds.push(`${generatedId}-error`);
  if (hint && !error) descriptionIds.push(`${generatedId}-hint`);
  if (ariaDescribedBy) descriptionIds.push(ariaDescribedBy);
  const finalAriaDescribedBy = descriptionIds.length > 0 ? descriptionIds.join(' ') : undefined;

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      const sanitized = DOMPurify.sanitize(value, {
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li', 'h1', 'h2'],
        ALLOWED_ATTR: ['href'],
      });
      editorRef.current.innerHTML = sanitized;
    }
  }, [value]);

  const applyFormat = (command: string, valueArg?: string) => {
    document.execCommand(command, false, valueArg);
    editorRef.current?.focus();
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.innerHTML;
    const sanitized = DOMPurify.sanitize(content, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li', 'h1', 'h2'],
      ALLOWED_ATTR: ['href'],
    });
    onChange?.(sanitized);
  };

  const handleLink = () => {
    const url = prompt('Enter URL:');
    if (url && /^(https?:|mailto:)/i.test(url.trim())) {
      applyFormat('createLink', url.trim());
    } else if (url) {
      alert('Only https://, http://, or mailto: URLs are allowed.');
    }
  };

  const toolbarConfig: Record<string, {
    label: string;
    command: string;
    title: string;
    style?: React.CSSProperties;
    value?: string;
    onClick?: () => void;
  }> = {
    bold: { label: 'B', command: 'bold', title: 'Bold', style: { fontWeight: 'bold' } },
    italic: { label: 'I', command: 'italic', title: 'Italic', style: { fontStyle: 'italic' } },
    underline: { label: 'U', command: 'underline', title: 'Underline', style: { textDecoration: 'underline' } },
    link: { label: '🔗', command: 'createLink', title: 'Insert Link', onClick: handleLink },
    ul: { label: '• List', command: 'insertUnorderedList', title: 'Bullet List' },
    ol: { label: '1. List', command: 'insertOrderedList', title: 'Numbered List' },
    h1: { label: 'H1', command: 'formatBlock', value: 'h1', title: 'Heading 1' },
    h2: { label: 'H2', command: 'formatBlock', value: 'h2', title: 'Heading 2' },
  };

  return (
    <div className={`wx-htmleditor-wrapper ${className || ''}`} data-testid={testId}>
      {label && <label htmlFor={generatedId} className="wx-htmleditor-label">{label}</label>}

      <div
        className={`wx-htmleditor-container ${isFocused ? 'wx-htmleditor-container-focused' : ''} ${
          error ? 'wx-htmleditor-container-error' : ''
        } ${disabled ? 'wx-htmleditor-container-disabled' : ''}`}
      >
        {/* Toolbar */}
        <div className="wx-htmleditor-toolbar">
          {toolbar.map((tool) => {
            const config = toolbarConfig[tool];
            if (!config) return null;

            return (
              <button
                key={tool}
                type="button"
                className="wx-htmleditor-toolbar-btn"
                onClick={() => {
                  if (config.onClick) {
                    config.onClick();
                  } else {
                    applyFormat(config.command, config.value);
                  }
                }}
                title={config.title}
                disabled={disabled}
                style={config.style}
              >
                {config.label}
              </button>
            );
          })}
        </div>

        {/* Editor */}
        <div
          ref={editorRef}
          id={generatedId}
          contentEditable={!disabled}
          onInput={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="wx-htmleditor-content"
          style={{ minHeight: `${minHeight}px` }}
          data-placeholder={placeholder}
          dir="ltr"
          suppressContentEditableWarning
          role="textbox"
          aria-label={ariaLabel || label}
          aria-invalid={!!error}
          aria-describedby={finalAriaDescribedBy}
          aria-multiline="true"
        />
      </div>

      {hint && !error && <div className="wx-htmleditor-hint" id={`${generatedId}-hint`}>{hint}</div>}
      {error && <div className="wx-htmleditor-error-text" id={`${generatedId}-error`} role="alert">{error}</div>}
    </div>
  );
}
