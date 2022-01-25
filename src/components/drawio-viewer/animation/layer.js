import { arrayRemove, batch } from "./util"
import { getCellStyle } from "./config"
import CellAnimation from "./cell"

export default class LayerAnimation {
  constructor(layer, graph) {
    this.layer = layer
    this.graph = graph
    this.cellAnimitions = null
  }
  clone() {
    return new LayerAnimation(this.layer, this.graph)
  }
  init(animationLayer) {
    this.cellAnimitions = this.layer.children
      .filter(cell => !this.graph.getModel().isEdge(cell))
      .filter(cell => !getCellStyle(cell).hasOwnProperty("dashed"))
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
      this.cellAnimitions.forEach(animation => {
        animation.process(ts)
        animation.isEnd() && arrayRemove(this.cellAnimitions, animation)
      })
    }, this.graph)
  }
}
