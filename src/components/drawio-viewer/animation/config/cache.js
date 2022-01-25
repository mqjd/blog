const cache = {}
const keys = {}

export function set(k, v) {
  cache[k] = v
  keys[k] = true
}

export function exists(k, v) {
  return keys[k]
}

export function get(k) {
  return cache[k]
}

export function remove(k) {
  delete cache[k]
  delete keys[k]
}
