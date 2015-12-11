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
      it('Should detect whether winning is possible', () => {
        let boardA = new Board(7, 6)
        expect(boardA.isWinningPossible).to.equal(true)
        let boardB = new Board(3, 3)
        expect(boardB.isWinningPossible).to.equal(false)
      })
      it('Should detect whether a diagonal win is possible', () => {
        let boardA = new Board(7, 6)
        expect(boardA.isDiagonalWinPossible).to.equal(true)
        let boardB = new Board(7, 2)
        expect(boardB.isDiagonalWinPossible).to.equal(false)
        expect(boardB.isWinningPossible).to.equal(true)
      })
      it('Should attempt determine if the board has been won if winning is possible', () => {
        const board = new Board(7, 6)
        board.addChecker(1, 1)
        board.addChecker(1, 2)
        board.addChecker(1, 3)
        board.addChecker(1, 4)
      })
    })
  })
})
