import type { GameState } from "../tictactoe";
import { Tile } from "./Tile";


export type GameboardProps = {
  gameState: GameState
  handleTileClick: (cellIndex: number) => void
}


export function Gameboard(props: GameboardProps) {
  const { gameState, handleTileClick } = props

  return (
    <div id="gameContainer">
      {gameState.gameBoard.map((currentContent: 'X' | 'O' | '', cellIndex: number) => {
        return <Tile key={cellIndex}
          cellIndex={cellIndex}
          currentContent={currentContent}
          handleTileClick={handleTileClick}
          isGameOver={!!gameState.endState}

        />

      })}
    </div>
  )
}