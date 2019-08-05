// @flow
/* eslint sort-imports: ["error", {"ignoreCase": true}] */
/* eslint sort-keys: "error" */
import Board from './board'

describe('Board', () => {
  it('should initialize correctly', () => {
    const board = new Board(20, 20)
    expect(board.winningLength).toEqual(4)
    const invalidBoard = new Board(2, 2, 3)
    expect(invalidBoard.isValidBoard).toEqual(true)
    expect(invalidBoard.isWinningPossible).toEqual(false)
  })
  it('should throw errors', () => {
    expect(() => {
      new Board('1', 2)
    }).toThrow()
    expect(() => {
      new Board(1, '2')
    }).toThrow()
    expect(() => {
      new Board(1, 2, '2')
    }).toThrow()
  })
  it('should add a checker', () => {
    const board = new Board(4, 4)
    expect(board.columns[1].availableRows).toEqual(4)
    const result = board.addChecker(1, 2)
    expect(result).toEqual(true)
    expect(board.columns[1].availableRows).toEqual(3)
  })
  it('should not add a new checker', () => {
    const board = new Board(4, 4)
    let result = board.addChecker(1, 5)
    expect(result).toEqual(false)
    result = board.addChecker(1, 'p')
    expect(result).toEqual(false)
    result = board.addChecker(1, 0)
    expect(result).toEqual(false)
    result = board.addChecker(1, 1)
    expect(result).toEqual(true)
  })
  it('should correctly be full and then reset', () => {
    const board = new Board(1, 4)
    expect(board.isWinningPossible).toEqual(true)
    board.addChecker(1, 1)
    expect(board.columns[0].availableRows).toEqual(3)
    board.addChecker(2, 1)
    expect(board.columns[0].availableRows).toEqual(2)
    board.addChecker(1, 1)
    expect(board.columns[0].availableRows).toEqual(1)
    board.addChecker(2, 1)
    expect(board.columns[0].availableRows).toEqual(0)
    expect(board.isFull()).toEqual(true)
    board.reset()
    expect(board.isFull()).toEqual(false)
  })
  it('should not be possible to win', () => {
    const board = new Board(2, 2)
    expect(board.isWinningPossible).toEqual(false)
  })
  it('should set the game state to having been won (vertical)', () => {
    const board = new Board(2, 2, 2)
    expect(board.isWinningPossible).toEqual(true)
    board.addChecker(1, 1)
    expect(board.isWon).toEqual(false)
    board.addChecker(1, 1)
    expect(board.isWon).toEqual(true)
  })
  it('should check for the win condition horizontally', () => {
    const board = new Board(3, 3, 3)
    board.addChecker(1, 1)
    expect(board.isWon).toEqual(false)
    board.addChecker(1, 3)
    expect(board.isWon).toEqual(false)
    board.addChecker(1, 2)
    expect(board.isWon).toEqual(true)
  })
  it('should check for the win condition (right-to-left upwards diagonal)', () => {
    const board = new Board(3, 3, 3)
    board.addChecker(2, 1)
    board.addChecker(2, 1)
    board.addChecker(2, 2)
    expect(board.isWon).toEqual(false)
    board.addChecker(1, 3)
    board.addChecker(1, 2)
    board.addChecker(1, 1)
    expect(board.isWon).toEqual(true)
  })
  it('should check for the win condition (right-to-left downward diagonal)', () => {
    const board = new Board(3, 3, 3)
    board.addChecker(2, 1)
    board.addChecker(2, 1)
    board.addChecker(2, 2)
    expect(board.isWon).toEqual(false)
    board.addChecker(1, 1)
    board.addChecker(1, 2)
    board.addChecker(1, 3)
    expect(board.isWon).toEqual(true)
  })
  it('should check for the win condition (left-to-right upward diagonal)', () => {
    const board = new Board(3, 3, 3)
    board.addChecker(2, 2)
    board.addChecker(2, 3)
    board.addChecker(2, 3)
    expect(board.isWon).toEqual(false)
    board.addChecker(1, 3)
    board.addChecker(1, 2)
    board.addChecker(1, 1)
    expect(board.isWon).toEqual(true)
  })
  it('should check for the win condition (left-to-right downwards diagonal)', () => {
    const board = new Board(3, 3, 3)
    board.addChecker(2, 2)
    board.addChecker(2, 3)
    board.addChecker(2, 3)
    expect(board.isWon).toEqual(false)
    board.addChecker(1, 1)
    board.addChecker(1, 2)
    board.addChecker(1, 3)
    expect(board.isWon).toEqual(true)
  })
})