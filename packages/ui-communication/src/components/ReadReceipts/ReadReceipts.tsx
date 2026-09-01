import type { ReadReceiptsProps } from '../../types';

export function ReadReceipts({
  status,
  readBy,
  className = '',
}: ReadReceiptsProps) {
  const getIcon = () => {
    switch (status) {
      case 'sending':
        return (
          <svg className="wx-comm-read-receipts__icon" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="8" cy="8" r="6" strokeDasharray="4 2" />
          </svg>
        );
      case 'sent':
        return (
          <svg className="wx-comm-read-receipts__icon" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="3 8 7 12 13 4" />
          </svg>
        );
      case 'delivered':
        return (
          <svg className="wx-comm-read-receipts__icon" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="1 8 5 12 11 4" />
            <polyline points="5 8 9 12 15 4" />
          </svg>
        );
      case 'read':
        return (
          <svg className="wx-comm-read-receipts__icon" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="1 8 5 12 11 4" />
            <polyline points="5 8 9 12 15 4" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getLabel = () => {
    switch (status) {
      case 'sending': return 'Sending';
      case 'sent': return 'Sent';
      case 'delivered': return 'Delivered';
      case 'read':
        if (readBy && readBy.length > 0) {
          return `Seen by ${readBy.length === 1 ? readBy[0].name : `${readBy.length} people`}`;
        }
        return 'Read';
      default: return '';
    }
  };

  return (
    <span
      className={`wx-comm-read-receipts wx-comm-read-receipts--${status} ${className}`}
      aria-label={getLabel()}
      title={getLabel()}
    >
      {getIcon()}
      <span>{getLabel()}</span>
    </span>
  );
}
