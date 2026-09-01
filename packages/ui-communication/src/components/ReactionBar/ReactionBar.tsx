import type { ReactionBarProps } from '../../types';

export function ReactionBar({
  reactions,
  currentUserId,
  onReact,
  onRemoveReaction,
  className = '',
}: ReactionBarProps) {
  if (!reactions || reactions.length === 0) return null;

  return (
    <div className={`wx-comm-reactions ${className}`} role="group" aria-label="Reactions">
      {reactions.map((reaction) => {
        const hasReacted = reaction.users.some((u) => u.id === currentUserId);
        return (
          <button
            key={reaction.emoji}
            className={`wx-comm-reaction ${hasReacted ? 'wx-comm-reaction--active' : ''}`}
            onClick={() => {
              if (hasReacted) {
                onRemoveReaction?.(reaction.emoji);
              } else {
                onReact?.(reaction.emoji);
              }
            }}
            aria-label={`${reaction.emoji} ${reaction.count} reaction${reaction.count > 1 ? 's' : ''}`}
            aria-pressed={hasReacted}
          >
            <span>{reaction.emoji}</span>
            <span className="wx-comm-reaction__count">{reaction.count}</span>
          </button>
        );
      })}
    </div>
  );
}
