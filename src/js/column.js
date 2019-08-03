export default class {
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
