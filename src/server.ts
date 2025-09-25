import express from 'express'
import ViteExpress from 'vite-express'
import { type GameState, initGame, makeMove } from './tictactoe'
import fs from 'fs'

type MoveRequest = {
  position: number
}

const PORT = 3000
const app = express()
app.use(express.json())

const GAME_SAVE = 'gamestate.json'

// load game func
function loadGame(): GameState {
  try {
    const loadedGame = fs.readFileSync(GAME_SAVE, 'utf-8')
    return JSON.parse(loadedGame)
  } catch {
    return initGame()
  }
}

// save game func
function saveGame(state: GameState): void {
  try {
    fs.writeFileSync(GAME_SAVE, JSON.stringify(state))
  } catch (error) {
    console.error('Failed to save game:', error)
  }
}

let gameState: GameState = loadGame()

// GET game state route
app.get('/game', (_, res) => {
  res.json(gameState)
})


// POST a move to server
app.post('/move', (req, res) => {
  const moveReq = req.body as MoveRequest
  gameState = makeMove(gameState, moveReq.position)
  saveGame(gameState)
  res.json(gameState)
})

// create a new game
app.post('/new-game', (_, res) => {
  gameState = initGame()
  saveGame(gameState)
  res.json(gameState)
})

ViteExpress.listen(app, PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})