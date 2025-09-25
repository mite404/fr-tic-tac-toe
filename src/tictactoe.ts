export type Board = Array<'X' | 'O' | ''>
export type EndState = 'X' | 'O' | 'tie' | undefined

export type GameState = {
  gameBoard: Board
  currentPlayer: 'X' | 'O'
  endState?: EndState
  gameId: string
}

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
  if (gameState.endState) {
    console.log('End State met, GAME OVER!')
    return gameState
  }

  // is the chosen cell already occupied
  if (gameState.gameBoard[cellIndex] !== '') {
    console.log('Cell already occupied! Not a valid move.')
    return gameState
  }

  const nextGameState = structuredClone(gameState)

  // moves can be made -- game still going!
  nextGameState.gameBoard[cellIndex] = gameState.currentPlayer
  //update the player:
  nextGameState.currentPlayer = nextGameState.currentPlayer === 'X' ? 'O' : 'X'
  console.log('Updated player to:', nextGameState.currentPlayer)

  //update the end state:
  nextGameState.endState = checkEndState(nextGameState)
  console.log('Checking End State...')
  console.log('End State updated to:', nextGameState.endState)

  return nextGameState
}

function initGame(gameId: string): GameState {
  return {
    gameBoard: initialGameBoard,
    currentPlayer: 'X',
    endState: undefined,
    gameId: gameId
  }
}

function getStatusMessage(gameState: GameState): string {
  // Check for winner
  if (gameState.endState === 'X') {
    return "Player X Wins!!"
  } else if (gameState.endState === 'O') {
    return "Player O Wins!!"
  } else if (gameState.endState === 'tie') {
    return "It's a draw!! :|"
  } else {
    return `${gameState.currentPlayer}'s Turn`
  }
}

export { initGame, makeMove, getStatusMessage }