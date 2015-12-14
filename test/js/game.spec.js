import Board from '../../src/js/board'
import expect from 'expect'
import Game, { GAME_STATE_ACTIVE, GAME_STATE_DRAW, GAME_STATE_WON } from '../../src/js/game'

describe('Game', () => {
  let game = new Game()
  describe('Construction', () => {
    it('should construct a game with the default settings', () => {
      expect(game.board).toEqual(new Board(7, 6))
      expect(game.players[0].playerId).toBe(1)
      expect(game.players[1].playerId).toBe(2)
      expect(game.totalPlayers).toBe(2)
      expect(game.currentPlayer).toBe(1)
    })
  })
  describe('Game Play', () => {
    it('should be active', () => {
      expect(game.gameState).toBe(GAME_STATE_ACTIVE)
    })
    it('should detect a victory', () => {
      game.addChecker(1)
      expect(game.currentPlayer).toBe(2)
      game.addChecker(2)
      expect(game.currentPlayer).toBe(1)
      game.addChecker(2)
      game.addChecker(3)
      game.addChecker(4)
      game.addChecker(7)
      game.addChecker(8)
      expect(game.currentPlayer).toBe(1)
      game.addChecker(7)
      game.addChecker(4)
      game.addChecker(5)
      game.addChecker(6)
      game.addChecker(6)
      game.addChecker(5)
      game.addChecker(4)
      game.addChecker(5)
      game.addChecker(3)
      game.addChecker(3)
      game.addChecker(5)
      game.addChecker(6)
      game.addChecker(6)
      game.addChecker(7)
      game.addChecker(6)
      expect(game.gameState).toBe(GAME_STATE_WON)
      expect(game.winner.playerId).toBe(1)
    })
    it('should detect a draw', () => {
      game.configure(15)
      expect(game.players.length).toBe(15)
      for (let i = 1; i < 16; i++) {
        for (let j = 1; j < 8; j++) {
          game.addChecker(j)
        }
      }
      expect(game.gameState).toBe(GAME_STATE_DRAW)
    })
  })
})
