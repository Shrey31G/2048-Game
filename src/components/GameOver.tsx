import React from "react";

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
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <h2
          className={`mb-4 text-center text-4xl font-bold ${won ? "text-green-600" : "text-red-600"}`}
        >
          {won ? "🎉 You Won!" : "😢 Game Over"}
        </h2>
        <p className="mb-2 text-center text-xl text-gray-700">Final Score</p>
        <p className="mb-6 text-center text-5xl font-bold text-gray-900">
          {score}
        </p>
        {won && (
          <p className="mb-6 text-center text-gray-600">You reached 2048! 🏆</p>
        )}
        <button
          onClick={onRestart}
          className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 font-bold text-white shadow-lg transition-all duration-200 hover:from-blue-600 hover:to-purple-700"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};
