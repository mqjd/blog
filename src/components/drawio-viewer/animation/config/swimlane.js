import Type from "./type"
import duration from "./duration"
import interval from "./interval"
import delay from "./delay"
import { getCellStyle } from "./style"

const children = [duration, delay, interval]

const match = cell => {
  const type = children.find(item => item.instenceof(cell))
  if (!type) {
    return null
  }
  return {
    key: type.getName(),
    value: type.getValue(cell),
  }
}

const configMatch = cell => {
  return (
    !cell.edges || -1 === cell.edges.findIndex(edge => edge.target === cell)
  )
}

const swimlane = new Type(
  "swimlane",
  cell => {
    const { swimlane, dashed } = getCellStyle(cell)
    return swimlane && dashed
  },
  cell => {
    return cell.children
      .filter(configMatch)
      .map(match)
      .filter(v => v)
      .reduce((total, item) => {
        total[item.key] = item.value
        return total
      }, {})
  }
)

export default swimlane
