import { useState, useRef, useCallback } from 'react';
import type { SignatureData } from '../types';

export interface UseSignatureReturn {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  isEmpty: boolean;
  save: () => SignatureData;
  clear: () => void;
  startDrawing: (e: React.MouseEvent | React.TouchEvent) => void;
  draw: (e: React.MouseEvent | React.TouchEvent) => void;
  stopDrawing: () => void;
}

export function useSignature(penColor = '#1e293b', penWidth = 2): UseSignatureReturn {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const isDrawingRef = useRef(false);

  const getCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDrawing = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    isDrawingRef.current = true;
    const { x, y } = getCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [penColor, penWidth]);

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    setIsEmpty(false);
  }, []);

  const stopDrawing = useCallback(() => {
    isDrawingRef.current = false;
  }, []);

  const save = useCallback((): SignatureData => {
    const canvas = canvasRef.current;
    return {
      dataUrl: canvas?.toDataURL('image/png') || '',
      isEmpty,
      timestamp: new Date(),
    };
  }, [isEmpty]);

  const clear = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
  }, []);

  return { canvasRef, isEmpty, save, clear, startDrawing, draw, stopDrawing };
}
