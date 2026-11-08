import { useState, useEffect } from "react";
import "./Todo.css";

function Todo() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("todoTasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");

  // 🌸 Идэвхитэй цэс хадгалах state ('home' эсвэл 'plans')
  const [activeTab, setActiveTab] = useState("home");
  // 🔍 Төлөвлөгөө шүүх state ('all', 'active', 'completed')
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;

    const task = {
      id: Date.now(),
      text: newTask,
      priority,
      dueDate,
      dueTime,
      completed: false,
    };

    setTasks([task, ...tasks]);
    setNewTask("");
    setDueDate("");
    setDueTime("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completedCount = tasks.filter((task) => task.completed).length;

  // Төлөвлөгөөг шүүж харуулах
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="todo-page">
      {/* Header хэсэг */}
      <div className="todo-header">
        <div>
          <h1>🎀 My Daily Plans</h1>
          <p>Small steps every single day ✨</p>
        </div>

        <div className="todo-progress">
          🌸 {completedCount}/{tasks.length || 0} done
        </div>
      </div>

      {/* 🌸 Шинэ navigation цэс (Tabs) */}
      <div className="nav-tabs">
        <button
          className={`tab-btn ${activeTab === "home" ? "active" : ""}`}
          onClick={() => setActiveTab("home")}
        >
          🏠 Home
        </button>
        <button
          className={`tab-btn ${activeTab === "plans" ? "active" : ""}`}
          onClick={() => setActiveTab("plans")}
        >
          🗓️ Plans ({tasks.length})
        </button>
      </div>

      {/* 🏠 HOME ЦЭС: Зөвхөн төлөвлөгөө шинээр нэмэх хэсэг харагдана */}
      {activeTab === "home" && (
        <div className="todo-card">
          <input
            className="task-input"
            type="text"
            placeholder="My plan..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
          />

          <div className="time-controls">
            <div className="cute-input-wrapper">
              <span className="cute-label">📅 Date</span>
              <input
                type="date"
                className="cute-picker"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="cute-input-wrapper">
              <span className="cute-label">⏰ Time</span>
              <input
                type="time"
                className="cute-picker"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
              />
            </div>
          </div>

          <div className="todo-controls">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="high">🔴 High Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="low">🟢 Low Priority</option>
            </select>

            <button className="add-btn" onClick={addTask}>
              + Add Task 💕
            </button>
          </div>
        </div>
      )}

      {/* 🗓️ PLANS ЦЭС: Зөвхөн төлөвлөгөөний жагсаалт харагдана */}
      {activeTab === "plans" && (
        <div className="tasks-section">
          <div className="plans-header">
            <h2>💖 My Scheduled Plans</h2>

            {/* Шүүх товчлуурууд */}
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={`filter-btn ${filter === "active" ? "active" : ""}`}
                onClick={() => setFilter("active")}
              >
                Active
              </button>
              <button
                className={`filter-btn ${
                  filter === "completed" ? "active" : ""
                }`}
                onClick={() => setFilter("completed")}
              >
                Done
              </button>
            </div>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="empty-tasks">
              <div className="empty-icon">🧸</div>
              <p>No plans found!</p>
              <span>Add a new task in Home tab 🌷</span>
            </div>
          ) : (
            <div className="task-list">
              {filteredTasks.map((task) => (
                <div
                  className={`task-card ${
                    task.completed ? "completed" : ""
                  }`}
                  key={task.id}
                >
                  <button
                    className="check-button"
                    onClick={() => toggleTask(task.id)}
                  >
                    {task.completed ? "🌸" : ""}
                  </button>

                  <div className="task-info">
                    <span className="task-text">{task.text}</span>

                    <div className="task-details">
                      <span className={`priority ${task.priority}`}>
                        {task.priority === "high" && "🔴 High"}
                        {task.priority === "medium" && "🟡 Medium"}
                        {task.priority === "low" && "🟢 Low"}
                      </span>

                      {(task.dueDate || task.dueTime) && (
                        <span className="cute-badge">
                          🌷 {task.dueDate} {task.dueTime}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    className="delete-button"
                    onClick={() => deleteTask(task.id)}
                  >
                    🎀
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Todo;