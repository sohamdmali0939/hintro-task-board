import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { useDraggable } from "@dnd-kit/core";
import "../styles/taskcard.css";

const TaskCard = ({ task }) => {
  const { deleteTask } = useContext(TaskContext);

  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="task-card"
    >
      {/* Title */}
      <h4>{task.title}</h4>

      {/* Description */}
      {task.description && (
        <p>{task.description}</p>
      )}

      {/* Priority */}
      <p>
        <strong>Priority:</strong> {task.priority}
      </p>

      {/* Due Date */}
      {task.dueDate && (
        <p>
          <strong>Due:</strong> {task.dueDate}
        </p>
      )}

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div>
          {task.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Delete Button */}
      <button
        className="delete-btn"
        onClick={() => deleteTask(task.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default TaskCard;
