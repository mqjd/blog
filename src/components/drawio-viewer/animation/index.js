import DrawioAnimation from "./drawio"

const animate = viewer => {
  const animition = new DrawioAnimation(viewer)
  animition.init()
  const animate = ts => {
    animition.process(ts)
    if (!animition.isEnd()) {
      window.requestAnimationFrame(animate)
    }
  }
  window.requestAnimationFrame(animate)
}

export default animate
