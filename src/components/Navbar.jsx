import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar.css";

const Navbar = () => {
  const { resetBoard } = useContext(TaskContext);
  const { logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <h2>Task Board</h2>

      <div className="nav-buttons">
        {/* Reset Board */}
        <button
          className="reset-btn"
          onClick={() => {
            const confirmReset = window.confirm(
              "Are you sure you want to reset the board?"
            );

            if (confirmReset) {
              resetBoard();
            }
          }}
        >
          Reset Board
        </button>

        {/* Logout */}
        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
