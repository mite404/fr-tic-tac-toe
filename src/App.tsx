import { useState, useEffect } from 'react'
import './App.css'
import { Gameboard } from './components/Gameboard'
import { Status } from './components/Status'
import { type GameState, getStatusMessage } from './tictactoe'

function App() {
  const [gameState, setGameState] = useState<GameState | null>(null)

  // Fetch game state from server on component mount
  useEffect(() => {
    fetch('/game')
      .then(res => res.json())
      .then(data => setGameState(data))
      .catch(err => console.error('Failed to fetch game state:', err))
  }, [])

  const handleTileClick = async (cellIndex: number) => {
    console.log('Cell clicked:', cellIndex)

    try {
      const response = await fetch('/move', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ position: cellIndex })
      })

      const newGameState = await response.json()
      setGameState(newGameState)
    } catch (err) {
      console.error('Failed to make move:', err)
    }
  }

  const handleRestartClick = async () => {
    console.log('Restart game clicked!')

    try {
      const response = await fetch('/new-game', { method: 'POST' })
      const newGameState = await response.json()
      setGameState(newGameState)
    } catch (err) {
      console.error('Failed to restart game:', err)
    }
  }

  // Show loading state while fetching initial game state
  if (!gameState) {
    return <div>Loading game...</div>
  }

  return (
    <>
      <div>
        <h1>Tic Tac React</h1>
        <Status statusMessage={getStatusMessage(gameState)} />
        <Gameboard gameState={gameState}
          handleTileClick={handleTileClick} />
        <button id='restartBtn'
          onClick={handleRestartClick}>
          Restart Game
        </button>
      </div>
    </>
  )
}

export default App
