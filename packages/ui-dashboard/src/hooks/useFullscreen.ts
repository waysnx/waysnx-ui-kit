/**
 * @file useFullscreen.ts
 * Hook for managing fullscreen mode
 */

import { useCallback, useRef } from "react";
import { useDashboard } from "./useDashboard";

/**
 * Hook for managing fullscreen mode
 *
 * @param elementRef - Ref to element to make fullscreen
 * @returns Fullscreen state and methods
 *
 * @example
 * ```tsx
 * const elementRef = useRef<HTMLDivElement>(null);
 * const { isFullscreen, toggleFullscreen } = useFullscreen(elementRef);
 * ```
 */
export const useFullscreen = (elementRef?: React.RefObject<HTMLElement>) => {
  const { isFullscreen, setIsFullscreen, config } = useDashboard();
  const internalRef = useRef<HTMLElement>(null);

  if (!config.enableFullscreen) {
    return {
      isFullscreen: false,
      toggleFullscreen: () => {},
      enterFullscreen: () => {},
      exitFullscreen: () => {},
    };
  }

  const element = elementRef?.current || internalRef.current;

  const enterFullscreen = useCallback(async () => {
    if (!element) return;

    try {
      const requestFullscreen =
        element.requestFullscreen ||
        (element as any).webkitRequestFullscreen ||
        (element as any).mozRequestFullScreen ||
        (element as any).msRequestFullscreen;

      if (requestFullscreen) {
        await requestFullscreen.call(element);
        setIsFullscreen(true);
      }
    } catch (error) {
      console.error("Failed to enter fullscreen:", error);
    }
  }, [element, setIsFullscreen]);

  const exitFullscreen = useCallback(async () => {
    try {
      const exitFullscreen =
        document.exitFullscreen ||
        (document as any).webkitExitFullscreen ||
        (document as any).mozCancelFullScreen ||
        (document as any).msExitFullscreen;

      if (exitFullscreen) {
        await exitFullscreen.call(document);
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error("Failed to exit fullscreen:", error);
    }
  }, [setIsFullscreen]);

  const toggleFullscreen = useCallback(() => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  }, [isFullscreen, enterFullscreen, exitFullscreen]);

  return {
    isFullscreen,
    toggleFullscreen,
    enterFullscreen,
    exitFullscreen,
    internalRef,
  };
};
