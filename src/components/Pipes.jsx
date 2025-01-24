// src/components/Pipes.jsx
import React from "react";

const Pipes = ({ pipes }) => {
  return (
    <>
      {pipes.map((pipe, index) => (
        <React.Fragment key={index}>
          {/* Top Pipe */}
          <div
            style={{
              position: "absolute",
              left: `${pipe.x}px`,
              top: 0,
              width: "50px",
              height: `${pipe.height}px`,
              backgroundColor: "black", // Set top pipe color to black
            }}
          ></div>
          {/* Bottom Pipe */}
          <div
            style={{
              position: "absolute",
              left: `${pipe.x}px`,
              top: `${pipe.height + pipe.gap}px`,
              width: "50px",
              height: `calc(500px - ${pipe.height + pipe.gap}px)`,
              backgroundColor: "black", // Set bottom pipe color to black
            }}
          ></div>
        </React.Fragment>
      ))}
    </>
  );
};

export default Pipes;
