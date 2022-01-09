/** @jsx jsx */
import { jsx } from "theme-ui"
import React from 'react'
import { Router, globalHistory } from '@reach/router'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'theme-ui'
import { Helmet } from 'react-helmet'
import get from 'lodash.get'
import merge from 'lodash.merge'
import useKeyboard from './use-keyboard'
import useStorage from 'gatsby-theme-mdx-deck/src/hooks/use-storage'
import useDeck from 'gatsby-theme-mdx-deck/src/hooks/use-deck'
import Context from 'gatsby-theme-mdx-deck/src/context'
import Wrapper from './wrapper'
import Slide from './slide'
import { modes } from 'gatsby-theme-mdx-deck/src/constants'

import Presenter from './presenter'
import Overview from './overview'
import Grid from './grid'

const Keyboard = () => {
  useKeyboard()
  return false
}

const Storage = () => {
  useStorage()
  return false
}

const Print = ({ slides }) => {
  const outer = useDeck()
  const context = {
    ...outer,
    mode: modes.print,
  }

  return (
    <Context.Provider value={context}>
      {slides.map((slide, i) => (
        <Slide key={i} slide={slide} preview />
      ))}
    </Context.Provider>
  )
}

const getIndex = () => {
  const { pathname } = globalHistory.location
  const paths = pathname.split('/')
  const n = Number(paths[paths.length - 1])
  const index = isNaN(n) ? 0 : n
  return index
}

const GoogleFont = ({ theme }) => {
  if (!theme.googleFont) return false
  return (
    <Helmet>
      <link rel="stylesheet" href={theme.googleFont} />
    </Helmet>
  )
}

const mergeThemes = (...themes) =>
  themes.reduce(
    (acc, theme) =>
      typeof theme === 'function' ? theme(acc) : merge(acc, theme),
    {}
  )

const DefaultMode = ({ children }) => <React.Fragment children={children} />

const deckMode = {
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

const Deck = ({
  slides = [],
  pageContext: { title, slug },
  theme = {},
  themes = [],
  ...props
}) => {
  const outer = useDeck()
  const index = getIndex()
  const [slideStyle, setSlideStyle] = React.useState(deckMode.inline)
  const head = slides.head.children

  const { components, ...mergedTheme } = mergeThemes(theme, ...themes)

  const context = {
    ...outer,
    slug,
    length: slides.length,
    index,
    steps: get(outer, `metadata.${index}.steps`),
    notes: get(outer, `metadata.${index}.notes`),
    theme: mergedTheme,
    slideStyle
  }

  context.maximize = () => {
    setSlideStyle(slideStyle.position === "fixed" ? deckMode.inline : deckMode.maximize);
  }

  let Mode = DefaultMode

  switch (context.mode) {
    case modes.presenter:
      Mode = Presenter
      break
    case modes.overview:
      Mode = Overview
      break
    case modes.grid:
      Mode = Grid
      break
    default:
      break
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
        {head}
      </Helmet>
      <GoogleFont theme={mergedTheme} />
      <Context.Provider value={context}>
        <ThemeProvider components={components} theme={mergedTheme}>
          <Global
            styles={{
              body: {
                margin: 0,
              },
            }}
          />
          <Keyboard />
          <Storage />
          <Wrapper>
            <Mode slides={slides}>
              <Router
                basepath={slug}
                style={{
                  height: '100%',
                }}>
                <Slide index={0} path="/" styles={slideStyle} slide={slides[0]} />
                {slides.map((slide, i) => (
                  <Slide key={i} styles={slideStyle} index={i} path={i + '/*'} slide={slide} />
                ))}
                <Print path="/print" slides={slides} />
              </Router>
            </Mode>
          </Wrapper>
        </ThemeProvider>
      </Context.Provider>
    </>
  )
}

export default Deck
