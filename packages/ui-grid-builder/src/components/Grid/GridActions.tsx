import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { GridAction } from '../../types';

interface GridActionsProps {
  row: Record<string, any>;
  actions: GridAction[];
  asMenu?: boolean;
}

export function GridActions({ row, actions, asMenu = false }: GridActionsProps) {
  const visible = actions.filter(a => !a.hidden?.(row));
  if (visible.length === 0) return null;

  if (asMenu) {
    return <KebabMenu row={row} actions={visible} />;
  }

  return (
    <div className="wx-grid-actions">
      {visible.map((action, i) => (
        <button
          key={i}
          className={[
            'wx-grid-action-btn',
            action.variant === 'destructive' ? 'wx-grid-action-btn--destructive' : '',
            action.variant === 'primary' ? 'wx-grid-action-btn--primary' : '',
            !action.label ? 'wx-grid-action-btn--icon-only' : '',
          ].join(' ').trim()}
          onClick={(e) => { e.stopPropagation(); action.onClick(row); }}
          title={action.label || undefined}
        >
          {action.icon && <span>{action.icon}</span>}
          {action.label && action.label}
        </button>
      ))}
    </div>
  );
}

function KebabMenu({ row, actions }: { row: Record<string, any>; actions: GridAction[] }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        btnRef.current && !btnRef.current.contains(target) &&
        menuRef.current && !menuRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const dropdownWidth = 160;
      const dropdownHeight = actions.length * 40 + 16; // estimated menu height
      let left = rect.left;
      if (left + dropdownWidth > window.innerWidth) {
        left = rect.right - dropdownWidth;
      }
      // Flip upward if not enough space below
      let top: number;
      if (rect.bottom + 4 + dropdownHeight > window.innerHeight) {
        top = rect.top - dropdownHeight - 4;
      } else {
        top = rect.bottom + 4;
      }
      setPos({ top, left });
    }
    setOpen(v => !v);
  };

  const portalRoot = document.getElementById('portal-root') || document.body;

  return (
    <div className="wx-grid-kebab">
      <button
        ref={btnRef}
        className="wx-grid-kebab-btn"
        onClick={handleClick}
        title="Actions"
      >
        ⋮
      </button>
      {open && createPortal(
        <div
          ref={menuRef}
          className="wx-grid-kebab-menu"
          style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 9999 }}
        >
          {actions.map((action, i) => (
            <button
              key={i}
              className={[
                'wx-grid-kebab-item',
                action.variant === 'destructive' ? 'wx-grid-kebab-item--destructive' : '',
              ].join(' ').trim()}
              onClick={(e) => { e.stopPropagation(); action.onClick(row); setOpen(false); }}
            >
              {action.icon && <span className="wx-grid-kebab-item-icon">{action.icon}</span>}
              <span>{action.label || ''}</span>
            </button>
          ))}
        </div>,
        portalRoot
      )}
    </div>
  );
}
