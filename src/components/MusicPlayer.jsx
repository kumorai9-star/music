import { useMusic } from "../context/MusicContext";

const formatTime = (seconds) => {
  if (!seconds || Number.isNaN(seconds)) {
    return "0:00";
  }

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${mins}:${secs}`;
};

const MusicPlayer = () => {
  const {
    currentSong,
    isPlaying,
    progress,
    volume,
    duration,
    currentTime,
    shuffle,
    repeat,
    togglePlay,
    nextSong,
    previousSong,
    changeProgress,
    setVolume,
    toggleShuffle,
    toggleRepeat,
    toggleFavorite,
    isFavorite,
  } = useMusic();

  if (!currentSong) {
    return (
      <div className="music-player empty-player">
        <p>
          Select a song to start
          listening 🎵
        </p>
      </div>
    );
  }

  return (
    <div className="music-player">

      <div className="player-song">

        <img
          src={currentSong.cover}
          alt={currentSong.title}
        />

        <div>
          <h4>
            {currentSong.title}
          </h4>

          <p>
            {currentSong.singer}
          </p>
        </div>

        <button
          type="button"
          className={`player-favorite ${
            isFavorite(currentSong.id)
              ? "favorite-active"
              : ""
          }`}
          onClick={() =>
            toggleFavorite(currentSong.id)
          }
          aria-label="Toggle favorite"
          title="Toggle favorite"
        >
          {isFavorite(currentSong.id) ? "♥" : "♡"}
        </button>

      </div>

      <div className="player-controls">

        <div className="control-buttons">

          <button
            type="button"
            className={`toggle-button ${
              shuffle ? "toggle-active" : ""
            }`}
            onClick={toggleShuffle}
            aria-label="Toggle shuffle"
            title="Shuffle"
          >
            🔀
          </button>

          <button
            type="button"
            onClick={previousSong}
            aria-label="Previous song"
            title="Previous"
          >
            ⏮
          </button>

          <button
            type="button"
            className="main-play"
            onClick={togglePlay}
            aria-label="Play or pause"
            title="Play/Pause"
          >
            {isPlaying
              ? "❚❚"
              : "▶"}
          </button>

          <button
            type="button"
            onClick={nextSong}
            aria-label="Next song"
            title="Next"
          >
            ⏭
          </button>

          <button
            type="button"
            className={`toggle-button ${
              repeat ? "toggle-active" : ""
            }`}
            onClick={toggleRepeat}
            aria-label="Toggle repeat"
            title="Repeat"
          >
            🔁
          </button>

        </div>

        <div className="progress-row">
          <span className="time-label">
            {formatTime(currentTime)}
          </span>

          <input
            className="progress"
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            onChange={(event) =>
              changeProgress(
                Number(
                  event.target.value
                )
              )
            }
          />

          <span className="time-label">
            {formatTime(duration)}
          </span>
        </div>

      </div>

      <div className="volume-control">

        <span>🔊</span>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(event) =>
            setVolume(
              Number(
                event.target.value
              )
            )
          }
        />

      </div>

    </div>
  );
};

export default MusicPlayer;