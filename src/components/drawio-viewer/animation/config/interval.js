import Type from "./type"
import loop from "./condition"
import { getCellStyle } from "./style"
import { timeFormat } from "../util"

const match = cell => {
  if (!loop.instenceof(cell)) {
    return null
  }
  return {
    key: loop.getName(),
    value: loop.getValue(cell),
    cell: cell,
  }
}

const findAllConfig = cell => {
  const result = []
  if (!cell) return result
  const value = cell.edges
    .filter(edge => edge.source === cell)
    .map(edge => edge.target)
    .map(match)
    .find(v => v)
  if (value) {
    result.push(value)
    findAllConfig(value.cell).forEach(v => result.push(v))
  }

  return result
}

const interval = new Type(
  "loop",
  cell => {
    const { shape, outline, isLoopSub, symbol } = getCellStyle(cell)
    return (
      "mxgraph.bpmn.task" === shape &&
      "eventInt" === outline &&
      "timer" === symbol &&
      "1" === isLoopSub
    )
  },
  cell => {
    return findAllConfig(cell).reduce(
      (total, item) => {
        total[item.key] = item.value
        return total
      },
      {
        interval: timeFormat(cell.value),
      }
    )
  }
)

export default interval
