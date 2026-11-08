import React, { useState, useEffect } from 'react';

const inputStyle = {
  width: '100%',
  padding: '0.7rem 1rem',
  borderRadius: '12px',
  border: '1px solid #edf2f7',
  outline: 'none',
  fontSize: '0.9rem',
  boxSizing: 'border-box',
  background: '#ffffff',
  color: '#2d3748',
  caretColor: '#2d3748'
};

const DAYS = [
  { id: 'mon', label: 'Даваа' },
  { id: 'tue', label: 'Мягмар' },
  { id: 'wed', label: 'Лхагва' },
  { id: 'thu', label: 'Пүрэв' },
  { id: 'fri', label: 'Баасан' },
];

const PERIODS = [
  { num: 1, time: '08:00 - 09:30' },
  { num: 2, time: '09:40 - 11:10' },
  { num: 3, time: '11:20 - 12:50' },
  { num: 4, time: '13:20 - 14:50' },
  { num: 5, time: '15:00 - 16:30' },
  { num: 6, time: '16:40 - 18:10' },
];

export default function Study() {
  const [activeTab, setActiveTab] = useState('schedule');

  // 1. ХИЧЭЭЛИЙН ХУВААРЬ
  const [schedule, setSchedule] = useState(() => {
    try {
      const saved = localStorage.getItem('myspace_study_schedule');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [editingCell, setEditingCell] = useState(null);
  const [subjectInput, setSubjectInput] = useState('');
  const [roomInput, setRoomInput] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('myspace_study_schedule', JSON.stringify(schedule));
    } catch (e) {}
  }, [schedule]);

  const handleCellClick = (dayId, periodNum) => {
    const key = `${dayId}_${periodNum}`;
    const currentData = schedule[key] || { subject: '', room: '' };

    setEditingCell({ day: dayId, period: periodNum, key });
    setSubjectInput(currentData.subject || '');
    setRoomInput(currentData.room || '');
  };

  const handleSaveCell = (e) => {
    e.preventDefault();
    if (!editingCell) return;

    setSchedule((prev) => ({
      ...prev,
      [editingCell.key]: {
        subject: subjectInput.trim(),
        room: roomInput.trim(),
      },
    }));

    setEditingCell(null);
  };

  const handleClearCell = () => {
    if (!editingCell) return;
    setSchedule((prev) => {
      const updated = { ...prev };
      delete updated[editingCell.key];
      return updated;
    });
    setEditingCell(null);
  };

  // 2. ШАЛГАЛТЫН ХУВААРЬ
  const [exams, setExams] = useState(() => {
    try {
      const saved = localStorage.getItem('myspace_exams');
      return saved
        ? JSON.parse(saved)
        : [{ id: 1, subject: 'Математик', date: '2026-08-20', note: 'Томьёонуудаа давтах' }];
    } catch (e) {
      return [];
    }
  });

  const [examSubject, setExamSubject] = useState('');
  const [examDate, setExamDate] = useState('');
  const [selectedExam, setSelectedExam] = useState(null);

  // 3. БИЕ ДААЛТ & ДААЛГАВАР (ASSIGNMENTS)
  const [assignments, setAssignments] = useState(() => {
    try {
      const saved = localStorage.getItem('myspace_assignments');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('myspace_exams', JSON.stringify(exams));
    } catch (e) {}
  }, [exams]);

  useEffect(() => {
    try {
      localStorage.setItem('myspace_assignments', JSON.stringify(assignments));
    } catch (e) {}
  }, [assignments]);

  const handleAddExam = (e) => {
    e.preventDefault();
    if (!examSubject.trim() || !examDate) return;

    const newExam = {
      id: Date.now(),
      subject: examSubject.trim(),
      date: examDate,
      note: '',
    };

    setExams((prev) => [...prev, newExam]);
    setExamSubject('');
    setExamDate('');
  };

  const handleDeleteExam = (e, id) => {
    e.stopPropagation();
    setExams((prev) => prev.filter((ex) => ex.id !== id));
    if (selectedExam && selectedExam.id === id) setSelectedExam(null);
  };

  const handleUpdateNote = (id, noteText) => {
    setExams((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, note: noteText } : ex))
    );
    if (selectedExam && selectedExam.id === id) {
      setSelectedExam((prev) => ({ ...prev, note: noteText }));
    }
  };

  // Бие даалт нэмэх
  const handleAddAssignment = (e) => {
    e.preventDefault();
    if (!taskTitle.trim() || !taskDueDate) return;

    const newTask = {
      id: Date.now(),
      title: taskTitle.trim(),
      dueDate: taskDueDate,
      completed: false,
    };

    setAssignments((prev) => [...prev, newTask]);
    setTaskTitle('');
    setTaskDueDate('');
  };

  // Бие даалт чеклэх
  const handleToggleAssignment = (id) => {
    setAssignments((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Бие даалт устгах
  const handleDeleteAssignment = (id) => {
    setAssignments((prev) => prev.filter((task) => task.id !== id));
  };

  const getDDay = (targetDateStr) => {
    if (!targetDateStr) return '';
    const [year, month, day] = targetDateStr.split('-').map(Number);
    const target = new Date(year, month - 1, day);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = target - today;
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'D-Day (Өнөөдөр)';
    if (diffDays > 0) return `D-${diffDays}`;
    return `Дууссан (${Math.abs(diffDays)} өдрийн өмнө)`;
  };

  // 4. ПОМОДОРО ТАЙМЕР
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsRunning(false);

            if (!isBreak) {
              alert('🎉 Цаг дууслаа! 5 минут амраарай.');
              setIsBreak(true);
              return 5 * 60;
            } else {
              alert('🔔 Амралт дууслаа! Хичээлдээ орцгооё.');
              setIsBreak(false);
              return 25 * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, isBreak]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div
      style={{
        padding: '1rem',
        width: '100%',
        boxSizing: 'border-box',
        fontFamily: 'sans-serif',
        maxWidth: '900px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <h1
          style={{
            fontSize: '1.8rem',
            color: '#2d3748',
            margin: 0,
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          📚 Study Space
        </h1>
        <p style={{ color: '#a0aec0', fontSize: '0.9rem', marginTop: '4px' }}>
          Хичээлийн хуваарь, бие даалт болон фокус таймераа нэг дороос удирдаарай.
        </p>
      </div>

      {/* 🔘 3 ДЭЭД ЦЭС */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('schedule')}
          style={{
            padding: '0.7rem 1.4rem',
            borderRadius: '14px',
            border: 'none',
            background: activeTab === 'schedule' ? '#62c462' : '#ffffff',
            color: activeTab === 'schedule' ? 'white' : '#718096',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
            transition: 'all 0.2s',
          }}
        >
          📅 Хичээлийн хуваарь
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('exam')}
          style={{
            padding: '0.7rem 1.4rem',
            borderRadius: '14px',
            border: 'none',
            background: activeTab === 'exam' ? '#3b82f6' : '#ffffff',
            color: activeTab === 'exam' ? 'white' : '#718096',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
            transition: 'all 0.2s',
          }}
        >
          📝 Шалгалт & Даалгавар
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('pomodoro')}
          style={{
            padding: '0.7rem 1.4rem',
            borderRadius: '14px',
            border: 'none',
            background: activeTab === 'pomodoro' ? '#ec4899' : '#ffffff',
            color: activeTab === 'pomodoro' ? 'white' : '#718096',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
            transition: 'all 0.2s',
          }}
        >
          ⏳ Помодоро таймер
        </button>
      </div>

      {/* ЦЭС 1: ХИЧЭЭЛИЙН ХУВААРЬ */}
      {activeTab === 'schedule' && (
        <div
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            padding: '1rem',
            overflowX: 'auto',
            maxWidth: '100%',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'separate',
              borderSpacing: '6px',
              tableLayout: 'fixed',
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: '8px',
                    background: '#f7fafc',
                    borderRadius: '12px',
                    color: '#718096',
                    fontSize: '0.8rem',
                    width: '15%',
                  }}
                >
                  ⏰ Цаг
                </th>
                {DAYS.map((day) => (
                  <th
                    key={day.id}
                    style={{
                      padding: '8px',
                      background: '#f0fdf4',
                      color: '#16a34a',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      width: '17%',
                    }}
                  >
                    {day.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PERIODS.map((period) => (
                <tr key={period.num}>
                  <td
                    style={{
                      padding: '6px',
                      background: '#fafafa',
                      borderRadius: '12px',
                      textAlign: 'center',
                      border: '1px solid #edf2f7',
                    }}
                  >
                    <div style={{ fontWeight: 'bold', color: '#2d3748', fontSize: '0.8rem' }}>
                      {period.num}-р цаг
                    </div>
                    <div style={{ fontSize: '0.65rem', color: '#a0aec0', marginTop: '2px' }}>
                      {period.time}
                    </div>
                  </td>

                  {DAYS.map((day) => {
                    const key = `${day.id}_${period.num}`;
                    const cellData = schedule[key];

                    return (
                      <td
                        key={day.id}
                        onClick={() => handleCellClick(day.id, period.num)}
                        style={{
                          padding: '6px',
                          borderRadius: '12px',
                          background: cellData?.subject ? '#f0f9ff' : '#fafafa',
                          border: cellData?.subject
                            ? '1.5px solid #3b82f6'
                            : '1px dashed #e2e8f0',
                          cursor: 'pointer',
                          verticalAlign: 'middle',
                          height: '55px',
                          textAlign: 'center',
                          transition: 'all 0.15s ease',
                          boxSizing: 'border-box',
                          overflow: 'hidden',
                        }}
                      >
                        {cellData?.subject ? (
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '2px',
                            }}
                          >
                            <span
                              style={{
                                fontWeight: 'bold',
                                fontSize: '0.8rem',
                                color: '#1e40af',
                                wordBreak: 'break-word',
                                lineHeight: '1.1',
                              }}
                            >
                              {cellData.subject}
                            </span>
                            {cellData.room && (
                              <span
                                style={{
                                  fontSize: '0.65rem',
                                  color: '#3b82f6',
                                  background: '#dbeafe',
                                  padding: '1px 4px',
                                  borderRadius: '4px',
                                }}
                              >
                                📍{cellData.room}
                              </span>
                            )}
                          </div>
                        ) : (
                          <div style={{ color: '#cbd5e0', fontSize: '1rem', fontWeight: 'bold' }}>
                            +
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ЦЭС 2: ШАЛГАЛТ & БИЕ ДААЛТ/ДААЛГАВАР */}
      {activeTab === 'exam' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* 1. ШАЛГАЛТЫН ХУВААРЬ */}
          <div
            style={{
              background: '#ffffff',
              padding: '1.5rem',
              borderRadius: '24px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            }}
          >
            <h3 style={{ marginTop: 0, color: '#2d3748', marginBottom: '1.2rem', fontSize: '1.1rem' }}>
              📝 Шалгалтын хуваарь & D-Day
            </h3>

            <form
              onSubmit={handleAddExam}
              style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1.5rem' }}
            >
              <input
                type="text"
                placeholder="Хичээлийн нэр..."
                value={examSubject}
                onChange={(e) => setExamSubject(e.target.value)}
                style={{ ...inputStyle, flex: 2, minWidth: '160px' }}
              />
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                style={{ ...inputStyle, flex: 1, minWidth: '130px' }}
              />
              <button
                type="submit"
                style={{
                  padding: '0.7rem 1.2rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#3b82f6',
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Нэмэх 📅
              </button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {exams.length === 0 ? (
                <p style={{ color: '#a0aec0', fontStyle: 'italic', textAlign: 'center', padding: '1rem' }}>
                  Одоогоор тэмдэглэсэн шалгалт байхгүй байна 🌸
                </p>
              ) : (
                exams.map((exam) => {
                  const ddayText = getDDay(exam.date);
                  const isUrgent =
                    ddayText.includes('D-') && parseInt(ddayText.replace('D-', ''), 10) <= 3;

                  return (
                    <div
                      key={exam.id}
                      onClick={() => setSelectedExam(exam)}
                      style={{
                        background: '#f8fafc',
                        padding: '0.9rem 1.2rem',
                        borderRadius: '16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderLeft: isUrgent ? '4px solid #ef4444' : '4px solid #3b82f6',
                        cursor: 'pointer',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: '0.95rem', color: '#2d3748' }}>
                          📚 {exam.subject}{' '}
                          <span style={{ fontSize: '0.75rem', color: '#a0aec0', fontWeight: 'normal' }}>
                            (дарж тэмдэглэл бичих)
                          </span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#718096', marginTop: '2px' }}>
                          🗓️ {exam.date}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span
                          style={{
                            background: isUrgent ? '#fee2e2' : '#dbeafe',
                            color: isUrgent ? '#dc2626' : '#2563eb',
                            padding: '4px 12px',
                            borderRadius: '10px',
                            fontWeight: 'bold',
                            fontSize: '0.85rem',
                          }}
                        >
                          {ddayText}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleDeleteExam(e, exam.id)}
                          style={{
                            background: '#fee2e2',
                            border: 'none',
                            color: '#ef4444',
                            padding: '6px 10px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '0.8rem',
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {selectedExam && (
              <div
                style={{
                  marginTop: '1.2rem',
                  background: '#f0fdf4',
                  padding: '1rem',
                  borderRadius: '16px',
                  border: '1px solid #bbf7d0',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem',
                  }}
                >
                  <h4 style={{ margin: 0, color: '#16a34a', fontSize: '0.95rem' }}>
                    📌 {selectedExam.subject} - Тэмдэглэл
                  </h4>
                  <button
                    type="button"
                    onClick={() => setSelectedExam(null)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
                  >
                    ✖
                  </button>
                </div>
                <textarea
                  rows="3"
                  placeholder="Бэлтгэх зүйлсээ бичээрэй..."
                  value={selectedExam.note || ''}
                  onChange={(e) => handleUpdateNote(selectedExam.id, e.target.value)}
                  style={inputStyle}
                />
              </div>
            )}
          </div>

          {/* 2. БИЕ ДААЛТ & ДААЛГАВАР CHECKLIST */}
          <div
            style={{
              background: '#ffffff',
              padding: '1.5rem',
              borderRadius: '24px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            }}
          >
            <h3 style={{ marginTop: 0, color: '#2d3748', marginBottom: '1.2rem', fontSize: '1.1rem' }}>
              ✅ Бие даалт & Даалгавар
            </h3>

            <form
              onSubmit={handleAddAssignment}
              style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1.5rem' }}
            >
              <input
                type="text"
                placeholder="Даалгавар, бие даалтын нэр..."
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                style={{ ...inputStyle, flex: 2, minWidth: '160px' }}
              />
              <input
                type="date"
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
                style={{ ...inputStyle, flex: 1, minWidth: '130px' }}
              />
              <button
                type="submit"
                style={{
                  padding: '0.7rem 1.2rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#8b5cf6',
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Нэмэх ✨
              </button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {assignments.length === 0 ? (
                <p style={{ color: '#a0aec0', fontStyle: 'italic', textAlign: 'center', padding: '1rem' }}>
                  Хийх даалгавар байхгүй байна 👏
                </p>
              ) : (
                assignments.map((task) => {
                  const ddayText = getDDay(task.dueDate);
                  const isUrgent =
                    ddayText.includes('D-') && parseInt(ddayText.replace('D-', ''), 10) <= 3;
            return (
              <div
                key={task.id}
                style={{
                  // 🔴 Хугацаа дөхсөн бөгөөд хийж дуусаагүй бол карт бүхэлдээ улаан фонотой болно
                  background: task.completed 
                    ? '#f7fafc' 
                    : (isUrgent ? '#fef2f2' : '#ffffff'),
                  padding: '0.9rem 1.2rem',
                  borderRadius: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: task.completed
                    ? '1px solid #edf2f7'
                    : (isUrgent ? '2px solid #fca5a5' : '1px solid #edf2f7'),
                  opacity: task.completed ? 0.6 : 1,
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleAssignment(task.id)}
                    style={{
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                      accentColor: isUrgent && !task.completed ? '#ef4444' : '#8b5cf6',
                    }}
                  />
                  <div>
                    <span
                      style={{
                        fontWeight: 'bold',
                        fontSize: '0.95rem',
                        color: isUrgent && !task.completed ? '#991b1b' : '#2d3748',
                        textDecoration: task.completed ? 'line-through' : 'none',
                      }}
                    >
                      {task.title}
                    </span>
                    <div 
                      style={{ 
                        fontSize: '0.78rem', 
                        color: isUrgent && !task.completed ? '#dc2626' : '#718096', 
                        marginTop: '2px' 
                      }}
                    >
                      ⏳ Дуусах хугацаа: {task.dueDate}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      background: isUrgent && !task.completed ? '#fee2e2' : '#f3e8ff',
                      color: isUrgent && !task.completed ? '#dc2626' : '#7c3aed',
                      padding: '4px 10px',
                      borderRadius: '10px',
                      fontWeight: 'bold',
                      fontSize: '0.8rem',
                    }}
                  >
                    {ddayText}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteAssignment(task.id)}
                    style={{
                      background: isUrgent && !task.completed ? '#fecaca' : '#fee2e2',
                      border: 'none',
                      color: '#ef4444',
                      padding: '6px 10px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '0.8rem',
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
                
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* ЦЭС 3: ПОМОДОРО ТАЙМЕР */}
      {activeTab === 'pomodoro' && (
        <div
          style={{
            background: isBreak ? '#f0fdf4' : '#fdf2f8',
            padding: '2.5rem 1.5rem',
            borderRadius: '24px',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
            border: isBreak ? '2px solid #bbf7d0' : '2px solid #fbcfe8',
          }}
        >
          <h3 style={{ margin: 0, color: isBreak ? '#16a34a' : '#db2777', fontSize: '1.2rem' }}>
            {isBreak ? '☕ Амрах цаг' : '⏳ Помодоро Таймер (Focus)'}
          </h3>

          <div style={{ fontSize: '4rem', fontWeight: 'bold', color: '#2d3748', margin: '1rem 0' }}>
            {formatTime(timeLeft)}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <button
              type="button"
              onClick={toggleTimer}
              style={{
                padding: '0.7rem 1.8rem',
                borderRadius: '14px',
                border: 'none',
                background: isRunning ? '#f59e0b' : '#ec4899',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.95rem',
                cursor: 'pointer',
              }}
            >
              {isRunning ? 'Завсарлах ⏸️' : 'Эхлэх ▶️'}
            </button>
            <button
              type="button"
              onClick={resetTimer}
              style={{
                padding: '0.7rem 1.4rem',
                borderRadius: '14px',
                border: '1px solid #e2e8f0',
                background: '#ffffff',
                color: '#4a5568',
                fontWeight: 'bold',
                fontSize: '0.95rem',
                cursor: 'pointer',
              }}
            >
              Дахин эхлэх 🔄
            </button>
          </div>
        </div>
      )}

      {/* ✏️ MODAL */}
      {editingCell && (
        <div
          onClick={() => setEditingCell(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(3px)',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              padding: '1.5rem',
              borderRadius: '24px',
              width: '90%',
              maxWidth: '360px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            }}
          >
            <h3 style={{ margin: '0 0 1rem 0', color: '#2d3748', fontSize: '1rem' }}>
              📝 {DAYS.find((d) => d.id === editingCell.day)?.label} гараг / {editingCell.period}-р цаг
            </h3>

            <form onSubmit={handleSaveCell} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label
                  style={{
                    fontSize: '0.8rem',
                    color: '#718096',
                    fontWeight: 'bold',
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  Хичээлийн нэр:
                </label>
                <input
                  type="text"
                  placeholder="Математик..."
                  value={subjectInput}
                  onChange={(e) => setSubjectInput(e.target.value)}
                  autoFocus
                  style={inputStyle}
                />
              </div>

              <div>
                <label
                  style={{
                    fontSize: '0.8rem',
                    color: '#718096',
                    fontWeight: 'bold',
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  Танхим (Заавал бичихгүй):
                </label>
                <input
                  type="text"
                  placeholder="302..."
                  value={roomInput}
                  onChange={(e) => setRoomInput(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '8px', justifyContent: 'flex-end' }}>
                {schedule[editingCell.key] && (
                  <button
                    type="button"
                    onClick={handleClearCell}
                    style={{
                      padding: '0.6rem 1rem',
                      borderRadius: '12px',
                      border: 'none',
                      background: '#fee2e2',
                      color: '#ef4444',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      marginRight: 'auto',
                    }}
                  >
                    Арилгах
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setEditingCell(null)}
                  style={{
                    padding: '0.6rem 1rem',
                    borderRadius: '12px',
                    border: 'none',
                    background: '#edf2f7',
                    color: '#4a5568',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  Цуцлах
                </button>

                <button
                  type="submit"
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '12px',
                    border: 'none',
                    background: '#62c462',
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  Хадгалах
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}