import { createContext, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [state, setState] = useState({
    tasks: [],
    logs: [],
  });

  // =========================
  // LOAD FROM LOCAL STORAGE
  // =========================
  useEffect(() => {
    const saved = localStorage.getItem("board");

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState(parsed);
      } catch (error) {
        setState({ tasks: [], logs: [] });
      }
    }
  }, []);

  // =========================
  // SAVE TO LOCAL STORAGE
  // =========================
  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(state));
  }, [state]);

  // =========================
  // HELPER: ADD LOG
  // =========================
  const addLog = (message) => {
    const timestamp = new Date().toLocaleString();

    setState((prev) => ({
      ...prev,
      logs: [`${timestamp} - ${message}`, ...prev.logs],
    }));
  };

  // =========================
  // ADD TASK
  // =========================
  const addTask = (title, description, priority, dueDate, tags) => {
  const newTask = {
    id: uuid(),   // 🔥 FIXED HERE
    title,
    description,
    priority,
    dueDate,
    tags: tags ? tags.split(",").map(tag => tag.trim()) : [],
    status: "todo",
    createdAt: new Date().toISOString(),
  };

  setState((prev) => ({
    ...prev,
    tasks: [...prev.tasks, newTask],
    logs: [
      `${new Date().toLocaleString()} - Task "${title}" created`,
      ...prev.logs,
    ],
  }));
};


  // =========================
  // EDIT TASK
  // =========================
  const editTask = (id, updatedTask) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      ),
    }));

    addLog(`Task "${updatedTask.title}" edited`);
  };

  // =========================
  // DELETE TASK
  // =========================
  const deleteTask = (id) => {
    setState((prev) => {
      const taskToDelete = prev.tasks.find((t) => t.id === id);

      return {
        ...prev,
        tasks: prev.tasks.filter((task) => task.id !== id),
      };
    });

    const task = state.tasks.find((t) => t.id === id);
    if (task) {
      addLog(`Task "${task.title}" deleted`);
    }
  };

  // =========================
  // MOVE TASK
  // =========================
  const moveTask = (id, newStatus) => {
    setState((prev) => {
      const task = prev.tasks.find((t) => t.id === id);

      if (!task || task.status === newStatus) return prev;

      return {
        ...prev,
        tasks: prev.tasks.map((t) =>
          t.id === id ? { ...t, status: newStatus } : t
        ),
      };
    });

    const task = state.tasks.find((t) => t.id === id);
    if (task && task.status !== newStatus) {
      addLog(`Task "${task.title}" moved to ${newStatus}`);
    }
  };

  // =========================
  // RESET BOARD
  // =========================
  const resetBoard = () => {
    setState({ tasks: [], logs: [] });
  };

  return (
    <TaskContext.Provider
      value={{
        state,
        addTask,
        editTask,
        deleteTask,
        moveTask,
        resetBoard,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
