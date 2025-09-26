import express from 'express'
import ViteExpress from 'vite-express'
import { type GameState, initGame, makeMove } from './tictactoe'
import fs from 'fs'
import { v4 as uuid } from 'uuid'

type MoveRequest = {
  position: number
}

const PORT = 3000
const app = express()
app.use(express.json())

const savedGames = 'saved_games.json'
const games: Map<string, GameState> = loadGames()

// load game func
function loadGames(): Map<string, GameState> {
  try {
    const loadedGames = fs.readFileSync(savedGames, 'utf-8')
    const gamesObj = JSON.parse(loadedGames)
    const loadedGamesMap = new Map<string, GameState>(Object.entries(gamesObj))

    return loadedGamesMap

  } catch {
    return new Map<string, GameState>()
  }
}

// save game func
function saveAllGames(state: Map<string, GameState>): void {
  try {
    const gamesObj = Object.fromEntries(state)
    fs.writeFileSync(savedGames, JSON.stringify(gamesObj))

  } catch (error) {
    console.error('Failed to save game:', error)
  }
}

// GET list of all games
app.get('/games', (_, res) => {
  if (games.size === 0) {
    return res.status(200).json([])
  }
  const gamesArray = Array.from(games.values())

  res.json(gamesArray)
})

// GET game state route
app.get('/game/:id', (req, res) => {
  const game = games.get(req.params.id)

  if (!game) {
    return res.status(404).json({ error: 'Game not found!' })
  }

  res.json(game)
})

// POST a move to server
app.post('/move/:id', (req, res) => {
  const gameId = req.params.id  // extract the gameId frm URL
  const currentGame = games.get(gameId)  // getting current game from Map via gameId

  if (!currentGame) {
    return res.status(404).json({
      success: false,
      error: 'Game ID not found!'
    })
  }

  const moveReq = req.body as MoveRequest
  const updatedGameState = makeMove(currentGame, moveReq.position)

  games.set(gameId, updatedGameState)
  saveAllGames(games)

  res.status(201).json({
    success: true,
    game: updatedGameState
  })
})

// create a new game
app.post('/create', (_, res) => {
  const newGameId = uuid()
  const newGameState = initGame(newGameId)

  games.set(newGameId, newGameState)

  saveAllGames(games)
  res.json(newGameState)
})

ViteExpress.listen(app, PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})