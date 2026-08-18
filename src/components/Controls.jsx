export default function Controls({ isPlaying, onTogglePlay, onNext, onPrev, volume, onVolumeChange }) {
  return (
    <>
      <div className="controls">
        <button className="btn" onClick={onPrev}>⏮</button>
        <button className="btn play-btn" onClick={onTogglePlay}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className="btn" onClick={onNext}>⏭</button>
      </div>

      <div className="volume-container">
        <span>🔊</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={onVolumeChange}
          className="slider"
        />
      </div>
    </>
  );
}