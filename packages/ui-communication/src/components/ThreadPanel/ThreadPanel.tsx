import type { ThreadPanelProps } from '../../types';
import { MessageBubble } from '../MessageBubble';
import { ChatInput } from '../ChatInput';

export function ThreadPanel({
  thread,
  currentUser,
  onSendReply,
  onClose,
  onReaction,
  loading = false,
  className = '',
}: ThreadPanelProps) {
  return (
    <div className={`wx-comm-thread-panel ${className}`} role="complementary" aria-label="Thread">
      <div className="wx-comm-thread-panel__header">
        <span className="wx-comm-thread-panel__title">Thread</span>
        <button className="wx-comm-thread-panel__close" onClick={onClose} aria-label="Close thread" type="button">
          ✕
        </button>
      </div>

      {/* Parent message */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--wx-comm-thread-border)' }}>
        <MessageBubble
          message={thread.parentMessage}
          currentUser={currentUser}
          onReaction={onReaction ? (emoji) => onReaction(thread.parentMessage.id, emoji) : undefined}
          showThreadInfo={false}
        />
      </div>

      <div className="wx-comm-thread-panel__reply-count">
        {thread.replyCount} {thread.replyCount === 1 ? 'Reply' : 'Replies'}
      </div>

      <div className="wx-comm-thread-panel__messages">
        {loading && (
          <div style={{ textAlign: 'center', padding: 12, color: 'var(--wx-color-text-muted)', fontSize: 12 }}>
            Loading replies...
          </div>
        )}
        {thread.replies.map((reply) => (
          <MessageBubble
            key={reply.id}
            message={reply}
            currentUser={currentUser}
            onReaction={onReaction ? (emoji) => onReaction(reply.id, emoji) : undefined}
            showThreadInfo={false}
          />
        ))}
      </div>

      <div className="wx-comm-chat-footer">
        <ChatInput
          onSend={(content) => onSendReply?.(content)}
          placeholder="Reply in thread..."
        />
      </div>
    </div>
  );
}
