export default function PlayerCard({ track }) {
  return (
    <>
      <div className="cover-wrapper">
        <img src={track.cover} alt={track.title} className="cover-image" />
      </div>
      <div className="track-info">
        <h2 className="track-title">{track.title}</h2>
        <p className="track-artist">{track.artist}</p>
      </div>
    </>
  );
}