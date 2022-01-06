/** @jsx jsx */
import { jsx } from "theme-ui"
import React from 'react'
import { Helmet } from 'react-helmet'
import { ThemeProvider, merge } from 'theme-ui'
import split from '@mdx-deck/gatsby-plugin/src/split-slides'
import { Context } from '@mdx-deck/gatsby-plugin/src/context'
import Keyboard from './keyboard'
import modes from '@mdx-deck/gatsby-plugin/src/modes'
import Storage from '@mdx-deck/gatsby-plugin/src/storage'
import Container from './deck-container'
import Slide from '@mdx-deck/gatsby-plugin/src/slide'
import baseTheme from '@mdx-deck/gatsby-plugin/src/theme'

const getIndex = props => {
  if (!props.location) return 0
  const n = Number(props.location.hash.replace(/^#/, ''))
  return n
}

const Deck = props => {
  const slides = split(props)
  const [index, setIndex] = React.useState(getIndex(props))
  const { slug } = props.pageContext || {}
  const slide = slides[index]

  const [mode, setMode] = React.useState(modes.default)
  const toggleMode = next => setMode(current =>
    current === next ? modes.default : next
  )

  const [step, setStep] = React.useState(0)
  const [steps, setSteps] = React.useState(0)

  const deckStyle = {
    inline: {
      width: "100%",
      height: "60vh",
      position: "relative"
    },
    maximize: {
      position: "fixed",
      top: "0px",
      left: "0px",
      width : '100vw',
      height : '100vh'
    }
  }
  const [maximize, setMaximize] = React.useState(deckStyle.inline)

  const lastIndex = React.useRef(0)
  const direction = index - lastIndex.current

  React.useEffect(() => {
    lastIndex.current = index
  }, [index])

  React.useEffect(() => {
    if (props.location.pathname === '/print') return
    props.navigate(`${props.path}/#` + index, {
      replace: true,
    }) // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  React.useEffect(() => {
    if (props.location.pathname === '/print') {
      setMode(modes.print)
    }
    if (!slide) {
      props.navigate(`${props.path}`)
      setIndex(0)
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!slide) return false

  const context = {
    slides,
    slug,
    index,
    setIndex,
    direction,
    length: slides.length,
    slide,
    mode,
    setMode,
    toggleMode,
    notes: slide.notes,
    header: slides.header,
    footer: slides.footer,
    step,
    setStep,
    steps,
    setSteps,
  }

  context.previous = () => {
    if (steps && step > 0) {
      setStep(n => n - 1)
    } else {
      setIndex(n => n > 0 ? n - 1 : n)
      setStep(0)
      setSteps(0)
    }
  }

  context.next = () => {
    if (step < steps) {
      setStep(n => n + 1)
    } else {
      setIndex(n => n < slides.length - 1 ? n + 1 : n)
      setStep(0)
      setSteps(0)
    }
  }

  context.next = () => {
    if (step < steps) {
      setStep(n => n + 1)
    } else {
      setIndex(n => n < slides.length - 1 ? n + 1 : n)
      setStep(0)
      setSteps(0)
    }
  }

  context.maximize = () => {
    setMaximize(maximize.position === "fixed" ? deckStyle.inline : deckStyle.maximize);
  }

  const theme = merge(baseTheme, props.theme || {})

  return (
    <Context.Provider value={context}>
      <Keyboard />
      <Storage />
      <Helmet>
        {slides.head.children}
        {theme.googleFont && <link rel='stylesheet' href={theme.googleFont} />}
      </Helmet>

      <ThemeProvider
        theme={theme}
        components={theme.components}>
        <Container style={maximize}>
          <Slide>
            {slide}
          </Slide>
        </Container>
      </ThemeProvider>
    </Context.Provider>
  )
}

export default Deck

