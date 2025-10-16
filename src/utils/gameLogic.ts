import { GRID_SIZE, WINNING_TILE } from "./constants"

export type Board = number[][]
export type Direction = 'up' | 'down' | 'left' | 'right'

// Here I initialized an empty board when the game starts which has the type Board with 2 arrays
export const createEmptyBoard = (): Board => {
    return Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0));
}

export const getEmptyCells = (board: Board): [number, number][] => {
    const empty: [number, number][] = [];

    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if (board[row][col] === 0) {
                empty.push([row, col])
            }
        }
    }
    return empty;
}

// here i put a random tile for the 2 initial value
export const addRandomTile = (board: Board): Board => {
    const emptyCells = getEmptyCells(board);
    if (emptyCells.length === 0) return board;

    const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const value = Math.random() < 0.9 ? 2 : 4;

    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = value;
    return newBoard;
}


// this is where all the functions are initialized to get an empty board first
// then add 2 random tiles in it of value 2 or 4
export const initializeBoard = (): Board => {
    let board = createEmptyBoard();
    board = addRandomTile(board);
    board = addRandomTile(board);
    return board;
}

// this functions adds similar tiles if player moves left and increases score
const slideAndMergeRow = (row: number[]): { row: number[], score: number } => {

    const filtered = row.filter(val => val !== 0);
    let score = 0;

    const merged: number[] = [];
    let i = 0;
    while (i < filtered.length) {
        if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {

            const mergedValue = filtered[i] * 2;
            merged.push(mergedValue);
            score += mergedValue;
            i += 2;
        } else {
            merged.push(filtered[i]);
            i += 1;
        }
    }

    while (merged.length < GRID_SIZE) {
        merged.push(0);
    }

    return { row: merged, score };
};

// this function utilize the above function to check if moveleft changed anything 
export const moveLeft = (board: Board): { board: Board, score: number, moved: boolean } => {
    let totalScore = 0;
    let moved = false;

    const newBoard = board.map(row => {
        const { row: newRow, score } = slideAndMergeRow(row);
        totalScore += score;
        if (JSON.stringify(row) !== JSON.stringify(newRow)) {
            moved = true
        }
        return newRow
    });

    return { board: newBoard, score: totalScore, moved };
}


const rotateClockwise = (board: Board): Board => {
    const n = GRID_SIZE;
    return board[0].map((_, i) =>
        board.map(row => row[i]).reverse()
    )
}

const rotateCounterClockwise = (board: Board): Board => {
    return board[0].map((_, i) =>
        board.map(row => row[GRID_SIZE - 1 - i])
    );
};

export const moveRight = (board: Board): { board: Board, score: number, moved: boolean } => {
    const rotated = rotateClockwise(rotateClockwise(board));
    const result = moveLeft(rotated);

    return {
        board: rotateClockwise(rotateClockwise(result.board)),
        score: result.score,
        moved: result.moved
    };
}

export const moveUp = (board: Board): { board: Board, score: number, moved: boolean } => {
    const rotated = rotateCounterClockwise(board);
    const result = moveLeft(rotated);
    return {
        board: rotateClockwise(result.board),
        score: result.score,
        moved: result.moved
    };
};

export const moveDown = (board: Board): { board: Board, score: number, moved: boolean } => {
    const rotated = rotateClockwise(board);
    const result = moveLeft(rotated);
    return {
        board: rotateCounterClockwise(result.board),
        score: result.score,
        moved: result.moved
    };
};

export const canMove = (board: Board) => {
    if (getEmptyCells(board).length > 0) return true;

    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE - 1; col++) {
            if (board[row][col] === board[row][col + 1]) {
                return true;
            }
        }
    }

    for (let row = 0; row < GRID_SIZE - 1; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if (board[row][col] === board[row + 1][col]) {
                return true
            }
        }
    }
    return false;
}

export const hasWon = (board: Board) => {
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if (board[row][col] === WINNING_TILE) {
                return true;
            }
        }
    }
    return false;
}


export const move = (board: Board, direction: string): { board: Board, score: number, moved: boolean } => {
    switch (direction.toLowerCase()) {
        case 'w':
        case 'up':
            return moveUp(board)
        case 's':
        case 'down':
            return moveDown(board)
        case 'a':
        case 'left':
            return moveLeft(board)
        case 'd':
        case 'right':
            return moveRight(board)
        default:
            return { board, score: 0, moved: false }
    }
};