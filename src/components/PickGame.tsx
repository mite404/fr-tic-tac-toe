import { useEffect, useState } from "react";
import type { GameState } from "../tictactoe";

interface PickGameProps {
  onGameSelected: (gameId: string) => void
}

function PickGame({ onGameSelected }: PickGameProps) {
  const [games, setGames] = useState<GameState[]>([])

  useEffect(() => {
    fetchGamesList()
  }, [])


  // state for games list


  // fetch list of all games
  const fetchGamesList = async () => {
    const res = await fetch('/games')
    const result = await res.json()
    setGames(result)
  }

  const createNewGame = async () => {
    const res = await fetch('/create', {
      method: 'POST',
    })
    const result = await res.json()

    // start new game
    onGameSelected(result.gameId)
  }

  return (
    <>
      <button onClick={createNewGame}>Create Game!</button>
      {games.length > 0 ? (
        <ul>
          {games.map((game: GameState) => (
            <li key={game.gameId}>
              <button onClick={() => onGameSelected(game.gameId)}>
                {game.gameId}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </>
  )
}

export default PickGame