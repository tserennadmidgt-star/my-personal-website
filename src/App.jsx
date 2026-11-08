import React, { useState, useEffect } from 'react';
import './App.css';

import Login from './components/Login.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/Dashboard.jsx';
import Books from './components/Books.jsx';
import Movies from './components/Movies.jsx';
import Playlist from './components/Playlist.jsx';
import Todo from './components/Todo.jsx';
import Journal from './components/Journal.jsx';
import Study from './components/Study.jsx';
import Habits from './components/Habits.jsx';
import Ideas from './components/Ideas.jsx';
import Settings from './components/Settings.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  // DATA
  const [books, setBooks] = useState([]);
  const [movies, setMovies] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [todo, setTodo] = useState([]);
  const [entries, setEntries] = useState([]);
  const [studyList, setStudyList] = useState([]);
  const [habits, setHabits] = useState([]);
  const [ideas, setIdeas] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);

  // USER SETTINGS
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('userName') || 'NaDeau';
  });

  const [userPassword, setUserPassword] = useState(() => {
    return localStorage.getItem('userPassword') || '1260';
  });

  const [themeColor, setThemeColor] = useState('#e9789f');
  const [showQuotes, setShowQuotes] = useState(true);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('nadeau_darkmode') === 'true';
  });

  // LOAD FROM LOCAL STORAGE
  useEffect(() => {
    const loadData = (key, setter) => {
      const saved = localStorage.getItem(key);
      if (saved) {
        try {
          setter(JSON.parse(saved));
        } catch (error) {
          console.log(`Error loading ${key}`);
        }
      }
    };

    loadData('nadeau_books', setBooks);
    loadData('nadeau_movies', setMovies);
    loadData('nadeau_playlist', setPlaylist);
    loadData('nadeau_todo', setTodo);
    loadData('nadeau_journal', setEntries);
    loadData('nadeau_study', setStudyList);
    loadData('nadeau_habits', setHabits);
    loadData('nadeau_ideas', setIdeas);

    setIsLoaded(true);
  }, []);

  // SAVE TO LOCAL STORAGE
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem('nadeau_books', JSON.stringify(books));
    localStorage.setItem('nadeau_movies', JSON.stringify(movies));
    localStorage.setItem('nadeau_playlist', JSON.stringify(playlist));
    localStorage.setItem('nadeau_todo', JSON.stringify(todo));
    localStorage.setItem('nadeau_journal', JSON.stringify(entries));
    localStorage.setItem('nadeau_study', JSON.stringify(studyList));
    localStorage.setItem('nadeau_habits', JSON.stringify(habits));
    localStorage.setItem('nadeau_ideas', JSON.stringify(ideas));

    localStorage.setItem('userName', userName);
    localStorage.setItem('userPassword', userPassword);
    localStorage.setItem('nadeau_darkmode', isDarkMode.toString());

  }, [
    books, movies, playlist, todo, entries, studyList, habits, ideas,
    userName, userPassword, isDarkMode, isLoaded
  ]);

  // LOGIN
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === userPassword) {
      setIsLoggedIn(true);
      setPassword('');
    } else {
      alert('Нууц үг буруу байна! 🌸');
    }
  };

  // LOGOUT
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <Login
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        background: isDarkMode ? '#1e1e2e' : '#fcedf2',
        color: isDarkMode ? '#f5f5f5' : '#2d3748',
        fontFamily: "'Segoe UI', Roboto, sans-serif",
        boxSizing: 'border-box'
      }}
    >
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
      />

      <div
        style={{
          flex: 1,
          padding: '2.5rem',
          boxSizing: 'border-box',
          overflowY: 'auto'
        }}
      >
        {activeTab === 'dashboard' && (
          <Dashboard
            userName={userName}
            isDarkMode={isDarkMode}
            habits={habits}
            books={books}
            entries={entries}
            setActiveTab={setActiveTab}
            showQuotes={showQuotes}
          />
        )}

        {activeTab === 'books' && <Books books={books} setBooks={setBooks} />}
        {activeTab === 'movies' && <Movies movies={movies} setMovies={setMovies} />}
        {activeTab === 'playlist' && <Playlist playlist={playlist} setPlaylist={setPlaylist} />}
        {activeTab === 'todo' && <Todo todo={todo} setTodo={setTodo} />}
        {activeTab === 'journal' && <Journal entries={entries} setEntries={setEntries} />}
        {activeTab === 'study' && <Study studyList={studyList} setStudyList={setStudyList} />}
        {activeTab === 'habits' && <Habits habits={habits} setHabits={setHabits} />}
        {activeTab === 'ideas' && <Ideas ideas={ideas} setIdeas={setIdeas} />}
        {activeTab === 'settings' && (
          <Settings
            userName={userName}
            setUserName={setUserName}
            userPassword={userPassword}
            setUserPassword={setUserPassword}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            themeColor={themeColor}
            setThemeColor={setThemeColor}
            showQuotes={showQuotes}
            setShowQuotes={setShowQuotes}
          />
        )}
      </div>
    </div>
  );
}

export default App;