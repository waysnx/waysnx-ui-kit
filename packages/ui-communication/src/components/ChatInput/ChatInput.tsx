import { useState, useRef, useCallback, useEffect } from 'react';
import type { ChatInputProps } from '../../types';

export function ChatInput({
  onSend,
  onTyping,
  placeholder = 'Type a message...',
  disabled = false,
  showEmoji = true,
  showAttachment = true,
  showMention = true,
  showVoice = false,
  maxLength,
  replyTo,
  onCancelReply,
  className = '',
}: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingRef = useRef(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = maxLength ? e.target.value.slice(0, maxLength) : e.target.value;
    setValue(newValue);

    // Auto-resize
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }

    // Typing indicator
    if (!typingRef.current && newValue.length > 0) {
      typingRef.current = true;
      onTyping?.(true);
    } else if (typingRef.current && newValue.length === 0) {
      typingRef.current = false;
      onTyping?.(false);
    }
  }, [maxLength, onTyping]);

  const handleSend = useCallback(() => {
    if (!value.trim() || disabled) return;
    onSend?.(value.trim());
    setValue('');
    typingRef.current = false;
    onTyping?.(false);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [value, disabled, onSend, onTyping]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, [replyTo]);

  return (
    <div className={`wx-comm-chat-input ${className}`}>
      {replyTo && (
        <div className="wx-comm-chat-input__reply-preview">
          <span>Replying to {replyTo.author.name}: {replyTo.content.slice(0, 50)}{replyTo.content.length > 50 ? '...' : ''}</span>
          <button className="wx-comm-chat-input__reply-close" onClick={onCancelReply} aria-label="Cancel reply" type="button">
            ✕
          </button>
        </div>
      )}
      <div className="wx-comm-chat-input__container">
        <div className="wx-comm-chat-input__actions">
          {showAttachment && (
            <button className="wx-comm-chat-input__action-btn" aria-label="Attach file" type="button">
              📎
            </button>
          )}
          {showEmoji && (
            <button className="wx-comm-chat-input__action-btn" aria-label="Add emoji" type="button">
              😊
            </button>
          )}
          {showMention && (
            <button className="wx-comm-chat-input__action-btn" aria-label="Mention someone" type="button">
              @
            </button>
          )}
        </div>
        <textarea
          ref={textareaRef}
          className="wx-comm-chat-input__textarea"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          aria-label="Message input"
        />
        <div className="wx-comm-chat-input__actions">
          {showVoice && (
            <button className="wx-comm-chat-input__action-btn" aria-label="Record voice message" type="button">
              🎤
            </button>
          )}
          <button
            className="wx-comm-chat-input__send-btn"
            onClick={handleSend}
            disabled={!value.trim() || disabled}
            aria-label="Send message"
            type="button"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
