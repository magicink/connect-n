import Board from './board'

export const GAME_STATE_ACTIVE = 'GAME_STATE_ACTIVE'
export const GAME_STATE_WON = 'GAME_STATE_WON'
export const GAME_STATE_DRAW = 'GAME_STATE_DRAW'

export default class {
  constructor (totalPlayers, columns, rows, winningLength) {
    this.totalPlayers = 0
    this.players = null
    this.currentPlayer = 0
    this.board = null
    this.gameState = null
    this.winner = null
    this.moves = 0
    this.configure(totalPlayers, columns, rows, winningLength)
  }
  nextPlayer () {
    if (this.players.length > 1) {
      if (this.currentPlayer === this.players.length) {
        this.currentPlayer = 1
      } else {
        this.currentPlayer++
      }
    }
  }
  configure (totalPlayers, columns, rows, winningLength) {
    this.totalPlayers = (Number.isInteger(totalPlayers) && totalPlayers > 1) ? totalPlayers : 2
    this.players = []
    for (let i = 1; i <= this.totalPlayers; i++) {
      this.players.push({
        playerId: i,
        name: `Player ${i}`,
        wins: 0
      })
    }
    this.currentPlayer = 1
    columns = (Number.isInteger(columns) && columns > 0) ? columns : 7
    rows = (Number.isInteger(rows) && rows > 0) ? rows : 6
    winningLength = (Number.isInteger(winningLength) && winningLength > 0) ? winningLength : 4
    this.board = new Board(columns, rows)
    if (this.board.isValidBoard) {
      this.gameState = GAME_STATE_ACTIVE
    }
  }
  addChecker (column) {
    let addedChecker = false
    if (this.gameState === GAME_STATE_ACTIVE && !this.board.isWon && !this.board.isFull()) {
      addedChecker = this.board.addChecker(this.currentPlayer, column)
    }
    if (addedChecker) {
      this.moves++
      // If the board is won then declare
      if (this.board.isWon) {
        this.gameState = GAME_STATE_WON
        this.winner = this.players[this.currentPlayer - 1]
        this.players[this.currentPlayer - 1].wins++
        return
      }
      // If the board is full but has not been won then the game is at a draw
      if (this.board.isFull() && !this.board.isWon) {
        this.gameState = GAME_STATE_DRAW
        return
      }
      // If the board is not full and there is no winner
      if (!this.board.isFull() && !this.board.isWon) {
        this.nextPlayer()
      }
    }
    return addedChecker
  }
  reset () {
    if (this.board && this.board.isValidBoard) {
      this.board.reset()
      this.gameState = GAME_STATE_ACTIVE
      this.winner = null
      this.currentPlayer = 1
    }
  }
}
