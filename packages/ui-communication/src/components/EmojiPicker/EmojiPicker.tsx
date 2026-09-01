import { useState, useMemo } from 'react';
import type { EmojiPickerProps } from '../../types';

const EMOJI_CATEGORIES: Record<string, string[]> = {
  'Smileys': ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗'],
  'Gestures': ['👍', '👎', '👋', '🤝', '🙏', '✌️', '🤞', '🤟', '🤙', '👊', '✊', '🫶', '❤️', '🔥', '⭐', '✨'],
  'Objects': ['💼', '📎', '📌', '📋', '📊', '💡', '🎯', '🏆', '🎉', '🎊', '🔔', '📢', '💬', '💭', '🗨️', '📝'],
};

const CATEGORY_ICONS: Record<string, string> = {
  'Smileys': '😊',
  'Gestures': '👍',
  'Objects': '💼',
};

export function EmojiPicker({
  onSelect,
  onClose,
  recentEmojis = [],
  className = '',
}: EmojiPickerProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(
    recentEmojis.length > 0 ? 'Recent' : Object.keys(EMOJI_CATEGORIES)[0]
  );

  const categories = useMemo(() => {
    const cats: Record<string, string[]> = {};
    if (recentEmojis.length > 0) {
      cats['Recent'] = recentEmojis;
    }
    Object.assign(cats, EMOJI_CATEGORIES);
    return cats;
  }, [recentEmojis]);

  const displayEmojis = useMemo(() => {
    if (search) {
      return Object.values(EMOJI_CATEGORIES).flat();
    }
    return categories[activeCategory] || [];
  }, [search, activeCategory, categories]);

  return (
    <div className={`wx-comm-emoji-picker ${className}`} role="dialog" aria-label="Emoji picker">
      <div className="wx-comm-emoji-picker__search">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search emoji..."
          aria-label="Search emoji"
        />
      </div>
      <div className="wx-comm-emoji-picker__categories">
        {Object.keys(categories).map((cat) => (
          <button
            key={cat}
            className={`wx-comm-emoji-picker__category-btn ${activeCategory === cat ? 'wx-comm-emoji-picker__category-btn--active' : ''}`}
            onClick={() => { setActiveCategory(cat); setSearch(''); }}
            aria-label={cat}
            type="button"
          >
            {CATEGORY_ICONS[cat] || (cat === 'Recent' ? '🕐' : '📦')}
          </button>
        ))}
      </div>
      <div className="wx-comm-emoji-picker__grid">
        {displayEmojis.map((emoji, i) => (
          <button
            key={`${emoji}-${i}`}
            className="wx-comm-emoji-picker__emoji"
            onClick={() => { onSelect?.(emoji); onClose?.(); }}
            aria-label={emoji}
            type="button"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
