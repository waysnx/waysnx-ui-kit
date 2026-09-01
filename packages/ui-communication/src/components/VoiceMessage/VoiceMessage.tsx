import { useState, useMemo } from 'react';
import type { VoiceMessageProps } from '../../types';

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function VoiceMessage({
  duration,
  sender,
  onPlay,
  onPause,
  className = '',
}: VoiceMessageProps) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Generate random waveform bars
  const bars = useMemo(() => {
    return Array.from({ length: 20 }, () => Math.random() * 0.7 + 0.3);
  }, []);

  const handlePlayPause = () => {
    if (playing) {
      setPlaying(false);
      onPause?.();
    } else {
      setPlaying(true);
      onPlay?.();
      // Simulate playback
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setPlaying(false);
            return 0;
          }
          return prev + (100 / (duration * 10));
        });
      }, 100);
    }
  };

  return (
    <div className={`wx-comm-voice-message ${className}`} role="group" aria-label={`Voice message${sender ? ` from ${sender.name}` : ''}`}>
      <button
        className="wx-comm-voice-message__play-btn"
        onClick={handlePlayPause}
        aria-label={playing ? 'Pause' : 'Play'}
        type="button"
      >
        {playing ? '⏸' : '▶'}
      </button>
      <div className="wx-comm-voice-message__waveform">
        {bars.map((height, i) => (
          <div
            key={i}
            className={`wx-comm-voice-message__bar ${(i / bars.length) * 100 <= progress ? 'wx-comm-voice-message__bar--active' : ''}`}
            style={{ height: `${height * 24}px` }}
          />
        ))}
      </div>
      <span className="wx-comm-voice-message__duration">
        {formatDuration(duration)}
      </span>
    </div>
  );
}
