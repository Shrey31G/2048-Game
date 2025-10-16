import React from "react";
import { motion } from "motion/react";

interface GameOverProps {
  won: boolean;
  score: number;
  onRestart: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({
  won,
  score,
  onRestart,
}) => {
  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <div className="mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <h2
          className={`mb-4 text-center text-4xl font-bold ${won ? "text-green-600" : "text-red-600"}`}
        >
          {won ? "🎉 You Won!" : "Game Over"}
        </h2>
        <p className="mb-2 text-center text-xl text-gray-700">Final Score</p>
        <p className="mb-6 text-center text-5xl font-bold text-gray-900">
          {score}
        </p>
        {won && (
          <p className="mb-6 text-center text-gray-600">You reached 2048! 🏆</p>
        )}
        <motion.button
          whileTap={{
            scale: 0.97,
          }}
          onClick={onRestart}
          className="w-full cursor-pointer rounded-lg border border-neutral-800 bg-gradient-to-r px-6 py-4 font-bold shadow-lg transition-all"
        >
          Play Again
        </motion.button>
      </div>
    </div>
  );
};
