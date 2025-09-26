import { useState, useEffect } from 'react'
import './App.css'
import { Gameboard } from './components/Gameboard'
import { Status } from './components/Status'
import { type GameState, getStatusMessage } from './tictactoe'
import PickGame from './components/PickGame'

// TODO 5: create a pickGame component & createGame button
// once a game ID is selected display the Gameboard

function App() {
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null)

  // const gameId = '74ea2545-e44e-47ee-940e-50ae91fcc561'

  useEffect(() => {
    if (selectedGameId) {
      fetchGameState(selectedGameId)

    }
  }, [selectedGameId])

  const fetchGameState = async (gameIdToFetch: string) => {
    try {
      const res = await fetch(`/game/${gameIdToFetch}`)
      const data = await res.json()
      setGameState(data)
    } catch (error) {
      console.error('Failed to fetch game state:', error)
    }
  }

  const handleTileClick = async (cellIndex: number) => {
    console.log('Cell clicked:', cellIndex)

    try {
      const response = await fetch(`/move/${selectedGameId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ position: cellIndex })
      })

      const result = await response.json()
      console.log('Response from /move:', result)

      if (result.success) {
        setGameState(result.game)
      } else {
        console.error('Move failed:', result.error)
      }
    } catch (err) {
      console.error('Failed to make move:', err)
    }
  }

  const handleRestartClick = async () => {
    console.log('Restart game clicked!')

    try {
      const response = await fetch('/create', { method: 'POST' })
      const newGameState = await response.json()
      setGameState(newGameState)
    } catch (err) {
      console.error('Failed to restart game:', err)
    }
  }

  return (
    <>
      <div>
        <h1>Tic Tac React</h1>
        {selectedGameId ? (
          gameState ? (
            <>
              <Status statusMessage={getStatusMessage(gameState)} />
              <Gameboard gameState={gameState}
                handleTileClick={handleTileClick} />
              <button id='restartBtn'
                onClick={handleRestartClick}>
                Restart Game
              </button>
            </>
          ) : (
            <div>Loading game...</div>
          )
        ) : (
          <PickGame onGameSelected={setSelectedGameId} />
        )}
      </div>
    </>
  )
}

export default App
