export function arrayRemove(arr, item) {
  const index = arr.indexOf(item)
  if (index > -1) {
    arr.splice(index, 1)
    return true
  }
  return false
}

export function batch(func, graph) {
  graph.getModel().beginUpdate()
  try {
    return func()
  } finally {
    graph.getModel().endUpdate()
  }
}

export function getEdgePath(edge, graph) {
  let path = graph.view.states.map[edge.mxObjectId].shape.node.children[1]
  // path.setAttribute('visibility', 'hidden');
  return path
}

export function cloneEdge(edge) {
  const clone = edge.clone()
  clone.geometry.sourcePoint = getCenter(edge.source)
  clone.geometry.targetPoint = getCenter(edge.target)
  let style = clone.getStyle()
  style = window.mxUtils.setStyle(style, "endArrow", "none")
  style = window.mxUtils.setStyle(style, "startArrow", "none")
  style = window.mxUtils.setStyle(style, "strokeColor", "none")
  clone.setStyle(style)
  return clone
}

export function getCenter(cell) {
  let { x, y, width, height } = cell.geometry
  return new window.mxPoint(x + width / 2, y + height / 2)
}

export function timeFormat(timeStr) {
  var o = {
    ms: 1, //毫秒
    m: 60000, //分钟
    s: 1000, //秒
  }

  for (var k in o) {
    let match = new RegExp(`^(\\d+)${k}$`, "i").exec(timeStr)
    if (match) {
      return +match[1] * o[k]
    }
  }
  return null
}