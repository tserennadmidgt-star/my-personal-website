import { useState } from "react";

function Playlist({ playlist, setPlaylist }) {
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  const [link, setLink] = useState("");
  const [nowPlaying, setNowPlaying] = useState(null);

  const addSong = () => {
    if (!song.trim()) return;

    const newSong = {
      id: Date.now(),
      song: song.trim(),
      artist: artist.trim() || "Unknown artist",
      link: link.trim(),
    };

    setPlaylist([...playlist, newSong]);
    setSong("");
    setArtist("");
    setLink("");
  };

  const deleteSong = (id) => {
    setPlaylist(playlist.filter((item) => item.id !== id));

    if (nowPlaying?.id === id) {
      setNowPlaying(null);
    }
  };

  const playSong = (item) => {
    setNowPlaying(item);
  };

  const getYoutubeEmbed = (url) => {
    if (!url) return "";

    try {
      const parsed = new URL(url);

      if (parsed.hostname.includes("youtu.be")) {
        return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
      }

      if (parsed.hostname.includes("youtube.com")) {
        const videoId = parsed.searchParams.get("v");

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }
    } catch {
      return "";
    }

    return "";
  };

  const embedUrl = nowPlaying ? getYoutubeEmbed(nowPlaying.link) : "";

  return (
    <div className="playlist-page">

      {/* HEADER */}
      <div className="playlist-header">
        <div>
          <h1>🎧 My Playlist</h1>
          <p>your little music corner ♡</p>
        </div>

        <div className="song-count">
          🎵 <strong>{playlist.length}</strong> songs
        </div>
      </div>


      {/* PLAYER */}
      <div className="player-card">

        <div className="album-art">
          {nowPlaying ? "🎶" : "🎧"}
        </div>

        <div className="player-info">

          <span className="playing-label">
            {nowPlaying ? "NOW PLAYING ♡" : "YOUR MUSIC SPACE"}
          </span>

          <h2>
            {nowPlaying ? nowPlaying.song : "Choose a song"}
          </h2>

          <p>
            {nowPlaying
              ? nowPlaying.artist
              : "Add your favorite songs below ✨"}
          </p>

          {embedUrl ? (
            <div className="youtube-player">
              <iframe
                src={embedUrl}
                title={nowPlaying.song}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="no-link">
              🎵 Add a YouTube link to play this song
            </div>
          )}

        </div>
      </div>


      {/* ADD SONG */}
      <div className="add-song-card">

        <div className="section-title">
          <h2>💿 Add a song</h2>
          <span>♡</span>
        </div>

        <div className="song-form">

          <input
            type="text"
            placeholder="Song name..."
            value={song}
            onChange={(e) => setSong(e.target.value)}
          />

          <input
            type="text"
            placeholder="Artist..."
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />

          <input
            type="text"
            placeholder="YouTube link..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />

          <button onClick={addSong}>
            + Add ✨
          </button>

        </div>
      </div>


      {/* SONG LIST */}
      <div className="songs-section">

        <div className="songs-title">
          <h2>♡ My songs</h2>
          <span>{playlist.length} tracks</span>
        </div>

        {playlist.length === 0 ? (

          <div className="empty-playlist">
            <div className="empty-icon">🎵</div>
            <h3>Your playlist is empty</h3>
            <p>Add a song that makes you happy ♡</p>
          </div>

        ) : (

          <div className="song-list">

            {playlist.map((item, index) => (

              <div
                className={`song-card ${
                  nowPlaying?.id === item.id ? "active-song" : ""
                }`}
                key={item.id}
              >

                <div className="song-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="mini-cover">
                  {["🎀", "🌷", "🌸", "🦋", "✨"][index % 5]}
                </div>

                <div className="song-details">
                  <h3>{item.song}</h3>
                  <p>{item.artist}</p>
                </div>

                <button
                  className="small-play"
                  onClick={() => playSong(item)}
                >
                  {nowPlaying?.id === item.id ? "❚❚" : "▶"}
                </button>

                {item.link && (
                  <span className="youtube-badge">
                    ▶
                  </span>
                )}

                <button
                  className="delete-song"
                  onClick={() => deleteSong(item.id)}
                >
                  🗑️
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Playlist;