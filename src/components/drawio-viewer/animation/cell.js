import { arrayRemove } from "./util"
import EdgeAnimation from "./edge"

export default class CellAnimation {
  constructor(cell, graph) {
    this.cell = cell
    this.graph = graph
    this.end = false
    this.edgeAnimitions = null
  }
  isEnd() {
    return this.edgeAnimitions.length === 0
  }
  init(animationLayer) {
    this.edgeAnimitions = this.cell.edges.map(
      edge => new EdgeAnimation(edge, this.graph)
    )
    this.edgeAnimitions.forEach(edgeAnimition =>
      edgeAnimition.init(animationLayer)
    )
  }
  process(ts) {
    this.edgeAnimitions.forEach(edgeAnimition => {
      edgeAnimition.process(ts)
      edgeAnimition.isEnd() && this.next(edgeAnimition)
    })
  }
  next(edgeAnimition) {
    arrayRemove(this.edgeAnimitions, edgeAnimition)
  }
}
