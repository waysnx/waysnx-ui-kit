import type { SignatureViewerProps } from '../../types';

export function SignatureViewer({
  src,
  verified = false,
  signerName,
  signedAt,
  onDownload,
  className = '',
}: SignatureViewerProps) {
  return (
    <div className={`wx-adv-signature-viewer ${className}`}>
      <img src={src} alt={`Signature${signerName ? ` of ${signerName}` : ''}`} className="wx-adv-signature-viewer__image" />
      {verified && (
        <span className="wx-adv-signature-viewer__badge">✓ Verified</span>
      )}
      {signerName && <div style={{ fontSize: 13, color: 'var(--wx-color-text-muted)' }}>{signerName}</div>}
      {signedAt && <div style={{ fontSize: 11, color: 'var(--wx-color-text-muted)' }}>Signed: {new Date(signedAt).toLocaleDateString()}</div>}
      {onDownload && (
        <button className="wx-adv-qr__download-btn" onClick={onDownload} type="button">
          ⬇ Download
        </button>
      )}
    </div>
  );
}
