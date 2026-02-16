import { DndContext } from "@dnd-kit/core";
import { useContext, useMemo, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import Navbar from "../components/Navbar";
import Column from "../components/Column";
import ActivityLog from "../components/ActivityLog";
import "../styles/board.css";

const Board = () => {
  const { state, moveTask, addTask } = useContext(TaskContext);

  // =========================
  // LOCAL UI STATE
  // =========================
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [priorityFilter, setPriorityFilter] = useState("All");

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");

  const columns = ["todo", "doing", "done"];

  // =========================
  // FILTER + SORT LOGIC
  // =========================
  const processedTasks = useMemo(() => {
    let tasks = [...state.tasks];

    if (search.trim()) {
      tasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (priorityFilter !== "All") {
      tasks = tasks.filter(
        (task) => task.priority === priorityFilter
      );
    }

    tasks.sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

    return tasks;
  }, [state.tasks, search, priorityFilter]);

  // =========================
  // DRAG HANDLER
  // =========================
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    const task = state.tasks.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return;

    moveTask(taskId, newStatus);
  };

  // =========================
  // ADD TASK HANDLER
  // =========================
  const handleAddTask = () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    addTask(
      title,
      description,
      priority,
      dueDate,
      tags
    );

    setTitle("");
    setDescription("");
    setPriority("Low");
    setDueDate("");
    setTags("");
  };

  return (
    <div className="board-container">
      <Navbar />

      {/* =========================
           ADD TASK SECTION
      ========================= */}
      <div className="add-task-section">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button onClick={handleAddTask}>
          Add Task
        </button>
      </div>

      {/* =========================
           SEARCH + FILTER
      ========================= */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <button onClick={() => setSearch(searchInput)}>
          Search
        </button>

        <button
          onClick={() => {
            setSearch("");
            setSearchInput("");
          }}
        >
          Clear
        </button>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* =========================
           DRAG & DROP BOARD
      ========================= */}
      <DndContext onDragEnd={handleDragEnd}>
        <div className="columns-wrapper">
          {columns.map((col) => (
            <Column
              key={col}
              status={col}
              tasks={processedTasks.filter(
                (task) => task.status === col
              )}
            />
          ))}
        </div>
      </DndContext>

      {/* =========================
           ACTIVITY LOG
      ========================= */}
      <ActivityLog />
    </div>
  );
};

export default Board;
