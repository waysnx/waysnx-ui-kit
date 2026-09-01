import React from 'react';
import type { GridColumn } from '../../types';

const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTH_LONG  = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_SHORT   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const DAY_LONG    = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

function formatDate(value: any, dateFormat?: string): string {
  if (!value) return '';
  try {
    const d = value instanceof Date ? value : new Date(value);
    if (isNaN(d.getTime())) return String(value);
    if (dateFormat) {
      const h24 = d.getHours();
      const h12 = h24 % 12 || 12;
      const ampm = h24 < 12 ? 'AM' : 'PM';
      return dateFormat
        // Year — longest first
        .replace('yyyy', String(d.getFullYear()))
        .replace('yy', String(d.getFullYear()).slice(-2))
        // Day name — longest first
        .replace('EEEE', DAY_LONG[d.getDay()])
        .replace('EEE', DAY_SHORT[d.getDay()])
        // Month name — longest first
        .replace('MMMM', MONTH_LONG[d.getMonth()])
        .replace('MMM', MONTH_SHORT[d.getMonth()])
        // Month number — padded before unpadded
        .replace('MM', String(d.getMonth() + 1).padStart(2, '0'))
        .replace('M', String(d.getMonth() + 1))
        // Day number — padded before unpadded
        .replace('dd', String(d.getDate()).padStart(2, '0'))
        .replace('d', String(d.getDate()))
        // Hours — 24h padded, 12h padded, 12h unpadded
        .replace('HH', String(h24).padStart(2, '0'))
        .replace('hh', String(h12).padStart(2, '0'))
        .replace('h', String(h12))
        // Minutes & seconds
        .replace('mm', String(d.getMinutes()).padStart(2, '0'))
        .replace('ss', String(d.getSeconds()).padStart(2, '0'))
        // AM/PM
        .replace('aa', ampm)
        .replace('a', ampm);
    }
    return d.toLocaleDateString();
  } catch {
    return String(value);
  }
}

interface GridCellProps {
  value: any;
  col: GridColumn;
  row: Record<string, any>;
}

export function GridCell({ value, col, row }: GridCellProps): React.ReactElement {
  if (col.render) return <>{col.render(value, row)}</>;

  switch (col.type) {
    case 'badge': {
      if (value === null || value === undefined) return <span />;
      const key = String(value).toLowerCase();
      const map = col.badgeMap?.[key] || col.badgeMap?.[String(value)];
      const label = map?.label ?? String(value);
      if (map) {
        return (
          <span
            className="wx-grid-badge"
            style={{ color: map.color, background: map.bg, borderColor: map.color }}
          >
            {label}
          </span>
        );
      }
      return <span className="wx-grid-badge wx-grid-badge--default">{label}</span>;
    }

    case 'currency': {      if (value === null || value === undefined) return <span />;
      const decimals = col.decimals ?? 2;
      const formatted = Number(value).toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
      const symbol = col.currencySymbol || '$';
      return (
        <span>
          {col.currencyPosition === 'end' ? `${formatted}${symbol}` : `${symbol}${formatted}`}
        </span>
      );
    }

    case 'percentage': {
      if (value === null || value === undefined) return <span />;
      const decimals = col.decimals ?? 1;
      return <span>{Number(value).toFixed(decimals)}%</span>;
    }

    case 'email': {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return value && emailRegex.test(String(value))
        ? <span className="wx-grid-cell-email"><a href={`mailto:${value}`}>{value}</a></span>
        : <span>{value !== null && value !== undefined ? String(value) : ''}</span>;
    }

    case 'date':
      return <span>{formatDate(value, col.dateFormat)}</span>;

    case 'boolean':
      return (
        <span className={`wx-grid-cell-boolean ${value ? 'wx-grid-cell-boolean--true' : 'wx-grid-cell-boolean--false'}`}>
          {value ? '✓' : '✗'}
        </span>
      );

    case 'image':
      return value
        ? <span className="wx-grid-cell-image"><img src={value} alt="" /></span>
        : <span />;

    case 'number':
      return <span>{value !== null && value !== undefined ? Number(value).toLocaleString() : ''}</span>;

    default:
      return <span>{value !== null && value !== undefined ? String(value) : ''}</span>;
  }
}
