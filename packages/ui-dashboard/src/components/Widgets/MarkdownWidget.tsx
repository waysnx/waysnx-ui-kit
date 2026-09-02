/**
 * @file MarkdownWidget.tsx
 * Markdown widget for rendering markdown content
 */

import React, { CSSProperties } from "react";
import DOMPurify from "dompurify";
import { Widget } from "../Widget/Widget";

/**
 * Markdown Widget props
 */
interface MarkdownWidgetProps {
  /**
   * Widget ID
   */
  id: string;

  /**
   * Widget title
   */
  title?: string;

  /**
   * Markdown content
   */
  content: string;

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
 * Markdown Widget Component
 *
 * Renders markdown content inside a widget.
 * Note: This is a basic implementation. For production, consider
 * using a library like react-markdown or marked.
 *
 * @example
 * ```tsx
 * <MarkdownWidget
 *   id="docs"
 *   title="Documentation"
 *   content="# Hello\n\nThis is **bold** text"
 * />
 * ```
 */
export const MarkdownWidget: React.FC<MarkdownWidgetProps> = ({
  id,
  title,
  content,
  className = "",
  style,
}) => {
  // Basic markdown to HTML conversion (minimal implementation)
  // For production, use a proper markdown library
  const parseMarkdown = (md: string): string => {
    let html = md;

    // Headers
    html = html.replace(/^### (.*?)$/gm, "<h3>$1</h3>");
    html = html.replace(/^## (.*?)$/gm, "<h2>$1</h2>");
    html = html.replace(/^# (.*?)$/gm, "<h1>$1</h1>");

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");

    // Italic
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
    html = html.replace(/_(.+?)_/g, "<em>$1</em>");

    // Code blocks
    html = html.replace(/```(.*?)```/gs, "<pre><code>$1</code></pre>");

    // Inline code
    html = html.replace(/`(.*?)`/g, "<code>$1</code>");

    // Paragraphs
    const paragraphs = html.split("\n\n").map((para) => {
      if (!para.match(/^<[h|pre]/)) {
        return `<p>${para}</p>`;
      }
      return para;
    });
    html = paragraphs.join("\n");

    // Line breaks
    html = html.replace(/\n/g, "<br />");

    return html;
  };

  // Sanitize the generated HTML before rendering. The minimal markdown parser
  // does not escape raw HTML in the source, so any inline markup (e.g.
  // `<img src=x onerror=...>` or `<script>`) would otherwise reach the DOM.
  // DOMPurify with a tag allow-list matching what the parser emits prevents XSS
  // while preserving intended markdown output. Mirrors the HtmlWidget pattern.
  const sanitizedHtml = DOMPurify.sanitize(parseMarkdown(content), {
    ALLOWED_TAGS: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "br", "strong", "em", "code", "pre"],
    ALLOWED_ATTR: [],
  });

  return (
    <Widget id={id} title={title} className={`markdown-widget ${className}`} style={style}>
      <div
        className="markdown-widget-content"
        dangerouslySetInnerHTML={{
          __html: sanitizedHtml,
        }}
      />
    </Widget>
  );
};

MarkdownWidget.displayName = "MarkdownWidget";
