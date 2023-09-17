import Column from './Column'

/**
 * Add isInteger static method to Number
 * @param {any} value - The value to check
 * @returns {boolean} - Returns true if the value is a positive integer
 */
const isInteger = function (value: any): boolean {
  return (
    typeof value === 'number' &&
    isFinite(value) &&
    Math.floor(value) === value &&
    value >= 0
  )
}

/**
 * Represents a game board
 */
export default class Board {
  columns: Column[]
  height: number
  width: number
  winningLength: number
  isDiagonalWinPossible: boolean
  isWinningPossible: boolean
  isWon: boolean
  isValidBoard: boolean
  winningSet: { x: number; y: number }[]

  /**
   * Creates a new Board
   * @param {number} x - The width of the board
   * @param {number} y - The height of the board
   * @param {number} [winningLength=4] - The length required to win
   */
  constructor(x: number, y: number, winningLength: number = 4) {
    if (!isInteger(x) || !isInteger(y) || !isInteger(winningLength))
      throw new Error('Attempting to construct board with invalid properties')

    this.columns = []
    this.height = 0
    this.width = 0
    this.winningLength = winningLength > 0 ? winningLength : 4
    this.isDiagonalWinPossible = true
    this.isWinningPossible = true
    this.isWon = false
    this.isValidBoard = false
    this.winningSet = []

    if (x > 0 && y > 0) {
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

  /**
   * Add a checker to the board
   * @param {number} playerId - The ID of the player adding the checker
   * @param {number} column - The column index to add the checker
   * @returns {boolean} - Whether the checker was added successfully
   */
  addChecker(playerId: number, column: number): boolean {
    let addedChecker = false
    if (
      !this.isWon &&
      !this.isFull() &&
      isInteger(column) &&
      this.columns.length > 0 &&
      column > 0 &&
      column <= this.columns.length
    ) {
      addedChecker = this.columns[column - 1].addChecker(playerId)
      if (addedChecker && this.isWinningPossible && !this.isWon) {
        this.checkWinningCondition(
          playerId,
          column,
          this.height - this.columns[column - 1].availableRows
        )
      }
    }
    return addedChecker
  }

  /**
   * Checks for winning condition based on last placed checker
   * @param {number} playerId - The ID of the player
   * @param {number} startingColumn - The starting column index
   * @param {number} startingRow - The starting row index
   */
  checkWinningCondition(
    playerId: number,
    startingColumn: number,
    startingRow: number
  ): void {
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

    let set = []
    let horizontalSet = []
    let verticalSet = []
    let diagonalDownSet = []
    let diagonalUpSet = []

    set.push({ x: startingColumn - 1, y: startingRow - 1 })

    // Check tiles to the left
    moves = movement.left
    columnIndex = startingColumn - 2
    rowIndex = startingRow - 1
    while (moves > 0 && columnIndex >= 0) {
      if (this.columns[columnIndex].rows[rowIndex] === playerId) {
        consecutiveTiles.left++
        horizontalSet.push({ x: columnIndex, y: rowIndex })
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
        horizontalSet.push({ x: columnIndex, y: rowIndex })
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
        verticalSet.push({ x: columnIndex, y: rowIndex })
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
          diagonalDownSet.push({ x: columnIndex, y: rowIndex })
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
          diagonalDownSet.push({ x: columnIndex, y: rowIndex })
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
          diagonalUpSet.push({ x: columnIndex, y: rowIndex })
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
          diagonalUpSet.push({ x: columnIndex, y: rowIndex })
        } else {
          break
        }
        columnIndex--
        rowIndex--
        moves--
      }
    }
    const consecutiveHorizontalTiles =
      consecutiveTiles.left + consecutiveTiles.right + 1
    const consecutiveVerticalTiles = consecutiveTiles.down + 1
    const consecutiveDiagonalUpTiles =
      consecutiveTiles.downLeft + consecutiveTiles.upRight + 1
    const consecutiveDiagonalDownTiles =
      consecutiveTiles.upLeft + consecutiveTiles.downRight + 1
    if (
      consecutiveHorizontalTiles >= this.winningLength ||
      consecutiveVerticalTiles >= this.winningLength ||
      consecutiveDiagonalUpTiles >= this.winningLength ||
      consecutiveDiagonalDownTiles >= this.winningLength
    ) {
      this.isWon = true
      if (consecutiveHorizontalTiles >= this.winningLength) {
        set.push.apply(set, horizontalSet)
      }
      if (consecutiveVerticalTiles >= this.winningLength) {
        set.push.apply(set, verticalSet)
      }
      if (consecutiveDiagonalDownTiles >= this.winningLength) {
        set.push.apply(set, diagonalDownSet)
      }
      if (consecutiveDiagonalUpTiles >= this.winningLength) {
        set.push.apply(set, diagonalUpSet)
      }
      this.winningSet = set
    }
  }

  /**
   * Checks if the board is full
   * @returns {boolean} - Whether the board is full
   */
  isFull(): boolean {
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

  /**
   * Resets the board to its initial state
   */
  reset(): void {
    this.isWon = false
    this.winningSet = []
    if (this.columns.length > 0) {
      for (let column of this.columns) {
        column.reset()
      }
    }
  }
}
