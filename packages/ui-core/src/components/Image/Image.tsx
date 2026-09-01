import React, { useState } from 'react';
import './Image.css';

export interface ImageProps {
  /** Image source URL */
  src: string;
  /** Alt text (required for accessibility) */
  alt: string;
  /** Optional caption below the image */
  caption?: string;
  /** Width */
  width?: string | number;
  /** Height */
  height?: string | number;
  /** Object-fit style */
  fit?: 'cover' | 'contain' | 'fill' | 'none';
  /** Rounded corners — true for radius, 'full' for circle */
  rounded?: boolean | 'full';
  /** Fallback src if image fails to load */
  fallback?: string;
  /** CSS class name */
  className?: string;
  testId?: string;
}

export function Image({
  src,
  alt,
  caption,
  width,
  height,
  fit,
  rounded,
  fallback,
  className,
  testId,
}: ImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  const classes = [
    'wx-image',
    fit ? `wx-image--${fit}` : '',
    rounded === true ? 'wx-image--rounded' : '',
    rounded === 'full' ? 'wx-image--circle' : '',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <div className="wx-image-wrapper" data-testid={testId}>
      <img
        className={classes}
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        onError={() => fallback && setImgSrc(fallback)}
        loading="lazy"
      />
      {caption && <div className="wx-image-caption">{caption}</div>}
    </div>
  );
}
