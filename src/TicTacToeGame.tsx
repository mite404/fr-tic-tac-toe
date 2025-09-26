import { useState } from "react";
import { initGame, getStatusMessage } from "./tictactoe";
import { Gameboard } from "./components/Gameboard";
import { Status } from "./components/Status";


function TicTacToeGame() {
  const [gameState, setGameState] = useState(initGame())

  console.log('Game state:', gameState)
  console.log('Game board:', gameState.gameBoard)

  return (
    <div>
      {/* Render the board based on gameState.board */}
      {gameState.gameBoard ? (
        <Gameboard gameState={gameState} />
      ) : null}

      {/* Show gameState.currentPlayer */}
      <Status statusMessage={getStatusMessage(gameState)} />
    </div>
  )
}

export default TicTacToeGame