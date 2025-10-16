"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Board } from "@/components/Board";
import { GameOver } from "@/components/GameOver";
import {
  initializeBoard,
  move,
  addRandomTile,
  canMove,
  hasWon,
  type Direction,
} from "@/utils/gameLogic";
import { motion } from "motion/react";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  const [board, setBoard] = useState(initializeBoard);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const resetGame = useCallback(() => {
    setBoard(initializeBoard());
    setScore(0);
    setGameOver(false);
    setWon(false);
  }, []);

  const handleMove = useCallback(
    (direction: Direction) => {
      if (gameOver) return;

      const result = move(board, direction);

      if (!result.moved) return;

      const newBoard = addRandomTile(result.board);
      setBoard(newBoard);
      setScore((prev) => prev + result.score);

      if (hasWon(newBoard) && !won) {
        setWon(true);
        setGameOver(true);
      } else if (!canMove(newBoard)) {
        setGameOver(true);
      }
    },
    [board, gameOver, won],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (["arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) {
        e.preventDefault();
      }

      switch (key) {
        case "arrowup":
        case "w":
          e.preventDefault();
          handleMove("up");
          break;
        case "arrowdown":
        case "s":
          e.preventDefault();
          handleMove("down");
          break;
        case "arrowleft":
        case "a":
          e.preventDefault();
          handleMove("left");
          break;
        case "arrowright":
        case "d":
          e.preventDefault();
          handleMove("right");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleMove]);

  return (
    <main className="bg-background flex min-h-screen flex-col items-center justify-center gap-8 p-4 lg:flex-row lg:gap-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        className="flex flex-shrink-0 items-center justify-center"
      >
        <Board board={board} />
      </motion.div>

      <div className="flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-foreground mb-2 text-6xl font-bold">2048</h1>
          <p className="text-muted-foreground">Join the tiles, get to 2048!</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="flex items-center gap-4"
        >
          <div className="bg-primary text-primary-foreground rounded-lg px-6 py-3 shadow-md">
            <div className="text-sm font-semibold">SCORE</div>
            <motion.div
              key={score}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-center text-2xl font-bold"
            >
              {score}
            </motion.div>
          </div>

          <motion.button
            whileHover={{
              scale: 1.08,
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
              transition: { duration: 0.7, ease: "easeOut" },
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={resetGame}
            className="bg-secondary text-secondary-foreground cursor-pointer rounded-lg px-6 py-3 font-bold shadow-md transition-all duration-200"
          >
            New Game
          </motion.button>
          <ModeToggle />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="grid grid-cols-3 gap-2 lg:hidden"
        >
          <div></div>
          <motion.button
            whileHover={{
              scale: 1.1,
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleMove("up")}
            className="bg-primary text-primary-foreground rounded-lg p-4 shadow-sm transition-all duration-150"
          >
            ↑
          </motion.button>
          <div></div>
          <motion.button
            whileHover={{
              scale: 1.1,
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleMove("left")}
            className="bg-primary text-primary-foreground rounded-lg p-4 shadow-sm transition-all duration-150"
          >
            ←
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.1,
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleMove("down")}
            className="bg-primary text-primary-foreground rounded-lg p-4 shadow-sm transition-all duration-150"
          >
            ↓
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.1,
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleMove("right")}
            className="bg-primary text-primary-foreground rounded-lg p-4 shadow-sm transition-all duration-150"
          >
            →
          </motion.button>
        </motion.div>
      </div>

      {gameOver && <GameOver won={won} score={score} onRestart={resetGame} />}
    </main>
  );
}
