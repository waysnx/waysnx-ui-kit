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
  [key: string]: any;
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

  const getTypeColor = (type: string) => {
    if (type.includes('failure') || type.includes('denied')) return 'danger';
    if (type.includes('enabled') || type.includes('success')) return 'success';
    if (type.includes('change')) return 'warning';
    return 'info';
  };

  const uniqueTypes = filterOptions || [...new Set(events.map(e => e.eventType))];

  return (
    <div>
      {/* Filter */}
      {filterable && uniqueTypes.length > 0 && (
        <div marginBottom="lg">
          <span fontSize="sm" fontWeight="bold" marginBottom="md">
            Filter by Type:
          </span>
          <div display="flex" flexWrap="wrap" gap="sm">
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
      <div overflowX="auto">
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px',
          }}
        >
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-border, #ccc)' }}>
              <th
                style={{ padding: '12px', textAlign: 'left', cursor: sortable ? 'pointer' : 'default' }}
                onClick={() => sortable && handleSort('timestamp')}
              >
                <div display="flex" alignItems="center" gap="sm">
                  Timestamp
                  {sortable && sortField === 'timestamp' && (
                    <span fontSize="xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th
                style={{ padding: '12px', textAlign: 'left', cursor: sortable ? 'pointer' : 'default' }}
                onClick={() => sortable && handleSort('eventType')}
              >
                <div display="flex" alignItems="center" gap="sm">
                  Event Type
                  {sortable && sortField === 'eventType' && (
                    <span fontSize="xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th
                style={{ padding: '12px', textAlign: 'left', cursor: sortable ? 'pointer' : 'default' }}
                onClick={() => sortable && handleSort('userId')}
              >
                <div display="flex" alignItems="center" gap="sm">
                  User ID
                  {sortable && sortField === 'userId' && (
                    <span fontSize="xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>
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
                    borderBottom: '1px solid var(--color-border, #ccc)',
                    backgroundColor: idx % 2 === 0 ? 'transparent' : 'var(--color-background-alt, #f9f9f9)',
                  }}
                >
                  <td style={{ padding: '12px' }}>
                    <span fontSize="xs" color="muted">
                      {event.timestamp ? new Date(event.timestamp).toLocaleString() : 'N/A'}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <Badge color={getTypeColor(event.eventType)}>{event.eventType}</Badge>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span fontSize="sm" fontFamily="monospace">
                      {event.userId || 'N/A'}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span fontSize="sm">{event.description || '-'}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ padding: '24px', textAlign: 'center' }}>
                  <span color="muted">No events found</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginTop="lg"
          paddingTop="lg"
          borderTop="1px solid var(--color-border, #ccc)"
        >
          <span fontSize="sm" color="muted">
            Page {currentPage + 1} of {totalPages} ({sortedEvents.length} events)
          </span>
          <div display="flex" gap="md">
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
