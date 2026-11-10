import React, { useRef, useState, useEffect } from 'react';
import './MusicPlayer.css';

export default function MusicPlayer({ src, title, onClose }) {
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const [playing,  setPlaying]  = useState(false);
  const [current,  setCurrent]  = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume,   setVolume]   = useState(0.8);
  const [loading,  setLoading]  = useState(true);

  // Авто-play при монтировании
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    const onLoad = () => { setDuration(audio.duration); setLoading(false); };
    const onTime = () => setCurrent(audio.currentTime);
    const onEnd  = () => setPlaying(false);
    audio.addEventListener('loadedmetadata', onLoad);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', onEnd);
    audio.play().then(() => setPlaying(true)).catch(() => {});
    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', onLoad);
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('ended', onEnd);
    };
  }, [src]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else         { audio.play();  setPlaying(true);  }
  };

  const seek = e => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct  = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    audio.currentTime = pct * duration;
  };

  const changeVol = e => {
    const v = Number(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const fmt = s => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const pct = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div className="music-player">
      <audio ref={audioRef} src={src} preload="auto"/>

      <div className="mp-info">
        <div className="mp-disc">{playing ? '🎵' : '🎶'}</div>
        <div className="mp-title">{title}</div>
        {loading && <span className="mp-loading">⏳</span>}
      </div>

      {/* Прогресс */}
      <div className="mp-progress-wrap" ref={progressRef} onClick={seek}>
        <div className="mp-progress-bg">
          <div className="mp-progress-fill" style={{ width: `${pct}%` }}/>
          <div className="mp-progress-thumb" style={{ left: `${pct}%` }}/>
        </div>
        <div className="mp-times">
          <span>{fmt(current)}</span>
          <span>{fmt(duration)}</span>
        </div>
      </div>

      {/* Управление */}
      <div className="mp-controls">
        {/* Перемотка назад */}
        <button className="mp-btn mp-btn--sm" onClick={() => { if (audioRef.current) audioRef.current.currentTime = Math.max(0, current - 10); }}>
          ⏮ 10s
        </button>

        {/* Пауза/Воспроизведение */}
        <button className="mp-btn mp-btn--play" onClick={toggle}>
          {playing ? '⏸' : '▶'}
        </button>

        {/* Перемотка вперёд */}
        <button className="mp-btn mp-btn--sm" onClick={() => { if (audioRef.current) audioRef.current.currentTime = Math.min(duration, current + 10); }}>
          10s ⏭
        </button>

        {/* Громкость */}
        <div className="mp-volume">
          <span>{volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}</span>
          <input
            type="range" min="0" max="1" step="0.01"
            value={volume}
            onChange={changeVol}
            className="mp-volume-slider"
          />
        </div>

        {/* Закрыть */}
        <button className="mp-btn mp-btn--close" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}
