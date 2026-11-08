import React, { useState } from 'react';

function Journal() {
  const moods = [
    { label: 'Happy', emoji: '😊' },
    { label: 'Loved', emoji: '🥰' },
    { label: 'Calm', emoji: '😌' },
    { label: 'Sad', emoji: '🥲' },
    { label: 'Angry', emoji: '😤' },
    { label: 'Tired', emoji: '😴' },
  ];

  const [selectedMood, setSelectedMood] = useState('Happy');
  const [entryText, setEntryText] = useState('');
  
  const [journals, setJournals] = useState([
    {
      id: 1,
      date: 'Aug 11, 2026',
      mood: '🥰 Loved',
      content: 'Today was an amazing productive day! Solved React CSS issues and had nice coffee.',
    },
    {
      id: 2,
      date: 'Aug 10, 2026',
      mood: '😌 Calm',
      content: 'I was thinking about my future goals and reading a peaceful book.',
    },
  ]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!entryText.trim()) return;

    const currentMoodObj = moods.find((m) => m.label === selectedMood);
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      mood: `${currentMoodObj.emoji} ${currentMoodObj.label}`,
      content: entryText,
    };

    setJournals([newEntry, ...journals]);
    setEntryText('');
  };

  return (
    <div style={{ maxWidth: '750px', margin: '0 auto', fontFamily: 'sans-serif', color: '#2d3748' }}>
      
      {/* HEADER */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#e85d88', fontSize: '26px' }}>📝 Dear Diary...</h2>
        <p style={{ margin: '4px 0 0', color: '#718096', fontSize: '14px' }}>Өдрийн бодол болон мэдрэмжээ үлдээгээрэй ✨</p>
      </div>

      {/* NEW JOURNAL ENTRY FORM */}
      <form onSubmit={handleSave} style={{ background: '#ffffff', padding: '24px', borderRadius: '22px', border: '1px solid #ffe0ea', marginBottom: '30px', boxShadow: '0 4px 14px rgba(232, 93, 136, 0.06)' }}>
        
        {/* MOOD SELECTOR */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4a5568', marginBottom: '8px' }}>
            Mood 🌷
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {moods.map((m) => {
              const isSelected = selectedMood === m.label;
              return (
                <button
                  key={m.label}
                  type="button"
                  onClick={() => setSelectedMood(m.label)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '20px',
                    border: isSelected ? '1px solid #ff8da1' : '1px solid #edf2f7',
                    background: isSelected ? '#ffe0ea' : '#f7fafc',
                    color: isSelected ? '#e85d88' : '#2d3748',
                    fontWeight: isSelected ? 'bold' : 'normal',
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  <span>{m.emoji}</span>
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TEXTAREA (ӨНГИЙГ ТОД БОЛГОЖ ЗАСАВ) */}
        <textarea
          rows={5}
          placeholder="Today I feel..."
          value={entryText}
          onChange={(e) => setEntryText(e.target.value)}
          style={{
            width: '100%',
            padding: '14px',
            border: '1px solid #ffd6e3',
            borderRadius: '14px',
            background: '#ffffff',
            color: '#2d3748', // ТЕКСТ ТОД ХАРАГДАХ ӨНГӨ
            outline: 'none',
            fontSize: '14px',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
            resize: 'vertical',
            marginBottom: '14px',
          }}
        />

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
            boxShadow: '0 2px 8px rgba(255, 141, 161, 0.3)',
          }}
        >
          Save entry 💗
        </button>
      </form>

      {/* JOURNAL HISTORY */}
      <h3 style={{ margin: '0 0 16px', color: '#2d3748', fontSize: '18px' }}>🌸 Past Entries</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {journals.map((item) => (
          <div key={item.id} style={{ background: '#ffffff', padding: '18px 22px', borderRadius: '18px', border: '1px solid #ffe0ea', boxShadow: '0 2px 8px rgba(232, 93, 136, 0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#e85d88' }}>
                {item.date}
              </span>
              <span style={{ fontSize: '12px', background: '#fff0f5', border: '1px solid #ffd1df', padding: '3px 10px', borderRadius: '12px', color: '#2d3748' }}>
                {item.mood}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: '#2d3748', lineHeight: '1.5' }}>
              {item.content}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Journal;