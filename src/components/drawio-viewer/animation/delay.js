import { arrayRemove } from "./util"
export default class DelayAnimation {
  constructor(children, delay) {
    this.children = children
    this.delay = delay
    this.endTime = -1
  }
  clone() {
    return new DelayAnimation(this.children, this.delay)
  }
  isEnd() {
    return this.animations.length === 0
  }
  init(animationLayer) {
    this.endTime = -1
    this.animations = [...this.children]
    this.animations.forEach(animation => animation.init(animationLayer))
  }
  process(ts) {
    if (this.endTime === -1) {
      this.endTime = ts + this.delay
    }
    if (ts > this.endTime) {
      this.animations.forEach(animation => {
        animation.process(ts)
        animation.isEnd() && arrayRemove(this.animations, animation)
      })
    }
  }
}
