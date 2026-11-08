import React, { useState, useEffect } from 'react';

function Dashboard({ userName, isDarkMode, plans, habits, books, entries, setActiveTab, showQuotes }) {
  // 1. Live Clock & Date State
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const todayKey = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  // 2. Daily Log History State
  const [dailyHistory, setDailyHistory] = useState(() => {
    const saved = localStorage.getItem('nadeau_daily_history');
    return saved ? JSON.parse(saved) : {};
  });

  // Өнөөдрийн мэдээлэл (goals нь массив/жагсаалт байна)
  const todayData = dailyHistory[todayKey] || { water: 0, mood: '', goals: [] };
  const [goalInput, setGoalInput] = useState('');

  // Түүхийг хадгалах туслах функц
  const updateTodayData = (updatedFields) => {
    const updatedToday = { ...todayData, ...updatedFields };
    const newHistory = { ...dailyHistory, [todayKey]: updatedToday };
    setDailyHistory(newHistory);
    localStorage.setItem('nadeau_daily_history', JSON.stringify(newHistory));
  };

  // Зорилго шинээр нэмэх
  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!goalInput.trim()) return;
    const newGoals = [...(todayData.goals || []), { id: Date.now(), text: goalInput.trim(), done: false }];
    updateTodayData({ goals: newGoals });
    setGoalInput('');
  };

  // Зорилго чеклэх / биелүүлсэн болгох
  const handleToggleGoal = (id) => {
    const newGoals = (todayData.goals || []).map(g => 
      g.id === id ? { ...g, done: !g.done } : g
    );
    updateTodayData({ goals: newGoals });
  };

  // Зорилго устгах
  const handleDeleteGoal = (id) => {
    const newGoals = (todayData.goals || []).filter(g => g.id !== id);
    updateTodayData({ goals: newGoals });
  };

  // Water click handler
  const handleWaterClick = (index) => {
    const newCount = index + 1 === todayData.water ? index : index + 1;
    updateTodayData({ water: newCount });
  };

  // Mood select handler
  const handleMoodSelect = (selectedMood) => {
    updateTodayData({ mood: selectedMood });
  };

  // Quotes List
  const quotes = [
    "Өнөөдрийн бяцхан хичээл зүтгэл маргаашийн том амжилтын эхлэл ✨",
    "Сайн дадал бол амжилтад хүрэх хамгийн дөт зам 🌿",
    "Өөртөө итгэ, чи бодсоноосоо илүүг хийж чадна 💪",
    "Тасралтгүй үргэлжлүүлэх нь төгс байхаас илүү чухал 🎯"
  ];
  const todayQuote = quotes[currentTime.getDate() % quotes.length];

  // Stats calculation
  const completedPlans = plans ? plans.filter((p) => p.completed).length : 0;
  const totalPlans = plans ? plans.length : 0;

  // History entries array
  const historyList = Object.keys(dailyHistory)
    .sort((a, b) => new Date(b) - new Date(a));

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header: Greeting & Clock */}
      <div style={{
        backgroundColor: isDarkMode ? '#2a2a3d' : '#ffffff',
        padding: '1.5rem 2rem',
        borderRadius: '20px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.8rem', color: isDarkMode ? '#fff' : '#222' }}>
            Сайн уу, {userName || 'User'}! 👋
          </h1>
          <p style={{ margin: '4px 0 0 0', color: isDarkMode ? '#aaa' : '#666', fontSize: '0.9rem' }}>
            Өнөөдрийг урам зоригтойгоор эхлүүлье! ✨
          </p>
        </div>

        {/* Live Clock */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: isDarkMode ? '#818cf8' : '#3b82f6' }}>
            {currentTime.toLocaleTimeString()}
          </div>
          <div style={{ fontSize: '0.85rem', color: isDarkMode ? '#aaa' : '#777' }}>
            {currentTime.toLocaleDateString('mn-MN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Quote Banner */}
      {showQuotes !== false && (
        <div style={{
          background: isDarkMode ? '#1e293b' : '#eff6ff',
          borderLeft: '5px solid #3b82f6',
          padding: '1rem 1.5rem',
          borderRadius: '12px',
          color: isDarkMode ? '#cbd5e1' : '#1e40af',
          fontSize: '0.95rem',
          fontStyle: 'italic'
        }}>
          💬 "{todayQuote}"
        </div>
      )}

      {/* Weather & Main Goals Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
        
        {/* Weather Card */}
        <a
          href="https://weather.com/weather/5day/l/Ulaanbaatar+Mongolia"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: 'none',
            background: isDarkMode ? '#2a2a3d' : '#ffffff',
            padding: '1.2rem 1.5rem',
            borderRadius: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            border: isDarkMode ? '1px solid #3f3f5a' : '1px solid #f0f0f0'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div>
            <span style={{ fontSize: '0.75rem', color: '#3b82f6', fontWeight: 'bold', textTransform: 'uppercase' }}>
              🌤️ Цаг агаар (Улаанбаатар)
            </span>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDarkMode ? '#fff' : '#222', marginTop: '4px' }}>
              +22°C нарлаг
            </div>
            <span style={{ fontSize: '0.75rem', color: '#888' }}>
              🔗 5 хоногийн цаг агаар харах
            </span>
          </div>
          <span style={{ fontSize: '2.5rem' }}>☀️</span>
        </a>

        {/* Goals Input & List Card */}
        <div style={{
          background: isDarkMode ? '#2a2a3d' : '#ffffff',
          padding: '1.2rem 1.5rem',
          borderRadius: '20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <span style={{ fontSize: '0.8rem', color: isDarkMode ? '#aaa' : '#666', fontWeight: 'bold' }}>
            🎯 Өнөөдрийн зорилгууд:
          </span>

          <form onSubmit={handleAddGoal} style={{ display: 'flex', gap: '6px' }}>
            <input
              type="text"
              placeholder="Шинэ зорилго бичих..."
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              style={{
                flex: 1,
                padding: '0.5rem 0.8rem',
                borderRadius: '8px',
                border: isDarkMode ? '1px solid #444' : '1px solid #ddd',
                background: isDarkMode ? '#1e1e2e' : '#fafafa',
                color: isDarkMode ? '#fff' : '#333',
                outline: 'none',
                fontSize: '0.85rem'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '0.5rem 1rem',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              + Нэмэх
            </button>
          </form>

          {/* Goal List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '100px', overflowY: 'auto' }}>
            {(todayData.goals || []).map((g) => (
              <div key={g.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span
                  onClick={() => handleToggleGoal(g.id)}
                  style={{
                    cursor: 'pointer',
                    textDecoration: g.done ? 'line-through' : 'none',
                    color: g.done ? '#888' : isDarkMode ? '#fff' : '#333'
                  }}
                >
                  {g.done ? '✅ ' : '📌 '} {g.text}
                </span>
                <span onClick={() => handleDeleteGoal(g.id)} style={{ cursor: 'pointer', color: '#ff4d4f', fontSize: '0.75rem', marginLeft: '6px' }}>✕</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
        <div onClick={() => setActiveTab('todo')} style={{ background: isDarkMode ? '#2a2a3d' : 'white', padding: '1.2rem', borderRadius: '16px', cursor: 'pointer', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '1.5rem' }}>✅</span>
          <h4 style={{ margin: '6px 0 2px 0', color: isDarkMode ? '#fff' : '#333' }}>{completedPlans}/{totalPlans}</h4>
          <span style={{ fontSize: '0.75rem', color: '#888' }}>Хийсэн төлөвлөгөө</span>
        </div>

        <div onClick={() => setActiveTab('habits')} style={{ background: isDarkMode ? '#2a2a3d' : 'white', padding: '1.2rem', borderRadius: '16px', cursor: 'pointer', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '1.5rem' }}>🌱</span>
          <h4 style={{ margin: '6px 0 2px 0', color: isDarkMode ? '#fff' : '#333' }}>{habits ? habits.length : 0}</h4>
          <span style={{ fontSize: '0.75rem', color: '#888' }}>Идэвхтэй дадал</span>
        </div>

        <div onClick={() => setActiveTab('books')} style={{ background: isDarkMode ? '#2a2a3d' : 'white', padding: '1.2rem', borderRadius: '16px', cursor: 'pointer', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '1.5rem' }}>📖</span>
          <h4 style={{ margin: '6px 0 2px 0', color: isDarkMode ? '#fff' : '#333' }}>{books ? books.length : 0}</h4>
          <span style={{ fontSize: '0.75rem', color: '#888' }}>Уншсан ном</span>
        </div>

        <div onClick={() => setActiveTab('journal')} style={{ background: isDarkMode ? '#2a2a3d' : 'white', padding: '1.2rem', borderRadius: '16px', cursor: 'pointer', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '1.5rem' }}>📝</span>
          <h4 style={{ margin: '6px 0 2px 0', color: isDarkMode ? '#fff' : '#333' }}>{entries ? entries.length : 0}</h4>
          <span style={{ fontSize: '0.75rem', color: '#888' }}>Бичсэн тэмдэглэл</span>
        </div>
      </div>

      {/* Mood & Water Tracker Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
        
        {/* Mood Tracker */}
        <div style={{ background: isDarkMode ? '#2a2a3d' : 'white', padding: '1.2rem 1.5rem', borderRadius: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
          <h4 style={{ margin: '0 0 0.8rem 0', color: isDarkMode ? '#fff' : '#333', fontSize: '0.95rem' }}>
            💭 Өнөөдөр сэтгэл санаа ямар байна?
          </h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.6rem' }}>
            {['😀', '😊', '😐', '😴', '😡'].map((emoji) => (
              <span
                key={emoji}
                onClick={() => handleMoodSelect(emoji)}
                style={{
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '12px',
                  background: todayData.mood === emoji ? (isDarkMode ? '#3b82f6' : '#e0e7ff') : 'transparent',
                  transform: todayData.mood === emoji ? 'scale(1.2)' : 'scale(1)',
                  transition: 'all 0.2s'
                }}
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>

        {/* Water Tracker */}
        <div style={{ background: isDarkMode ? '#2a2a3d' : 'white', padding: '1.2rem 1.5rem', borderRadius: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
            <h4 style={{ margin: 0, color: isDarkMode ? '#fff' : '#333', fontSize: '0.95rem' }}>
              💧 Ус уултын бүртгэл
            </h4>
            <span style={{ fontSize: '0.85rem', color: '#3b82f6', fontWeight: 'bold' }}>{todayData.water}/8 аяга</span>
          </div>
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'space-between' }}>
            {[...Array(8)].map((_, i) => (
              <span
                key={i}
                onClick={() => handleWaterClick(i)}
                style={{
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  opacity: i < todayData.water ? 1 : 0.25,
                  transition: 'opacity 0.2s'
                }}
              >
                🥛
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 📜 DAILY HISTORY LIST */}
      <div style={{
        background: isDarkMode ? '#2a2a3d' : 'white',
        padding: '1.5rem',
        borderRadius: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: isDarkMode ? '#fff' : '#333', fontSize: '1.1rem' }}>
          📊 Өдрийн бүртгэлийн түүх
        </h3>

        {historyList.length === 0 ? (
          <p style={{ color: '#888', fontSize: '0.9rem', margin: 0 }}>Одоогоор бүртгэл хийгдээгүй байна.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {historyList.map((date) => {
              const item = dailyHistory[date];
              const isToday = date === todayKey;
              const goalsArray = Array.isArray(item.goals) ? item.goals : (item.goal ? [{ id: 1, text: item.goal }] : []);

              return (
                <div
                  key={date}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    background: isDarkMode ? '#1e1e2e' : '#f8f9fa',
                    border: isToday ? '1px solid #3b82f6' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '0.85rem', color: isToday ? '#3b82f6' : isDarkMode ? '#ccc' : '#555' }}>
                        {date} {isToday && '(Өнөөдөр)'}
                      </span>
                      <span style={{ fontSize: '1.2rem' }}>{item.mood || '😶'}</span>
                    </div>

                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#3b82f6' }}>
                      💧 {item.water}/8
                    </span>
                  </div>

                  {/* Goal history for this date */}
                  <div style={{ fontSize: '0.8rem', color: isDarkMode ? '#aaa' : '#666', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    🎯 Зорилгууд: {goalsArray.length > 0 ? (
                      goalsArray.map(g => (
                        <span key={g.id} style={{ background: isDarkMode ? '#333' : '#e5e7eb', padding: '2px 6px', borderRadius: '4px' }}>
                          {g.text}
                        </span>
                      ))
                    ) : 'Бүртгэгдээгүй'}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}

export default Dashboard;