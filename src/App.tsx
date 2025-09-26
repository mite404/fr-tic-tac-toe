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
    if (!selectedGameId) return

    try {
      const response = await fetch(`/game/${selectedGameId}/restart`, { method: 'POST' })
      // refetch updated game state from server
      await fetchGameState(selectedGameId)

      const freshGameState = await response.json()
      setGameState(freshGameState)

    } catch (err) {
      console.error('Failed to restart game:', err)
    }
  }

  const handleBackToPickGame = () => {
    setSelectedGameId(null)
    setGameState(null)
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button id='restartBtn'
                  onClick={handleRestartClick}>
                  Restart Game
                </button>
                <button id='backToPickGameBtn'
                  onClick={handleBackToPickGame}
                >
                  Back to Games List
                </button>
              </div>
            </>
          ) : (
            <div>Loading game...</div>
          )
        ) : (
          <PickGame onGameSelected={setSelectedGameId} />
        )}
      </div >
    </>
  )
}

export default App
