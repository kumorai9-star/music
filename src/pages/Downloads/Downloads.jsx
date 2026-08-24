import { useMemo, useState } from "react";
import { useMusic } from "../../context/MusicContext";
import { useToast } from "../../context/ToastContext";

const Downloads = () => {
  const { songs } = useMusic();
  const { showToast } = useToast();

  const [search, setSearch] = useState("");
  const [progressMap, setProgressMap] = useState({});
  const [doneMap, setDoneMap] = useState({});

  const filteredSongs = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return songs;
    }

    return songs.filter(
      (song) =>
        song.title.toLowerCase().includes(query) ||
        song.singer.toLowerCase().includes(query)
    );
  }, [songs, search]);

  const runDownload = (song) => {
    if (progressMap[song.id] !== undefined) {
      return;
    }

    setProgressMap((prev) => ({
      ...prev,
      [song.id]: 0,
    }));

    const interval = window.setInterval(() => {
      setProgressMap((prev) => {
        const current = prev[song.id] ?? 0;
        const next = Math.min(current + 20, 100);

        if (next >= 100) {
          window.clearInterval(interval);

          const link = document.createElement("a");
          link.href = song.audio;
          link.download = `${song.title}.mp3`;

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          setDoneMap((doneCurrent) => ({
            ...doneCurrent,
            [song.id]: true,
          }));

          showToast(
            `"${song.title}" downloaded ✓`,
            "success"
          );
        }

        return { ...prev, [song.id]: next };
      });
    }, 120);
  };

  const downloadAll = () => {
    filteredSongs.forEach((song, index) => {
      window.setTimeout(
        () => runDownload(song),
        index * 250
      );
    });
  };

  return (
    <main className="page">
      <div className="page-title">
        <span className="small-label">
          OFFLINE MUSIC
        </span>

        <h1>Download Songs 📥</h1>

        <p>
          Download your favorite songs directly to
          your device.
        </p>
      </div>

      <div className="downloads-toolbar">
        <div className="download-search">
          <span>🔍</span>

          <input
            type="text"
            placeholder="Search downloads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          className="download-all-button"
          onClick={downloadAll}
        >
          📥 Download All ({filteredSongs.length})
        </button>
      </div>

      {filteredSongs.length === 0 ? (
        <div className="no-results">
          <h3>No songs found</h3>
          <p>Try a different search term.</p>
        </div>
      ) : (
        <div className="download-grid">
          {filteredSongs.map((song) => {
            const progress = progressMap[song.id];
            const isDownloading =
              progress !== undefined &&
              progress < 100;
            const isDone = doneMap[song.id];

            return (
              <div
                className="download-card"
                key={song.id}
              >
                <img
                  src={song.cover}
                  alt={song.title}
                />

                <div className="download-info">
                  <h3>{song.title}</h3>

                  <p>{song.singer}</p>

                  <span>
                    {song.type} • {song.duration}
                  </span>

                  {isDownloading && (
                    <div className="mini-bar-track download-progress-track">
                      <div
                        className="mini-bar-fill"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </div>

                <button
                  onClick={() => runDownload(song)}
                  className={`download-button ${
                    isDone ? "download-done" : ""
                  }`}
                  disabled={isDownloading}
                  aria-label={`Download ${song.title}`}
                >
                  {isDownloading
                    ? `${Math.round(progress)}%`
                    : isDone
                    ? "✓"
                    : "↓"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default Downloads;