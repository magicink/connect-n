// @flow
/* eslint sort-imports: ["error", {"ignoreCase": true}] */
/* eslint sort-keys: "error" */
import Game from './Game'

describe('Game', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  it('should initialize correctly', () => {
    const game = new Game(2, 8, 12, 4)
    expect(game.totalPlayers).toEqual(2)
  })
  it('should correct set the next player', () => {
    const game = new Game(2, 8, 12, 4)
    const nextPlayerSpy = jest.spyOn(game, 'nextPlayer')
    game.addChecker(2)
    expect(nextPlayerSpy).toHaveBeenCalled()
    expect(game.currentPlayer).toEqual(2)
  })
  it('should reset the game', () => {
    const game = new Game(2, 8, 12, 4)
    game.addChecker(2)
    expect(game.currentPlayer).toEqual(2)
    game.reset()
    expect(game.currentPlayer).toEqual(1)
  })
  it('should result in a win for player 1', () => {
    const game = new Game(2, 2, 2, 2)
    expect(game.players).toHaveLength(2)
    expect(game.winner).toBeNull()
    game.addChecker(1)
    game.addChecker(1)
    game.addChecker(2)
    expect(game.winner).toEqual(game.players[0])
    game.reset()
    expect(game.players[0].wins).toEqual(1)
  })
  it('should result in a draw', () => {
    const game = new Game(2, 3, 3, 3)
    game.addChecker(1)
    game.addChecker(1)
    game.addChecker(1)
    game.addChecker(2)
    game.addChecker(2)
    game.addChecker(3)
    game.addChecker(3)
    game.addChecker(3)
    game.addChecker(2)
    expect(game.gameState).toEqual('GAME_STATE_DRAW')
  })
  it('should find the correct player', () => {
    const game = new Game(2, 3, 3, 3)
    expect(game.findPlayer(2)).toEqual(game.players[1])
  })

  it('should return false when addChecker is called under invalid conditions', () => {
    const game = new Game(2)
    game.gameState = null
    expect(game.addChecker(0)).toBe(false)
    game.gameState = 'GAME_STATE_ACTIVE'
    game.board = null
    expect(game.addChecker(0)).toBe(false)
  })
})
