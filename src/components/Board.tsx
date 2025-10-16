import React from "react";
import { Board as BoardType } from "@/utils/gameLogic";
import { GRID_SIZE } from "@/utils/constants";
import { Tile } from "./Tile";

interface BoardProps {
  board: BoardType;
}

export const Board: React.FC<BoardProps> = ({ board }) => {
  return (
    <div
      className="rounded-lg border-2 bg-gray-400 p-4 shadow-xl"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        gap: "12px",
        width: "min(90vw, 500px)",
        height: "min(90vw, 500px)",
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <Tile key={`${rowIndex}-${colIndex}`} value={value} />
        )),
      )}
    </div>
  );
};
