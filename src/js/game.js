import Board from './board'

export const GAME_STATE_ACTIVE = 'GAME_STATE_ACTIVE'
export const GAME_STATE_WON = 'GAME_STATE_WON'
export const GAME_STATE_DRAW = 'GAME_STATE_DRAW'

export default class {
  constructor (totalPlayers, columns = 7, rows = 6, winningLength = 4) {
    this.totalPlayers = 0
    this.players = []
    this.currentPlayer = 0
    this.board = null
    this.gameState = null
    this.winner = null
    this.moves = 0
    this.configure(totalPlayers, columns, rows, winningLength)
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

  configure (totalPlayers, columns, rows, winningLength) {
    this.totalPlayers = (totalPlayers > 1) ? totalPlayers : 2
    this.players = []
    for (let i = 1; i <= this.totalPlayers; i++) {
      let red = Math.floor((Math.random() * 255))
      let blue = Math.floor((Math.random() * 255))
      let green = Math.floor((Math.random() * 255))
      red = Math.floor((red + 200) / 2)
      blue = Math.floor((blue + 200) / 2)
      green = Math.floor((green + 200) / 2)
      this.players.push({
        color: `rgb(${red}, ${blue}, ${green})`,
        playerId: i,
        name: `Player ${i}`,
        wins: 0
      })
    }
    this.currentPlayer = 1
    this.board = new Board(columns, rows, winningLength)
    if (this.board.isValidBoard) {
      this.gameState = GAME_STATE_ACTIVE
    }
  }

  findPlayer (playerId) {
    return this.players.find((element, index, array) => {
      return element.playerId === playerId
    })
  }

  nextPlayer () {
    if (this.currentPlayer === this.players.length) {
      this.currentPlayer = 1
    } else {
      this.currentPlayer++
    }
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
