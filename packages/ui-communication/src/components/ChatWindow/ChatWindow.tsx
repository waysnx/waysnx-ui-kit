import { useRef, useEffect } from 'react';
import type { ChatWindowProps } from '../../types';
import { MessageBubble } from '../MessageBubble';
import { ChatInput } from '../ChatInput';
import { TypingIndicator } from '../TypingIndicator';

function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

export function ChatWindow({
  conversation,
  messages,
  currentUser,
  onSendMessage,
  onReaction,
  onReply,
  onEdit: _onEdit,
  onDelete,
  onLoadMore,
  typingUsers = [],
  showHeader = true,
  showInput = true,
  loading = false,
  hasMore = false,
  className = '',
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const handleScroll = () => {
    if (!messagesContainerRef.current || !hasMore || loading) return;
    if (messagesContainerRef.current.scrollTop === 0) {
      onLoadMore?.();
    }
  };

  const onlineCount = conversation.participants.filter(
    (p) => p.status === 'online'
  ).length;

  return (
    <div className={`wx-comm-chat-window ${className}`} role="region" aria-label={`Chat: ${conversation.title}`}>
      {showHeader && (
        <div className="wx-comm-chat-header">
          <div className="wx-comm-chat-header__info">
            <div className="wx-comm-chat-header__avatar">
              {conversation.avatar ? (
                <img src={conversation.avatar} alt={conversation.title || ''} />
              ) : (
                getInitials(conversation.title || 'C')
              )}
            </div>
            <div>
              <div className="wx-comm-chat-header__title">{conversation.title}</div>
              <div className="wx-comm-chat-header__subtitle">
                {conversation.participants.length} members, {onlineCount} online
              </div>
            </div>
          </div>
          <div className="wx-comm-chat-header__actions">
            <button className="wx-comm-chat-header__action-btn" aria-label="Search" type="button">🔍</button>
            <button className="wx-comm-chat-header__action-btn" aria-label="Call" type="button">📞</button>
            <button className="wx-comm-chat-header__action-btn" aria-label="Video" type="button">📹</button>
            <button className="wx-comm-chat-header__action-btn" aria-label="More options" type="button">⋮</button>
          </div>
        </div>
      )}
      <div
        className="wx-comm-chat-messages"
        ref={messagesContainerRef}
        onScroll={handleScroll}
      >
        {loading && (
          <div style={{ textAlign: 'center', padding: 12, color: 'var(--wx-color-text-muted)', fontSize: 12 }}>
            Loading messages...
          </div>
        )}
        {messages.map((message, index) => {
          const prevMessage = messages[index - 1];
          const grouped = prevMessage &&
            prevMessage.author.id === message.author.id &&
            new Date(message.createdAt).getTime() - new Date(prevMessage.createdAt).getTime() < 60000;

          return (
            <MessageBubble
              key={message.id}
              message={message}
              currentUser={currentUser}
              onReaction={onReaction ? (emoji) => onReaction(message.id, emoji) : undefined}
              onReply={onReply ? () => onReply(message) : undefined}
              onDelete={onDelete ? () => onDelete(message) : undefined}
              grouped={!!grouped}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      {typingUsers.length > 0 && (
        <div style={{ padding: '0 16px' }}>
          <TypingIndicator users={typingUsers} />
        </div>
      )}
      {showInput && (
        <div className="wx-comm-chat-footer">
          <ChatInput
            onSend={(content) => onSendMessage?.(content)}
            placeholder={`Message ${conversation.title || ''}...`}
          />
        </div>
      )}
    </div>
  );
}
