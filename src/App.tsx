import { useState } from 'react'
import './App.css'
import { Gameboard } from './components/Gameboard'
import { type GameState, initGame, makeMove, } from './tictactoe'



// TODO: winConditions extract tictactoe.ts


function App() {
  const [gameState, setGameState] = useState<GameState>(initGame())

  const handleTileClick = (cellIndex: number) => {
    console.log('Cell clicked:', cellIndex)

    const nextGameState = makeMove(gameState, cellIndex)
    setGameState(nextGameState)
  }

  const handleRestartClick = () => {
    setGameState(initGame())
    console.log('Restart game clicked!')
    // setCurrentPlayer('X')
    // setGameActive(true)
    // setStatusMessage("Player X's Turn!")
  }

  return (
    <>
      <div>
        <h1>Tic Tac React</h1>
        {/* <Status statusMessage={statusMessage} />  */}
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
