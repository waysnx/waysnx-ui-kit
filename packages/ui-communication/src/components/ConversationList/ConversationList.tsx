import { useState, useMemo } from 'react';
import type { ConversationListProps } from '../../types';

function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

function formatDate(date: Date | string): string {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) {
    return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  } else if (days === 1) {
    return 'Yesterday';
  } else if (days < 7) {
    return d.toLocaleDateString([], { weekday: 'short' });
  }
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

export function ConversationList({
  conversations,
  activeId,
  onSelect,
  showSearch = true,
  showFilters = true,
  filterTabs = ['All', 'Unread', 'Mentions'],
  loading = false,
  emptyMessage = 'No conversations',
  className = '',
}: ConversationListProps) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState(filterTabs[0] || 'All');

  const filtered = useMemo(() => {
    let list = conversations;

    // Apply search
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((c) =>
        c.title?.toLowerCase().includes(q) ||
        c.lastMessage?.content.toLowerCase().includes(q)
      );
    }

    // Apply filter
    if (activeFilter === 'Unread') {
      list = list.filter((c) => (c.unreadCount || 0) > 0);
    }

    // Sort: pinned first, then by updatedAt
    return [...list].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      const aTime = new Date(a.updatedAt || a.createdAt).getTime();
      const bTime = new Date(b.updatedAt || b.createdAt).getTime();
      return bTime - aTime;
    });
  }, [conversations, search, activeFilter]);

  if (loading) {
    return (
      <div className={`wx-comm-conversation-list ${className}`}>
        <div style={{ padding: 24, textAlign: 'center', color: 'var(--wx-color-text-muted)' }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className={`wx-comm-conversation-list ${className}`} role="listbox" aria-label="Conversations">
      <div className="wx-comm-conversation-list__header">
        {showSearch && (
          <div className="wx-comm-conversation-list__search">
            <svg className="wx-comm-conversation-list__search-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="7" cy="7" r="5" />
              <line x1="11" y1="11" x2="14" y2="14" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search conversations..."
              aria-label="Search conversations"
            />
          </div>
        )}
        {showFilters && (
          <div className="wx-comm-conversation-list__filters">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                className={`wx-comm-conversation-list__filter-tab ${activeFilter === tab ? 'wx-comm-conversation-list__filter-tab--active' : ''}`}
                onClick={() => setActiveFilter(tab)}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="wx-comm-conversation-list__items">
        {filtered.length === 0 ? (
          <div style={{ padding: 24, textAlign: 'center', color: 'var(--wx-color-text-muted)', fontSize: 13 }}>
            {emptyMessage}
          </div>
        ) : (
          filtered.map((conversation) => (
            <div
              key={conversation.id}
              className={`wx-comm-conversation-item ${activeId === conversation.id ? 'wx-comm-conversation-item--active' : ''}`}
              onClick={() => onSelect?.(conversation)}
              role="option"
              aria-selected={activeId === conversation.id}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') onSelect?.(conversation); }}
            >
              <div className="wx-comm-conversation-item__avatar">
                {conversation.avatar ? (
                  <img src={conversation.avatar} alt={conversation.title || ''} />
                ) : (
                  getInitials(conversation.title || 'C')
                )}
              </div>
              <div className="wx-comm-conversation-item__content">
                <div className="wx-comm-conversation-item__title">
                  {conversation.pinned && '📌 '}
                  {conversation.title || 'Untitled'}
                </div>
                {conversation.lastMessage && (
                  <div className="wx-comm-conversation-item__preview">
                    {conversation.lastMessage.author.name}: {conversation.lastMessage.content}
                  </div>
                )}
              </div>
              <div className="wx-comm-conversation-item__meta">
                {conversation.lastMessage && (
                  <span className="wx-comm-conversation-item__time">
                    {formatDate(conversation.lastMessage.createdAt)}
                  </span>
                )}
                {(conversation.unreadCount || 0) > 0 && (
                  <span className="wx-comm-conversation-item__badge">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
