# 2048 Game - Next.js Implementation

A fully functional implementation of the popular 2048 game built with Next.js, React, TypeScript, and Tailwind CSS.

## 🎮 Live Demo

## ✨ Features

- **4x4 Grid Board** - Classic 2048 gameplay
- **Smooth Animations** - Responsive tile movements and merges
- **Score Tracking** - Real-time score updates based on merged tiles
- **Win/Loss Detection** - Automatic game over when reaching 2048 or no moves available
- **Keyboard Controls** - Use arrow keys to move tiles
- **Restart Function** - Reset game anytime with "New Game" button

## 🚀 Installation

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Steps

1. **Clone the repository**

```bash
git clone https://github.com/Shrey31G/2048-Game
cd 2048-game
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Run development server**

```bash
npm run dev
# or
yarn dev
```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## How to Play

1. Use **arrow keys** (↑ ↓ ← →) (w s a d) on desktop or directional buttons on mobile
2. Tiles with the **same number merge** into one when they touch
3. Add them up to reach **2048**!
4. Game ends when you reach 2048 (win) or no more moves are possible (lose)

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main game component with state management
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── Board.tsx             # Game board grid display
│   ├── Tile.tsx              # Individual tile component
│   └── GameOver.tsx          # Win/lose modal
└── utils/
    ├── gameLogic.ts          # Core game logic (functional programming)
    └── constants.ts          # Game constants and tile colors
```

## Implementation Details

The game follows functional programming principles:

- **Pure Functions**: All game logic functions are pure (no side effects)
- **Immutability**: Board state is never mutated directly
- **Function Composition**: Complex moves built from simple transformations
- **Declarative Code**: Logic expressed as transformations, not imperative steps

### Key Algorithms

**Move Logic**:

1. Filter out zeros from row/column
2. Merge adjacent equal tiles
3. Filter zeros again
4. Pad with zeros to maintain size

**Direction Handling**:

- All directions use the same core logic
- Board rotation converts up/down/right to left-move operations
- Rotate → Move Left → Rotate Back

### Data Structures

- **Board**: 2D array `number[][]` representing the grid
- **Empty = 0**: Zero represents empty cells
- **Score**: Accumulated from merged tile values

### State Management

Uses React hooks for state:

- `useState` for board, score, game status
- `useCallback` for memoized move handlers
- `useEffect` for keyboard event listeners

### Manual Build

```bash
npm run build
npm run start
```

## 🛠️ Technologies Used

- **Next.js 14** - React framework with App Router
- **React 18** - UI component library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vercel** - Hosting and deployment
- **Motion** - Animating
