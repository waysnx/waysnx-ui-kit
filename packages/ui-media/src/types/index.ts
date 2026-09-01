/**
 * @file types/index.ts
 * Core type definitions for @waysnx/ui-media
 */

// ─── QR & Barcode ────────────────────────────────────────────────────────────

export type BarcodeFormat =
  | 'CODE128' | 'CODE39' | 'EAN13' | 'EAN8'
  | 'UPC' | 'ITF14' | 'MSI' | 'pharmacode';

export type QRErrorCorrection = 'L' | 'M' | 'Q' | 'H';

export interface QRCodeOptions {
  value: string;
  size?: number;
  fgColor?: string;
  bgColor?: string;
  errorCorrection?: QRErrorCorrection;
  includeMargin?: boolean;
}

export interface BarcodeOptions {
  value: string;
  format?: BarcodeFormat;
  width?: number;
  height?: number;
  displayValue?: boolean;
  lineColor?: string;
  background?: string;
}

export interface ScanResult {
  value: string;
  format: string;
  timestamp: Date;
}

// ─── Signature ───────────────────────────────────────────────────────────────

export interface SignatureData {
  dataUrl: string;
  isEmpty: boolean;
  timestamp?: Date;
}

export interface SignatureOptions {
  penColor?: string;
  penWidth?: number;
  backgroundColor?: string;
  width?: number;
  height?: number;
}

// ─── Viewers ─────────────────────────────────────────────────────────────────

export interface ImageViewerOptions {
  images: ImageItem[];
  initialIndex?: number;
  showThumbnails?: boolean;
  showZoom?: boolean;
  showNavigation?: boolean;
}

export interface ImageItem {
  src: string;
  alt?: string;
  title?: string;
  thumbnail?: string;
}

export interface VideoPlayerOptions {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
}

export interface AudioPlayerOptions {
  src: string;
  title?: string;
  artist?: string;
  cover?: string;
  autoPlay?: boolean;
}

// ─── Additional Components ───────────────────────────────────────────────────

export interface ColorPickerOptions {
  value: string;
  onChange?: (color: string) => void;
  showAlpha?: boolean;
  showSwatches?: boolean;
  swatches?: string[];
  format?: 'hex' | 'rgb' | 'hsl';
}

export interface CropperOptions {
  src: string;
  aspectRatio?: number;
  onCrop?: (data: CropResult) => void;
  outputFormat?: 'png' | 'jpeg' | 'webp';
  quality?: number;
}

export interface CropResult {
  dataUrl: string;
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface OCRScannerOptions {
  onResult?: (text: string) => void;
  accept?: string;
  maxSize?: number;
  language?: string;
}

// ─── Component Props ─────────────────────────────────────────────────────────

export interface QRCodeProps {
  value: string;
  size?: number;
  fgColor?: string;
  bgColor?: string;
  errorCorrection?: QRErrorCorrection;
  showDownload?: boolean;
  className?: string;
}

export interface BarcodeProps {
  value: string;
  format?: BarcodeFormat;
  width?: number;
  height?: number;
  displayValue?: boolean;
  showDownload?: boolean;
  className?: string;
}

export interface QRScannerProps {
  onScan?: (result: ScanResult) => void;
  onError?: (error: Error) => void;
  active?: boolean;
  className?: string;
}

export interface BarcodeScannerProps {
  onScan?: (result: ScanResult) => void;
  onError?: (error: Error) => void;
  active?: boolean;
  formats?: BarcodeFormat[];
  className?: string;
}

export interface SignaturePadProps {
  onSave?: (data: SignatureData) => void;
  onClear?: () => void;
  penColor?: string;
  penWidth?: number;
  backgroundColor?: string;
  width?: number | string;
  height?: number;
  className?: string;
}

export interface SignatureViewerProps {
  src: string;
  verified?: boolean;
  signerName?: string;
  signedAt?: Date | string;
  onDownload?: () => void;
  className?: string;
}

export interface ImageViewerProps {
  images: ImageItem[];
  initialIndex?: number;
  showThumbnails?: boolean;
  showZoom?: boolean;
  showNavigation?: boolean;
  height?: string | number;
  className?: string;
}

export interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  showControls?: boolean;
  height?: string | number;
  className?: string;
}

export interface AudioPlayerProps {
  src: string;
  title?: string;
  artist?: string;
  cover?: string;
  autoPlay?: boolean;
  className?: string;
}

export interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  showAlpha?: boolean;
  showSwatches?: boolean;
  swatches?: string[];
  format?: 'hex' | 'rgb' | 'hsl';
  className?: string;
}

export interface CropperProps {
  src: string;
  aspectRatio?: number;
  onCrop?: (data: CropResult) => void;
  outputFormat?: 'png' | 'jpeg' | 'webp';
  quality?: number;
  className?: string;
}

export interface OCRScannerProps {
  onResult?: (text: string) => void;
  accept?: string;
  maxSize?: number;
  className?: string;
}
