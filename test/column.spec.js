import Column from '../src/js/column'
import { expect } from 'chai'

describe('Column', () => {
  describe('Construction', () => {
    it('should create a column of the appropriate size', () => {
      let column = new Column(5)
      expect(column.rows.length).to.equal(5)
      column = new Column(25)
      expect(column.rows.length).to.equal(25)
    })
    it('should handle strings invalid input data', () => {
      let columnA = new Column('test')
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
