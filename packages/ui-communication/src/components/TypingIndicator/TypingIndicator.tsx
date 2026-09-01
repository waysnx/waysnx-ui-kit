import type { TypingIndicatorProps } from '../../types';

export function TypingIndicator({
  users,
  maxDisplay = 3,
  className = '',
}: TypingIndicatorProps) {
  if (users.length === 0) return null;

  const displayNames = users.slice(0, maxDisplay).map((u) => u.name);
  const remaining = users.length - maxDisplay;

  let text: string;
  if (users.length === 1) {
    text = `${displayNames[0]} is typing`;
  } else if (remaining > 0) {
    text = `${displayNames.join(', ')} and ${remaining} more are typing`;
  } else {
    text = `${displayNames.join(' and ')} are typing`;
  }

  return (
    <div className={`wx-comm-typing ${className}`} role="status" aria-live="polite" aria-label={text}>
      <span className="wx-comm-typing__dots">
        <span className="wx-comm-typing__dot" />
        <span className="wx-comm-typing__dot" />
        <span className="wx-comm-typing__dot" />
      </span>
      <span className="wx-comm-typing__text">{text}</span>
    </div>
  );
}
