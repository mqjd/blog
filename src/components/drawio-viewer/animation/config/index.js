import swimlane from "./swimlane"
import * as cache from "./cache"
export { getCellStyle } from "./style"

export function getCellConfig(cell) {
  const key = "config-" + cell.id
  if (cache.exists(key)) {
    return cache.get(key)
  }
  const config =
    cell.edges
      .filter(edge => edge.target === cell)
      .map(edge => edge.source)
      .filter(swimlane.instenceof)
      .map(cell => {
        return swimlane.getValue(cell)
      })
      .find(v => v) || {}
  cache.set(key, config)
  return config
}