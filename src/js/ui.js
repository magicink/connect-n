import $ from 'jquery'
import Game from './game'

export default class {
  constructor (ctx) {
    this._ctx = null
    this.ctx = (ctx instanceof $) ? ctx : null
    if (this.ctx) this._ctx = $(ctx)
    this.game = null
    this.gameBoard = null
    this.gameMenu = null
    this.gameStats = null
    if (this.ctx) {
      this.game = new Game()
    }
    this.renderUI()
  }
  renderUI () {
    if (!this.gameBoard) {
      this.gameBoard = $('<div/>', {
        id: 'game-board'
      })
    }
    if (this._ctx) {
      this._ctx.append(this.gameBoard)
    }
  }
  renderBoard () {
  }
}
