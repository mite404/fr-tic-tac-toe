# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` - Start Vite dev server with hot reload
- **Build**: `npm run build` - TypeScript compilation followed by Vite build
- **Lint**: `npm run lint` - Run ESLint on all files
- **Preview**: `npm run preview` - Preview production build locally

## Project Architecture

This is a React tic-tac-toe game built with Vite, TypeScript, and React 19.

### Core Structure

- **Game Logic**: All game logic is centralized in `src/tictactoe.ts`
  - `GameState` type defines the complete game state (board, current player, end state)
  - Pure functions: `initGame()`, `makeMove()`, `getStatusMessage()`
  - Game logic is completely separated from UI components

- **Component Architecture**:
  - `App.tsx` - Main component managing game state with `useState<GameState>`
  - `Gameboard.tsx` - Renders the 3x3 grid using map over gameState.gameBoard
  - `Tile.tsx` - Individual clickable cell component
  - `Status.tsx` - Displays current game status message

### State Management Pattern

The app uses a single `GameState` object containing:
- `gameBoard`: Array of 9 cells ('X' | 'O' | '')
- `currentPlayer`: 'X' | 'O'
- `endState`: 'X' | 'O' | 'tie' | undefined

Game state updates flow through pure functions in `tictactoe.ts`, ensuring predictable state transitions.

## Technology Stack

- **Build Tool**: Vite 7.x with React SWC plugin
- **Framework**: React 19.x with TypeScript
- **Linting**: ESLint 9.x with React hooks and refresh plugins
- **Package Manager**: Uses bun.lock (Bun package manager)