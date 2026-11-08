import React, { useState } from 'react';

function Settings({
  userName,
  setUserName,
  userPassword,
  setUserPassword,
  isDarkMode,
  setIsDarkMode,
  showQuotes,
  setShowQuotes,
}) {
  const [nameInput, setNameInput] = useState(userName);
  const [passInput, setPassInput] = useState(userPassword);
  const [savedMsg, setSavedMsg] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setUserName(nameInput);
    setUserPassword(passInput);

    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  };

  return (
    <div style={{ maxWidth: '650px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      
      {/* HEADER */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: 0, color: '#e85d88', fontSize: '26px' }}>⚙️ Settings</h2>
        <p style={{ margin: '4px 0 0', color: '#888', fontSize: '14px' }}>Хувийн тохиргоо болон нууцлал ✨</p>
      </div>

      {/* ALERT MESSAGE */}
      {savedMsg && (
        <div style={{ background: '#e6fffa', border: '1px solid #b2f5ea', color: '#234e52', padding: '12px 16px', borderRadius: '12px', marginBottom: '20px', fontWeight: 'bold', fontSize: '14px', textAlign: 'center' }}>
          ✅ Амжилттай хадгалагдлаа!
        </div>
      )}

      {/* PROFILE & SECURITY FORM */}
      <form onSubmit={handleSave} style={{ background: '#ffffff', padding: '24px', borderRadius: '18px', border: '1px solid #ffe0ea', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '25px', boxShadow: '0 4px 12px rgba(232, 93, 136, 0.08)' }}>
        <h3 style={{ margin: 0, color: '#e85d88', fontSize: '17px', borderBottom: '1px solid #ffe0ea', paddingBottom: '10px' }}>
          👤 Нэвтрэх ба Профайл
        </h3>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#555' }}>
            Хэрэглэгчийн нэр
          </label>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            style={{ width: '100%', padding: '12px', border: '1px solid #ffd6e3', borderRadius: '10px', background: '#fff8fa', color: '#333', outline: 'none', boxSizing: 'border-box', fontSize: '14px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#555' }}>
            Нууц үг
          </label>
          <input
            type="text"
            value={passInput}
            onChange={(e) => setPassInput(e.target.value)}
            style={{ width: '100%', padding: '12px', border: '1px solid #ffd6e3', borderRadius: '10px', background: '#fff8fa', color: '#333', outline: 'none', boxSizing: 'border-box', fontSize: '14px' }}
          />
        </div>

        <button type="submit" style={{ background: '#ff8da1', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', marginTop: '8px' }}>
          💾 Мэдээлэл хадгалах
        </button>
      </form>

      {/* APPEARANCE & PREFERENCES */}
      <div style={{ background: '#ffffff', padding: '24px', borderRadius: '18px', border: '1px solid #ffe0ea', display: 'flex', flexDirection: 'column', gap: '18px', boxShadow: '0 4px 12px rgba(232, 93, 136, 0.08)' }}>
        <h3 style={{ margin: 0, color: '#e85d88', fontSize: '17px', borderBottom: '1px solid #ffe0ea', paddingBottom: '10px' }}>
          🎨 Тохиргоо 
        </h3>

        {/* DARK MODE TOGGLE */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '15px', color: '#333' }}>🌙 Dark Mode</h4>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#888' }}>Дэлгэцийг харанхуй горимд шилжүүлэх</p>
          </div>
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              background: isDarkMode ? '#e85d88' : '#e2e8f0',
              color: isDarkMode ? '#fff' : '#555',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '20px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '13px',
              transition: 'all 0.2s ease',
            }}
          >
            {isDarkMode ? 'Идэвхтэй ✨' : 'Идэвхгүй ⚪'}
          </button>
        </div>

        {/* SHOW QUOTES TOGGLE */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '15px', color: '#333' }}>💬 Онч үгс харуулах</h4>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#888' }}>Dashboard дээр урам зоригийн ишлэл харуулах</p>
          </div>
          <button
            type="button"
            onClick={() => setShowQuotes(!showQuotes)}
            style={{
              background: showQuotes ? '#ff8da1' : '#e2e8f0',
              color: showQuotes ? '#fff' : '#555',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '20px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '13px',
              transition: 'all 0.2s ease',
            }}
          >
            {showQuotes ? 'Нээлттэй 🌸' : 'Хаалттай ⚪'}
          </button>
        </div>
      </div>

    </div>
  );
}

export default Settings;