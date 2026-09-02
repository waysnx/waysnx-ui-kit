import React, { useState, useRef, useEffect, useId, TextareaHTMLAttributes } from "react";
import './SpeechToTextTextarea.css';
import { warn } from '../../dev';

const MicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" x2="12" y1="19" y2="22"/>
  </svg>
);

const MicOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="2" x2="22" y1="2" y2="22"/>
    <path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2"/>
    <path d="M5 10v2a7 7 0 0 0 12 5.29"/>
    <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33"/>
    <path d="M9 9v3a3 3 0 0 0 5.12 2.12"/>
    <line x1="12" x2="12" y1="19" y2="22"/>
  </svg>
);

export interface SpeechToTextTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function SpeechToTextTextarea({ label, error, hint, id, value, onChange, ...rest }: SpeechToTextTextareaProps) {
  warn(Boolean(label || rest['aria-label']), 'SpeechToTextTextarea needs label');

  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const reactId = useId();
  const textareaId = id || `wx-speech-textarea-${reactId}`;
  const statusId = `${textareaId}-status`;
  const errorId = `${textareaId}-error`;
  const hintId = `${textareaId}-hint`;

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript + " ";
        }
      }
      if (onChange) {
        const currentVal = (typeof value === 'string' ? value : '') + transcript;
        const syntheticEvent = { target: { value: currentVal }, currentTarget: { value: currentVal } } as React.ChangeEvent<HTMLTextAreaElement>;
        onChange(syntheticEvent);
      }
    };

    recognition.onend = () => {
      if (isListening) recognition.start();
    };

    recognitionRef.current = recognition;
  }, [isListening, value, onChange]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const charCount = typeof value === 'string' ? value.length : 0;
  const showCharCount = rest.maxLength !== undefined;

  return (
    <div className="wx-textarea-wrapper">
      {label && <label htmlFor={textareaId}>{label}</label>}
      <div className="wx-speech-textarea-container">
        <textarea
          id={textareaId}
          rows={6}
          value={value}
          onChange={onChange}
          className={`wx-textarea wx-speech-textarea ${error ? 'wx-textarea-error' : ''}`}
          aria-invalid={!!error}
          aria-describedby={[statusId, error ? errorId : '', hint && !showCharCount ? hintId : ''].filter(Boolean).join(' ')}
          {...rest}
        />
        <button
          type="button"
          onClick={toggleListening}
          className={`wx-speech-textarea-mic ${isListening ? 'wx-speech-textarea-mic--active' : ''}`}
          title={isListening ? "Stop Listening" : "Start Listening"}
          aria-label={isListening ? "Stop speech recognition" : "Start speech recognition"}
          aria-pressed={isListening}
        >
          {isListening ? <MicOffIcon /> : <MicIcon />}
        </button>
      </div>
      <div id={statusId} className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {isListening ? "Speech recognition is active" : ""}
      </div>
      {showCharCount && (
        <div className="wx-textarea-hint" id={hintId}>{charCount}/{rest.maxLength} characters</div>
      )}
      {hint && !showCharCount && <div className="wx-textarea-hint" id={hintId}>{hint}</div>}
      {error && <div className="wx-textarea-error-text" id={errorId} role="alert">{error}</div>}
    </div>
  );
}
