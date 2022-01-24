import LayerAnimation from "./layer"
import { arrayRemove, batch } from "./util"

export default class DrawioAnimation {
  constructor(viewer) {
    var node = window.mxUtils.createXmlDocument().createElement("object")
    node.setAttribute("label", "AnimatingLayer")
    this.model = viewer.graph.getModel()
    this.viewer = viewer
    this.graph = viewer.graph
    this.layerAnimations = null
    this.animatiing = null
    this.animationContainerLayer = this.graph.addCell(
      new window.mxCell(node),
      this.model.root
    )
  }
  init() {
    this.animationContainerLayer.children &&
      this.graph.removeCells(this.animationContainerLayer.children)
    this.layerAnimations = this.model
      .getChildren(this.model.root)
      .map(layer => ({
        name: this.graph.convertValueToString(layer),
        layer: layer,
      }))
      .filter(layer => 0 === layer.name.indexOf("animation"))
      .sort((a, b) => a.name < b.name)
      .map(layer => new LayerAnimation(layer.layer, this.graph))
    this.next()
  }

  isEnd() {
    return this.layerAnimations.length === 0 && !this.animatiing
  }

  process(ts) {
    batch(() => {
      this.animatiing.process(ts)
      this.animatiing.isEnd() && this.next()
    }, this.graph)
  }
  next() {
    arrayRemove(this.layerAnimations, this.animatiing)
    this.animatiing = this.layerAnimations.pop()
    if (this.animatiing) {
      this.animatiing.init(this.animationContainerLayer)
      this.viewer.fitGraph()
    }
  }
}
