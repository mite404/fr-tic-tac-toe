import { useState, useEffect } from 'react'
import './App.css'
import { Gameboard } from './components/Gameboard'
import { Status } from './components/Status'
import { type GameState, getStatusMessage } from './tictactoe'

// TODO 5: create a pickGame component & createGame button
// once a game ID is selected display the Gameboard

function App() {
  const [gameState, setGameState] = useState<GameState | null>(null)

  const gameId = '74ea2545-e44e-47ee-940e-50ae91fcc561'

  // Fetch game state from server on component mount
  const fetchGameState = async () => {
    try {
      const res = await fetch(`/game/${gameId}`)
      const data = await res.json()
      setGameState(data)
    } catch (error) {
      console.error('Failed to fetch game state:', error)
    }
  }

  useEffect(() => {
    fetchGameState()
  }, [])

  const handleTileClick = async (cellIndex: number) => {
    console.log('Cell clicked:', cellIndex)

    try {
      const response = await fetch(`/move/${gameId}`, {
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
