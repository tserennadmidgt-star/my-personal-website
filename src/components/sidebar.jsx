import React from 'react';

function Sidebar({ activeTab, setActiveTab, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'journal', label: 'Journal', icon: '📝' },
    { id: 'study', label: 'Study', icon: '📚' },
    { id: 'todo', label: 'To-do', icon: '✅' },
    { id: 'movies', label: 'Movies', icon: '🎬' },
    { id: 'books', label: 'Books', icon: '📖' },
    { id: 'habits', label: 'Habits', icon: '🌱' },
    { id: 'playlist', label: 'Playlist', icon: '🎵' },
    { id: 'ideas', label: 'Ideas', icon: '💡' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div
      style={{
        width: '220px',
        height: '100vh',
        background: '#ffffff',
        borderRight: '1px solid #ffe0ea',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
        padding: '20px 16px',
        boxSizing: 'border-box',
        position: 'sticky',
        top: 0,
        fontFamily: 'sans-serif',
      }}
    >
      {/* HEADER / LOGO */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px',
            paddingLeft: '8px',
          }}
        >
          <span style={{ fontSize: '22px' }}>🌸</span>
          <h1
            style={{
              margin: 0,
              fontSize: '20px',
              color: '#e85d88',
              fontWeight: 'bold',
            }}
          >
            MySpace
          </h1>
        </div>

        {/* NAVIGATION LINKS */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: 'none',
                  background: isActive ? '#ffe0ea' : 'transparent',
                  color: isActive ? '#e85d88' : '#555555',
                  fontWeight: isActive ? 'bold' : '500',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease-in-out',
                }}
              >
                <span style={{ fontSize: '16px' }}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* LOGOUT BUTTON */}
      <button
        type="button"
        onClick={onLogout}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '10px 14px',
          borderRadius: '12px',
          border: '1px solid #ffd1df',
          background: '#fff0f5',
          color: '#e85d88',
          fontWeight: 'bold',
          fontSize: '14px',
          cursor: 'pointer',
          transition: 'all 0.15s ease-in-out',
        }}
      >
        <span>🚪</span>
        <span>Logout</span>
      </button>
    </div>
  );
}

export default Sidebar;