import React from "react";
import { TILE_COLORS } from "@/utils/constants";

interface TileProps {
  value: number;
}

export const Tile: React.FC<TileProps> = ({ value }) => {
  const colorClass = TILE_COLORS[value] || "bg-purple-600 text-white";

  return (
    <div
      className={` ${colorClass} flex h-full w-full items-center justify-center rounded-lg text-2xl font-bold transition-all duration-150 ${value === 0 ? "" : "shadow-md"} `}
    >
      {value !== 0 && value}
    </div>
  );
};
