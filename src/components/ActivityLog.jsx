import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const ActivityLog = () => {
  const { state } = useContext(TaskContext);

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Activity Log</h3>
      <ul>
        {state.logs.slice(-5).reverse().map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;
