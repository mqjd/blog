import Type from "./type"
import { getCellStyle } from "./style"

const condition = new Type(
  "condition",
  cell => {
    const { shape, isLoopStandard } = getCellStyle(cell)
    return "mxgraph.bpmn.task" === shape && "1" === isLoopStandard
  },
  cell => {
    return cell.value
  }
)

export default condition
