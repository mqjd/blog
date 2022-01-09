/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { Fragment, useState, useEffect } from 'react'
import useDeck from 'gatsby-theme-mdx-deck/src/hooks/use-deck'
import { modes } from 'gatsby-theme-mdx-deck/src/constants'

const DefaultProvider = props =>
  React.createElement(Fragment, null, props.children)

const Wapper =  props => {
  const { mode, theme, slideStyle } = useDeck()
  const [height, setHeight] = useState('100vh')

  useEffect(() => {
    // handle mobile safari height
    setHeight(slideStyle.height)
    const handleResize = e => {
      setHeight(slideStyle.height)
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
  }, [mode, slideStyle])

  const { Provider = DefaultProvider } = theme

  return (
    <Provider>
      <div
        {...props}
        sx={{
          ...slideStyle,
          width: '100%',
          height: mode !== modes.print ? height : '100vh',
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
