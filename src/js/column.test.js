// @flow
/* eslint sort-imports: ["error", {"ignoreCase": true}] */
/* eslint sort-keys: "error" */
import Column from './column'

describe('Column', () => {
  it('should initialize correctly', () => {
    const column = new Column(100)
    expect(column.rows.length).toEqual(100)
    expect(column.availableRows).toEqual(100)
    expect(column.maxRows).toEqual(column.rows.length)
    const emptyColum = new Column(0)
  })
  it('should correctly add a checker', () => {
    const column = new Column(1)
    expect(column.addChecker(1)).toEqual(true)
    expect(column.addChecker(2)).toEqual(false)
    expect(column.addChecker(0)).toEqual(false)
  })
  it('should correctly reset', () => {
    const column = new Column(1)
    column.addChecker(1)
    expect(column.availableRows).toEqual(0)
    column.reset()
    expect(column.availableRows).toEqual(1)
  })
})