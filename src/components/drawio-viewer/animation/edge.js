import { getEdgePath, cloneEdge, arrayRemove } from "./util"
import { getCellConfig, getCellStyle } from "./config"
import { mix } from "polished"

export default class EdgeAnimation {
  constructor(edge, graph) {
    this.graph = graph
    this.edge = edge
    this.duration = getCellConfig(this.edge.source)["duration"] || 1000
    this.fromGeometry = this.edge.source.geometry.clone()
    this.toGeometry = this.edge.target.geometry.clone()
    this.fromFillColor = getCellStyle(this.edge.source)["fillColor"]
    this.toFillColor = getCellStyle(this.edge.target)["fillColor"]
    this.isAnimateFillColor = this.animatefillColor()
    this.widthDiff = this.toGeometry.width - this.fromGeometry.width
    this.heightDiff = this.toGeometry.height - this.fromGeometry.height
    this.animationEdge = null
    this.animationCell = null
    this.edgeAnimitions = []
    this.startTime = -1
    this.finished = false
    this.animationLayer = null
  }
  clone() {
    return new EdgeAnimation(this.edge, this.graph)
  }
  isEnd() {
    return this.finished && this.edgeAnimitions.length === 0
  }
  animatefillColor() {
    return this.fromFillColor && this.toFillColor && this.fromFillColor !== this.toFillColor
  }
  init(animationLayer) {
    this.end = false
    this.animationLayer = animationLayer
    this.animationEdge = this.graph.addCell(
      cloneEdge(this.edge),
      animationLayer
    )
    this.animationCell = this.graph.addCell(
      this.edge.source.clone(),
      animationLayer
    )
    this.graph.cellsOrdered([this.animationEdge], true)
    this.graph.cellsOrdered([this.animationCell], false)
  }
  finish() {
    this.graph.getModel().setGeometry(this.animationCell, this.toGeometry)
    let nextEdges = this.edge.target.edges.filter(
      v => v.source === this.edge.target
    )
    if (nextEdges) {
      this.edgeAnimitions = nextEdges.map(
        nextEdge => new EdgeAnimation(nextEdge, this.graph)
      )
      this.edgeAnimitions.forEach(edgeAnimition =>
        edgeAnimition.init(this.animationLayer)
      )
      this.graph.removeCells([this.animationCell, this.animationEdge])
    }
    this.finished = true
  }
  initPath() {
    this.path = getEdgePath(this.animationEdge, this.graph)
    this.pathLength = this.path.getTotalLength()
  }
  process(ts) {
    if (this.startTime === -1) {
      this.startTime = ts
      this.initPath()
    }
    if (this.finished) {
      this.edgeAnimitions.forEach(edgeAnimition => {
        edgeAnimition.process(ts)
        edgeAnimition.isEnd() && arrayRemove(this.edgeAnimitions, edgeAnimition)
      })
      return
    }
    if (ts - this.startTime > this.duration) {
      this.finish()
      return
    } else {
      const step = (ts - this.startTime) / this.duration
      this.setCellState(step)
    }
  }
  setCellState(step) {
    const geometry = this.animationCell.geometry.clone()
    geometry.width = this.fromGeometry.width + step * this.widthDiff
    geometry.height = this.fromGeometry.height + step * this.heightDiff
    let { x, y } = this.path.getPointAtLength(step * this.pathLength)
    geometry.x = x - geometry.width / 2
    geometry.y = y - geometry.height / 2
    this.graph.getModel().setGeometry(this.animationCell, geometry)
    if (this.isAnimateFillColor) {
      let style = this.animationCell.getStyle()
      style = window.mxUtils.setStyle(
        style,
        "fillColor",
        mix(step, this.toFillColor, this.fromFillColor)
      )
      this.graph.getModel().setStyle(this.animationCell, style)
    }
  }
}
