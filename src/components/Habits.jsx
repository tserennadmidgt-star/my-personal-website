import React, { useState, useEffect } from 'react';

function Habits() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  // Өнөөдрийн гарагийг олох (0: Ням, 1: Даваа, ..., 6: Бямба)
  // Манай хүснэгтийн M(0), T(1), W(2), T(3), F(4), S(5), S(6) систем рүү хөрвүүлнэ:
  const getTodayIndex = () => {
    const day = new Date().getDay();
    return day === 0 ? 6 : day - 1; // Ням гарагийг 6 (сүүлчийн S), бусад гарагийг 0-5 болгоно
  };

  const [todayIndex, setTodayIndex] = useState(getTodayIndex());

  useEffect(() => {
    setTodayIndex(getTodayIndex());
  }, []);

  // Одоогийн 7 хоногийн зуршлууд
  const [habits, setHabits] = useState([
    { id: 1, name: 'Water 💧', checked: [true, true, true, false, false, false, false] },
    { id: 2, name: 'Reading 📚', checked: [true, true, false, false, false, false, false] },
    { id: 3, name: 'Workout 🏋️‍♀️', checked: [true, false, true, false, false, false, false] },
    { id: 4, name: 'Sleep 8h 💤', checked: [true, true, true, false, false, false, false] },
  ]);

  // Хадгалсан 7 хоногуудын түүх
  const [savedWeeks, setSavedWeeks] = useState([
    {
      id: 1,
      weekLabel: '2026.08.03 - 2026.08.09 (Өмнөх 7 хоног)',
      savedHabits: [
        { name: 'Water 💧', completedCount: 6 },
        { name: 'Reading 📚', completedCount: 5 },
        { name: 'Workout 🏋️‍♀️', completedCount: 4 },
        { name: 'Sleep 8h 💤', completedCount: 7 },
      ],
    },
  ]);

  const [newHabitName, setNewHabitName] = useState('');
  const [selectedHistory, setSelectedHistory] = useState(null);

  // ЗӨВХӨН ӨНӨӨДРИЙН ГАРАГ ДЭЭР ЧЕК ХИЙХ
  const toggleCheck = (habitId, dayIndex) => {
    if (dayIndex !== todayIndex) {
      alert('⚠️ Зөвхөн өнөөдрийн гарагийн зуршлыг тэмдэглэх боломжтой!');
      return;
    }

    setHabits(
      habits.map((h) => {
        if (h.id === habitId) {
          const updated = [...h.checked];
          updated[dayIndex] = !updated[dayIndex];
          return { ...h, checked: updated };
        }
        return h;
      })
    );
  };

  // Шинэ зуршил нэмэх
  const handleAddHabit = (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;

    setHabits([
      ...habits,
      { id: Date.now(), name: newHabitName, checked: Array(7).fill(false) },
    ]);
    setNewHabitName('');
  };

  // 7 хоногийг хадгалах
  const handleSaveWeek = () => {
    const today = new Date();
    const dateStr = today.toLocaleDateString('mn-MN', { month: '2-digit', day: '2-digit' });
    
    const weekData = {
      id: Date.now(),
      weekLabel: `7 хоногийн тайлан (${dateStr})`,
      savedHabits: habits.map((h) => ({
        name: h.name,
        completedCount: h.checked.filter(Boolean).length,
      })),
    };

    setSavedWeeks([weekData, ...savedWeeks]);

    // Хүснэгтийг цэвэрлэх
    setHabits(
      habits.map((h) => ({ ...h, checked: Array(7).fill(false) }))
    );

    alert('Энэ 7 хоногийн амжилт амжилттай хадгалагдлаа! 🌸');
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif", color: '#2d3748' }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#e85d88', fontSize: '26px', fontFamily: 'inherit' }}>🌱 My Habits Tracker</h2>
          <p style={{ margin: '4px 0 0', color: '#718096', fontSize: '14px', fontFamily: 'inherit' }}>
            Зөвхөн өнөөдрийн гарагийн чекээ хийж, 7 хоногоор хадгалаарай ✨
          </p>
        </div>

        <button
          onClick={handleSaveWeek}
          style={{
            background: '#ff8da1',
            color: '#ffffff',
            border: 'none',
            padding: '12px 18px',
            borderRadius: '14px',
            fontWeight: 'bold',
            fontSize: '13px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(255, 141, 161, 0.3)',
            fontFamily: 'inherit',
          }}
        >
          💾 Энэ 7 хоногийг хадгалах
        </button>
      </div>

      {/* CURRENT WEEK TRACKER TABLE */}
      <div style={{ background: '#ffffff', padding: '24px', borderRadius: '22px', border: '1px solid #ffe0ea', boxShadow: '0 4px 14px rgba(232, 93, 136, 0.06)', marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 16px', color: '#2d3748', fontSize: '16px', fontFamily: 'inherit' }}>🗓️ Одоогийн 7 хоног</h3>

        {/* TABLE HEADER */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr repeat(7, 1fr)', gap: '8px', marginBottom: '14px', textAlign: 'center' }}>
          <div style={{ textAlign: 'left', fontWeight: 'bold', color: '#4a5568', fontSize: '13px', paddingLeft: '8px', fontFamily: 'inherit' }}>Habit</div>
          {days.map((day, idx) => {
            const isToday = idx === todayIndex;
            return (
              <div
                key={idx}
                style={{
                  fontWeight: 'bold',
                  color: isToday ? '#ffffff' : '#e85d88',
                  background: isToday ? '#e85d88' : '#fff0f5',
                  padding: '6px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontFamily: 'inherit',
                }}
              >
                {day} {isToday ? '•' : ''}
              </div>
            );
          })}
        </div>

        {/* HABIT ROWS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {habits.map((habit) => (
            <div key={habit.id} style={{ display: 'grid', gridTemplateColumns: '2fr repeat(7, 1fr)', gap: '8px', alignItems: 'center', padding: '10px 8px', borderRadius: '14px', background: '#fff8fa', border: '1px solid #ffe0ea' }}>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#2d3748', fontFamily: 'inherit' }}>{habit.name}</span>
              {habit.checked.map((isChecked, dayIndex) => {
                const isToday = dayIndex === todayIndex;

                return (
                  <button
                    key={dayIndex}
                    type="button"
                    onClick={() => toggleCheck(habit.id, dayIndex)}
                    style={{
                      width: '32px',
                      height: '32px',
                      margin: '0 auto',
                      borderRadius: '10px',
                      border: isChecked ? 'none' : isToday ? '1px solid #ff8da1' : '1px dashed #cbd5e0',
                      background: isChecked ? '#c87450' : isToday ? '#ffffff' : '#f7fafc',
                      color: '#ffffff',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      cursor: isToday ? 'pointer' : 'not-allowed',
                      opacity: isToday ? 1 : 0.5, // Өнөөдөр биш гарагуудыг бүдэг харагдуулна
                      fontFamily: 'inherit',
                    }}
                  >
                    {isChecked ? '✓' : ''}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* INPUT FORM */}
        <form onSubmit={handleAddHabit} style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <input
            type="text"
            placeholder="Шинэ зуршил нэмэх..."
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            style={{
              flex: 1,
              padding: '12px',
              border: '1px solid #ffd6e3',
              borderRadius: '12px',
              outline: 'none',
              background: '#ffffff',
              color: '#2d3748', // ТОД ХАР-СААРАЛ ӨНГӨ
              fontSize: '14px',
              fontFamily: 'inherit',
            }}
          />
          <button type="submit" style={{ background: '#c88050', color: '#ffffff', border: 'none', padding: '0 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'inherit' }}>
            + Нэмэх
          </button>
        </form>
      </div>

      {/* SAVED WEEKS HISTORY */}
      <div style={{ background: '#ffffff', padding: '24px', borderRadius: '22px', border: '1px solid #ffe0ea' }}>
        <h3 style={{ margin: '0 0 14px', color: '#2d3748', fontSize: '16px', fontFamily: 'inherit' }}>📁 Хадгалсан 7 хоногуудын түүх</h3>
        
        {savedWeeks.length === 0 ? (
          <p style={{ color: '#718096', fontSize: '13px', fontFamily: 'inherit' }}>Одоогоор хадгалсан 7 хоног байхгүй байна.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {savedWeeks.map((week) => (
              <div key={week.id} style={{ background: '#fff0f5', border: '1px solid #ffd1df', borderRadius: '14px', padding: '14px 18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: '#e85d88', fontSize: '14px', fontFamily: 'inherit' }}>{week.weekLabel}</strong>
                  <button
                    onClick={() => setSelectedHistory(selectedHistory === week.id ? null : week.id)}
                    style={{ background: '#ffffff', border: '1px solid #ffd1df', padding: '4px 12px', borderRadius: '8px', fontSize: '12px', color: '#e85d88', cursor: 'pointer', fontWeight: 'bold', fontFamily: 'inherit' }}
                  >
                    {selectedHistory === week.id ? 'Нуух 🔼' : 'Дэлгэрэнгүй харах 🔽'}
                  </button>
                </div>

                {selectedHistory === week.id && (
                  <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px dashed #ffd1df', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
                    {week.savedHabits.map((item, i) => (
                      <div key={i} style={{ background: '#ffffff', padding: '8px 12px', borderRadius: '10px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', color: '#2d3748', fontFamily: 'inherit' }}>
                        <span>{item.name}</span>
                        <strong style={{ color: '#78c850' }}>{item.completedCount}/7 өдөр</strong>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default Habits;