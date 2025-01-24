import React from "react";

const Bird = ({ birdY }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50px",
        top: `${birdY}px`,
        width: "20px",
        height: "20px",
        backgroundColor: "red",
        borderRadius: "50%",
      }}
    ></div>
  );
};

export default Bird;



