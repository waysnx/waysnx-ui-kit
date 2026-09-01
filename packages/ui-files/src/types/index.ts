/**
 * @file types/index.ts
 * Core type definitions for @waysnx/ui-files
 */

// ─── Viewers ─────────────────────────────────────────────────────────────────

export interface PDFViewerOptions {
  src: string;
  initialPage?: number;
  scale?: number;
  showToolbar?: boolean;
  showThumbnails?: boolean;
}

// ─── Component Props ─────────────────────────────────────────────────────────

export interface PDFViewerProps {
  src: string;
  initialPage?: number;
  showToolbar?: boolean;
  showThumbnails?: boolean;
  height?: string | number;
  className?: string;
}

export interface DocumentPreviewProps {
  src: string;
  type?: 'pdf' | 'image' | 'video' | 'audio' | 'markdown' | 'code';
  filename?: string;
  height?: string | number;
  className?: string;
}
