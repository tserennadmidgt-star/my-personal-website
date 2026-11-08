import React, { useState } from 'react';

function Movies() {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'watching' | 'want' | 'finished' | 'favorite'
  const [searchQuery, setSearchQuery] = useState('');

  // Засварлаж буй киноны ID болон засах датаг хадгалах state
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  // Киноны жагсаалт
  const [movieList, setMovieList] = useState([
    {
      id: 1,
      title: 'The Summer I Turned Pretty',
      status: 'watching',
      rating: 4.5,
      genre: 'Romance 💗',
      favorite: true,
      review: 'Хамгийн дуртай цувралуудын нэг!',
      poster: 'https://m.media-amazon.com/images/M/MVBmMI0ZDMtYTllNy00MmU2LTlhNWItOTlhNDc4YjU3NzU2XkEyXkFqcGc@._V1_.jpg',
    },
    {
      id: 2,
      title: 'Inside Out 2',
      status: 'finished',
      rating: 5.0,
      genre: 'Animation 🎨',
      favorite: true,
      review: 'Маш их сэтгэгдэл үлдээлээ.',
      poster: 'https://m.media-amazon.com/images/M/MVBmMzU0OThmY2ItNDUxYi00YjM5LWI0MzYtYTU3OTgxYWJmNGM5XkEyXkFqcGc@._V1_.jpg',
    },
  ]);

  // Шинэ кино нэмэх форм
  const [newTitle, setNewTitle] = useState('');
  const [newGenre, setNewGenre] = useState('Romance 💗');
  const [newRating, setNewRating] = useState('5');
  const [newStatus, setNewStatus] = useState('watching');
  const [newPoster, setNewPoster] = useState('');
  const [newReview, setNewReview] = useState('');

  // Кино нэмэх
  const handleAddMovie = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newMovie = {
      id: Date.now(),
      title: newTitle,
      status: newStatus,
      rating: parseFloat(newRating),
      genre: newGenre,
      favorite: false,
      review: newReview,
      poster: newPoster.trim() || 'https://via.placeholder.com/300x450/ffe0ea/e85d88?text=No+Poster',
    };

    setMovieList([newMovie, ...movieList]);
    setNewTitle('');
    setNewPoster('');
    setNewReview('');
  };

  // Кино устгах
  const deleteMovie = (id) => {
    setMovieList(movieList.filter((m) => m.id !== id));
  };

  // Дуртай төлөв солих
  const toggleFavorite = (id) => {
    setMovieList(
      movieList.map((m) => (m.id === id ? { ...m, favorite: !m.favorite } : m))
    );
  };

  // Шууд Watched болгох функц
  const markAsWatched = (id) => {
    setMovieList(
      movieList.map((m) => (m.id === id ? { ...m, status: 'finished' } : m))
    );
  };

  // Засварлаж эхлэх
  const startEditing = (movie) => {
    setEditingId(movie.id);
    setEditFormData({ ...movie });
  };

  // Засварыг хадгалах
  const saveEdit = (id) => {
    setMovieList(
      movieList.map((m) => (m.id === id ? { ...editFormData, rating: parseFloat(editFormData.rating) } : m))
    );
    setEditingId(null);
  };

  // Засварыг цуцлах
  const cancelEdit = () => {
    setEditingId(null);
  };

  // Хайлт болон Табаар шүүх
  const filteredMovies = movieList.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'favorite') return matchesSearch && movie.favorite;
    return matchesSearch && movie.status === activeTab;
  });

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: "'Segoe UI', Roboto, sans-serif", color: '#000000' }}>
      
      {/* HEADER */}
      <div style={{ marginBottom: '25px', textAlign: 'center' }}>
        <h1 style={{ margin: 0, color: '#d64570', fontSize: '32px', fontWeight: '800' }}>🎬 My Movies</h1>
        <p style={{ margin: '6px 0 0', color: '#1a1a1a', fontSize: '14px', fontWeight: '500' }}>
          Миний үзсэн болон үзэх дуртай кинонуудын тэмдэглэл 🌸
        </p>
      </div>

      {/* SEARCH BAR & FILTERS */}
      <div style={{ background: '#ffffff', padding: '16px', borderRadius: '20px', border: '2px solid #e2d4f0', boxShadow: '0 4px 15px rgba(214, 69, 112, 0.05)', marginBottom: '25px' }}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="🔎 Кино хайх..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #f3e8ff',
              borderRadius: '12px',
              background: '#faf5ff',
              color: '#000000',
              fontWeight: '600',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* TABS */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: '✨ All' },
            { id: 'watching', label: '🍿 Watching' },
            { id: 'want', label: '📌 Wishlist' },
            { id: 'finished', label: '✅ Watched' },
            { id: 'favorite', label: '❤️ Favorites' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '10px',
                border: activeTab === tab.id ? '2px solid #d64570' : '1px solid #e2d4f0',
                background: activeTab === tab.id ? '#ff8da1' : '#ffffff',
                color: activeTab === tab.id ? '#ffffff' : '#000000',
                fontWeight: 'bold',
                fontSize: '13px',
                cursor: 'pointer',
                transition: '0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ADD MOVIE FORM */}
      <form onSubmit={handleAddMovie} style={{ background: '#ffffff', padding: '20px', borderRadius: '20px', border: '2px solid #ffe0ea', boxShadow: '0 4px 15px rgba(232, 93, 136, 0.05)', marginBottom: '30px' }}>
        <h3 style={{ margin: '0 0 15px', color: '#d64570', fontSize: '16px', fontWeight: '800' }}>➕ Шинэ кино нэмэх</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Киноны нэр..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ background: '#ffffff', padding: '10px 12px', border: '1px solid #f0d0e0', borderRadius: '10px', color: '#000000', fontWeight: '500', outline: 'none' }}
          />

          <select
            value={newGenre}
            onChange={(e) => setNewGenre(e.target.value)}
            style={{ background: '#ffffff', padding: '10px 12px', border: '1px solid #f0d0e0', borderRadius: '10px', color: '#000000', fontWeight: '500', outline: 'none' }}
          >
            <option value="Romance 💗">Romance 💗</option>
            <option value="Drama 🎭">Drama 🎭</option>
            <option value="Animation 🎨">Animation 🎨</option>
            <option value="Sci-Fi 🚀">Sci-Fi 🚀</option>
            <option value="Comedy 😂">Comedy 😂</option>
            <option value="Horror 👻">Horror 👻</option>
          </select>

          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            style={{ background: '#ffffff', padding: '10px 12px', border: '1px solid #f0d0e0', borderRadius: '10px', color: '#000000', fontWeight: '500', outline: 'none' }}
          >
            <option value="watching">🍿 Watching</option>
            <option value="want">📌 Want to watch</option>
            <option value="finished">✅ Watched</option>
          </select>

          <select
            value={newRating}
            onChange={(e) => setNewRating(e.target.value)}
            style={{ background: '#ffffff', padding: '10px 12px', border: '1px solid #f0d0e0', borderRadius: '10px', color: '#000000', fontWeight: '500', outline: 'none' }}
          >
            <option value="5">⭐⭐⭐⭐⭐ (5)</option>
            <option value="4">⭐⭐⭐⭐ (4)</option>
            <option value="3">⭐⭐⭐ (3)</option>
            <option value="2">⭐⭐ (2)</option>
            <option value="1">⭐ (1)</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
          <input
            type="text"
            placeholder="🖼️ Poster Image URL (https://...)"
            value={newPoster}
            onChange={(e) => setNewPoster(e.target.value)}
            style={{ background: '#ffffff',  padding: '10px 12px', border: '1px solid #f0d0e0', borderRadius: '10px', color: '#000000', fontWeight: '500', outline: 'none' }}
          />

          <input
            type="text"
            placeholder="💬 Сэтгэгдэл / Тэмдэглэл..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            style={{ background: '#ffffff', padding: '10px 12px', border: '1px solid #f0d0e0', borderRadius: '10px', color: '#000000', fontWeight: '500', outline: 'none' }}
          />
        </div>

        <button 
          type="submit" 
          style={{ 
            width: '100%', 
            background: '#ff8da1', 
            color: '#ffffff', 
            border: 'none', 
            padding: '12px', 
            borderRadius: '12px', 
            fontWeight: 'bold', 
            fontSize: '14px', 
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(255, 141, 161, 0.3)'
          }}
        >
          ✨ Нэмэх
        </button>
      </form>

      {/* MOVIE GRID (CARDS) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
        {filteredMovies.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', background: '#ffffff', borderRadius: '20px', border: '2px dashed #e2d4f0' }}>
            <p style={{ color: '#000000', fontSize: '15px', fontWeight: '600' }}>Кино олдсонгүй 🌸</p>
          </div>
        ) : (
          filteredMovies.map((movie) => (
            <div 
              key={movie.id} 
              style={{ 
                background: '#ffffff', 
                borderRadius: '18px', 
                border: '1px solid #ffe0ea', 
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)', 
                overflow: 'hidden', 
                display: 'flex', 
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              {/* EDIT MODE ИДЭВХЖСЭН ҮЕД */}
              {editingId === movie.id ? (
                <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px', background: '#fff8fa', height: '100%' }}>
                  <h4 style={{ margin: '0 0 4px', color: '#d64570', fontSize: '14px' }}>✏️ Засварлах</h4>
                  
                  <input
                    type="text"
                    value={editFormData.title}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    style={{ background: '#ffffff', padding: '6px', borderRadius: '6px', border: '1px solid #ffd1df', fontSize: '12px' }}
                  />

                  <select
                    value={editFormData.status}
                    onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                    style={{ padding: '6px', borderRadius: '6px', border: '1px solid #ffd1df', fontSize: '12px' }}
                  >
                    <option value="watching">🍿 Watching</option>
                    <option value="want">📌 Wishlist</option>
                    <option value="finished">✅ Watched</option>
                  </select>

                  <select
                    value={editFormData.genre}
                    onChange={(e) => setEditFormData({ ...editFormData, genre: e.target.value })}
                    style={{ padding: '6px', borderRadius: '6px', border: '1px solid #ffd1df', fontSize: '12px' }}
                  >
                    <option value="Romance 💗">Romance 💗</option>
                    <option value="Drama 🎭">Drama 🎭</option>
                    <option value="Animation 🎨">Animation 🎨</option>
                    <option value="Sci-Fi 🚀">Sci-Fi 🚀</option>
                    <option value="Comedy 😂">Comedy 😂</option>
                    <option value="Horror 👻">Horror 👻</option>
                  </select>

                  <select
                    value={editFormData.rating}
                    onChange={(e) => setEditFormData({ ...editFormData, rating: e.target.value })}
                    style={{ padding: '6px', borderRadius: '6px', border: '1px solid #ffd1df', fontSize: '12px' }}
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                    <option value="4">⭐⭐⭐⭐ (4)</option>
                    <option value="3">⭐⭐⭐ (3)</option>
                    <option value="2">⭐⭐ (2)</option>
                    <option value="1">⭐ (1)</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Poster URL..."
                    value={editFormData.poster}
                    onChange={(e) => setEditFormData({ ...editFormData, poster: e.target.value })}
                    style={{ padding: '6px', borderRadius: '6px', border: '1px solid #ffd1df', fontSize: '12px' }}
                  />

                  <input
                    type="text"
                    placeholder="Review..."
                    value={editFormData.review}
                    onChange={(e) => setEditFormData({ ...editFormData, review: e.target.value })}
                    style={{ padding: '6px', borderRadius: '6px', border: '1px solid #ffd1df', fontSize: '12px' }}
                  />

                  <div style={{ display: 'flex', gap: '6px', marginTop: 'auto', paddingTop: '8px' }}>
                    <button
                      onClick={() => saveEdit(movie.id)}
                      style={{ flex: 1, background: '#ff8da1', color: '#ffffff', border: 'none', padding: '6px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      style={{ background: '#e2d4f0', color: '#000000', border: 'none', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* ХЭВТЭЭ КАРТ / НӨХЦӨЛҮҮД */
                <>
                  {/* POSTER IMAGE */}
                  <div style={{ width: '100%', height: '260px', overflow: 'hidden', background: '#faf5ff', position: 'relative' }}>
                    <img 
                      src={movie.poster} 
                      alt={movie.title}
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = 'https://via.placeholder.com/300x450/ffe0ea/e85d88?text=No+Poster';
                      }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />

                    {/* FAVORITE BUTTON */}
                    <button
                      onClick={() => toggleFavorite(movie.id)}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                      }}
                    >
                      {movie.favorite ? '❤️' : '🤍'}
                    </button>

                    {/* STATUS BADGE */}
                    <span 
                      style={{ 
                        position: 'absolute', 
                        bottom: '10px', 
                        left: '10px', 
                        background: 'rgba(255, 255, 255, 0.95)', 
                        color: '#000000', 
                        fontSize: '11px', 
                        fontWeight: 'bold', 
                        padding: '4px 10px', 
                        borderRadius: '8px' 
                      }}
                    >
                      {movie.status === 'watching' && '🍿 Watching'}
                      {movie.status === 'want' && '📌 Wishlist'}
                      {movie.status === 'finished' && '✅ Watched'}
                    </span>
                  </div>

                  {/* CARD DETAILS */}
                  <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px', color: '#000000', fontSize: '15px', fontWeight: 'bold' }}>
                        {movie.title}
                      </h4>

                      <div style={{ fontSize: '11px', color: '#d64570', fontWeight: 'bold', marginBottom: '8px' }}>
                        {movie.genre}
                      </div>

                      <div style={{ color: '#ffaa00', fontSize: '12px', marginBottom: '8px' }}>
                        {'⭐'.repeat(Math.floor(movie.rating))} <span style={{ color: '#000000', fontWeight: 'bold' }}>({movie.rating})</span>
                      </div>

                      {movie.review && (
                        <p style={{ margin: '0 0 10px', fontSize: '12px', color: '#333333', fontStyle: 'italic', background: '#faf5ff', padding: '8px', borderRadius: '8px', borderLeft: '3px solid #ff8da1' }}>
                          "{movie.review}"
                        </p>
                      )}
                    </div>

                    {/* ACTIONS (QUICK WATCHED, EDIT, DELETE) */}
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end', marginTop: '10px', paddingTop: '8px', borderTop: '1px dashed #ffe0ea' }}>
                      
                      {/* УЗСЭН НЬ "finished" БИШ ҮЕД Л WATCHED & EDIT ТОВЧУУД ХАРАГДАНА */}
                      {movie.status !== 'finished' && (
                        <>
                          <button
                            onClick={() => markAsWatched(movie.id)}
                            title="Watched болгох"
                            style={{
                              flex: 1,
                              background: '#e6fffa',
                              border: '1px solid #b2f5ea',
                              color: '#234e52',
                              borderRadius: '8px',
                              padding: '4px 6px',
                              fontSize: '11px',
                              cursor: 'pointer',
                              fontWeight: 'bold'
                            }}
                          >
                            ✅ Watched
                          </button>

                          <button
                            onClick={() => startEditing(movie)}
                            style={{
                              background: '#f3e8ff',
                              border: '1px solid #e2d4f0',
                              color: '#553c9a',
                              borderRadius: '8px',
                              padding: '4px 8px',
                              fontSize: '11px',
                              cursor: 'pointer',
                              fontWeight: 'bold'
                            }}
                          >
                            ✏️ Edit
                          </button>
                        </>
                      )}

                      {/* DELETE BUTTON (БҮХ КИНО ДЭЭР БАЙНА) */}
                      <button
                        onClick={() => deleteMovie(movie.id)}
                        style={{
                          background: '#fff0f5',
                          border: '1px solid #ffd1df',
                          color: '#d64570',
                          borderRadius: '8px',
                          padding: '4px 8px',
                          fontSize: '11px',
                          cursor: 'pointer',
                          fontWeight: 'bold'
                        }}
                      >
                        🗑️ Delete
                      </button>

                    </div>

                  </div>
                </>
              )}

            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default Movies;