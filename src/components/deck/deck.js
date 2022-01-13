/** @jsx jsx */
import { jsx } from "theme-ui"
import React from 'react'
import { Router, globalHistory } from '@reach/router'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'theme-ui'
import { invert } from '@theme-ui/color'
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
import Zoom from './zoom'
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

const FullScreen = ({maximize}) => {
  const context = useDeck()
  return (
    <span
      onClick={() => context.setMaximize()}
      className="full-screen-button"
      sx={{
        width: '60px',
        height:'60px',
        boxSizing: 'border-box',
        position: 'absolute',
        right: "0px",
        p: "20px",
        zIndex: 1000,
        cursor: 'pointer'
    }}
    >
      { maximize ? (
        <svg width="20" height="20" viewBox="0 0 1024 1024">
          <path sx={{fill: invert('background')}} d="M786.752 877.248 933.504 1024 1024 933.504 877.248 786.752 1024 640 640 640 640 1024Z" ></path>
          <path sx={{fill: invert('background')}} d="M0 384 384 384 384 0 237.248 146.752 92 1.376 1.504 91.872 146.752 237.248Z" ></path>
          <path sx={{fill: invert('background')}} d="M0 933.504 90.496 1024 237.248 877.248 384 1024 384 640 0 640 146.752 786.752Z" ></path>
          <path sx={{fill: invert('background')}} d="M640 384 1024 384 877.248 237.248 1022.752 91.872 932.256 1.376 786.752 146.752 640 0Z" ></path>
        </svg>
      ) : (
        <svg  width="20" height="20" viewBox="0 0 1024 1024">
          <path sx={{fill: invert('background')}} d="M877.248 786.752 730.496 640 640 730.496 786.752 877.248 640 1024 1024 1024 1024 640Z"></path>
          <path sx={{fill: invert('background')}} d="M384 0 0 0 0 384 146.752 237.248 292 382.496 382.496 292 237.248 146.752Z"></path>
          <path sx={{fill: invert('background')}} d="M384 730.496 293.504 640 146.752 786.752 0 640 0 1024 384 1024 237.248 877.248Z"></path>
          <path sx={{fill: invert('background')}} d="M1024 0 640 0 786.752 146.752 641.344 292 731.84 382.496 877.248 237.248 1024 384Z"></path>    
        </svg>
      ) }
    </span>
  )
}

const mergeThemes = (...themes) =>
  themes.reduce(
    (acc, theme) =>
      typeof theme === 'function' ? theme(acc) : merge(acc, theme),
    {}
  )

const DefaultMode = ({ children }) => {
  const { maximize } = useDeck()
  return (
    <Zoom zoom={ maximize ? 1 : 3/5} ratio={16 / 9}>
      <React.Fragment children={children} />
    </Zoom>
  )
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
  const [maximize, setMaximize] = React.useState(false)
  const head = slides.head.children

  const { components, ...mergedTheme } = mergeThemes(theme, ...themes)

  const context = {
    ...outer,
    slug,
    maximize,
    length: slides.length,
    index,
    steps: get(outer, `metadata.${index}.steps`),
    notes: get(outer, `metadata.${index}.notes`),
    theme: mergedTheme,
  }

  context.setMaximize = () => {
    setMaximize(!maximize);
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
            <FullScreen maximize={maximize}/>
            <Mode slides={slides}>
              <Router
                basepath={slug}
                style={{
                  height: '100%',
                }}>
                <Slide index={0} path="/" slide={slides[0]} />
                {slides.map((slide, i) => (
                  <Slide key={i} index={i} path={i + '/*'} slide={slide} />
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
