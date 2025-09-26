// GAME RULES
//
// tic tac toe is a game where 2 players alternate moves marking Xs or Os on
// a 3x3 grid of 9 cells. 
// player X always moves first. 
// a player wins when they get a consecutive row of 3 marks matching their character.
// a diagonal row is valid
// a tie happens when no more space are available and there are no completed rows match


// what type will the board be?
export type Board = Array<'X' | 'O' | ''>

// what type will the end state be?
export type EndState = 'X' | 'O' | 'tie' | undefined

// let's define the GameState
export type GameState = {
  gameBoard: Board
  currentPlayer: 'X' | 'O'
  endState?: EndState
  gameId: string
}

// create an initial empty board 3x3 board
const initialGameBoard: Board = ['', '', '', '', '', '', '', '', '']

// create an array of winConditions (array, algo?)
const winPositions = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
]

// now we check for states (winner, 
function checkForWins(board: Board): 'X' | 'O' | null {
  // use for loop to iterate over GameState.board compare if any positions on the board match win conditions
  for (const [a, b, c] of winPositions) {
    if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
      return board[a]
    }
  }
  return null
}

// tie 
function isTie(board: Board): boolean {
  return board.every(cell => cell !== '')
}

// end state)
function checkEndState(gameState: GameState): EndState {
  // game over state
  if (gameState.endState) return gameState.endState

  // is there a winner? yes/no
  // yes? return winner X or O
  const winner = checkForWins(gameState.gameBoard)
  // if no go to step 2
  if (winner) return winner

  // is the board full?
  const tie = isTie(gameState.gameBoard)
  // check for tie? if true then board full
  if (tie) return 'tie'
  // if not go to step 3

  // game still active
  return undefined
}

// now we need to make a move & init game
function makeMove(gameState: GameState, cellIndex: number) {
  // move can't be made
  if (gameState.endState) {
    console.log('Game over!')
    return gameState
  }

  // is chosen cell occupied?
  if (gameState.gameBoard[cellIndex] !== '') {
    console.log('Chosen position already occupied! Not a valid move.')
    return gameState
  }

  const nextGameState = structuredClone(gameState)

  // moves can be made
  nextGameState.gameBoard[cellIndex] = gameState.currentPlayer

  // update player
  nextGameState.currentPlayer = nextGameState.currentPlayer === 'X' ? 'O' : 'X'
  console.log('Game state updated. Current player:', nextGameState.currentPlayer)

  // update endState 
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

// TESTS
let game = initGame()
console.log(game.currentPlayer)
console.log(game.gameBoard)

game = makeMove(game, 0, 0)
console.log(game.currentPlayer)
console.log(game.gameBoard[0][0])

export { initGame, makeMove, getStatusMessage }