
export const GRID_SIZE = 4;
export const TILE_COUNT = GRID_SIZE * GRID_SIZE;

export const TILE_COLORS: { [key: number]: string } = {
    0: 'bg-gray-200',
    2: 'bg-amber-100 text-gray-700',
    4: 'bg-amber-200 text-gray-700',
    8: 'bg-orange-300 text-white',
    16: 'bg-orange-400 text-white',
    32: 'bg-orange-500 text-white',
    64: 'bg-red-400 text-white',
    128: 'bg-yellow-400 text-white',
    256: 'bg-yellow-500 text-white',
    512: 'bg-yellow-600 text-white',
    1024: 'bg-yellow-700 text-white',
    2048: 'bg-yellow-800 text-white',
};

export const WINNING_TILE = 2048;