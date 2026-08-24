import { useNavigate } from "react-router-dom";
import { useMusic } from "../../context/MusicContext";

const Dashboard = () => {
  const { songs, favorites } = useMusic();
  const navigate = useNavigate();

  const totalDownloads = songs.reduce(
    (total, song) => total + song.downloads,
    0
  );

  const topSongs = [...songs]
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 5);

  const maxDownloads = topSongs[0]?.downloads || 1;

  const genreCounts = songs.reduce((acc, song) => {
    acc[song.type] = (acc[song.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <main className="page dashboard-page">
      <div className="dashboard-header">
        <div>
          <span className="small-label">
            OVERVIEW
          </span>

          <h1>Dashboard</h1>

          <p>
            Welcome back to your music dashboard.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <button
          type="button"
          className="stat-card stat-card-clickable"
          onClick={() => navigate("/")}
        >
          <span>🎵</span>
          <div>
            <p>Total Songs</p>
            <h2>{songs.length}</h2>
          </div>
        </button>

        <button
          type="button"
          className="stat-card stat-card-clickable"
          onClick={() => navigate("/favorites")}
        >
          <span>❤️</span>
          <div>
            <p>Favorites</p>
            <h2>{favorites.length}</h2>
          </div>
        </button>

        <button
          type="button"
          className="stat-card stat-card-clickable"
          onClick={() => navigate("/downloads")}
        >
          <span>📥</span>
          <div>
            <p>Downloads</p>
            <h2>{totalDownloads.toLocaleString()}</h2>
          </div>
        </button>

        <div className="stat-card">
          <span>🎤</span>
          <div>
            <p>Artists</p>
            <h2>
              {[...new Set(songs.map(
                (song) => song.singer
              ))].length}
            </h2>
          </div>
        </div>
      </div>

      <section className="dashboard-panel">
        <div className="section-heading">
          <div>
            <span className="small-label">
              TRENDING
            </span>

            <h2>Most Downloaded</h2>
          </div>
        </div>

        <div className="download-list">
          {topSongs.map((song, index) => (
            <div
              className="download-row download-row-interactive"
              key={song.id}
              onClick={() => navigate("/")}
            >
              <strong>#{index + 1}</strong>

              <img
                src={song.cover}
                alt={song.title}
              />

              <div className="download-row-info">
                <h4>{song.title}</h4>
                <p>{song.singer}</p>

                <div className="mini-bar-track">
                  <div
                    className="mini-bar-fill"
                    style={{
                      width: `${
                        (song.downloads /
                          maxDownloads) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>

              <span>
                {song.downloads.toLocaleString()}
                {" "}downloads
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard-panel">
        <div className="section-heading">
          <div>
            <span className="small-label">
              LIBRARY BREAKDOWN
            </span>

            <h2>Genres</h2>
          </div>
        </div>

        <div className="genre-pills">
          {Object.entries(genreCounts).map(
            ([genre, count]) => (
              <button
                type="button"
                key={genre}
                className="genre-pill"
                onClick={() =>
                  navigate(
                    `/?type=${encodeURIComponent(
                      genre
                    )}`
                  )
                }
              >
                {genre}
                <span>{count}</span>
              </button>
            )
          )}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;