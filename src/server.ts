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
const games = new Map<string, GameState>()

// load game func
function loadGame(): Map<string, GameState> {
  try {
    const loadedGames = fs.readFileSync(savedGames, 'utf-8')
    const gamesObj = JSON.parse(loadedGames)
    const loadedGamesMap = new Map(Object.entries(gamesObj))

    return loadedGamesMap

  } catch {
    return initGame()
  }
}

// save game func
function saveAllGames(state: Map<string, GameState>): void {
  try {
    const savedGames = fs.writeFileSync(savedGames, JSON.stringify(state))
    const gamesObj = JSON.parse(savedGames)
    const savedGamesMap = Object.fromEntries(gamesObj)

  } catch (error) {
    console.error('Failed to save game:', error)
  }
}

let gameState: GameState = loadGame()

// GET list of all games
app.get('/games', (_, res) => {
  res.json(gameState)
})

// GET game state route
// TODO 5: add game ID /game route
app.get('/game/:id', (_, res) => {
  res.json(gameState)
})

// POST a move to server
// TODO 3: add game ID to /move route
app.post('/move/:id', (req, res) => {
  const gameId = req.params.id  // extract the gameId frm URL
  const currentGame = games.get(gameId)  // getting current game from Map via gameId

  if (!currentGame) {
    return res.status(404).json({ Error: 'Game ID not found!' })
  }

  const moveReq = req.body as MoveRequest

  const updatedGameState = makeMove(currentGame, moveReq.position)

  games.set(gameId, updatedGameState)
  saveAllGames(games)
  res.json(gameState)
})

// create a new game
app.post('/create', (_, res) => {
  const newGameId = uuid()

  gameState = initGame(newGameId)
  saveGame(gameState)
  res.json(gameState)
})

ViteExpress.listen(app, PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})