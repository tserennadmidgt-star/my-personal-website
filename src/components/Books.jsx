import React, { useState } from 'react';

function Books() {
  const [activeTab, setActiveTab] = useState('reading'); // 'reading' | 'finished' | 'quotes'

  const [books, setBooks] = useState([
    { id: 1, title: 'The Seven Husbands of Evelyn Hugo', author: 'Taylor Jenkins Reid', progress: 80, rating: 5, status: 'reading' },
    { id: 2, title: 'Atomic Habits', author: 'James Clear', progress: 100, rating: 5, status: 'finished' },
  ]);

  const [quotes, setQuotes] = useState([
    { id: 1, text: 'You do not rise to the level of your goals. You fall to the level of your systems.', book: 'Atomic Habits' },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newProgress, setNewProgress] = useState('0');

  const [quoteText, setQuoteText] = useState('');
  const [quoteBook, setQuoteBook] = useState('');

  const handleAddBook = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const prog = parseInt(newProgress) || 0;
    const newBook = {
      id: Date.now(),
      title: newTitle,
      author: newAuthor || 'Unknown',
      progress: prog,
      rating: 5,
      status: prog >= 100 ? 'finished' : 'reading',
    };

    setBooks([...books, newBook]);
    setNewTitle('');
    setNewAuthor('');
    setNewProgress('0');
  };
const handleDeleteBook = (id) => {
  setBooks((prev) => prev.filter((book) => book.id !== id));
};
  const handleAddQuote = (e) => {
    e.preventDefault();
    if (!quoteText.trim()) return;

    setQuotes([...quotes, { id: Date.now(), text: quoteText, book: quoteBook || 'General' }]);
    setQuoteText('');
    setQuoteBook('');
  };

  const finishedBooksCount = books.filter((b) => b.status === 'finished').length;

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', fontFamily: "'Segoe UI', Roboto, sans-serif", color: '#2d3748' }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#e85d88', fontSize: '26px' }}>📚 My Book Corner</h2>
          <p style={{ margin: '4px 0 0', color: '#718096', fontSize: '14px' }}>Уншиж буй номууд болон дуртай ишлэлүүд ✨</p>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #ffe0ea', padding: '10px 18px', borderRadius: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#78c850' }}>{finishedBooksCount} books 📚</div>
          <div style={{ fontSize: '11px', color: '#718096' }}>Finished reading</div>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {[
          { id: 'reading', label: '📖 Currently reading' },
          { id: 'finished', label: '✅ Finished' },
          { id: 'quotes', label: '💬 Favorite quotes' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 18px',
              borderRadius: '12px',
              border: activeTab === tab.id ? 'none' : '1px solid #ffe0ea',
              background: activeTab === tab.id ? '#ff8da1' : '#ffffff',
              color: activeTab === tab.id ? '#ffffff' : '#2d3748',
              fontWeight: 'bold',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* READING & FINISHED TABS */}
      {(activeTab === 'reading' || activeTab === 'finished') && (
        <>
          {/* ADD BOOK FORM */}
          <form onSubmit={handleAddBook} style={{ background: '#ffffff', padding: '18px', borderRadius: '18px', border: '1px solid #ffe0ea', marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Номын нэр..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              style={{ flex: 2, padding: '10px', border: '1px solid #ffd6e3', borderRadius: '10px', background: '#ffffff', color: '#2d3748', outline: 'none' }}
            />
            <input
              type="text"
              placeholder="Зохиолч..."
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              style={{ flex: 1, padding: '10px', border: '1px solid #ffd6e3', borderRadius: '10px', background: '#ffffff', color: '#2d3748', outline: 'none' }}
            />
            <input
              type="number"
              placeholder="Хувь %"
              value={newProgress}
              onChange={(e) => setNewProgress(e.target.value)}
              style={{ width: '80px', padding: '10px', border: '1px solid #ffd6e3', borderRadius: '10px', background: '#ffffff', color: '#2d3748', outline: 'none' }}
            />
            <button type="submit" style={{ background: '#5088c8', color: '#ffffff', border: 'none', padding: '0 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
              + Нэмэх
            </button>
          </form>

          {/* LIST */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {books.filter((b) => b.status === activeTab).map((book) => (
             <div
  key={book.id}
  style={{
    background: '#ffffff',
    padding: '18px',
    borderRadius: '16px',
    border: '1px solid #ffe0ea'
  }}
>
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '10px'
    }}
  >
    <div style={{ flex: 1 }}>
      <strong
        style={{
          display: 'block',
          fontSize: '15px',
          color: '#222',
          marginBottom: '4px'
        }}
      >
        {book.title}
      </strong>

      <span
        style={{
          fontSize: '12px',
          color: '#666'
        }}
      >
        {book.author}
      </span>
    </div>

    {/* DELETE */}
    <button
      onClick={() => handleDeleteBook(book.id)}
      title="Delete book"
      style={{
        width: '36px',
        height: '36px',
        border: '1px solid #ffd1df',
        borderRadius: '11px',
        background: '#fff0f5',
        cursor: 'pointer',
        fontSize: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: '0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#ffe0ea';
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#fff0f5';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      🗑️
    </button>
  </div>

  {/* PROGRESS */}
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}
  >
    <div
      style={{
        flex: 1,
        height: '8px',
        background: '#fff0f5',
        borderRadius: '10px',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          width: `${book.progress}%`,
          height: '100%',
          background: '#ff8da1',
          borderRadius: '10px'
        }}
      />
    </div>

    <span
      style={{
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#e85d88'
      }}
    >
      {book.progress}%
    </span>
  </div>
</div>
            ))}
          </div>
        </>
      )}

      {/* QUOTES TAB */}
      {activeTab === 'quotes' && (
        <>
          <form onSubmit={handleAddQuote} style={{ background: '#ffffff', padding: '18px', borderRadius: '18px', border: '1px solid #ffe0ea', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <textarea
              placeholder="Таалагдсан ишлэлээ бичээрэй..."
              value={quoteText}
              onChange={(e) => setQuoteText(e.target.value)}
              style={{ padding: '10px', border: '1px solid #ffd6e3', borderRadius: '10px', background: '#ffffff', color: '#2d3748', outline: 'none' }}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="Номын нэр..."
                value={quoteBook}
                onChange={(e) => setQuoteBook(e.target.value)}
                style={{ flex: 1, padding: '10px', border: '1px solid #ffd6e3', borderRadius: '10px', background: '#ffffff', color: '#2d3748', outline: 'none' }}
              />
              <button type="submit" style={{ background: '#ff8da1', color: '#ffffff', border: 'none', padding: '0 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
                + Ишлэл хадгалах 💗
              </button>
            </div>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {quotes.map((q) => (
              <div key={q.id} style={{ background: '#fff0f5', padding: '16px', borderRadius: '14px', border: '1px solid #ffd1df' }}>
                <p style={{ margin: '0 0 6px', fontSize: '14px', fontStyle: 'italic', color: '#2d3748' }}>"{q.text}"</p>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#e85d88', textAlign: 'right' }}>— {q.book}</div>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  );
}

export default Books;