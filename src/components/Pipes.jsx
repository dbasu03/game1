import React from "react";

const Pipes = ({ pipes }) => {
  return (
    <>
      {pipes.map((pipe, index) => (
        <React.Fragment key={index}>
          <div
            style={{
              position: "absolute",
              left: `${pipe.x}px`,
              top: 0,
              width: "50px",
              height: `${pipe.height}px`,
              backgroundColor: "black",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              left: `${pipe.x}px`,
              top: `${pipe.height + pipe.gap}px`,
              width: "50px",
              height: `calc(500px - ${pipe.height + pipe.gap}px)`,
              backgroundColor: "black", 
            }}
          ></div>
        </React.Fragment>
      ))}
    </>
  );
};

export default Pipes;
