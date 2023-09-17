import Board from './Board'

const randomizeColor = function () {
  // Generate hue between 0 and 360
  const hue = Math.floor(Math.random() * 361)

  // Keep saturation and lightness constant to ensure color is vibrant and distinguishable
  const saturation = 90 // in percentage
  const lightness = 50 // in percentage

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

/**
 * Interface for player information.
 */
interface Player {
  color: string
  playerId: number
  name: string
  wins: number
}

/**
 * Main class representing the game logic.
 */
export default class Game {
  totalPlayers: number
  players: Player[]
  currentPlayer: number
  board: Board | null // Make sure to import your Board class
  gameState: 'GAME_STATE_ACTIVE' | 'GAME_STATE_WON' | 'GAME_STATE_DRAW' | null
  winner: Player | null
  moves: number

  /**
   * Initializes a new game instance.
   * @param totalPlayers - The total number of players.
   * @param columns - The number of columns in the board.
   * @param rows - The number of rows in the board.
   * @param winningLength - The length of consecutive checkers required to win.
   */
  constructor(totalPlayers: number, columns = 7, rows = 6, winningLength = 4) {
    this.totalPlayers = 0
    this.players = []
    this.currentPlayer = 0
    this.board = null
    this.gameState = null
    this.winner = null
    this.moves = 0
    this.configure(totalPlayers, columns, rows, winningLength)
  }

  /**
   * Adds a checker to a given column.
   * @param column - The column to which the checker is added.
   * @returns Whether the checker was successfully added.
   */
  addChecker(column: number): boolean {
    let addedChecker = false
    if (
      this.gameState === 'GAME_STATE_ACTIVE' &&
      this.board &&
      !this.board.isWon &&
      !this.board.isFull()
    ) {
      addedChecker = this.board.addChecker(this.currentPlayer, column)
    }

    if (addedChecker && this.board) {
      this.moves++
      if (this.board.isWon) {
        this.gameState = 'GAME_STATE_WON'
        this.winner = this.players[this.currentPlayer - 1]
        this.players[this.currentPlayer - 1].wins++
        return true
      }

      if (this.board.isFull() && !this.board.isWon) {
        this.gameState = 'GAME_STATE_DRAW'
        return true
      }

      if (!this.board.isFull() && !this.board.isWon) {
        this.nextPlayer()
        return true
      }
    }
    return false
  }

  /**
   * Configures the initial state of the game.
   * @param totalPlayers - The total number of players.
   * @param columns - The number of columns in the board.
   * @param rows - The number of rows in the board.
   * @param winningLength - The length of consecutive checkers required to win.
   */
  configure(
    totalPlayers: number,
    columns: number,
    rows: number,
    winningLength: number
  ): void {
    this.totalPlayers = totalPlayers > 1 ? totalPlayers : 2
    this.players = []
    for (let i = 1; i <= this.totalPlayers; i++) {
      this.players.push({
        color: randomizeColor(),
        playerId: i,
        name: `Player ${i}`,
        wins: 0
      })
    }
    this.currentPlayer = 1
    this.board = new Board(columns, rows, winningLength)
    if (this.board.isValidBoard) {
      this.gameState = 'GAME_STATE_ACTIVE'
    }
  }

  findPlayer(playerId: number) {
    return this.players.find((element, index, array) => {
      return element.playerId === playerId
    })
  }

  nextPlayer() {
    if (this.currentPlayer === this.players.length) {
      this.currentPlayer = 1
    } else {
      this.currentPlayer++
    }
  }

  reset() {
    if (this.board && this.board.isValidBoard) {
      this.board.reset()
      this.gameState = 'GAME_STATE_ACTIVE'
      this.winner = null
      this.currentPlayer = 1
    }
  }
}
