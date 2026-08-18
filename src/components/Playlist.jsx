export default function Playlist({ tracks, currentIndex, onSelectTrack }) {
  return (
    <div className="playlist">
      <h3 className="playlist-header">Playlist</h3>
      {tracks.map((track, index) => (
        <div
          key={track.id}
          className={`playlist-item ${index === currentIndex ? 'active' : ''}`}
          onClick={() => onSelectTrack(index)}
        >
          <span>{track.title}</span>
          <span className="playlist-item-artist">{track.artist}</span>
        </div>
      ))}
    </div>
  );
}