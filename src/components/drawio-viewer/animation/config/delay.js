import Type from "./type"
import { getCellStyle } from "./style"

const delay = new Type("delay", cell => {
  const { shape, outline, symbol } = getCellStyle(cell)
  return (
    "mxgraph.bpmn.event" === shape &&
    "eventNonint" === outline &&
    symbol === "timer"
  )
})

export default delay
