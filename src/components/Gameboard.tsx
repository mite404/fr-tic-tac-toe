import { Tile } from "./Tile";
import type { GameboardProps } from '../App';

export function Gameboard(props: GameboardProps) {
    const { gameState, handleTileClick } = props

    return (
        <div id="gameContainer">
            {gameState.map((currentContent: 'X' | 'O' | '', cellIndex: number) => {
                return <Tile key={cellIndex}
                            cellIndex={cellIndex}
                            currentContent={currentContent}
                            handleTileClick={handleTileClick}

                            />

            })}
        </div>
    )
}