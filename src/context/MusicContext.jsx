/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { songs } from "../data/songs";

const MusicContext = createContext(null);

export const MusicProvider = ({ children }) => {
  const audioRef = useRef(new Audio());

  const [currentSong, setCurrentSong] =
    useState(null);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  const [volume, setVolume] =
    useState(0.7);

  const [duration, setDuration] =
    useState(0);

  const [currentTime, setCurrentTime] =
    useState(0);

  const [shuffle, setShuffle] =
    useState(false);

  const [repeat, setRepeat] =
    useState(false);

  const [favorites, setFavorites] =
    useState(() => {
      const savedFavorites =
        localStorage.getItem("favorites");

      return savedFavorites
        ? JSON.parse(savedFavorites)
        : [];
    });

  /* ================================
     SAVE FAVORITES
  ================================= */

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  /* ================================
     SET VOLUME
  ================================= */

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  /* ================================
     REFS FOR STABLE EVENT HANDLERS
  ================================= */

  const shuffleRef = useRef(shuffle);
  const repeatRef = useRef(repeat);
  const currentSongRef = useRef(currentSong);

  useEffect(() => {
    shuffleRef.current = shuffle;
  }, [shuffle]);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  useEffect(() => {
    currentSongRef.current = currentSong;
  }, [currentSong]);

  /* ================================
     AUDIO EVENTS
  ================================= */

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      if (
        audio.duration &&
        !Number.isNaN(audio.duration)
      ) {
        setProgress(
          (audio.currentTime /
            audio.duration) *
            100
        );

        setCurrentTime(audio.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      if (
        audio.duration &&
        !Number.isNaN(audio.duration)
      ) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      const song = currentSongRef.current;

      // Repeat the same track
      if (repeatRef.current && song) {
        audio.currentTime = 0;
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));

        return;
      }

      // Shuffle to a random track
      if (
        shuffleRef.current &&
        song &&
        songs.length > 1
      ) {
        let randomIndex;
        let randomSong;

        do {
          randomIndex = Math.floor(
            Math.random() * songs.length
          );
          randomSong = songs[randomIndex];
        } while (randomSong.id === song.id);

        audio.pause();
        audio.src = randomSong.audio;
        audio.currentTime = 0;

        setCurrentSong(randomSong);
        setProgress(0);

        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));

        return;
      }

      // Otherwise advance to the next track
      if (song) {
        const currentIndex = songs.findIndex(
          (item) => item.id === song.id
        );

        if (currentIndex !== -1) {
          const nextIndex =
            (currentIndex + 1) % songs.length;

          const next = songs[nextIndex];

          audio.pause();
          audio.src = next.audio;
          audio.currentTime = 0;

          setCurrentSong(next);
          setProgress(0);

          audio
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));

          return;
        }
      }

      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener(
      "timeupdate",
      updateProgress
    );

    audio.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata
    );

    audio.addEventListener(
      "ended",
      handleEnded
    );

    return () => {
      audio.removeEventListener(
        "timeupdate",
        updateProgress
      );

      audio.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );

      audio.removeEventListener(
        "ended",
        handleEnded
      );
    };
  }, []);

  /* ================================
     PLAY SONG
  ================================= */

  const playSong = (song) => {
    const audio = audioRef.current;

    // Same song
    if (
      currentSong &&
      currentSong.id === song.id
    ) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error(
              "Audio playback error:",
              error
            );
          });
      }

      return;
    }

    // New song
    audio.pause();

    audio.src = song.audio;
    audio.currentTime = 0;

    setCurrentSong(song);
    setProgress(0);

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((error) => {
        console.error(
          "Audio playback error:",
          error
        );

        setIsPlaying(false);
      });
  };

  /* ================================
     PLAY / PAUSE
  ================================= */

  const togglePlay = () => {
    if (!currentSong) {
      return;
    }

    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error(
            "Audio playback error:",
            error
          );
        });
    }
  };

  /* ================================
     NEXT SONG
  ================================= */

  const nextSong = () => {
    if (!currentSong) {
      return;
    }

    if (shuffle && songs.length > 1) {
      let randomSong;

      do {
        randomSong =
          songs[
            Math.floor(
              Math.random() * songs.length
            )
          ];
      } while (randomSong.id === currentSong.id);

      playSong(randomSong);

      return;
    }

    const currentIndex =
      songs.findIndex(
        (song) =>
          song.id === currentSong.id
      );

    if (currentIndex === -1) {
      return;
    }

    const nextIndex =
      (currentIndex + 1) %
      songs.length;

    playSong(
      songs[nextIndex]
    );
  };

  /* ================================
     PREVIOUS SONG
  ================================= */

  const previousSong = () => {
    if (!currentSong) {
      return;
    }

    const currentIndex =
      songs.findIndex(
        (song) =>
          song.id === currentSong.id
      );

    if (currentIndex === -1) {
      return;
    }

    const previousIndex =
      (currentIndex -
        1 +
        songs.length) %
      songs.length;

    playSong(
      songs[previousIndex]
    );
  };

  /* ================================
     SHUFFLE / REPEAT
  ================================= */

  const toggleShuffle = () => {
    setShuffle((current) => !current);
  };

  const toggleRepeat = () => {
    setRepeat((current) => !current);
  };

  /* ================================
     CHANGE PROGRESS
  ================================= */

  const changeProgress = (
    value
  ) => {
    const audio = audioRef.current;

    if (
      !audio.duration ||
      Number.isNaN(audio.duration)
    ) {
      return;
    }

    audio.currentTime =
      (value / 100) *
      audio.duration;

    setProgress(value);
  };

  /* ================================
     FAVORITES
  ================================= */

  const toggleFavorite = (
    songId
  ) => {
    setFavorites(
      (previousFavorites) => {
        if (
          previousFavorites.includes(
            songId
          )
        ) {
          return previousFavorites.filter(
            (id) => id !== songId
          );
        }

        return [
          ...previousFavorites,
          songId,
        ];
      }
    );
  };

  /* ================================
     CHECK FAVORITE
  ================================= */

  const isFavorite = (
    songId
  ) => {
    return favorites.includes(
      songId
    );
  };

  /* ================================
     CONTEXT VALUE
  ================================= */

  const value = {
    songs,

    currentSong,
    isPlaying,
    progress,
    volume,
    duration,
    currentTime,
    shuffle,
    repeat,

    favorites,

    playSong,
    togglePlay,

    nextSong,
    previousSong,

    changeProgress,
    setVolume,

    toggleShuffle,
    toggleRepeat,

    toggleFavorite,
    isFavorite,
  };

  return (
    <MusicContext.Provider
      value={value}
    >
      {children}
    </MusicContext.Provider>
  );
};

/* ================================
   CUSTOM MUSIC HOOK
================================= */

export const useMusic = () => {
  const context =
    useContext(MusicContext);

  if (!context) {
    throw new Error(
      "useMusic must be used inside MusicProvider"
    );
  }

  return context;
};