import { useRef, useState } from 'react';
import type { AudioPlayerProps } from '../../types';

export function AudioPlayer({ src, title = 'Audio Track', artist, cover, autoPlay = false, className = '' }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');

  const format = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  const handlePlayPause = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) { a.play(); setPlaying(true); } else { a.pause(); setPlaying(false); }
  };

  const handleTimeUpdate = () => {
    const a = audioRef.current;
    if (!a) return;
    setProgress(a.duration ? (a.currentTime / a.duration) * 100 : 0);
    setCurrentTime(format(a.currentTime));
  };

  const handleLoadedMetadata = () => {
    const a = audioRef.current;
    if (!a) return;
    setDuration(format(a.duration));
  };

  return (
    <div className={`wx-adv-audio-player ${className}`} role="region" aria-label={`Audio player: ${title}`}>
      <audio
        ref={audioRef}
        src={src}
        autoPlay={autoPlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setPlaying(false)}
      />
      {cover && <img src={cover} alt={title} style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover' }} />}
      <button className="wx-adv-audio-player__play-btn" onClick={handlePlayPause} aria-label={playing ? 'Pause' : 'Play'} type="button">
        {playing ? '⏸' : '▶'}
      </button>
      <div className="wx-adv-audio-player__info">
        <div className="wx-adv-audio-player__title">{title}</div>
        {artist && <div className="wx-adv-audio-player__artist">{artist}</div>}
        <div className="wx-adv-audio-player__progress">
          <div className="wx-adv-audio-player__progress-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="wx-adv-audio-player__time">{currentTime} / {duration}</div>
    </div>
  );
}
