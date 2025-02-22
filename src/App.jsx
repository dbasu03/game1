import React, { useState, useEffect } from "react";
import Bird from "./components/Bird";
import Pipes from "./components/Pipes";
import Score from "./components/Score";

const App = () => {
  const [birdY, setBirdY] = useState(250);
  const [gravity, setGravity] = useState(2);
  const [pipes, setPipes] = useState([{ x: 400, height: 150, gap: 150 }]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isMobile, setIsMobile] = useState(false); 

  const handleFlap = () => {
    setBirdY((prev) => Math.max(prev - 50, 0));
  };

  useEffect(() => {
    const checkDevice = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true); 
      } else {
        setIsMobile(false); 
      }
    };

    const handleKeyDown = (e) => {
      if (e.code === "Space" && !isGameOver) handleFlap();
    };

    const handleTouchStart = () => {
      if (!isGameOver) handleFlap();
    };

    checkDevice();
    
    window.addEventListener("resize", checkDevice);

    if (isMobile) {
      window.addEventListener("touchstart", handleTouchStart); 
    } else {
      window.addEventListener("keydown", handleKeyDown); 
    }

    return () => {
      window.removeEventListener("resize", checkDevice);
      if (isMobile) {
        window.removeEventListener("touchstart", handleTouchStart);
      } else {
        window.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [isGameOver, isMobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isGameOver) {
        setBirdY((prev) => prev + gravity);
        setPipes((prev) =>
          prev
            .map((pipe) => ({ ...pipe, x: pipe.x - 5 }))
            .filter((pipe) => pipe.x > -50)
        );
        if (pipes.length === 0 || pipes[pipes.length - 1].x < 250) {
          const newHeight = Math.random() * 200 + 100;
          setPipes((prev) => [
            ...prev,
            { x: 400, height: newHeight, gap: 150 },
          ]);
        }
        const birdRect = { x: 50, y: birdY, width: 20, height: 20 };
        pipes.forEach((pipe) => {
          const topPipe = { x: pipe.x, y: 0, width: 50, height: pipe.height };
          const bottomPipe = {
            x: pipe.x,
            y: pipe.height + pipe.gap,
            width: 50,
            height: 500 - (pipe.height + pipe.gap),
          };

          if (
            checkCollision(birdRect, topPipe) ||
            checkCollision(birdRect, bottomPipe) ||
            birdY >= 480
          ) {
            setIsGameOver(true);
            clearInterval(interval);
          }
        });
        setScore((prev) => prev + 1);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [birdY, pipes, isGameOver, gravity]);

  const checkCollision = (rect1, rect2) => {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.height + rect1.y > rect2.y
    );
  };

  const restartGame = () => {
    setBirdY(250);
    setPipes([{ x: 400, height: 150, gap: 150 }]);
    setScore(0);
    setIsGameOver(false);
  };

  return (
    <div
      style={{
        width: isMobile ? "100%" : "400px", 
        height: isMobile ? "100vh" : "500px", 
        margin: "0 auto",
        position: "relative",
        background: "linear-gradient(to bottom, yellow, orange, red)", 
        overflow: "hidden",
        border: isMobile ? "none" : "2px solid black", 
        touchAction: "none", 
      }}
    >
      <Bird birdY={birdY} />
      <Pipes pipes={pipes} />
      <Score score={score} />
      {isGameOver && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
            fontSize: "24px",
          }}
        >
          <p>Game Over</p>
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default App;

