/**
 * Represents a column in a game board.
 */
export default class Column {
  /** The number of available rows in this column. */
  availableRows: number

  /** The maximum number of rows that this column can contain. */
  maxRows: number

  /** An array representing the rows in this column. */
  rows: number[]

  /**
   * Create a column.
   * @param {number} totalRows - The total number of rows in the column.
   */
  constructor(totalRows: number) {
    this.availableRows = 0
    this.maxRows = 0
    this.rows = []
    if (totalRows > 0) {
      this.availableRows = totalRows
      this.maxRows = totalRows
      while (totalRows > 0) {
        this.rows.push(0)
        totalRows--
      }
    }
  }

  /**
   * Add a checker to this column.
   * @param {number} playerId - The ID of the player adding the checker.
   * @returns {boolean} - True if the checker was added, false otherwise.
   */
  addChecker(playerId: number): boolean {
    let addedChecker = false
    if (playerId > 0) {
      if (this.availableRows > 0) {
        const targetRow = this.rows.length - this.availableRows
        this.rows[targetRow] = playerId
        this.availableRows--
        addedChecker = true
      }
    }
    return addedChecker
  }

  /**
   * Reset the column to its initial state.
   */
  reset(): void {
    this.availableRows = this.maxRows
    this.rows = []
    let totalRows = this.maxRows
    while (totalRows > 0) {
      this.rows.push(0)
      totalRows--
    }
  }
}
