/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { Fragment, useState, useEffect } from 'react'
import useDeck from 'gatsby-theme-mdx-deck/src/hooks/use-deck'
import { modes } from 'gatsby-theme-mdx-deck/src/constants'

const DefaultProvider = props =>
  React.createElement(Fragment, null, props.children)

const wapperStyle = maximize => {
  if (maximize) {
    return {
      position: "fixed",
      top: "0px",
      left: "0px",
      width : '100vw',
      height : '100vh'
    }
  } else {
    return {
      width: "100%",
      height: "60vh",
      position: "relative"
    }
  }
}

const Wapper =  props => {
  const { mode, theme, maximize } = useDeck()
  const [height, setHeight] = useState('100vh')

  useEffect(() => {
    // handle mobile safari height
    setHeight(window.innerHeight)
    const handleResize = e => {
      setHeight(window.innerHeight)
    }
    const stopTouch = e => {
      if (mode !== modes.normal) return
      e.preventDefault()
    }
    window.addEventListener('resize', handleResize)
    document.body.addEventListener('touchstart', stopTouch)
    return () => {
      window.removeEventListener('resize', handleResize)
      document.body.removeEventListener('touchstart', stopTouch)
    }
  }, [mode])

  const { Provider = DefaultProvider } = theme

  return (
    <Provider>
      <div
        {...props}
        sx={{
          width: '100%',
          height: mode !== modes.print ? height : '100vh',
          ...wapperStyle(maximize),
          variant: 'styles.root',
          '*': {
            boxSizing: 'border-box',
          },
        }}
      />
    </Provider>
  )
}

export default Wapper
