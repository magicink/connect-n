import Board from '../src/js/board'
import { expect } from 'chai'
import Game, { GAME_STATE_ACTIVE, GAME_STATE_DRAW, GAME_STATE_WON } from '../src/js/game'

describe('Game', () => {
  let game = new Game()
  describe('Construction', () => {
    it('should construct a game with the default settings', () => {
      expect(game.board).to.deep.equal(new Board(7, 6))
      expect(game.players).to.deep.equal([
        {playerId: 1, wins: 0},
        {playerId: 2, wins: 0}
      ])
      expect(game.totalPlayers).to.equal(2)
      expect(game.currentPlayer).to.equal(1)
    })
  })
  describe('Game Play', () => {
    it('should be active', () => {
      expect(game.gameState).to.equal(GAME_STATE_ACTIVE)
    })
    it('should detect a victory', () => {
      game.addChecker(1)
      expect(game.currentPlayer).to.equal(2)
      game.addChecker(2)
      expect(game.currentPlayer).to.equal(1)
      game.addChecker(2)
      game.addChecker(3)
      game.addChecker(4)
      game.addChecker(7)
      game.addChecker(8)
      expect(game.currentPlayer).to.equal(1)
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
      expect(game.gameState).to.equal(GAME_STATE_WON)
      expect(game.winner).to.deep.equal({
        playerId: 1,
        wins: 1
      })
    })
    it('should detect a draw', () => {
      game.configure(15)
      expect(game.players.length).to.equal(15)
      for (let i = 1; i < 16; i++) {
        for (let j = 1; j < 8; j++) {
          game.addChecker(j)
        }
      }
      expect(game.gameState).to.equal(GAME_STATE_DRAW)
    })
  })
})
