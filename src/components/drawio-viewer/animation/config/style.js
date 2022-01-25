import * as cache from "./cache"

export function getCellStyle(cell) {
  const key = "style-" + cell.id
  if (cache.exists(key)) {
    return cache.get(key)
  }
  var styles = []
  if (null != cell) {
    let styleArr = cell.getStyle().split(";")
    for (let i = 0; i < styleArr.length; i++)
      styleArr[i].indexOf("=") === -1
        ? styles.push([styleArr[i], true])
        : styles.push(styleArr[i].split("="))
  }
  const style = styles.reduce((total, item) => {
    total[item[0]] = item[1]
    return total
  }, {})
  cache.set(key, style)
  return style
}
