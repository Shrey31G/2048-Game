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
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case "ArrowUp":
          handleMove("up");
          break;
        case "ArrowDown":
          handleMove("down");
          break;
        case "ArrowLeft":
          handleMove("left");
          break;
        case "ArrowRight":
          handleMove("right");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleMove]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="grid grid-cols-2">
        <div>
          <Board board={board} />
        </div>

        <div className="flex flex-col items-center">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-6xl font-bold">2048</h1>
            <p className="">Join the tiles, get to 2048!</p>
          </div>

          <div className="mb-6 flex items-center gap-4">
            <div className="rounded-lg bg-yellow-500 px-6 py-3 text-white shadow-md">
              <div className="text-sm font-semibold">SCORE</div>
              <div className="text-center text-2xl font-bold">{score}</div>
            </div>
            <motion.button
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.5 },
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={resetGame}
              className="cursor-pointer rounded-lg bg-gray-700 px-6 py-3 font-bold text-white shadow-md transition-colors hover:bg-gray-800"
            >
              New Game
            </motion.button>
            <ModeToggle></ModeToggle>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2 md:hidden">
          <button
            onClick={() => handleMove("up")}
            className="rounded-lg bg-blue-500 p-4 text-white active:bg-blue-600"
          >
            ↑
          </button>
          <div></div>
          <button
            onClick={() => handleMove("left")}
            className="rounded-lg bg-blue-500 p-4 text-white active:bg-blue-600"
          >
            ←
          </button>
          <button
            onClick={() => handleMove("down")}
            className="rounded-lg bg-blue-500 p-4 text-white active:bg-blue-600"
          >
            ↓
          </button>
          <button
            onClick={() => handleMove("right")}
            className="rounded-lg bg-blue-500 p-4 text-white active:bg-blue-600"
          >
            →
          </button>
        </div>
      </div>
      {gameOver && <GameOver won={won} score={score} onRestart={resetGame} />}
    </main>
  );
}
