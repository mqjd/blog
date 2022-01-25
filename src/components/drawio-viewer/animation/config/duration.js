import Type from "./type"
import { getCellStyle } from "./style"

const duration = new Type("duration", cell => {
  const { shape, outline, symbol } = getCellStyle(cell)
  return (
    "mxgraph.bpmn.event" === shape &&
    "standard" === outline &&
    symbol === "timer"
  )
})

export default duration
