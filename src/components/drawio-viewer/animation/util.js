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

export function getDuration(cell) {
  return +(getCellConfig(cell)["duration"] || 3000)
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

export function getStyles(cell) {
  var styles = []
  if (null != cell) {
    let styleArr = cell.getStyle().split(";")
    for (let i = 0; i < styleArr.length; i++)
      styleArr[i].indexOf("=") !== -1 && styles.push(styleArr[i].split("="))
  }
  return styles.reduce((total, item) => {
    total[item[0]] = item[1]
    return total
  }, {})
}

export function getCenter(cell) {
  let { x, y, width, height } = cell.geometry
  return new window.mxPoint(x + width / 2, y + height / 2)
}

export function getCellConfig(cell) {
  if (!cell.value) {
    return {}
  }
  return cell
    .getValue()
    .getAttributeNames()
    .reduce((total, item) => {
      total[item] = cell.getAttribute(item)
      return total
    }, {})
}
