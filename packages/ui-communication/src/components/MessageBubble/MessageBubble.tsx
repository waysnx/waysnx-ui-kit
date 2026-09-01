import type { MessageBubbleProps } from '../../types';
import { ReactionBar } from '../ReactionBar';
import { ReadReceipts } from '../ReadReceipts';

function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

function formatTime(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export function MessageBubble({
  message,
  currentUser,
  onReaction,
  onReply: _onReply,
  onDelete: _onDelete,
  onThreadOpen,
  showAvatar = true,
  showTimestamp = true,
  showStatus = true,
  showReactions = true,
  showThreadInfo = true,
  grouped = false,
  className = '',
}: MessageBubbleProps) {
  const isOutgoing = message.author.id === currentUser.id;
  const isSystem = message.type === 'system';
  const isAI = message.type === 'ai';
  const isDeleted = !!message.deletedAt;

  const variant = isSystem ? 'system' : isAI ? 'ai' : isOutgoing ? 'outgoing' : 'incoming';

  if (isDeleted) {
    return (
      <div className={`wx-comm-message wx-comm-message--${variant} ${className}`}>
        <div className="wx-comm-message__body">
          <div className="wx-comm-message__bubble" style={{ opacity: 0.6, fontStyle: 'italic' }}>
            This message was deleted
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`wx-comm-message wx-comm-message--${variant} ${className}`} role="article" aria-label={`Message from ${message.author.name}`}>
      {showAvatar && !isSystem && !grouped && (
        <div className="wx-comm-message__avatar">
          {message.author.avatar ? (
            <img src={message.author.avatar} alt={message.author.name} />
          ) : (
            getInitials(message.author.name)
          )}
        </div>
      )}
      {showAvatar && !isSystem && grouped && (
        <div style={{ width: 32 }} />
      )}
      <div className="wx-comm-message__body">
        {!isSystem && !grouped && !isOutgoing && (
          <span className="wx-comm-message__author">{message.author.name}</span>
        )}
        <div className="wx-comm-message__bubble">
          {message.content}
        </div>
        {showReactions && message.reactions && message.reactions.length > 0 && (
          <ReactionBar
            reactions={message.reactions}
            currentUserId={currentUser.id}
            onReact={onReaction}
            onRemoveReaction={onReaction}
          />
        )}
        {showThreadInfo && message.threadCount && message.threadCount > 0 && (
          <button className="wx-comm-message__thread-info" onClick={onThreadOpen} type="button">
            💬 {message.threadCount} {message.threadCount === 1 ? 'Reply' : 'Replies'}
          </button>
        )}
        <div className="wx-comm-message__meta">
          {showTimestamp && <span>{formatTime(message.createdAt)}</span>}
          {message.edited && <span>(edited)</span>}
          {showStatus && isOutgoing && <ReadReceipts status={message.status} />}
        </div>
      </div>
    </div>
  );
}
