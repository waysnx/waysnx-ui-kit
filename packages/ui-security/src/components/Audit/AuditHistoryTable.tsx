/**
 * AuditHistoryTable Component
 * 
 * Display audit events in table format with filtering and sorting.
 */

import React, { useState } from 'react';
import { Button } from '@waysnx/ui-core';
import { Badge } from '@waysnx/ui-feedback';
import type { AuditEvent } from '../../types/audit';

export interface AuditHistoryTableProps {
  /**
   * Audit events to display
   */
  events: AuditEvent[];
  /**
   * Enable sorting
   */
  sortable?: boolean;
  /**
   * Enable filtering
   */
  filterable?: boolean;
  /**
   * Rows per page
   */
  pageSize?: number;
  /**
   * Event type filter options
   */
  filterOptions?: string[];
}

type SortField = 'timestamp' | 'eventType' | 'userId';
type SortOrder = 'asc' | 'desc';
type BadgeColor = 'default' | 'success' | 'error' | 'warning' | 'info';

/**
 * AuditHistoryTable - Display audit events in table
 */
export const AuditHistoryTable: React.FC<AuditHistoryTableProps> = ({
  events,
  sortable = true,
  filterable = true,
  pageSize = 10,
  filterOptions,
}) => {
  const [sortField, setSortField] = useState<SortField>('timestamp');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(0);

  // Filter events
  const filteredEvents = selectedFilter
    ? events.filter(e => e.eventType === selectedFilter)
    : events;

  // Sort events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    let aVal: any = a[sortField];
    let bVal: any = b[sortField];

    if (sortField === 'timestamp') {
      aVal = new Date(a.timestamp || 0).getTime();
      bVal = new Date(b.timestamp || 0).getTime();
    }

    const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Pagination
  const totalPages = Math.ceil(sortedEvents.length / pageSize);
  const startIdx = currentPage * pageSize;
  const paginatedEvents = sortedEvents.slice(startIdx, startIdx + pageSize);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
    setCurrentPage(0);
  };

  const getTypeColor = (type: string): BadgeColor => {
    if (type.includes('failure') || type.includes('denied')) return 'error';
    if (type.includes('enabled') || type.includes('success')) return 'success';
    if (type.includes('change')) return 'warning';
    return 'info';
  };

  const uniqueTypes = filterOptions || [...new Set(events.map(e => e.eventType))];

  return (
    <div>
      {/* Filter */}
      {filterable && uniqueTypes.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, marginBottom: 12 }}>
            Filter by Type:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <Button
              variant={selectedFilter === '' ? 'primary' : 'outline'}
              onClick={() => {
                setSelectedFilter('');
                setCurrentPage(0);
              }}
            >
              All
            </Button>
            {uniqueTypes.map(type => (
              <Button
                key={type}
                variant={selectedFilter === type ? 'primary' : 'outline'}
                onClick={() => {
                  setSelectedFilter(type);
                  setCurrentPage(0);
                }}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px',
          }}
        >
          <thead>
            <tr style={{ borderBottom: '2px solid var(--wx-color-border, #ccc)' }}>
              <th
                style={{ padding: '12px', textAlign: 'left', cursor: sortable ? 'pointer' : 'default' }}
                onClick={() => sortable && handleSort('timestamp')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  Timestamp
                  {sortable && sortField === 'timestamp' && (
                    <span style={{ fontSize: '0.75rem' }}>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th
                style={{ padding: '12px', textAlign: 'left', cursor: sortable ? 'pointer' : 'default' }}
                onClick={() => sortable && handleSort('eventType')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  Event Type
                  {sortable && sortField === 'eventType' && (
                    <span style={{ fontSize: '0.75rem' }}>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th
                style={{ padding: '12px', textAlign: 'left', cursor: sortable ? 'pointer' : 'default' }}
                onClick={() => sortable && handleSort('userId')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  User ID
                  {sortable && sortField === 'userId' && (
                    <span style={{ fontSize: '0.75rem' }}>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEvents.length > 0 ? (
              paginatedEvents.map((event, idx) => (
                <tr
                  key={`${event.id}-${idx}`}
                  style={{
                    borderBottom: '1px solid var(--wx-color-border, #ccc)',
                    backgroundColor: idx % 2 === 0 ? 'transparent' : 'var(--wx-color-background-alt, #f9f9f9)',
                  }}
                >
                  <td style={{ padding: '12px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--wx-color-text-muted, #717182)' }}>
                      {event.timestamp ? new Date(event.timestamp).toLocaleString() : 'N/A'}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <Badge color={getTypeColor(event.eventType)}>{event.eventType}</Badge>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ fontSize: '0.875rem', fontFamily: 'monospace' }}>
                      {event.userId || 'N/A'}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ fontSize: '0.875rem' }}>{event.description || '-'}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ padding: '24px', textAlign: 'center' }}>
                  <span style={{ color: 'var(--wx-color-text-muted, #717182)' }}>No events found</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 16,
            paddingTop: 16,
            borderTop: '1px solid var(--wx-color-border, #ccc)',
          }}
        >
          <span style={{ fontSize: '0.875rem', color: 'var(--wx-color-text-muted, #717182)' }}>
            Page {currentPage + 1} of {totalPages} ({sortedEvents.length} events)
          </span>
          <div style={{ display: 'flex', gap: 12 }}>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

AuditHistoryTable.displayName = 'AuditHistoryTable';

export default AuditHistoryTable;
