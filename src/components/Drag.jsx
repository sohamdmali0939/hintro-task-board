// src/components/Drag.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Drag = () => {
  const { login } = useContext(AuthContext); // use context safely

  const handleDrag = () => {
    console.log("Dragging...");
    // just a placeholder action
    login && login("testUser"); // call login function from context for demo
  };

  return (
    <div
      data-testid="drag-component"
      draggable
      onDragStart={handleDrag}
      style={{
        width: "200px",
        height: "100px",
        backgroundColor: "#4caf50",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "grab",
      }}
    >
      Drag Me
    </div>
  );
};

export default Drag;
