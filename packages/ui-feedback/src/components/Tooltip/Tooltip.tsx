import React, { useState, useRef, useId } from "react";
import "./Tooltip.css";

export interface TooltipProps {
  content: string | React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
  className?: string;
  testId?: string;
}

export function Tooltip({
  content,
  position = "top",
  children,
  className = "",
  testId,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  // Stable, SSR-safe id for aria-describedby wiring between trigger and tooltip.
  const tooltipId = `tooltip-${useId()}`;

  const show = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(true), 200);
  };

  const hide = () => {
    clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  return (
    <div
      className={`wx-tooltip-wrapper ${className}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      data-testid={testId}
    >
      <div aria-describedby={visible ? tooltipId : undefined}>
        {children}
      </div>
      {visible && (
        <div 
          id={tooltipId}
          className={`wx-tooltip wx-tooltip-${position}`} 
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
}
