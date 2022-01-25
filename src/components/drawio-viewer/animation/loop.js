import { arrayRemove } from "./util"
import DelayAnimation from "./delay"
export default class LoopAnimation {
  constructor(children, loop) {
    this.loop = loop
    this.children = children
    if (this.loop.condition) {
      this.isRunning = new window.Function(
        "count",
        "return " + this.loop.condition
      )
    } else {
      this.isRunning = () => true
    }
  }
  clone() {
    return new LoopAnimation(this.children, this.loop)
  }
  isEnd() {
    return !this.isRunning(this.count) && this.animatings.length === 0
  }
  init(animationLayer) {
    this.count = 1
    this.nextAnimateTime = 0
    this.animatings = []
    this.animationLayer = animationLayer
    this.animations =
      this.loop.delay > 0
        ? [new DelayAnimation(this.children, this.loop.delay)]
        : this.children
    this.animations.forEach(animation => animation.init(animationLayer))
  }
  process(ts) {
    if (this.isRunning(this.count) && ts > this.nextAnimateTime) {
      this.animations.forEach(animation =>
        this.initAnimation.call(this, animation)
      )
      this.nextAnimateTime = ts + this.loop.interval
      this.count++
    } else {
      this.animatings.forEach(animation => this.processAnimation(animation, ts))
    }
  }
  initAnimation(animation) {
    const newAnimation = animation.clone()
    newAnimation.init(this.animationLayer)
    this.animatings.push(newAnimation)
  }
  processAnimation(animation, ts) {
    animation.process(ts)
    if (animation.isEnd()) {
      arrayRemove(this.animatings, animation)
    }
  }
}
