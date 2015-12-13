import $ from 'jquery'
import Game from './game'

export default class {
  constructor (ctx) {
    this.ctx = (ctx instanceof $) ? ctx : null
    this.game = null
    this.board = null
    this.column = null
    this.menu = null
    this.scoreboard = null
    if (this.ctx) {
      this.game = new Game()
    }
    this.render()
  }
  render () {
    if (this.ctx) {
      this.menu = $('#menu')
      if ($(this.menu).length > 0) {
        this.board = $('<section/>', {id: 'board'})
        this.scoreboard = $('<section/>', {id: 'scoreboard'})
        $(this.menu).before($(this.board))
        $(this.board).before($(this.scoreboard))
      }
      if ($('button[name="configure"]').length > 0) {
        $('button[name="configure"]').on('click', (e) => {
          e.preventDefault()
          let players = Number.parseInt($('#players').val(), 10)
          let columns = Number.parseInt($('#columns').val(), 10)
          let rows = Number.parseInt($('#rows').val(), 10)
          let length = Number.parseInt($('#length').val(), 10)
          this.configure(players, columns, rows, length)
        })
      }
      this.renderBoard()
      this.renderScoreboard()
    }
  }
  renderBoard () {
    if (this.board && this.game.board.isValidBoard) {
      if ($('.column').length > 0) $('.column').remove()
      for (let i = 0; i < this.game.board.width; i++) {
        let column = $('<div/>')
        $(column).addClass('column')
        $(this.board).append($(column))
      }
    }
  }
  renderScoreboard () {
    if (this.scoreboard && this.game.totalPlayers) {
      if ($('.player').length > 0) $('.player').remove()
      for (let i = 0; i < this.game.totalPlayers; i++) {
        let player = $('<div/>')
        $(player)
          .addClass('player')
          .attr('data-player-id', i + 1)
        $(this.scoreboard).append($(player))
      }
    }
  }
  configure (totalPlayers = 2, columns = 7, rows = 6, winningLength = 4) {
    if (this.game) {
      this.game.configure(totalPlayers, columns, rows, winningLength)
    }
    this.renderBoard()
    this.renderScoreboard()
  }
}
