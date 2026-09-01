import type { UserPresenceListProps, PresenceStatus } from '../../types';

function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

function getStatusColor(status: PresenceStatus): string {
  switch (status) {
    case 'online': return 'var(--wx-comm-presence-online)';
    case 'away': return 'var(--wx-comm-presence-away)';
    case 'busy': return 'var(--wx-comm-presence-busy)';
    case 'offline': return 'var(--wx-comm-presence-offline)';
  }
}

export function UserPresenceList({
  users,
  onUserClick,
  className = '',
}: UserPresenceListProps) {
  // Sort: online first, then away, busy, offline
  const sortOrder: Record<PresenceStatus, number> = { online: 0, away: 1, busy: 2, offline: 3 };
  const sorted = [...users].sort((a, b) => sortOrder[a.status] - sortOrder[b.status]);

  return (
    <div className={`wx-comm-user-presence-list ${className}`} role="list" aria-label="Users">
      {sorted.map((user) => (
        <div
          key={user.id}
          className="wx-comm-user-presence-item"
          onClick={() => onUserClick?.(user)}
          role="listitem"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') onUserClick?.(user); }}
        >
          <div className="wx-comm-user-presence-item__avatar">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              getInitials(user.name)
            )}
            <span
              className="wx-comm-user-presence-item__status-dot"
              style={{ background: getStatusColor(user.status) }}
            />
          </div>
          <div className="wx-comm-user-presence-item__info">
            <div className="wx-comm-user-presence-item__name">{user.name}</div>
            <div className="wx-comm-user-presence-item__status-text">{user.status}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
