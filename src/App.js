
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [editIndex, setEditIndex] = useState(null);

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add or update task
  const addTask = () => {
    if (input.trim() === "") return;

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex].text = input;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: input, completed: false }]);
    }

    setInput("");
  };

  // Toggle complete / undo
  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Delete task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Edit task
  const editTask = (index) => {
    setInput(tasks[index].text);
    setEditIndex(index);
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="app">
      <h2>Week 2 To-Do Assignment</h2>

      {/* Input and Add/Update button */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a task"
      />
      <button onClick={addTask}>{editIndex !== null ? "Update" : "Add"}</button>

      {/* Filter buttons */}
      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      {/* Task list */}
      {filteredTasks.length === 0 ? (
        <p>No Tasks</p>
      ) : (
        <ul>
  {filteredTasks.map((task) => {
    const originalIndex = tasks.indexOf(task); // get correct index from main tasks array
    return (
      <li key={originalIndex}>
        <span
          onClick={() => toggleTask(originalIndex)}
          style={{
            textDecoration: task.completed ? "line-through" : "none",
            cursor: "pointer",
            flex: 1,
          }}
        >
          {task.text}
        </span>
        <button onClick={() => editTask(originalIndex)}>✏️</button>
        <button onClick={() => deleteTask(originalIndex)}>❌</button>
      </li>
    );
  })}
</ul>
      )}
    </div>
  );
}

export default App;