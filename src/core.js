export class Column {
  constructor (totalRows) {
    this.availableRows = 0
    this.maxRows = 0
    this.rows = []
    if (Number.isInteger(totalRows) && totalRows > 0) {
      this.availableRows = totalRows
      this.maxRows = totalRows
      while (totalRows > 0) {
        this.rows.push(0)
        totalRows--
      }
    }
  }
  addChecker (playerId) {
    let addedChecker = false
    if (Number.isInteger(playerId) && playerId > 0) {
      if (this.availableRows > 0) {
        const targetRow = this.rows.length - this.availableRows
        this.rows[targetRow] = playerId
        this.availableRows--
        addedChecker = true
      }
    }
    return addedChecker
  }
  getAvailableRows () {
    return this.availableRows
  }
  reset() {
    if (this.maxRows > 0) {
      this.availableRows = this.maxRows
      this.rows = []
      let totalRows = this.maxRows
      while (totalRows > 0) {
        this.rows.push(0)
        totalRows--
      }
    }
  }
}

export class Board {
  constructor (x, y, winningLength = 4) {
    this.columns = []
    this.winningLength = winningLength
    if (Number.isInteger(x) && Number.isInteger(y) && x > 0 && y > 0) {
      while (x > 0) {
        this.columns.push(new Column(y))
        x--
      }
    }
  }
  isBoardFull () {
    let full = false
    if (this.columns.length > 0) {
      let availableSlots = 0
      for (let i in this.columns) {
        availableSlots += this.columns[i].getAvailableRows()
      }
      if (availableSlots === 0) {
        full = true
      }
    }
    return full
  }
  addChecker (playerId, column) {
    let addedChecker = false
    if (
      !this.isBoardFull() &&
      Number.isInteger(column) &&
      this.columns.length > 0 &&
      column > 0 &&
      column <= this.columns.length
    ) {
      addedChecker = this.columns[column-1].addChecker(playerId)
    }
    return addedChecker
  }
}
