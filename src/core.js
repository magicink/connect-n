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
  reset () {
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
    this.height = 0
    this.width = 0
    this.winningLength = (Number.isInteger(winningLength) && winningLength > 0) ? winningLength : 4
    this.isDiagonalWinPossible = true
    this.isWinningPossible = true
    this.isWon = false
    if (Number.isInteger(x) && Number.isInteger(y) && x > 0 && y > 0) {
      this.height = y
      this.width = x
      if (winningLength > x || winningLength > y) {
        this.isDiagonalWinPossible = false
      }
      if (winningLength > x && winningLength > y) {
        this.isWinningPossible = false
      }
      while (x > 0) {
        this.columns.push(new Column(y))
        x--
      }
    }
  }
  addChecker (playerId, column) {
    let addedChecker = false
    if (
      !this.isFull() &&
      Number.isInteger(column) &&
      this.columns.length > 0 &&
      column > 0 &&
      column <= this.columns.length
    ) {
      addedChecker = this.columns[column - 1].addChecker(playerId)
      if (addedChecker && this.isWinningPossible) {
        this.checkWinningCondition(playerId, column, this.height - this.columns[column - 1].availableRows)
      }
    }
    return addedChecker
  }
  checkWinningCondition (playerId, x, y) {
    let count = 1
    let maxLeftTravel = Math.min(x - 1, this.winningLength - 1)
    let maxRightTravel = Math.min(this.width - x, this.winningLength - 1)

    while (maxLeftTravel > 0) {
      maxLeftTravel--
      if (this.columns[maxLeftTravel].rows[y - 1] !== playerId || count >= this.winningLength) {
        break
      } else {
        count++
      }
    }
    let rightTravelIndex = x
    while (maxRightTravel > 0) {
      maxRightTravel--
      if (this.columns[rightTravelIndex].rows[y - 1] !== playerId || count >= this.winningLength) {
        break
      } else {
        count++
      }
      rightTravelIndex++
    }

    if (count < this.winningLength) {
      count = 1
    }
  }

  isFull () {
    let full = false
    if (this.columns.length > 0) {
      let availableSlots = 0
      for (let i in this.columns) {
        availableSlots += this.columns[i].availableRows
      }
      if (availableSlots === 0) {
        full = true
      }
    }
    return full
  }
  reset () {

  }
}
