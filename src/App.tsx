import { useState, useEffect } from 'react'
import { Tile } from './components/Tile'
import './App.css'
import { Gameboard } from './components/Gameboard'
import { Status } from './components/Status'

type CurrentPlayer = 'X' | 'O'

export type GameboardProps = {
  gameState: Array<'X' | 'O' | ''>
  handleTileClick: (cellIndex: number) => void
}

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

function App() {
  const [gameState, setGameState] = useState<GameboardProps['gameState']>(['', '', '', '', '', '', '', '', ''])
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer>('X')
  const [statusMessage, setStatusMessage] = useState<string>("Player X's Turn")
  const [gameActive, setGameActive] = useState<boolean>(true)

  useEffect(() => {
    // Ignore initial empty board
    if (gameState.every(cell => cell === '')) return;

    const winner = validateResults(gameState);
    if (winner) {
      console.log('Winner result from validateResults:', winner);
      setGameActive(false);
      setStatusMessage(`Player ${winner} wins!`);
      return;
    }

    const isDraw = gameState.every(cell => cell !== '');
    console.log('Is draw detected:', isDraw)
    console.log('Current gameState in useEffect:', gameState);
    if (isDraw) {
      setGameActive(false);
      console.log('Draw state reached')
      setStatusMessage("It's a draw! :| ");
      return;
    }

    // No winner/draw: switch turns exactly once and update status
    setCurrentPlayer(prev => {
      const next = prev === 'X' ? 'O' : 'X';
      setStatusMessage(`${next}'s turn`);
      return next;
    });
  }, [gameState])

  const validateResults = (board: Array<'X' | 'O' | ''>): 'X' | 'O' | null => {
    console.log('--- Executing validateResults (New Version) ---');
    for (const [a, b, c] of winConditions) {
      console.log("Checking condition:", a, b, c, "Values:", board[a], board[b], board[c])
      if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
        console.log('WINNER DETECTED FOR:', a, b, c, 'Values:', JSON.stringify(board[a]), JSON.stringify(board[b]), JSON.stringify(board[c]));
        return board[a]
      }
    }
    return null
  }

  const handleTileClick = (cellIndex: number) => {
    console.log('Cell clicked:', cellIndex)

    if (!gameActive) {
      console.log('Game state no longer active!!')
      return
    }
    if (gameState[cellIndex] !== '') return

    setGameState(prev => {
      const next = [...prev];
      next[cellIndex] = currentPlayer
      return next
    });
  }

  const handleRestartClick = () => {
    setGameState(['', '', '', '', '', '', '', '', ''])
    console.log('Restart game clicked!')
    setCurrentPlayer('X')
    setGameActive(true)
    setStatusMessage("Player X's Turn!")
  }

  return (
    <>
      <div>
        <h1>Tic Tac React</h1>
        <Status statusMessage={statusMessage} />
        <Gameboard  gameState={gameState}
                    handleTileClick={handleTileClick}/>
        <button id='restartBtn' 
                onClick={handleRestartClick}>
          Restart Game
        </button>
      </div>
    </>
  )
}

export default App
