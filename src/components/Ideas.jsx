import React, { useState } from 'react';

function Ideas({ ideas = [], setIdeas }) {
  const [ideaText, setIdeaText] = useState('');
  const [category, setCategory] = useState('🚀 Project');
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = [
    { id: 'All', label: '💡 All' },
    { id: '🚀 Project', label: '🚀 Project' },
    { id: '🎨 Creative', label: '🎨 Creative' },
    { id: '✨ Wishlist', label: '✨ Wishlist' },
    { id: '🎲 Random', label: '🎲 Random' }
  ];

  const categoryColors = {
    '🚀 Project': {
      bg: '#f0edff',
      text: '#6958b8'
    },
    '🎨 Creative': {
      bg: '#fff0f5',
      text: '#d65380'
    },
    '✨ Wishlist': {
      bg: '#fff8df',
      text: '#a77b16'
    },
    '🎲 Random': {
      bg: '#edf8f1',
      text: '#45825d'
    }
  };

  const handleAddIdea = (e) => {
    e.preventDefault();

    if (!ideaText.trim()) return;

    const newIdea = {
      id: Date.now(),
      text: ideaText.trim(),
      category,
      date: new Date().toISOString().split('T')[0],
      favorite: false
    };

    setIdeas((prev) => [newIdea, ...prev]);
    setIdeaText('');
  };

  const deleteIdea = (id) => {
    setIdeas((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleFavorite = (id) => {
    setIdeas((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, favorite: !item.favorite }
          : item
      )
    );
  };

  const filteredIdeas =
    activeFilter === 'All'
      ? ideas
      : ideas.filter((item) => item.category === activeFilter);

  return (
    <div
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '10px 20px 50px',
        color: '#222',
        fontFamily: 'sans-serif'
      }}
    >

      {/* HEADER */}

      <div
        style={{
          marginBottom: '25px'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '15px',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '27px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
            }}
          >
            💡
          </div>

          <div>
            <h1
              style={{
                margin: 0,
                fontSize: '32px',
                color: '#222',
                fontWeight: '800'
              }}
            >
              Ideas & Thoughts
            </h1>

            <p
              style={{
                margin: '5px 0 0',
                color: '#777',
                fontSize: '15px'
              }}
            >
              Keep your little ideas safe ♡
            </p>
          </div>
        </div>
      </div>


      {/* ADD IDEA */}

      <div
        style={{
          background: '#fff',
          borderRadius: '24px',
          padding: '22px',
          marginBottom: '20px',
          border: '1px solid #f0dfe5',
          boxShadow: '0 7px 22px rgba(70,40,55,0.06)'
        }}
      >

        <form onSubmit={handleAddIdea}>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center'
            }}
          >

            <input
              type="text"
              placeholder="What's on your mind?"
              value={ideaText}
              onChange={(e) => setIdeaText(e.target.value)}
              style={{
                flex: 1,
                minWidth: 0,
                padding: '15px 17px',
                borderRadius: '15px',
                border: '1px solid #ead8df',
                background: '#fffafb',
                color: '#222',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />

            <button
              type="submit"
              style={{
                border: 'none',
                borderRadius: '15px',
                padding: '14px 20px',
                background: '#e56c91',
                color: '#fff',
                fontWeight: '700',
                fontSize: '14px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: '0 5px 14px rgba(229,108,145,0.22)'
              }}
            >
              + Add ✨
            </button>

          </div>


          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginTop: '14px'
            }}
          >

            <span
              style={{
                color: '#555',
                fontSize: '13px',
                fontWeight: '700'
              }}
            >
              Category
            </span>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                padding: '9px 13px',
                borderRadius: '12px',
                border: '1px solid #ead8df',
                background: '#fff',
                color: '#222',
                fontWeight: '600',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="🚀 Project">🚀 Project</option>
              <option value="🎨 Creative">🎨 Creative</option>
              <option value="✨ Wishlist">✨ Wishlist</option>
              <option value="🎲 Random">🎲 Random</option>
            </select>

          </div>

        </form>
      </div>


      {/* FILTERS */}

      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '22px',
          overflowX: 'auto',
          padding: '2px 2px 8px',
          scrollbarWidth: 'none'
        }}
      >

        {categories.map((cat) => {

          const active = activeFilter === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              style={{
                border: active
                  ? '1px solid #e56c91'
                  : '1px solid #eee0e5',
                background: active ? '#e56c91' : '#fff',
                color: active ? '#fff' : '#444',
                padding: '10px 16px',
                borderRadius: '20px',
                fontWeight: '700',
                fontSize: '13px',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {cat.label}
            </button>
          );
        })}

      </div>


      {/* SECTION TITLE */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px'
        }}
      >

        <h2
          style={{
            margin: 0,
            fontSize: '20px',
            color: '#222'
          }}
        >
          ✨ My ideas
        </h2>

        <span
          style={{
            color: '#777',
            fontSize: '13px'
          }}
        >
          {filteredIdeas.length} ideas
        </span>

      </div>


      {/* IDEAS */}

      {filteredIdeas.length === 0 ? (

        <div
          style={{
            background: '#fff',
            borderRadius: '22px',
            padding: '45px 20px',
            textAlign: 'center',
            border: '1px dashed #e5c4cf'
          }}
        >

          <div
            style={{
              fontSize: '38px',
              marginBottom: '8px'
            }}
          >
            💭
          </div>

          <h3
            style={{
              margin: '0 0 6px',
              color: '#333',
              fontSize: '17px'
            }}
          >
            No ideas yet
          </h3>

          <p
            style={{
              margin: 0,
              color: '#888',
              fontSize: '14px'
            }}
          >
            Write down that little idea before you forget ♡
          </p>

        </div>

      ) : (

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >

          {filteredIdeas.map((item) => {

            const colors =
              categoryColors[item.category] ||
              {
                bg: '#f5f5f5',
                text: '#555'
              };

            return (

              <div
                key={item.id}
                style={{
                  background: '#fff',
                  borderRadius: '18px',
                  padding: '16px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  border: '1px solid #f0dfe5',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.04)'
                }}
              >

                {/* CATEGORY ICON */}

                <div
                  style={{
                    width: '45px',
                    height: '45px',
                    minWidth: '45px',
                    borderRadius: '13px',
                    background: colors.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '21px'
                  }}
                >
                  {item.category.split(' ')[0]}
                </div>


                {/* TEXT */}

                <div
                  style={{
                    flex: 1,
                    minWidth: 0
                  }}
                >

                  <div
                    style={{
                      color: '#222',
                      fontSize: '15px',
                      fontWeight: '700',
                      marginBottom: '6px',
                      wordBreak: 'break-word'
                    }}
                  >
                    {item.text}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '9px',
                      flexWrap: 'wrap'
                    }}
                  >

                    <span
                      style={{
                        background: colors.bg,
                        color: colors.text,
                        padding: '4px 8px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: '700'
                      }}
                    >
                      {item.category}
                    </span>

                    <span
                      style={{
                        color: '#999',
                        fontSize: '11px'
                      }}
                    >
                      {item.date}
                    </span>

                  </div>

                </div>


                {/* FAVORITE */}

                <button
                  onClick={() => toggleFavorite(item.id)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: '21px',
                    color: item.favorite
                      ? '#e56c91'
                      : '#bbb',
                    padding: '4px'
                  }}
                >
                  {item.favorite ? '♥' : '♡'}
                </button>


                {/* DELETE */}

                <button
                  onClick={() => deleteIdea(item.id)}
                  style={{
                    border: 'none',
                    background: '#fff5f7',
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  🗑️
                </button>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default Ideas; 