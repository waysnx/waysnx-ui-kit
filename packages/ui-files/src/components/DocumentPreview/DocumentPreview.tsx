import type { DocumentPreviewProps } from '../../types';
import { PDFViewer } from '../PDFViewer';

/**
 * DocumentPreview — routes a source to the appropriate viewer by file type.
 *
 * Supported / delegated formats in 1.0.0:
 * - `pdf`  → rendered via {@link PDFViewer}, which is itself a shell/adapter
 *            (viewer chrome only; integrate PDF.js for real page rendering).
 * - `image`, `video`, `audio` → NOT previewed here. Use `@waysnx/ui-media`
 *            (ImageViewer / VideoPlayer / AudioPlayer).
 * - `markdown` → use `@waysnx/ui-data` (MarkdownViewer).
 * - `code` and all other/unknown types → NOT previewed here; a metadata card
 *            is shown that points to the correct package.
 *
 * For any non-PDF type this component intentionally renders an informational
 * placeholder rather than attempting a preview, so unsupported formats are
 * never presented as if they were successfully rendered.
 */
function detectType(src: string, type?: string): string {
  if (type) return type;
  const ext = src.split('.').pop()?.toLowerCase() || '';
  if (['pdf'].includes(ext)) return 'pdf';
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) return 'image';
  if (['mp4', 'webm', 'ogg', 'mov'].includes(ext)) return 'video';
  if (['mp3', 'wav', 'ogg', 'flac'].includes(ext)) return 'audio';
  if (['md', 'markdown'].includes(ext)) return 'markdown';
  if (['js', 'ts', 'tsx', 'jsx', 'py', 'css', 'html', 'json', 'xml'].includes(ext)) return 'code';
  return 'code';
}

export function DocumentPreview({ src, type, filename, height = 400, className = '' }: DocumentPreviewProps) {
  const resolvedType = detectType(src, type);

  switch (resolvedType) {
    case 'pdf':
      return <PDFViewer src={src} height={height} className={className} />;
    default:
      return (
        <div className={`wx-adv-card ${className}`} style={{ height, overflow: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', color: 'var(--wx-color-text-muted, #6b7280)', fontSize: 14 }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>📎</div>
            <div>Preview not available for this type</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>{filename || src}</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>Type: {resolvedType}</div>
            <div style={{ fontSize: 12, marginTop: 8 }}>
              Use @waysnx/ui-media for image/video/audio preview or @waysnx/ui-data for code/markdown preview
            </div>
          </div>
        </div>
      );
  }
}
