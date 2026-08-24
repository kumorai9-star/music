import { useMusic } from "../context/MusicContext";
import { useToast } from "../context/ToastContext";

const MusicCard = ({ song }) => {
  const {
    playSong,
    toggleFavorite,
    isFavorite,
    currentSong,
    isPlaying,
    progress,
  } = useMusic();

  const { showToast } = useToast();

  const isCurrent =
    currentSong?.id === song.id;

  const playing =
    isCurrent && isPlaying;

  const handleFavoriteClick = (event) => {
    event.stopPropagation();

    toggleFavorite(song.id);

    showToast(
      isFavorite(song.id)
        ? `Removed "${song.title}" from favorites`
        : `Added "${song.title}" to favorites ❤️`,
      "success"
    );
  };

  return (
    <div className={`music-card ${isCurrent ? "music-card-active" : ""}`}>

      <div className="cover-container">

        <img
          src={song.cover}
          alt={song.title}
        />

        {isCurrent && (
          <div className="card-progress-track">
            <div
              className="card-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <button
          type="button"
          className="card-play"
          onClick={() =>
            playSong(song)
          }
          aria-label={
            playing ? "Pause song" : "Play song"
          }
        >
          {playing ? "❚❚" : "▶"}
        </button>

        <button
          type="button"
          className={`favorite-button ${
            isFavorite(song.id) ? "favorite-active" : ""
          }`}
          onClick={handleFavoriteClick}
          aria-label="Toggle favorite"
        >
          {isFavorite(song.id)
            ? "♥"
            : "♡"}
        </button>

        {playing && (
          <span className="now-playing-badge">
            ♪ Playing
          </span>
        )}

      </div>

      <div className="song-info">

        <h3>
          {song.title}
        </h3>

        <p>
          {song.singer}
        </p>

        <span>
          {song.type}
        </span>

      </div>

    </div>
  );
};

export default MusicCard;