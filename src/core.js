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
    this.isValidBoard = false
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
      this.isValidBoard = true
    }
  }
  addChecker (playerId, column) {
    let addedChecker = false
    if (
      !this.isWon &&
      !this.isFull() &&
      Number.isInteger(column) &&
      this.columns.length > 0 &&
      column > 0 &&
      column <= this.columns.length
    ) {
      addedChecker = this.columns[column - 1].addChecker(playerId)
      if (addedChecker && this.isWinningPossible && !this.isWon) {
        this.checkWinningCondition(playerId, column, this.height - this.columns[column - 1].availableRows)
      }
    }
    return addedChecker
  }
  checkWinningCondition (playerId, startingColumn, startingRow) {
    const movement = {
      left: Math.min(startingColumn - 1, this.winningLength - 1),
      right: Math.min(this.width - startingColumn, this.winningLength - 1),
      up: Math.min(this.height - startingRow, this.winningLength - 1),
      down: Math.min(startingRow - 1, this.winningLength - 1)
    }
    let consecutiveTiles = {
      left: 0,
      right: 0,
      down: 0,
      up: 0,
      upLeft: 0,
      downLeft: 0,
      upRight: 0,
      downRight: 0
    }
    let moves, columnIndex, rowIndex

    // Check tiles to the left
    moves = movement.left
    columnIndex = startingColumn - 2
    rowIndex = startingRow - 1
    while (moves > 0 && columnIndex >= 0) {
      if (this.columns[columnIndex].rows[rowIndex] === playerId) {
        consecutiveTiles.left++
      } else {
        break
      }
      columnIndex--
      moves--
    }

    // Check tiles to the right
    moves = movement.right
    columnIndex = startingColumn
    rowIndex = startingRow - 1
    while (moves > 0 && columnIndex < this.width) {
      if (this.columns[columnIndex].rows[rowIndex] === playerId) {
        consecutiveTiles.right++
      } else {
        break
      }
      columnIndex++
      moves--
    }

    // Check tiles below
    moves = movement.down
    columnIndex = startingColumn - 1
    rowIndex = startingRow - 2
    while (moves > 0 && rowIndex >= 0) {
      if (this.columns[columnIndex].rows[rowIndex] === playerId) {
        consecutiveTiles.down++
      } else {
        break
      }
      rowIndex--
      moves--
    }

    if (this.isDiagonalWinPossible) {
      // Check tiles up and to the left
      moves = Math.min(movement.left, movement.up, this.winningLength - 1)
      columnIndex = startingColumn - 2
      rowIndex = startingRow
      while (moves > 0) {
        if (this.columns[columnIndex].rows[rowIndex] === playerId) {
          consecutiveTiles.upLeft++
        } else {
          break
        }
        columnIndex--
        rowIndex++
        moves--
      }
      // Check tiles down and to the right
      moves = Math.min(movement.right, movement.down, this.winningLength - 1)
      columnIndex = startingColumn
      rowIndex = startingRow - 2
      while (moves > 0) {
        if (this.columns[columnIndex].rows[rowIndex] === playerId) {
          consecutiveTiles.downRight++
        } else {
          break
        }
        columnIndex++
        rowIndex--
        moves--
      }
      // Check tiles up and to the right
      moves = Math.min(movement.right, movement.up, this.winningLength - 1)
      columnIndex = startingColumn
      rowIndex = startingRow
      while (moves > 0) {
        if (this.columns[columnIndex].rows[rowIndex] === playerId) {
          consecutiveTiles.upRight++
        } else {
          break
        }
        columnIndex++
        rowIndex++
        moves--
      }
      // Check tiles down and to the left
      moves = Math.min(movement.left, movement.down, this.winningLength - 1)
      columnIndex = startingColumn - 2
      rowIndex = startingRow - 2
      while (moves > 0) {
        if (this.columns[columnIndex].rows[rowIndex] === playerId) {
          consecutiveTiles.downLeft++
        } else {
          break
        }
        columnIndex--
        rowIndex--
        moves--
      }
    }
    const consecutiveHorizontalTiles = consecutiveTiles.left + consecutiveTiles.right + 1
    const consecutiveVerticalTiles = consecutiveTiles.down + 1
    const consecutiveDiagonalUpTiles = consecutiveTiles.downLeft + consecutiveTiles.upRight + 1
    const consecutiveDiagonalDownTiles = consecutiveTiles.upLeft + consecutiveTiles.downRight + 1
    if (
      consecutiveHorizontalTiles >= this.winningLength ||
      consecutiveVerticalTiles >= this.winningLength ||
      consecutiveDiagonalUpTiles >= this.winningLength ||
      consecutiveDiagonalDownTiles >= this.winningLength
    ) {
      this.isWon = true
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
    this.isWon = false
    if (this.columns.length > 0) {
      for (let column of this.columns) {
        column.reset()
      }
    }
  }
}

export default class {
  constructor (totalPlayers, columns, rows) {
    this.totalPlayers = 0
    this.players = null
    this.currentPlayer = 0
    this.board = null
    this.configure(totalPlayers, columns, rows)
  }
  nextPlayer () {
    if (this.players.length > 1) {
      if (this.currentPlayer === this.players.length) {
        this.currentPlayer = 1
      } else {
        this.currentPlayer++
      }
    }
  }
  configure (totalPlayers = 2, columns = 7, rows = 6) {
    this.totalPlayers = (Number.isInteger(totalPlayers) && totalPlayers > 1) ? totalPlayers : 2
    this.players = []
    for (let i = 1; i <= this.totalPlayers; i++) {
      this.players.push({
        playerId: i,
        name: `Player ${i}`
      })
    }
    this.currentPlayer = 1
    this.board = new Board(columns, rows)
  }
  reset () {
    if (this.board) {
      this.board.reset()
    }
  }
}
