import { useState, useRef } from 'react';
import type { OCRScannerProps } from '../../types';

export function OCRScanner({ onResult, accept = '.jpg,.jpeg,.png,.pdf', maxSize: _maxSize = 10, className = '' }: OCRScannerProps) {
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [_filename, setFilename] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setFilename(file.name);
    // UI shell — real OCR via Tesseract.js or cloud API
    setResult(`OCR result for: ${file.name}\n\nThis is a UI component shell.\nIntegrate Tesseract.js or a cloud OCR API to extract real text.\n\nFile size: ${(file.size / 1024).toFixed(1)} KB`);
    onResult?.(`OCR result for: ${file.name}`);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`wx-adv-ocr ${className}`}>
      <div
        className="wx-adv-ocr__dropzone"
        style={{ borderColor: dragging ? 'var(--wx-color-primary)' : undefined }}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Upload image or PDF for OCR"
      >
        <div style={{ fontSize: 28 }}>📄</div>
        <div style={{ fontWeight: 500 }}>Upload image or PDF</div>
        <div>or drag &amp; drop</div>
        <input ref={inputRef} type="file" accept={accept} style={{ display: 'none' }} onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
      </div>

      {result && (
        <div className="wx-adv-ocr__result">
          <div className="wx-adv-ocr__result-header">
            <span>Extracted Text</span>
            <button className="wx-adv-ocr__result-copy" onClick={handleCopy} type="button">
              {copied ? '✓ Copied' : '📋 Copy'}
            </button>
          </div>
          <div className="wx-adv-ocr__result-text">{result}</div>
        </div>
      )}
    </div>
  );
}
