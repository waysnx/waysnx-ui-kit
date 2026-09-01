/**
 * @file types/index.ts
 * Core type definitions for @waysnx/ui-data
 */

// ─── Editors ─────────────────────────────────────────────────────────────────

export interface MarkdownEditorOptions {
  value: string;
  onChange?: (value: string) => void;
  showPreview?: boolean;
  showToolbar?: boolean;
  placeholder?: string;
  minHeight?: number;
}

export interface JSONEditorOptions {
  value: object | string;
  onChange?: (value: string) => void;
  mode?: 'tree' | 'text';
  readOnly?: boolean;
  indentSize?: number;
}

export interface CodeEditorOptions {
  value: string;
  onChange?: (value: string) => void;
  language?: string;
  theme?: 'light' | 'dark';
  readOnly?: boolean;
  showLineNumbers?: boolean;
  minHeight?: number;
}

// ─── Component Props ─────────────────────────────────────────────────────────

export interface MarkdownEditorProps {
  value: string;
  onChange?: (value: string) => void;
  showPreview?: boolean;
  showToolbar?: boolean;
  placeholder?: string;
  minHeight?: number;
  className?: string;
}

export interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export interface JSONEditorProps {
  value: object | string;
  onChange?: (value: string) => void;
  mode?: 'tree' | 'text';
  readOnly?: boolean;
  indentSize?: number;
  height?: string | number;
  className?: string;
}

export interface XMLViewerProps {
  content: string;
  showLineNumbers?: boolean;
  className?: string;
}

export interface CodeViewerProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  className?: string;
}

export interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  language?: string;
  theme?: 'light' | 'dark';
  readOnly?: boolean;
  showLineNumbers?: boolean;
  minHeight?: number;
  className?: string;
}
