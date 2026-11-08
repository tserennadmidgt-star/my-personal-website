import React from 'react';

function Login({ password, setPassword, handleLogin }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 50%, #f48fb1 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99999,
        fontFamily: 'sans-serif'
      }}
    >
      <div
        style={{
          background: '#ffffff',
          padding: '2.2rem 2rem',
          borderRadius: '24px',
          boxShadow: '0 10px 25px rgba(240, 98, 146, 0.25)',
          width: '90%',
          maxWidth: '360px',
          textAlign: 'center',
          boxSizing: 'border-box'
        }}
      >
        {/* Цэцэг ба Лого - Зайг зассан хэсэг */}
        <div style={{ fontSize: '2.5rem', lineHeight: '1', marginBottom: '0.3rem' }}>
          🌸
        </div>
        <h1
          style={{
            margin: '0 0 0.4rem 0',
            color: '#f06292',
            fontSize: '1.75rem',
            fontWeight: 'bold',
            letterSpacing: '0.5px'
          }}
        >
          MySpace
        </h1>
        <p
          style={{
            margin: '0 0 1.6rem 0',
            color: '#888',
            fontSize: '0.88rem',
            lineHeight: '1.4'
          }}
        >
          Өдрийн мэнд! Нууц үгээ оруулан нэвтрээрэй ✨
        </p>

        {/* Нэвтрэх форм */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ textAlign: 'left' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.85rem',
                color: '#f06292',
                fontWeight: 'bold',
                marginBottom: '0.4rem'
              }}
            >
              🔒 Нууц үг
            </label>
            <input
              type="password"
              placeholder="••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                borderRadius: '12px',
                border: '2px solid #f8bbd0',
                outline: 'none',
                fontSize: '1rem',
                boxSizing: 'border-box',
                background: '#fff5f8',
                color: '#333'
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.85rem',
              marginTop: '0.3rem',
              background: '#f06292',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(240, 98, 146, 0.4)'
            }}
          >
            Нэвтрэх 💖
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;