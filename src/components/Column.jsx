import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import "../styles/column.css";

const Column = ({ status, tasks }) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div ref={setNodeRef} className="column">
      <h3>{status.toUpperCase()}</h3>

      {tasks.length === 0 && (
        <p className="empty-message">No tasks here</p>
      )}

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Column;
