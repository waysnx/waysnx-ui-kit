/**
 * @file HtmlWidget.tsx
 * HTML widget for safely rendering HTML content
 */

import React, { CSSProperties } from "react";
import { Widget } from "../Widget/Widget";
import DOMPurify from "dompurify";

/**
 * HTML Widget props
 */
interface HtmlWidgetProps {
  /**
   * Widget ID
   */
  id: string;

  /**
   * Widget title
   */
  title?: string;

  /**
   * HTML content to render
   */
  html: string;

  /**
   * Allowed tags for sanitization
   */
  allowedTags?: string[];

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Additional CSS styles
   */
  style?: CSSProperties;
}

/**
 * Default allowed HTML tags
 */
const DEFAULT_ALLOWED_TAGS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "br",
  "hr",
  "strong",
  "em",
  "u",
  "code",
  "pre",
  "div",
  "span",
  "ul",
  "ol",
  "li",
  "table",
  "thead",
  "tbody",
  "tr",
  "td",
  "th",
  "blockquote",
  "a",
  "img",
];

/**
 * HTML Widget Component
 *
 * Safely renders HTML content inside a widget using DOMPurify sanitization.
 *
 * @example
 * ```tsx
 * <HtmlWidget
 *   id="html-content"
 *   title="Rich Content"
 *   html="<p>This is <strong>safe</strong> HTML</p>"
 * />
 * ```
 */
export const HtmlWidget: React.FC<HtmlWidgetProps> = ({
  id,
  title,
  html,
  allowedTags = DEFAULT_ALLOWED_TAGS,
  className = "",
  style,
}) => {
  // Sanitize HTML to prevent XSS attacks
  const sanitizedHtml = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: allowedTags,
    ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "id", "style"],
  });

  return (
    <Widget id={id} title={title} className={`html-widget ${className}`} style={style}>
      <div
        className="html-widget-content"
        dangerouslySetInnerHTML={{
          __html: sanitizedHtml,
        }}
      />
    </Widget>
  );
};

HtmlWidget.displayName = "HtmlWidget";
