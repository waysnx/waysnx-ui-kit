import { useState, useRef } from 'react';
import type { OCRScannerProps } from '../../types';

/**
 * OCRScanner — SHELL / INTEGRATION component (no built-in OCR engine).
 *
 * Provides the upload/drag-and-drop UI for OCR workflows but does NOT extract
 * text on its own. To obtain real results, integrate an OCR engine
 * (e.g. Tesseract.js) or a cloud OCR API in your application and feed the
 * recognized text back to your own state.
 *
 * Importantly, this shell does NOT fabricate OCR output: the `onResult`
 * callback is only invoked with genuine text, so it will not fire until a real
 * OCR integration is wired up. This avoids presenting placeholder text as if it
 * were extracted content.
 */
export function OCRScanner({ onResult: _onResult, accept = '.jpg,.jpeg,.png,.pdf', maxSize: _maxSize = 10, className = '' }: OCRScannerProps) {
  const [filename, setFilename] = useState('');
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    // Record the selection only. No OCR is performed and no result is emitted;
    // integrate an OCR engine/API to produce and surface real extracted text.
    setFilename(file.name);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
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

      {filename && (
        <div className="wx-adv-ocr__result">
          <div className="wx-adv-ocr__result-header">
            <span>Selected file</span>
          </div>
          <div className="wx-adv-ocr__result-text">
            {filename}
            {'\n\n'}
            No text was extracted. OCRScanner is an integration shell — connect an
            OCR engine (e.g. Tesseract.js) or a cloud OCR API to extract real text.
          </div>
        </div>
      )}
    </div>
  );
}
