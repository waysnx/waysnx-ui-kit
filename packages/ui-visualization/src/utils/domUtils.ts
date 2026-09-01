/**
 * @file utils/domUtils.ts
 * DOM utilities for visualization components
 */

/**
 * Get the bounding rect of an element relative to a container.
 */
export function getRelativeBounds(
  element: HTMLElement,
  container: HTMLElement
): DOMRect {
  const elRect = element.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  return new DOMRect(
    elRect.left - containerRect.left,
    elRect.top - containerRect.top,
    elRect.width,
    elRect.height
  );
}

/**
 * Download a blob as a file.
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Serialize an SVG element to a string.
 */
export function serializeSvg(svgEl: SVGSVGElement): string {
  const serializer = new XMLSerializer();
  return serializer.serializeToString(svgEl);
}

/**
 * Convert an SVG string to a PNG data URL via canvas.
 */
export function svgToPngDataUrl(
  svgString: string,
  width: number,
  height: number,
  scale = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext('2d');
    if (!ctx) return reject(new Error('Canvas 2D context not available'));

    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/png'));
    };

    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };

    img.src = url;
  });
}

/**
 * Prevent default and stop propagation for an event.
 */
export function stopEvent(e: Event | React.SyntheticEvent): void {
  e.preventDefault();
  e.stopPropagation();
}
