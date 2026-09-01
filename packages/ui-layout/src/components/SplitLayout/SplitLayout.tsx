import React, { useState, useRef, useEffect } from 'react';
import './SplitLayout.css';

export interface SplitLayoutProps {
  children: [React.ReactNode, React.ReactNode];
  direction?: 'horizontal' | 'vertical';
  initialSize?: number;
  minSize?: number;
  maxSize?: number;
  className?: string;
  testId?: string;
}

export const SplitLayout: React.FC<SplitLayoutProps> = ({
  children,
  direction = 'horizontal',
  initialSize = 50,
  minSize = 10,
  maxSize = 90,
  className = '',
  testId,
}) => {
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      let newSize: number;

      if (direction === 'horizontal') {
        newSize = ((e.clientX - rect.left) / rect.width) * 100;
      } else {
        newSize = ((e.clientY - rect.top) / rect.height) * 100;
      }

      newSize = Math.max(minSize, Math.min(maxSize, newSize));
      setSize(newSize);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, direction, minSize, maxSize]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = 5;
    let newSize = size;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        newSize = Math.min(maxSize, size + step);
        setSize(newSize);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        newSize = Math.max(minSize, size - step);
        setSize(newSize);
        break;
      case 'Home':
        e.preventDefault();
        setSize(minSize);
        break;
      case 'End':
        e.preventDefault();
        setSize(maxSize);
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`split-layout split-layout-${direction} ${
        isDragging ? 'split-layout-dragging' : ''
      } ${className}`}
      data-testid={testId}
    >
      <div
        className="split-layout-pane split-layout-pane-first"
        style={{
          [direction === 'horizontal' ? 'width' : 'height']: `${size}%`,
        }}
        aria-label="First pane"
      >
        {children[0]}
      </div>
      <div
        ref={dividerRef}
        className={`split-layout-divider split-layout-divider-${direction}`}
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
        role="separator"
        aria-orientation={direction === 'horizontal' ? 'vertical' : 'horizontal'}
        aria-label="Resize divider"
        aria-valuenow={size}
        aria-valuemin={minSize}
        aria-valuemax={maxSize}
        tabIndex={0}
      >
        <div className="split-layout-divider-handle" aria-hidden="true" />
      </div>
      <div
        className="split-layout-pane split-layout-pane-second"
        style={{
          [direction === 'horizontal' ? 'width' : 'height']: `${100 - size}%`,
        }}
        aria-label="Second pane"
      >
        {children[1]}
      </div>
    </div>
  );
};
