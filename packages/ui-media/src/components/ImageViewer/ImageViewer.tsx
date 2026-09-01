import { useState } from 'react';
import type { ImageViewerProps } from '../../types';

export function ImageViewer({
  images,
  initialIndex = 0,
  showThumbnails = true,
  showNavigation = true,
  height = 380,
  className = '',
}: ImageViewerProps) {
  const [activeIdx, setActiveIdx] = useState(initialIndex);
  const current = images[activeIdx];

  const prev = () => setActiveIdx(i => Math.max(0, i - 1));
  const next = () => setActiveIdx(i => Math.min(images.length - 1, i + 1));

  if (!images.length) return (
    <div className={`wx-adv-image-viewer ${className}`} style={{ height }}>
      <div className="wx-adv-image-viewer__main" style={{ height }}>
        <span style={{ color: '#fff' }}>No images</span>
      </div>
    </div>
  );

  return (
    <div className={`wx-adv-image-viewer ${className}`}>
      <div className="wx-adv-image-viewer__main" style={{ height }}>
        <img src={current.src} alt={current.alt || current.title || `Image ${activeIdx + 1}`} />
        {showNavigation && activeIdx > 0 && (
          <button className="wx-adv-image-viewer__nav-btn wx-adv-image-viewer__nav-btn--prev" onClick={prev} aria-label="Previous">‹</button>
        )}
        {showNavigation && activeIdx < images.length - 1 && (
          <button className="wx-adv-image-viewer__nav-btn wx-adv-image-viewer__nav-btn--next" onClick={next} aria-label="Next">›</button>
        )}
      </div>
      {showThumbnails && images.length > 1 && (
        <div className="wx-adv-image-viewer__thumbnails">
          {images.map((img, i) => (
            <div
              key={i}
              className={`wx-adv-image-viewer__thumbnail ${i === activeIdx ? 'wx-adv-image-viewer__thumbnail--active' : ''}`}
              onClick={() => setActiveIdx(i)}
            >
              <img src={img.thumbnail || img.src} alt={img.alt || `Thumbnail ${i + 1}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
