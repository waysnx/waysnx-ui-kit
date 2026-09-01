import { useRef, useState } from 'react';
import type { VideoPlayerProps } from '../../types';

export function VideoPlayer({
  src,
  poster,
  title,
  autoPlay = false,
  muted = false,
  loop = false,
  showControls = true,
  height = 300,
  className = '',
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [_playing, setPlaying] = useState(autoPlay);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) { video.play(); setPlaying(true); }
    else { video.pause(); setPlaying(false); }
  };

  return (
    <div className={`wx-adv-video-player ${className}`} style={{ height }}>
      {title && <div className="wx-adv-video-player__title">{title}</div>}
      {src ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          controls={showControls}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          aria-label={title || 'Video player'}
        />
      ) : (
        <div className="wx-adv-video-player__placeholder">
          <button className="wx-adv-video-player__play-btn" onClick={handlePlayPause} type="button" aria-label="Play">
            ▶
          </button>
          <span>No video source</span>
        </div>
      )}
    </div>
  );
}
