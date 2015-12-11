import { Board, Column } from '../src/core'
import { expect } from 'chai'

describe('Core', () => {
  describe('Column', () => {
    describe('Construction', () => {
      it('should create a column of the appropriate size', () => {
        let column = new Column(5)
        expect(column.rows.length).to.equal(5)
        column = new Column(25)
        expect(column.rows.length).to.equal(25)
      })
      it('should handle strings invalid input data', () => {
        let columnA = new Column('dog')
        expect(columnA.rows.length).to.equal(0)

        let columnB = new Column(-5)
        expect(columnB.rows.length).to.equal(0)

        let columnC = new Column(0.008)
        expect(columnC.rows.length).to.equal(0)
      })
    })
    describe('Adding Checker', () => {
      let column = new Column(3)
      it('should add a checker to the bottom row', () => {
        column.addChecker(1)
        expect(column.rows).to.deep.equal([1, 0, 0])
        expect(column.availableRows).to.equal(2)
        column.addChecker(2)
        expect(column.rows).to.deep.equal([1, 2, 0])
        expect(column.availableRows).to.equal(1)
      })
      it('should handle invalid input data', () => {
        column.addChecker('A')
        column.addChecker(0.208)
        column.addChecker(-1)
        expect(column.rows).to.deep.equal([1, 2, 0])
      })
      it('should not let you add more checkers once all rows are filled', () => {
        column.addChecker(3)
        expect(column.addChecker(4)).to.equal(false)
        expect(column.rows).to.deep.equal([1, 2, 3])
        expect(column.availableRows).to.equal(0)
      })
    })
    describe('Reset', () => {
      let column = new Column(5)
      column.addChecker(1)
      column.addChecker(1)
      column.addChecker(2)
      column.addChecker(1)
      it('should clear all checkers from the row', () => {
        column.reset()
        expect(column.rows).to.deep.equal([0, 0, 0, 0, 0])
        expect(column.availableRows).to.equal(5)
      })
    })
  })
  describe('Board', () => {
    describe('Construction', () => {
      it('should construct a board with the appropriate number columns', () => {
        const board = new Board(3, 4)
        expect(board).to.deep.equal({
          columns: [
            { availableRows: 4, maxRows: 4, rows: [0, 0, 0, 0] },
            { availableRows: 4, maxRows: 4, rows: [0, 0, 0, 0] },
            { availableRows: 4, maxRows: 4, rows: [0, 0, 0, 0] }
          ],
          height: 4,
          isDiagonalWinPossible: false,
          isWinningPossible: true,
          isWon: false,
          width: 3,
          winningLength: 4
        })
      })
    })
    describe('Adding Checker', () => {
      let board = new Board(2, 2)
      it('should properly add checkers to columns', () => {
        board.addChecker(1, 1)
        board.addChecker(2, 2)
        board.addChecker(3, 1)
        expect(board).to.deep.equal({
          columns: [
            { availableRows: 0, maxRows: 2, rows: [1, 3] },
            { availableRows: 1, maxRows: 2, rows: [2, 0] }
          ],
          height: 2,
          isDiagonalWinPossible: false,
          isWinningPossible: false,
          isWon: false,
          width: 2,
          winningLength: 4
        })
      })
      it('should detect when the board is full', () => {
        expect(board.isFull()).to.equal(false)
        board.addChecker(4, 2)
        expect(board.isFull()).to.equal(true)
      })
      it('should not add more any checkers once the board is full', () => {
        expect(board.addChecker(5, 1)).to.equal(false)
        expect(board).to.deep.equal({
          columns: [
            { availableRows: 0, maxRows: 2, rows: [1, 3] },
            { availableRows: 0, maxRows: 2, rows: [2, 4] }
          ],
          height: 2,
          isDiagonalWinPossible: false,
          isWinningPossible: false,
          isWon: false,
          width: 2,
          winningLength: 4
        })
      })
    })
    describe('Checking Winning Conditions', () => {
      it('should detect whether winning is possible', () => {
        let boardA = new Board(7, 6)
        expect(boardA.isWinningPossible).to.equal(true)
        let boardB = new Board(3, 3)
        expect(boardB.isWinningPossible).to.equal(false)
      })
      it('should detect whether a diagonal win is possible', () => {
        let boardA = new Board(7, 6)
        expect(boardA.isDiagonalWinPossible).to.equal(true)
        let boardB = new Board(7, 2)
        expect(boardB.isDiagonalWinPossible).to.equal(false)
        expect(boardB.isWinningPossible).to.equal(true)
      })
      it('should detect horizontal winning conditions', () => {
        let board = new Board(7, 6)
        board.addChecker(1, 1)
        expect(board.isWon).to.equal(false)
        board.addChecker(1, 7)
        expect(board.isWon).to.equal(false)
        board.addChecker(1, 2)
        expect(board.isWon).to.equal(false)
        board.addChecker(1, 3)
        expect(board.isWon).to.equal(false)
        board.addChecker(1, 6)
        expect(board.isWon).to.equal(false)
        board.addChecker(1, 5)
        expect(board.isWon).to.equal(false)
        board.addChecker(1, 4)
        expect(board.isWon).to.equal(true)
      })
      it('should detect vertical winning conditions', () => {
        let board = new Board(7, 6)
        board.addChecker(1, 3)
        expect(board.isWon).to.equal(false)
        board.addChecker(1, 3)
        expect(board.isWon).to.equal(false)
        board.addChecker(1, 3)
        expect(board.isWon).to.equal(false)
        board.addChecker(1, 3)
        expect(board.isWon).to.equal(true)
      })
      it('should detect diagonal up winning conditions', () => {
        let boardA = new Board(7, 6)
        boardA.addChecker(1, 1)
        boardA.addChecker(2, 2)
        boardA.addChecker(1, 2)
        boardA.addChecker(2, 3)
        boardA.addChecker(2, 3)
        boardA.addChecker(1, 3)
        boardA.addChecker(2, 4)
        boardA.addChecker(2, 4)
        boardA.addChecker(2, 4)
        boardA.addChecker(1, 4)
        expect(boardA.isWon).to.equal(true)
        let boardB = new Board(7, 6)
        boardB.addChecker(2, 2)
        boardB.addChecker(1, 2)
        boardB.addChecker(2, 3)
        boardB.addChecker(2, 3)
        boardB.addChecker(1, 3)
        boardB.addChecker(2, 4)
        boardB.addChecker(2, 4)
        boardB.addChecker(2, 4)
        boardB.addChecker(1, 4)
        boardB.addChecker(1, 1)
        expect(boardB.isWon).to.equal(true)
        let boardC = new Board(7, 6)
        boardC.addChecker(2, 2)
        boardC.addChecker(1, 2)
        boardC.addChecker(2, 3)
        boardC.addChecker(2, 3)
        boardC.addChecker(2, 4)
        boardC.addChecker(2, 4)
        boardC.addChecker(2, 4)
        boardC.addChecker(1, 4)
        boardC.addChecker(1, 1)
        boardC.addChecker(1, 3)
        expect(boardC.isWon).to.equal(true)
        let boardD = new Board(7, 6, 5)
        boardD.addChecker(1, 1)
        boardD.addChecker(2, 2)
        boardD.addChecker(1, 2)
        boardD.addChecker(2, 3)
        boardD.addChecker(2, 3)
        boardD.addChecker(1, 3)
        boardD.addChecker(2, 4)
        boardD.addChecker(2, 4)
        boardD.addChecker(2, 4)
        boardD.addChecker(1, 4)
        expect(boardD.isWon).to.equal(false)
      })
      it('should detect diagonal down winning conditions', () => {
        let boardA = new Board(7, 6)
        boardA.addChecker(1, 1)
        boardA.addChecker(2, 1)
        boardA.addChecker(1, 1)
        boardA.addChecker(2, 2)
        boardA.addChecker(1, 1)
        boardA.addChecker(2, 2)
        boardA.addChecker(1, 2)
        boardA.addChecker(2, 3)
        boardA.addChecker(1, 3)
        boardA.addChecker(2, 5)
        boardA.addChecker(1, 4)
        expect(boardA.isWon).to.equal(true)
      })
    })
    describe('Resetting the Board', () => {
      it('should reset the board', () => {
        let boardA = new Board(7, 6)
        boardA.addChecker(1, 1)
        boardA.addChecker(2, 1)
        boardA.addChecker(1, 1)
        boardA.addChecker(2, 2)
        boardA.addChecker(1, 1)
        boardA.addChecker(2, 2)
        boardA.addChecker(1, 2)
        boardA.addChecker(2, 3)
        boardA.addChecker(1, 3)
        boardA.addChecker(2, 5)
        boardA.addChecker(1, 4)
        expect(boardA.isWon).to.equal(true)
        boardA.reset()
        expect(boardA.isWon).to.equal(false)
      })
    })
  })
})
