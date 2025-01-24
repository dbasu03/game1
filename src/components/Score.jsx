// src/components/Score.jsx
import React from "react";

const Score = ({ score }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        fontSize: "24px",
        fontWeight: "bold",
        color: "white",
      }}
    >
      Score: {score}
    </div>
  );
};

export default Score;
