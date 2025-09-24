import { Gameboard } from "./components/Gameboard"

type Board = Array<'X' | 'O' | ''>
type EndState = 'X' | 'O' | 'tie' | undefined

export type GameState = {
  gameBoard: Board
  currentPlayer: 'X' | 'O'
  endState?: EndState
}

// let currentPlayer = 'X'

const initialGameBoard: Board = ['', '', '', '', '', '', '', '', '']

const winConditions = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
]

const checkForWinner = (board: Board): 'X' | 'O' | null => {
  // console.log('--- Executing validateResults (New Version) ---');
  
  for (const [a, b, c] of winConditions) {
    // console.log("Checking condition:", a, b, c, "Values:", board[a], board[b], board[c])
    
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      // console.log('WINNER DETECTED FOR:', a, b, c, 'Values:', JSON.stringify(board[a]), JSON.stringify(board[b]), JSON.stringify(board[c]));
      return board[a]
    }
  }
  return null
}

const isTie = (board: Board): boolean => {
  return board.every(cell => cell !== '');
}

const checkEndState = (gameState: GameState): EndState => {
  // game over 
  if (gameState.endState) return gameState.endState

  // check winner
  const winner = checkForWinner(gameState.gameBoard)
  if (winner) return winner

  // check tie
  const tie = isTie(gameState.gameBoard)
  if (tie) return 'tie'

  // if not: game still active
  return undefined
}

const makeMove = (gameState: GameState, cellIndex: number) => {
  // move can't be made -- game over
  if (gameState.endState !== undefined) {
    return gameState
  } 

  // moves can be made -- game still going!
  if (gameState.endState === undefined) {
    
    // is the chosen cell already occupied
    if (gameState.gameBoard[cellIndex] !== '') {
      // console.log('Cell alrady occupied! Not a valid move.')
      return gameState
    }
    // cell is empty, return move
    const updatedBoard = [...gameState.gameBoard]
    // update board
    updatedBoard[cellIndex] = gameState.currentPlayer

    // check endState against newly updated board
    const newGameStateObj = {
      gameBoard: updatedBoard,
      currentPlayer: gameState.currentPlayer,
      endState: undefined
    }
    
    const nextEndState = checkEndState(newGameStateObj)
    // switch player
    handlePlayerChange()
    // return new gameState object
    return nextEndState
  }
  return gameState
}

function initGame() {
  const initGameState = {
    gameBoard: initialGameBoard,
    currentPlayer: 'X',
    endState: undefined
  }
  return initGameState
}

function handlePlayerChange() {
  if (currentPlayer === 'X') {
    currentPlayer = 'O'
  } else {
    currentPlayer = 'X'
  }
}

export { initGame }