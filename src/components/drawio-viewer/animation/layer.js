import { arrayRemove, getStyles, batch } from "./util"
import CellAnimation from "./cell"

export default class LayerAnimation {
  constructor(layer, graph) {
    this.layer = layer
    this.graph = graph
    this.cellAnimitions = null
  }
  init(animationLayer) {
    this.cellAnimitions = this.layer.children
      .filter(cell => !this.graph.getModel().isEdge(cell))
      .filter(cell => !getStyles(cell).hasOwnProperty("dashed"))
      .map(cell => new CellAnimation(cell, this.graph))
    batch(() => {
      this.cellAnimitions.forEach(cellAnimition =>
        cellAnimition.init(animationLayer)
      )
    }, this.graph)
  }
  isEnd() {
    return this.cellAnimitions.length === 0
  }
  process(ts) {
    batch(() => {
      this.cellAnimitions.forEach(animition => {
        animition.process(ts)
        animition.isEnd() && arrayRemove(this.cellAnimitions, animition)
      })
    }, this.graph)
  }
}
