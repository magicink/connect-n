import 'babel-polyfill'
import Game, { GAME_STATE_ACTIVE, GAME_STATE_WON } from './game'

export default class {
  constructor (ctx) {
    this.ctx = ctx
    this.game = null
    this.board = null
    this.menu = null
    this.scoreboard = null
    this.resizeDebounce = 100
    if (this.ctx) {
      this.game = new Game()
    }
    this.render()
  }
  configure (totalPlayers = 2, columns = 7, rows = 6, winningLength = 4) {
    if (this.game) {
      this.game.configure(totalPlayers, columns, rows, winningLength)
    }
    this.renderBoard()
    // this.renderScoreboard()
  }
  createChecker () {}
  render () {
    if (this.ctx) {
      this.menu = document.getElementById('menu')
      this.nextChecker = document.createElement('div')
      this.nextChecker.setAttribute('id', 'next-checker')
      this.board = document.createElement('div')
      this.board.setAttribute('id', 'board')
      // console.log(this.menu, this.board)
      this.ctx.insertBefore(this.nextChecker, this.menu)
      this.ctx.insertBefore(this.board, this.menu)
      this.renderBoard()
    }
  }
  renderBoard () {
    if (this.board && this.game.board.isValidBoard) {
      let existingColumns = document.getElementsByClassName('columns')
      if (existingColumns.length > 0) existingColumns.remove()
      this.board.setAttribute('data-board-width', this.game.board.width)
      for (let i = 0; i < this.game.board.width; i++) {
        let column = document.createElement('div')
        column.setAttribute('class', 'column')
        this.board.appendChild(column)
      }
    }
  }
  // render () {
  //   if (this.ctx) {
  //     this.menu = $('#menu')
  //     if ($(this.menu).length > 0) {
  //       this.board = $('<section/>', {id: 'board'})
  //       this.scoreboard = $('<section/>', {id: 'scoreboard'})
  //       $(this.menu).before($(this.board))
  //       $(this.board).before($(this.scoreboard))
  //     }
  //     if ($('button[name="configure"]').length > 0) {
  //       $('button[name="configure"]').on('click', (e) => {
  //         e.preventDefault()
  //         let players = Number.parseInt($('#players').val(), 10)
  //         let columns = Number.parseInt($('#columns').val(), 10)
  //         let rows = Number.parseInt($('#rows').val(), 10)
  //         let length = Number.parseInt($('#length').val(), 10)
  //         this.configure(players, columns, rows, length)
  //       })
  //     }
  //     this.renderBoard()
  //     this.renderScoreboard()
  //   }
  // }
  // renderBoard () {
  //   if (this.board && this.game.board.isValidBoard) {
  //     $(this.board).attr('data-board-width', this.game.board.width)
  //     if ($('.column').length > 0) $('.column').remove()
  //     for (let i = 0; i < this.game.board.width; i++) {
  //       let column = $('<div/>')
  //       $(column)
  //         .addClass('column')
  //         .attr('data-column-id', i + 1)
  //       $(this.board).append($(column))
  //     }
  //   }
  // }
  // renderScoreboard () {
  //   if (this.scoreboard && this.game.totalPlayers) {
  //     if ($('.player').length > 0) $('.player').remove()
  //     for (let i = 0; i < this.game.totalPlayers; i++) {
  //       let player = $('<div/>')
  //       $(player)
  //         .addClass('player')
  //         .attr('data-player-id', i + 1)
  //       $(this.scoreboard).append($(player))
  //     }
  //   }
  // }
  // reset () {}
  // update () {}
}
