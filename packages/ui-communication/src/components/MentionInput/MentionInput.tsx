import { useState, useCallback } from 'react';
import type { MentionInputProps } from '../../types';

function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

export function MentionInput({
  value,
  onChange,
  suggestions,
  onSearch,
  onSelect,
  placeholder = 'Type @ to mention someone...',
  className = '',
}: MentionInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange?.(newValue);

    // Detect @ mention
    const lastAt = newValue.lastIndexOf('@');
    if (lastAt !== -1) {
      const query = newValue.slice(lastAt + 1);
      onSearch?.(query);
      setShowSuggestions(true);
      setActiveIndex(0);
    } else {
      setShowSuggestions(false);
    }
  }, [onChange, onSearch]);

  const handleSelect = useCallback((index: number) => {
    const user = suggestions[index];
    if (!user) return;

    const lastAt = value.lastIndexOf('@');
    const newValue = value.slice(0, lastAt) + `@${user.name} `;
    onChange?.(newValue);
    onSelect?.(user);
    setShowSuggestions(false);
  }, [suggestions, value, onChange, onSelect]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSelect(activeIndex);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  }, [showSuggestions, suggestions, activeIndex, handleSelect]);

  return (
    <div className={`wx-comm-mention ${className}`}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label="Mention input"
        aria-expanded={showSuggestions}
        style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--wx-comm-input-border)', borderRadius: 'var(--wx-radius-md, 8px)', fontSize: '14px', outline: 'none', background: 'var(--wx-comm-input-bg)', color: 'var(--wx-color-text)' }}
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="wx-comm-mention__suggestions" role="listbox">
          {suggestions.map((user, index) => (
            <div
              key={user.id}
              className={`wx-comm-mention__item ${index === activeIndex ? 'wx-comm-mention__item--active' : ''}`}
              onClick={() => handleSelect(index)}
              role="option"
              aria-selected={index === activeIndex}
            >
              <div className="wx-comm-mention__item-avatar">
                {user.avatar ? <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : getInitials(user.name)}
              </div>
              <div>
                <div className="wx-comm-mention__item-name">{user.name}</div>
                <div className="wx-comm-mention__item-handle">@{user.name.toLowerCase().replace(/\s/g, '')}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
