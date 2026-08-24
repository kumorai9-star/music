import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import MusicCard from "../../components/MusicCard";
import FilterBar from "../../components/FilterBar";
import { useMusic } from "../../context/MusicContext";

const Home = () => {
  const { songs, playSong } = useMusic();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const typeParam = searchParams.get("type") || "All";

  const [singer, setSinger] = useState("All");
  const [type, setType] = useState(typeParam);
  const [prevTypeParam, setPrevTypeParam] = useState(typeParam);
  const [sort, setSort] = useState("popular");

  if (typeParam !== prevTypeParam) {
    setPrevTypeParam(typeParam);
    setType(typeParam);
  }

  const singers = [...new Set(songs.map((song) => song.singer))];
  const types = [...new Set(songs.map((song) => song.type))];

  const filteredSongs = useMemo(() => {
    const result = songs.filter((song) => {
      const matchesSearch =
        song.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        song.singer
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesSinger =
        singer === "All" || song.singer === singer;

      const matchesType =
        type === "All" || song.type === type;

      return (
        matchesSearch &&
        matchesSinger &&
        matchesType
      );
    });

    const sorted = [...result];

    if (sort === "az") {
      sorted.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else if (sort === "za") {
      sorted.sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    } else if (sort === "newest") {
      sorted.sort((a, b) => b.id - a.id);
    } else {
      sorted.sort(
        (a, b) => b.downloads - a.downloads
      );
    }

    return sorted;
  }, [songs, search, singer, type, sort]);

  const handleShufflePlay = () => {
    if (songs.length === 0) {
      return;
    }

    const randomSong =
      songs[
        Math.floor(Math.random() * songs.length)
      ];

    playSong(randomSong);

    document
      .getElementById("popular")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="page">
      <section className="hero">
        <div>
          <span className="hero-label">
            YOUR MUSIC. YOUR MOOD.
          </span>

          <h1>
            Discover your
            <br />
            <span>perfect sound.</span>
          </h1>

          <p>
            Listen to your favorite songs and discover
            something new every day.
          </p>

          <div className="hero-buttons">
            <button
              className="hero-button"
              onClick={() =>
                document
                  .getElementById("popular")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Start Listening 🎧
            </button>

            <button
              className="hero-button-outline"
              onClick={handleShufflePlay}
            >
              🔀 Shuffle Play
            </button>
          </div>
        </div>

        <div className="hero-disc">
          <div className="disc-center">♫</div>
        </div>
      </section>

      <section className="section" id="popular">
        <div className="section-heading">
          <div>
            <span className="small-label">LIBRARY</span>
            <h2>Explore Music</h2>
          </div>

          <span>
            {filteredSongs.length} songs
          </span>
        </div>

        <FilterBar
          singer={singer}
          type={type}
          sort={sort}
          setSinger={setSinger}
          setType={setType}
          setSort={setSort}
          singers={singers}
          types={types}
        />

        {filteredSongs.length === 0 ? (
          <div className="no-results">
            <h3>No songs found</h3>
            <p>Try another search or filter.</p>
          </div>
        ) : (
          <div className="music-grid">
            {filteredSongs.map((song) => (
              <MusicCard
                key={song.id}
                song={song}
              />
            ))}
          </div>
        )}
      </section>

      <section className="download-section" id="new">
        <div>
          <span className="small-label">
            NEW RELEASES
          </span>

          <h2>Download new songs</h2>

          <p>
            Find the latest tracks and save your
            favorites for offline listening.
          </p>
        </div>

        <button
          className="download-main"
          onClick={() => navigate("/downloads")}
        >
          📥 Explore Downloads
        </button>
      </section>
    </main>
  );
};

export default Home;