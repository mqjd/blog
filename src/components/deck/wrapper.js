/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { Fragment, useState, useEffect } from 'react'
import useDeck from 'gatsby-theme-mdx-deck/src/hooks/use-deck'
import { modes } from 'gatsby-theme-mdx-deck/src/constants'

const DefaultProvider = props =>
  React.createElement(Fragment, null, props.children)

const Wapper =  props => {
  const [height, setHeight] = useState('100%')
  const { mode, theme } = useDeck()

  useEffect(() => {
    // handle mobile safari height
    setHeight('100%')
    const handleResize = e => {
      setHeight('100%')
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
          height: mode !== modes.print ? height : '100%',
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
