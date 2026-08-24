import { useMemo, useState } from "react";
import MusicCard from "../../components/MusicCard";
import { useMusic } from "../../context/MusicContext";
import { useToast } from "../../context/ToastContext";

const Favorites = () => {
  const { songs, favorites, toggleFavorite } = useMusic();
  const { showToast } = useToast();

  const [sort, setSort] = useState("recent");
  const [confirmClear, setConfirmClear] = useState(false);

  const favoriteSongs = useMemo(() => {
    const list = songs.filter((song) =>
      favorites.includes(song.id)
    );

    if (sort === "az") {
      return [...list].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    // "recent" = order favorites were added, most recent first
    return [...list].sort(
      (a, b) =>
        favorites.indexOf(b.id) -
        favorites.indexOf(a.id)
    );
  }, [songs, favorites, sort]);

  const handleClearAll = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }

    favorites.forEach((id) => toggleFavorite(id));
    showToast("All favorites cleared", "info");
    setConfirmClear(false);
  };

  return (
    <main className="page">
      <div className="page-title">
        <span className="small-label">
          YOUR COLLECTION
        </span>

        <h1>Favorite Songs ❤️</h1>

        <p>
          Your personally selected favorite tracks.
        </p>
      </div>

      {favoriteSongs.length === 0 ? (
        <div className="empty-state">
          <div>💔</div>

          <h2>No favorite songs yet</h2>

          <p>
            Click the heart icon on a song to add it
            here.
          </p>
        </div>
      ) : (
        <>
          <div className="filter-bar favorites-toolbar">
            <div className="filter-group">
              <label>Sort By</label>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="recent">
                  Recently Added
                </option>
                <option value="az">Title A–Z</option>
              </select>
            </div>

            <button
              className={`clear-filter ${
                confirmClear ? "confirm-danger" : ""
              }`}
              onClick={handleClearAll}
              onBlur={() => setConfirmClear(false)}
            >
              {confirmClear
                ? "Click again to confirm"
                : "Clear All Favorites"}
            </button>
          </div>

          <div className="music-grid">
            {favoriteSongs.map((song) => (
              <MusicCard
                key={song.id}
                song={song}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default Favorites;