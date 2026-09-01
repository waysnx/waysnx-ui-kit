/**
 * @file components/TreeNode/TreeNode.tsx
 * Individual node renderer for visualizations.
 * Supports custom render via renderNode prop.
 */

import React, { useCallback } from 'react';
import type { LayoutNode, VisNodeEvent } from '../../types';
import { useTranslation } from '@waysnx/ui-i18n';

export interface TreeNodeProps {
  /** The laid-out node data */
  node: LayoutNode;
  /** Whether this node is selected */
  isSelected?: boolean;
  /** Whether this node is currently being dragged */
  isDragging?: boolean;
  /** Whether a dragged node is hovering over this node */
  isDragOver?: boolean;
  /** Whether drag-and-drop can be dropped here */
  canDropHere?: boolean;
  /** Click handler */
  onClick?: (event: VisNodeEvent) => void;
  /** Double-click handler */
  onDoubleClick?: (event: VisNodeEvent) => void;
  /** Context menu handler */
  onContextMenu?: (event: VisNodeEvent) => void;
  /** Toggle expand/collapse */
  onToggleExpand?: (nodeId: string) => void;
  /** Drag start */
  onDragStart?: (nodeId: string) => void;
  /** Drag over */
  onDragOver?: (nodeId: string) => void;
  /** Drop */
  onDrop?: (nodeId: string) => void;
  /** Whether drag-and-drop is enabled */
  enableDragDrop?: boolean;
  /** Custom node renderer — receives node, returns React element */
  renderNode?: (node: LayoutNode) => React.ReactNode;
  /** Has children (for showing expand toggle) */
  hasChildren?: boolean;
  /** CSS class override */
  className?: string;
}

function getInitials(label: string): string {
  return label
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export function TreeNode({
  node,
  isSelected = false,
  isDragging = false,
  isDragOver = false,
  canDropHere = false,
  onClick,
  onDoubleClick,
  onContextMenu,
  onToggleExpand,
  onDragStart,
  onDragOver,
  onDrop,
  enableDragDrop = false,
  renderNode,
  hasChildren = false,
  className = '',
}: TreeNodeProps) {
  const { t } = useTranslation();
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      onClick?.({ node, originalEvent: e });
    },
    [node, onClick]
  );

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      onDoubleClick?.({ node, originalEvent: e });
    },
    [node, onDoubleClick]
  );

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onContextMenu?.({ node, originalEvent: e });
    },
    [node, onContextMenu]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.({ node, originalEvent: e });
      }
      if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && hasChildren) {
        e.preventDefault();
        onToggleExpand?.(node.id);
      }
      if (e.key === 'ArrowLeft' && node.expanded) {
        e.preventDefault();
        onToggleExpand?.(node.id);
      }
    },
    [node, onClick, onToggleExpand, hasChildren]
  );

  const classes = [
    'wx-vis-node',
    isSelected && 'wx-vis-node--selected',
    isDragging && 'wx-vis-node--dragging',
    isDragOver && canDropHere && 'wx-vis-node--dragover',
    node.disabled && 'wx-vis-node--disabled',
    node.highlighted && 'wx-vis-node--highlighted',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style: React.CSSProperties = {
    left: node.x,
    top: node.y,
    width: node.width,
    height: node.height,
  };

  // Custom renderer
  if (renderNode) {
    return (
      <div
        className={classes}
        style={style}
        role="treeitem"
        aria-selected={isSelected}
        aria-expanded={hasChildren ? node.expanded : undefined}
        tabIndex={0}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleContextMenu}
        onKeyDown={handleKeyDown}
        draggable={enableDragDrop}
        onDragStart={() => onDragStart?.(node.id)}
        onDragOver={(e) => { e.preventDefault(); onDragOver?.(node.id); }}
        onDrop={(e) => { e.preventDefault(); onDrop?.(node.id); }}
        data-node-id={node.id}
      >
        {renderNode(node)}
      </div>
    );
  }

  // Default renderer
  return (
    <div
      className={classes}
      style={style}
      role="treeitem"
      aria-selected={isSelected}
      aria-label={`${node.label}${node.subtitle ? `, ${node.subtitle}` : ''}`}
      aria-expanded={hasChildren ? node.expanded : undefined}      tabIndex={0}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      onKeyDown={handleKeyDown}
      draggable={enableDragDrop}
      onDragStart={() => onDragStart?.(node.id)}
      onDragOver={(e) => { e.preventDefault(); onDragOver?.(node.id); }}
      onDrop={(e) => { e.preventDefault(); onDrop?.(node.id); }}
      data-node-id={node.id}
    >
      {/* Avatar */}
      <div className="wx-vis-node__avatar" aria-hidden="true">
        {node.avatarUrl ? (
          <img src={node.avatarUrl} alt="" />
        ) : (
          getInitials(node.label)
        )}
        {node.status && (
          <span
            className={`wx-vis-node__status wx-vis-node__status--${node.status}`}
            aria-label={node.status}
          />
        )}
      </div>

      {/* Text content */}
      <div className="wx-vis-node__content">
        <div className="wx-vis-node__label">{node.label}</div>
        {node.subtitle && (
          <div className="wx-vis-node__subtitle">{node.subtitle}</div>
        )}
      </div>

      {/* Badge */}
      {node.badge !== undefined && (
        <span className="wx-vis-node__badge" aria-label={`${t('visualization.node.badge')}: ${node.badge}`}>
          {node.badge}
        </span>
      )}

      {/* Expand/Collapse toggle */}
      {hasChildren && onToggleExpand && (
        <button
          className="wx-vis-node__toggle"
          onClick={(e) => { e.stopPropagation(); onToggleExpand(node.id); }}
          aria-label={node.expanded ? t('visualization.node.collapse') : t('visualization.node.expand')}
          aria-expanded={node.expanded}
          type="button"
        >
          {node.expanded ? '−' : '+'}
        </button>
      )}
    </div>
  );
}

export default TreeNode;
