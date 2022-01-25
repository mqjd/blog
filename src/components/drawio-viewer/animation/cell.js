import { arrayRemove } from "./util"
import { getCellConfig } from "./config"
import EdgeAnimation from "./edge"
import DelayAnimation from "./delay"
import LoopAnimation from "./loop"

export default class CellAnimation {
  constructor(cell, graph) {
    this.cell = cell
    this.graph = graph
    this.end = false
    this.cellConfig = getCellConfig(this.cell)
    this.initAnimitions()
  }
  clone() {
    return new CellAnimation(this.cell, this.graph)
  }
  initAnimitions() {
    this.animations = this.cell.edges
      .filter(edge => edge.source === this.cell)
      .map(edge => new EdgeAnimation(edge, this.graph))
    const { delay, loop } = this.cellConfig
    if (loop) {
      this.animations = [new LoopAnimation(this.animations, loop)]
    }
    if (delay > 0) {
      this.animations = [new DelayAnimation(this.animations, delay)]
    }
  }
  isEnd() {
    return this.animations.length === 0
  }
  init(animationLayer) {
    this.animations.forEach(edgeAnimition => edgeAnimition.init(animationLayer))
  }
  process(ts) {
    this.animations.forEach(edgeAnimition => {
      edgeAnimition.process(ts)
      edgeAnimition.isEnd() && this.next(edgeAnimition)
    })
  }
  next(edgeAnimition) {
    arrayRemove(this.animations, edgeAnimition)
  }
}
