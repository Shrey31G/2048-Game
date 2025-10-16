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
const slideRowLeft = (row: number[]): { row: number[], score: number } => {
    let newRow = row.filter(val => val !== 0);
    let score = 0;

    for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1]) {
            score += newRow[i];
            newRow[i] *= 2;
            newRow[i + 1] = 0;
        }
    }
    newRow = newRow.filter(val => val !== 0)

    while (newRow.length < GRID_SIZE) {
        newRow.push(0)
    }

    return { row: newRow, score }
}

// this function utilize the above function to check if moveleft changed anything 
export const moveLeft = (board: Board): { board: Board, score: number, moved: boolean } => {
    let totalScore = 0;
    let moved = false;

    const newBoard = board.map(row => {
        const { row: newRow, score } = slideRowLeft(row);
        totalScore += score;
        if (JSON.stringify(row) !== JSON.stringify(row)) {
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
    const n = GRID_SIZE;
    return board[0].map((_, i) =>
        board.map(row => row[n - 1 - i])
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
    if (getEmptyCells.length > 0) return true;

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
}

export const move = (board: Board, direction: Direction): { board: Board, score: number, moved: boolean } => {
    switch (direction) {
        case 'up':
            return moveUp(board)
        case 'down':
            return moveDown(board)
        case 'left':
            return moveLeft(board)
        case 'right':
            return moveRight(board)
    }
};