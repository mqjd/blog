import { timeFormat } from "../util"

class Type {
  constructor(name, instenceof, getValue) {
    this.instenceof = instenceof
    this.name = name
    this.getValue = getValue || this._getValue
  }
  _getValue(cell) {
    return timeFormat(cell.value)
  }
  getName() {
    return this.name
  }
}

export default Type
