import 'babel-polyfill'
import Game, { GAME_STATE_ACTIVE, GAME_STATE_DRAW, GAME_STATE_WON } from './game'

export default class {
  constructor (ctx) {
    this.ctx = ctx
    this.menu = document.getElementById('menu')
    this.configureButton = document.getElementById('configure-button')
    this.configureButton.addEventListener('click', this.handleConfigureClick.bind(this))

    this.game = null
    this.board = null
    this.nextChecker = null
    this.scoreboard = null
    this.dialog = null
    this.closeButton = null

    this.resizeDebounce = 50
    this.columns = []
    this.players = []
    this.checkers = []

    if (this.ctx) {
      this.game = new Game()
    }
    this.render()
    this.animate = () => {
      window.requestAnimationFrame(this.animate)
      this.updateCheckers()
    }
    this.animate()
  }
  configure (player = 2, columns = 7, rows = 6, length = 4) {
    if (this.game) {
      player = Number.parseInt(player, 10)
      columns = Number.parseInt(columns, 10)
      rows = Number.parseInt(rows, 10)
      length = Number.parseInt(length, 10)
      this.game.configure(player, columns, rows, length)
      this.renderBoard()
      this.renderScoreboard()
    }
  }
  handleCloseClick (e) {
    if (this.dialog) {
      this.dialog.parentNode.removeChild(this.dialog)
      this.dialog = null
      this.handleConfigureClick(e)
    }
  }
  handleColumnClick (e) {
    let target = e.target
    if (target.children.length < this.game.board.height && this.game.gameState === GAME_STATE_ACTIVE) {
      const columnId = Number.parseInt(target.getAttribute('data-column-id'), 10)
      this.makeChecker(this.game.players[this.game.currentPlayer - 1].color, target)
      this.game.addChecker(columnId)
      if (this.game.gameState === GAME_STATE_WON || this.game.gameState === GAME_STATE_DRAW) {
        this.dialog = document.createElement('div')
        this.dialog.setAttribute('class', 'dialog')
        if (this.game.gameState === GAME_STATE_WON) {
          this.dialog.innerHTML = `<h1>${this.game.winner.name} Wins!</h1><h3>(Click Here to Play Again)</h3>`
        } else if (this.game.gameState === GAME_STATE_DRAW) {
          this.dialog.innerHTML = `<h1>DRAW!</h1><h3>(Click Here to Play Again)</h3>`
        }
        // this.closeButton = document.createElement('div')
        // this.closeButton.setAttribute('class', 'close-button')
        this.dialog.addEventListener('click', this.handleCloseClick.bind(this))
        // this.dialog.appendChild(this.closeButton)
        this.ctx.appendChild(this.dialog)
        const ctxSize = this.ctx.getBoundingClientRect()
        const dialogSize = this.dialog.getBoundingClientRect()
        const offsetX = (ctxSize.width - dialogSize.width) / 2
        const offsetY = (ctxSize.height - dialogSize.height) / 2
        this.dialog.setAttribute('style', `left: ${offsetX}px; top: ${offsetY}px`)
      }
    }
  }
  handleConfigureClick (e) {
    e.preventDefault()
    if (this.dialog) {
      this.dialog.parentNode.removeChild(this.dialog)
      this.dialog = null
    }
    if (this.checkers.length > 0) {
      for (let checker of this.checkers) {
        checker.parentNode.removeChild(checker)
      }
      this.checkers = []
    }
    let players = document.getElementById('players').value
    let columns = document.getElementById('columns').value
    let rows = document.getElementById('rows').value
    let length = document.getElementById('length').value
    this.configure(players, columns, rows, length)
  }
  makeChecker (color, target) {
    let containerSize = target.getBoundingClientRect()
    let x = Math.floor((containerSize.width - 50) / 2)
    let checker = document.createElement('div')
    let targetY = containerSize.height - ((target.children.length + 1) * 60)
    checker.setAttribute('class', 'checker')
    checker.setAttribute('style', `background-color: ${color}; left: ${x}px; top: 0px;`)
    checker.state = { color, targetY, x, y: 0 }
    this.checkers.push(checker)
    target.appendChild(checker)
  }
  render () {
    if (this.ctx) {
      this.scoreboard = document.createElement('div')
      this.scoreboard.setAttribute('id', 'scoreboard')
      this.nextChecker = document.createElement('div')
      this.nextChecker.setAttribute('id', 'next-checker')
      this.board = document.createElement('div')
      this.board.setAttribute('id', 'board')
      this.ctx.insertBefore(this.scoreboard, this.menu)
      this.ctx.insertBefore(this.nextChecker, this.menu)
      this.ctx.insertBefore(this.board, this.menu)
      this.renderBoard()
      this.renderScoreboard()
    }
  }
  renderBoard () {
    if (this.board && this.game.board.isValidBoard) {
      if (this.columns.length > 0) {
        for (let column of this.columns) {
          column.parentNode.removeChild(column)
        }
        this.columns = []
      }
      this.board.setAttribute('data-board-width', this.game.board.width)
      for (let i = 0; i < this.game.board.width; i++) {
        let column = document.createElement('div')
        column.setAttribute('class', 'column')
        column.setAttribute('data-column-id', i + 1)
        column.addEventListener('click', this.handleColumnClick.bind(this))
        this.columns.push(column)
        this.board.appendChild(column)
      }
    }
  }
  renderScoreboard () {
    if (this.scoreboard && this.game.totalPlayers > 0) {
      if (this.players.length > 0) {
        for (let player of this.players) {
          player.parentNode.removeChild(player)
        }
        this.players = []
      }
      for (let i = 0; i < this.game.totalPlayers; i++) {
        let player = document.createElement('div')
        player.setAttribute('class', 'player')
        player.setAttribute('style', `background-color: ${this.game.players[i].color}`)
        player.innerHTML = this.game.players[i].name
        this.players.push(player)
        this.scoreboard.appendChild(player)
      }
    }
  }
  updateCheckers () {
    if (this.checkers.length > 0) {
      for (let checker of this.checkers) {
        let { color, targetY, x, y } = checker.state
        let delta = y - targetY
        if (Math.abs(delta) > 0.1) {
          y -= delta * 0.2
        }
        checker.setAttribute('style', `background-color: ${color}; left: ${x}px; top: ${y}px;`)
        checker.state = { color, targetY, x, y }
      }
    }
  }
}
