/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { useSteps, useDeck } from "mdx-deck"
import animate from "./animation"

type Props = {
  highlight: string
  lightbox: boolean
  nav: boolean
  resize: boolean
  toolbar: string
  url: string
  param: string
}

const resolveParams = (text: string) => {
  if (!text) {
    return {}
  }
  return text
    .split(";")
    .map(v => {
      let result = {}
      if (v.indexOf("=") !== -1) {
        result[v.substring(0, v.indexOf("="))] = resoveValue(
          v.substring(v.indexOf("=") + 1)
        )
      } else {
        result[v] = true
      }
      return result
    })
    .reduce((prev, cur) => {
      return { ...prev, ...cur }
    })
}

const resoveValue = (value: any) => {
  if (value.length === 0) {
    return ""
  }

  if ("null" === value) {
    return null
  }

  if (!isNaN(value)) {
    return +value
  }

  if ("true" === value) {
    return true
  }

  if ("false" === value) {
    return false
  }
  return value
}

const isDeckMode = slug => {
  return slug !== undefined
}

const style = {
  width: "100%",
  height: "100%",
  maxHeight: "100%",
  maxWidth: "100%",
  overflow: "hidden",
}

const DrawioViewer = (prop: Props) => {
  const [graphView, setGraphView] = React.useState<any>()
  const { index, slug } = useDeck()
  const inDeck = isDeckMode(slug)
  const defaultProps = {
    toolbar: inDeck ? null : prop.toolbar || null,
    "auto-fit": true,
  }
  let params: any = resolveParams(prop.param)
  if (params.steps) {
    const step = useSteps(params.steps - 1)
    React.useEffect(() => {
      graphView && step !== graphView.currentPage && graphView.selectPage(step)
    }, [step])
  }
  const container = React.useRef()
  const initDrawioViewer = () => {
    return new Promise((resolve, reject) => {
      let win: any = window
      win.GraphViewer.getUrl(prop.url, function (e) {
        resolve(
          new win.GraphViewer(
            container.current,
            win.mxUtils.parseXml(e).documentElement,
            { ...prop, ...defaultProps, ...params }
          )
        )
      })
    })
  }
  React.useEffect(() => {
    initDrawioViewer().then(v => {
      setGraphView(v)
      if (params.hasOwnProperty("animation")) {
        animate(v)
      }
    })
  }, [index])
  return (
    <React.StrictMode>
      <div style={style}>
        <div style={{ height: "100%", width: "100%" }} ref={container}></div>
      </div>
    </React.StrictMode>
  )
}

export default DrawioViewer
